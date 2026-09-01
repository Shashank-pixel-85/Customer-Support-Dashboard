import { useState } from "react";
import { FiX } from "react-icons/fi";

const emptyForm = {
  customerName: "",
  customerEmail: "",
  subject: "",
  description: "",
  priority: "Medium",
  status: "Open",
  assignedAgent: "",
};

const createInitialForm = (ticket) =>
  ticket
    ? {
        customerName: ticket.customerName || "",
        customerEmail: ticket.customerEmail || "",
        subject: ticket.subject || "",
        description: ticket.description || "",
        priority: ticket.priority || "Medium",
        status: ticket.status || "Open",
        assignedAgent: ticket.assignedAgent || "",
      }
    : emptyForm;

function TicketForm({
  ticket,
  agents = [],
  onSubmit,
  onClose,
  submitting,
}) {
  const [formData, setFormData] = useState(() =>
    createInitialForm(ticket)
  );
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(ticket);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName =
        "Customer name is required.";
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail =
        "Customer email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.customerEmail.trim()
      )
    ) {
      newErrors.customerEmail =
        "Enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject =
        "Subject is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Description is required.";
    }

    if (!formData.priority) {
      newErrors.priority =
        "Priority is required.";
    }

    if (!formData.status) {
      newErrors.status =
        "Status is required.";
    }

    if (!formData.assignedAgent.trim()) {
      newErrors.assignedAgent =
        "Assigned agent is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      ...formData,
      customerName: formData.customerName.trim(),
      customerEmail: formData.customerEmail.trim(),
      subject: formData.subject.trim(),
      description: formData.description.trim(),
      assignedAgent: formData.assignedAgent.trim(),
    });
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="form-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span className="modal-label">
              {isEditing ? "UPDATE TICKET" : "NEW TICKET"}
            </span>

            <h2>
              {isEditing
                ? `Edit Ticket #${ticket.id}`
                : "Create Support Ticket"}
            </h2>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close form"
            disabled={submitting}
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="customerName">
                Customer Name
              </label>

              <input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter customer name"
              />

              {errors.customerName && (
                <span className="form-error">
                  {errors.customerName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="customerEmail">
                Customer Email
              </label>

              <input
                id="customerEmail"
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                placeholder="Enter customer email"
              />

              {errors.customerEmail && (
                <span className="form-error">
                  {errors.customerEmail}
                </span>
              )}
            </div>

            <div className="form-group full-width">
              <label htmlFor="subject">
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter ticket subject"
              />

              {errors.subject && (
                <span className="form-error">
                  {errors.subject}
                </span>
              )}
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the customer issue..."
                rows="5"
              />

              {errors.description && (
                <span className="form-error">
                  {errors.description}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="priority">
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              {errors.priority && (
                <span className="form-error">
                  {errors.priority}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Open">Open</option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Resolved">
                  Resolved
                </option>
              </select>

              {errors.status && (
                <span className="form-error">
                  {errors.status}
                </span>
              )}
            </div>

            <div className="form-group full-width">
              <label htmlFor="assignedAgent">
                Assigned Agent
              </label>

              <select
                id="assignedAgent"
                name="assignedAgent"
                value={formData.assignedAgent}
                onChange={handleChange}
              >
                <option value="">
                  Select an agent
                </option>

                {agents.map((agent) => (
                  <option
                    key={agent.id}
                    value={agent.name}
                  >
                    {agent.name}
                  </option>
                ))}
              </select>

              {errors.assignedAgent && (
                <span className="form-error">
                  {errors.assignedAgent}
                </span>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={submitting}
            >
              {submitting
                ? "Saving..."
                : isEditing
                ? "Update Ticket"
                : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TicketForm;
