export default function TodoTable({ todos, onEdit, onDelete }) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-20">
        Nessun todo disponibile
      </p>
    );
  }

  return (
    <div className="mx-3 mt-10 mb-10  grid grid-cols-1 gap-10 
    md:mx-3 md:grid-cols-2 md:gap-7 md:px-2
    xl:grid-cols-3
    lg:grid-cols-2 lg:px-3">
      {todos.map((todo) => {
        let categoryStyle = "";
        switch (todo.category) {
          case "lavoro":
            categoryStyle = "bg-blue-100 ";
            break;
          case "appuntamenti":
            categoryStyle = "bg-green-100";
            break;
          case "personale":
            categoryStyle = "bg-pink-100";
            break;
          case "importanti":
            categoryStyle = "bg-orange-100 ";
            break;
          default:
            categoryStyle = "bg-white";
        }

       
        return (
          <div
            key={todo.id}
            className={` rounded-lg shadow-lg py-6 px-3 ${categoryStyle}`}
          >
            {/* Titolo + Categoria */}
            <div className="text-center">
              <p className="font-bold text-lg">{todo.name}</p>
              <p className="text-gray-500">{todo.category}</p>
            </div>

            {/* Azioni */}
            <div className="text-center my-6">
              <button
                onClick={() => onEdit(todo)}
                className="px-4 py-2 bg-none text-black border border-yellow-500 rounded-lg hover:bg-yellow-400 shadow-md  mx-2"
              >
                Modifica
              </button>
              <button
                onClick={() => onDelete(todo)}
                className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-100 mx-2"
              >
                Elimina
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
