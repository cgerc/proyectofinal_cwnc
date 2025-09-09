export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_token":
      return {
        ...store,
        token: action.payload,
      };
    case "setUser":
      return {
        ...store,
        user: action.payload,
      };
    case "set_login":
      return {
        ...store,
        token: action.payload,
      };

    case "logout":
      return {
        ...store,
        token: null,
        user: [],
      };
    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };
    default:
      throw Error("Unknown action.");
  }
}
