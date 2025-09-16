let todos = [];

// GET: restituisce tutti i todo
export const getTodos = (req, res) => {
  res.json(todos);
};

// POST: crea un nuovo todo
export const addTodo = (req, res) => {
  const newTodo = {
    id: Date.now(),
    name: req.body.name, // titolo del todo
    category: req.body.category || "personale", // default: "personale"
    completed: false,
  };

  todos.push(newTodo);
  res.json(newTodo);
};

// PUT: aggiorna un todo esistente
export const updateTodo = (req, res) => {
  const id = parseInt(req.params.id);

  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, ...req.body } : todo
  );

  res.json(todos.find((t) => t.id === id));
};

// DELETE: elimina un todo
export const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.json({ success: true });
};
