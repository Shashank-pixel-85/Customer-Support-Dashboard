import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

// =========================
// GET TICKETS + USERS
// =========================

export const getTickets = async () => {
  const [ticketsResponse, usersResponse] =
    await Promise.all([
      api.get("/todos"),
      api.get("/users?limit=0"),
    ]);

  const todos = ticketsResponse.data.todos;
  const users = usersResponse.data.users;

  return todos.map((todo) => {
    // Find the actual customer from the user's userId
    const customer = users.find(
      (user) => user.id === todo.userId
    );

    // Use another real DummyJSON user as the assigned agent
    const agent =
      users[
        (todo.id - 1) % users.length
      ];

    // =========================
    // STATUS
    // =========================

    let status;

    if (todo.completed) {
      status = "Resolved";
    } else if (todo.id % 3 === 0) {
      status = "In Progress";
    } else {
      status = "Open";
    }

    // =========================
    // PRIORITY
    // =========================

    let priority;

    if (todo.id % 3 === 0) {
      priority = "High";
    } else if (todo.id % 2 === 0) {
      priority = "Medium";
    } else {
      priority = "Low";
    }

    // =========================
    // RETURN TICKET
    // =========================

    return {
      id: todo.id,

      // REAL DATA FROM /users
      customerName: customer
        ? `${customer.firstName} ${customer.lastName}`
        : "Unknown Customer",

      customerEmail: customer
        ? customer.email
        : "No email available",

      // REAL DATA FROM /todos
      subject: todo.todo,

      // Description is not provided by DummyJSON
      description: `Customer support request regarding: ${todo.todo}`,

      // Derived because /todos doesn't have priority
      priority,

      // Derived from todo status
      status,

      // REAL USER DATA
      assignedAgent: agent
        ? `${agent.firstName} ${agent.lastName}`
        : "Unassigned",

      createdDate: new Date(
        Date.now() -
          todo.id * 86400000
      ).toISOString(),

      updatedDate: new Date().toISOString(),

      localOnly: false,
    };
  });
};

// =========================
// POST TICKET
// =========================

export const createTicket = async (ticket) => {
  const response = await api.post(
    "/todos/add",
    {
      todo: ticket.subject,
      completed:
        ticket.status === "Resolved",
      userId: 1,
    }
  );

  return {
    ...ticket,

    // DummyJSON returns a simulated ID.
    // Dashboard generates the actual unique UI ID.
    apiId: response.data.id,

    localOnly: true,
  };
};

// =========================
// PATCH TICKET
// =========================

export const updateTicket = async (ticket) => {
  // DummyJSON POST records are simulated,
  // so update them in React state.
  if (ticket.localOnly) {
    return {
      ...ticket,
      apiUpdated: false,
    };
  }

  try {
    const response = await api.patch(
      `/todos/${ticket.id}`,
      {
        todo: ticket.description,
        completed:
          ticket.status === "Resolved",
      }
    );

    return {
      ...response.data,
      apiUpdated: true,
    };
  } catch (error) {
    // DummyJSON may return 404 because
    // mutations are not permanently stored.
    if (error.response?.status === 404) {
      return {
        ...ticket,
        apiUpdated: false,
      };
    }

    throw error;
  }
};

// =========================
// DELETE TICKET
// =========================

export const deleteTicket = async (ticket) => {
  // Locally created tickets don't exist
  // permanently on DummyJSON.
  if (ticket.localOnly) {
    return {
      id: ticket.id,
      apiDeleted: false,
      localOnly: true,
    };
  }

  try {
    const response = await api.delete(
      `/todos/${ticket.id}`
    );

    return {
      ...response.data,
      apiDeleted: true,
    };
  } catch (error) {
    // Gracefully handle simulated API records.
    if (error.response?.status === 404) {
      return {
        id: ticket.id,
        apiDeleted: false,
      };
    }

    throw error;
  }
};


// =========================
// GET AGENTS
// =========================

export const getAgents = async () => {
  const response = await api.get("/users?limit=0");

  return response.data.users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
  }));
};

export default api;