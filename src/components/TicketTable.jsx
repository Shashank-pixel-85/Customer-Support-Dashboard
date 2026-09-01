import {
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

function TicketTable({
  tickets,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <section className="table-container">
      <div className="table-header">
        <div>
          <h2>Support Tickets</h2>
          <p>
            Manage and track customer support requests
          </p>
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"></div>

          <h3>No tickets found</h3>

          <p>
            Try changing your search or filter
            criteria.
          </p>
        </div>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Customer</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Assigned Agent</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <span className="ticket-id">
                      #{ticket.id}
                    </span>
                  </td>

                  <td>
                    <div className="customer-cell">
                      <div className="avatar">
                        {ticket.customerName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <strong>
                          {ticket.customerName}
                        </strong>

                        <small>
                          {ticket.customerEmail}
                        </small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="subject-cell">
                      {ticket.subject}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`badge priority-${ticket.priority.toLowerCase()}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge status-${ticket.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      ticket.createdDate
                    ).toLocaleDateString("en-GB")}
                  </td>

                  <td>
                    {ticket.assignedAgent}
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="view-button"
                        onClick={() =>
                          onView(ticket)
                        }
                        title="View ticket"
                        aria-label={`View ticket ${ticket.id}`}
                      >
                        <FiEye size={15} />
                        <span>View</span>
                      </button>

                      <button
                        className="edit-button"
                        onClick={() =>
                          onEdit(ticket)
                        }
                        title="Edit ticket"
                        aria-label={`Edit ticket ${ticket.id}`}
                      >
                        <FiEdit2 size={15} />
                        <span>Edit</span>
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          onDelete(ticket)
                        }
                        title="Delete ticket"
                        aria-label={`Delete ticket ${ticket.id}`}
                      >
                        <FiTrash2 size={15} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default TicketTable;