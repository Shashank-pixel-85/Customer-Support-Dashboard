import {
  FiInbox,
  FiCircle,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

function SummaryCards({ tickets }) {
  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  const highPriorityTickets = tickets.filter(
    (ticket) => ticket.priority === "High"
  ).length;

  const cards = [
    {
      title: "Total Tickets",
      value: totalTickets,
      icon: FiInbox,
      className: "total",
    },
    {
      title: "Open Tickets",
      value: openTickets,
      icon: FiCircle,
      className: "open",
    },
    {
      title: "In Progress",
      value: inProgressTickets,
      icon: FiClock,
      className: "progress",
    },
    {
      title: "Resolved",
      value: resolvedTickets,
      icon: FiCheckCircle,
      className: "resolved",
    },
    {
      title: "High Priority",
      value: highPriorityTickets,
      icon: FiAlertTriangle,
      className: "high",
    },
  ];

  return (
    <section className="summary-grid">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            className={`summary-card ${card.className}`}
            key={card.title}
          >
            <div className="summary-card-content">
              <span className="summary-title">
                {card.title}
              </span>

              <strong className="summary-value">
                {card.value}
              </strong>
            </div>

            <div className="summary-icon">
              <Icon size={21} />
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default SummaryCards;