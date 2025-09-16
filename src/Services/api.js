const API_BASE_URL = "http://localhost:4000/api";

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const config = { method: options.method || "GET", headers };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Richiesta fallita");
    }

    return data;
  }

  // 🔑 AUTH
  login(username, password) {
    return this.request("/login", {
      method: "POST",
      body: { username, password },
    });
  }

  me() {
    return this.request("/login/me");
  }

  // ✅ TODOS
  fetchTodos() {
    return this.request("/todos");
  }

  addTodo({ name, category }) {
    return this.request("/todos", {
      method: "POST",
      body: { name, category },
    });
  }

  updateTodo(id, data) {
    return this.request(`/todos/${id}`, {
      method: "PUT",
      body: data,
    });
  }

  deleteTodo(id) {
    return this.request(`/todos/${id}`, { method: "DELETE" });
  }
}

export const api = new ApiService();
