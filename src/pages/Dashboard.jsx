import { useCallback, useEffect, useState } from "react";
import {
  FiPlus,
  FiX,
  FiRefreshCw,
} from "react-icons/fi";

import {
  createTicket,
  deleteTicket,
  getTickets,
  getAgents,
  updateTicket,
} from "../services/ticketApi";

import SummaryCards from "../components/SummaryCards";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import TicketTable from "../components/TicketTable";
import Pagination from "../components/Pagination";
import TicketDetails from "../components/TicketDetails";
import TicketForm from "../components/TicketForm";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedTicket, setSelectedTicket] =
    useState(null);

  const [formMode, setFormMode] =
    useState(null);

  const [editingTicket, setEditingTicket] =
    useState(null);

  const [submitting, setSubmitting] =
    useState(false);

  const ticketsPerPage = 10;

  // =========================
  // GET TICKETS + AGENTS
  // =========================

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [ticketData, agentData] =
        await Promise.all([
          getTickets(),
          getAgents(),
        ]);

      setTickets(ticketData);
      setAgents(agentData);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load dashboard data. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial API synchronization; state updates happen inside fetchTickets.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTickets();
  }, [fetchTickets]);

  // =========================
  // SUCCESS MESSAGE
  // =========================

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredTickets = tickets.filter(
    (ticket) => {
      const search =
        searchTerm.toLowerCase().trim();

      const matchesSearch =
        ticket.customerName
          .toLowerCase()
          .includes(search) ||
        ticket.subject
          .toLowerCase()
          .includes(search) ||
        ticket.id
          .toString()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        ticket.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    }
  );

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredTickets.length /
      ticketsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    ticketsPerPage;

  const paginatedTickets =
    filteredTickets.slice(
      startIndex,
      startIndex + ticketsPerPage
    );

  // =========================
  // VIEW
  // =========================

  const handleView = (ticket) => {
    setSelectedTicket(ticket);
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setFormMode("edit");
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (ticket) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete Ticket #${ticket.id}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteTicket(ticket);

      setTickets((previous) =>
        previous.filter(
          (item) => item.id !== ticket.id
        )
      );

      setSelectedTicket(null);

      setSuccessMessage(
        `Ticket #${ticket.id} deleted successfully.`
      );
    } catch (error) {
      console.error(error);

      setError(
        "Failed to delete ticket. Please try again."
      );
    }
  };

  // =========================
  // CREATE
  // =========================

  const handleCreate = async (formData) => {
    try {
      setSubmitting(true);
      setError("");

      const newTicket = {
        ...formData,
        status: "Open",
        createdDate:
          new Date().toISOString(),
        updatedDate:
          new Date().toISOString(),
      };

      const createdTicket =
        await createTicket(newTicket);

      /*
       * DummyJSON returns a fake ID
       * for POST requests.
       *
       * Generate our own unique ID
       * for the dashboard.
       */

      const highestExistingId =
        tickets.reduce(
          (highest, ticket) =>
            Math.max(
              highest,
              Number(ticket.id) || 0
            ),
          0
        );

      const uniqueId =
        highestExistingId + 1;

      const ticketToAdd = {
        ...newTicket,
        id: uniqueId,
        localOnly: true,
        apiId: createdTicket.apiId,
      };

      setTickets((previous) => [
        ticketToAdd,
        ...previous,
      ]);

      setFormMode(null);
      setEditingTicket(null);

      setCurrentPage(1);

      setSuccessMessage(
        `Ticket #${uniqueId} created successfully.`
      );
    } catch (error) {
      console.error(error);

      setError(
        "Failed to create ticket. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // UPDATE
  // =========================

  const handleUpdate = async (formData) => {
    if (!editingTicket) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const updatedTicket = {
        ...editingTicket,
        ...formData,
        updatedDate:
          new Date().toISOString(),
      };

      await updateTicket(updatedTicket);

      setTickets((previous) =>
        previous.map((ticket) =>
          ticket.id === editingTicket.id
            ? updatedTicket
            : ticket
        )
      );

      if (
        selectedTicket?.id ===
        editingTicket.id
      ) {
        setSelectedTicket(updatedTicket);
      }

      setEditingTicket(null);
      setFormMode(null);

      setSuccessMessage(
        `Ticket #${editingTicket.id} updated successfully.`
      );
    } catch (error) {
      console.error(error);

      setError(
        "Failed to update ticket. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePriorityChange = (value) => {
    setPriorityFilter(value);
    setCurrentPage(1);
  };

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="page-state">
        <div className="spinner"></div>

        <h2>Loading tickets</h2>

        <p>
          Fetching the latest support tickets...
        </p>
      </div>
    );
  }

  // =========================
  // INITIAL ERROR
  // =========================

  if (error && tickets.length === 0) {
    return (
      <div className="page-state">
        <div className="error-icon">
          !
        </div>

        <h2>Unable to load tickets</h2>

        <p>{error}</p>

        <button
          className="primary-button"
          onClick={fetchTickets}
        >
          <FiRefreshCw />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="dashboard">

      {/* HEADER */}

      <header className="dashboard-header">
        <div className="header-content">
          <h1>
            Customer Support Dashboard
          </h1>

          <p>
            Manage customer tickets and support
            requests from one place.
          </p>
        </div>

        <button
          className="primary-button create-button"
          onClick={() => {
            setEditingTicket(null);
            setFormMode("create");
          }}
        >
          <FiPlus />
          Create Ticket
        </button>
      </header>

      {/* SUCCESS */}

      {successMessage && (
        <div className="success-message">
          <span>{successMessage}</span>

          <button
            onClick={() =>
              setSuccessMessage("")
            }
            aria-label="Close success message"
          >
            <FiX />
          </button>
        </div>
      )}

      {/* ERROR */}

      {error && tickets.length > 0 && (
        <div className="error-message">
          <span>{error}</span>

          <button
            onClick={() => setError("")}
            aria-label="Close error message"
          >
            <FiX />
          </button>
        </div>
      )}

      {/* SUMMARY */}

      <SummaryCards tickets={tickets} />

      {/* SEARCH + FILTER */}

      <section className="controls-section">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearchChange}
        />

        <FilterBar
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
        />
      </section>

      {/* RESULTS */}

      <div className="result-toolbar">
        <span>
          Showing{" "}
          <strong>
            {paginatedTickets.length}
          </strong>{" "}
          of{" "}
          <strong>
            {filteredTickets.length}
          </strong>{" "}
          tickets
        </span>

        {(searchTerm ||
          statusFilter !== "All" ||
          priorityFilter !== "All") && (
          <button
            className="clear-filters"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* TABLE */}

      <TicketTable
        tickets={paginatedTickets}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* PAGINATION */}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* DETAILS */}

      <TicketDetails
        ticket={selectedTicket}
        onClose={() =>
          setSelectedTicket(null)
        }
      />

      {/* CREATE / EDIT */}

      {formMode && (
        <TicketForm
          key={`${formMode}-${editingTicket?.id ?? "new"}`}
          ticket={
            formMode === "edit"
              ? editingTicket
              : null
          }
          agents={agents}
          onSubmit={
            formMode === "edit"
              ? handleUpdate
              : handleCreate
          }
          onClose={() => {
            setFormMode(null);
            setEditingTicket(null);
          }}
          submitting={submitting}
        />
      )}
    </main>
  );
}

export default Dashboard;