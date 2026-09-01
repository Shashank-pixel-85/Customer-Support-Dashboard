import { FiFilter } from "react-icons/fi";

function FilterBar({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
}) {
  return (
    <div className="filter-wrapper">
      <div className="filter-label">
        <FiFilter size={17} />
        <span>Filters</span>
      </div>

      <div className="filter-group">
        <label htmlFor="status-filter">
          Status
        </label>

        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
        >
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priority-filter">
          Priority
        </label>

        <select
          id="priority-filter"
          value={priorityFilter}
          onChange={(e) =>
            onPriorityChange(e.target.value)
          }
        >
          <option value="All">
            All Priorities
          </option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;