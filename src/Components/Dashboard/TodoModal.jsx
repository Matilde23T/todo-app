import { useState, useEffect } from "react";

const CATEGORIES = ["personale", "lavoro", "importanti", "appuntamenti"];

export default function TodoModal({ isOpen, onClose, onSave, todo, mode }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "personale",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && todo) {
        setFormData({
          name: todo.name,
          category: todo.category || "personale",
        });
      } else {
        setFormData({ name: "", category: "personale" });
      }
      setErrors({});
    }
  }, [isOpen, mode, todo]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nome obbligatorio";
    if (!formData.category) newErrors.category = "Categoria obbligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSave({
        name: formData.name.trim(),
        category: formData.category,
      });
      onClose();
    } catch (error) {
      console.error("Errore nel salvare il todo", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!isOpen) return null;

  const title = mode === "create" ? "Aggiungi nuovo todo" : "Modifica todo";

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-50">

       
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-120 mx-4 md:py-10 md:w-150 lg:w-160 lg:py-10">
        <h2 className="text-xl font-bold mb-4 ">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Titolo:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Inserisci titolo todo"
              className="border p-2 w-full rounded my-3"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div className="mt-4">
            <label>Categoria:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 w-full rounded my-3"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category}</p>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {loading
                ? "Salvataggio..."
                : mode === "create"
                ? "Crea Todo"
                : "Salva Modifica"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
