import { FiX } from "react-icons/fi";

function TicketDetails({ ticket, onClose }) {
  if (!ticket) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="details-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-header">
          <div>
            <span className="modal-label">
              Ticket #{ticket.id}
            </span>

            <h2>Ticket Details</h2>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close ticket details"
          >
            <FiX size={19} />
          </button>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span>Customer Name</span>
            <strong>
              {ticket.customerName}
            </strong>
          </div>

          <div className="detail-item">
            <span>Customer Email</span>
            <strong>
              {ticket.customerEmail}
            </strong>
          </div>

          <div className="detail-item full-width">
            <span>Subject</span>
            <strong>{ticket.subject}</strong>
          </div>

          <div className="detail-item full-width">
            <span>Description</span>
            <p>{ticket.description}</p>
          </div>

          <div className="detail-item">
            <span>Priority</span>
            <strong>{ticket.priority}</strong>
          </div>

          <div className="detail-item">
            <span>Status</span>
            <strong>{ticket.status}</strong>
          </div>

          <div className="detail-item">
            <span>Assigned Agent</span>
            <strong>
              {ticket.assignedAgent}
            </strong>
          </div>

          <div className="detail-item">
            <span>Created Date</span>
            <strong>
              {new Date(
                ticket.createdDate
              ).toLocaleString("en-GB")}
            </strong>
          </div>

          <div className="detail-item">
            <span>Last Updated</span>
            <strong>
              {new Date(
                ticket.updatedDate
              ).toLocaleString("en-GB")}
            </strong>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="secondary-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;