import { api } from "../Services/api";
import { useEffect, useState } from "react";
import TodoTable from '../Components/Dashboard/TodoTable';
import TodoModal from '../Components/Dashboard/TodoModal';
import { Loader2 } from "lucide-react";
import { Plus } from 'lucide-react';

export default function DashboardItems() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [modalMode, setModalMode] = useState('create');

  // Carica todos all'avvio
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await api.fetchTodos();
      setTodos(data);
    } catch (error) {
      setError('Errore caricamento todos..');
    } finally {
      setLoading(false);
    }
  };

  // Creazione nuovo todo
  const handleCreateTodo = () => {
    setSelectedTodo(null);
    setModalMode('create');
    setShowTodoModal(true);
  };

  // Modifica todo
  const handleEditTodo = (todo) => {
    setSelectedTodo(todo);
    setModalMode('edit');
    setShowTodoModal(true);
  };

  // Elimina todo
  const handleDeleteTodo = async (todo) => {
    try {
      await api.deleteTodo(todo.id);
      setTodos(prev => prev.filter(t => t.id !== todo.id));
    } catch (error) {
      setError('Errore nell\'eliminazione');
    }
  };

  // Salvataggio todo (crea o aggiorna)
  const handleSaveTodo = async (todoData) => {
    try {
      if (modalMode === 'create') {
        const newTodo = await api.addTodo(todoData);
        setTodos(prev => [...prev, newTodo]);
      } else if (modalMode === 'edit' && selectedTodo) {
        const updatedTodo = await api.updateTodo(selectedTodo.id, todoData);
        setTodos(prev => prev.map(t => t.id === selectedTodo.id ? updatedTodo : t));
      }

      setShowTodoModal(false);
      setSelectedTodo(null);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">{error}</div>
    );
  }

  return (
    <>
      <div className="w-full flex justify-center mb-4">
        <button
          onClick={handleCreateTodo}
          className="bg-white text-blue-500 border py-2 px-7 rounded-lg flex justify-center items-center"
        >
          <h1 className="text-lg font-semibold ">Crea nuovo todo </h1>
          <Plus className="ml-3"/>
        </button>
      </div>

      <TodoTable
        todos={todos}
        onEdit={handleEditTodo}
        onDelete={handleDeleteTodo}
      />

      <TodoModal
        isOpen={showTodoModal}
        onClose={() => setShowTodoModal(false)}
        onSave={handleSaveTodo}
        todo={selectedTodo}
        mode={modalMode}
      />
    </>
  );
}
