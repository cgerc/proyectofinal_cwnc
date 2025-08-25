import React, { useState } from 'react';

function MiDespensa() {
  const [data, setData] = useState('');
  const [foods, setFoods] = useState([]);
  const [editingFoodId, setEditingFoodId] = useState(null); // Estado para el ID del alimento en edición
  const [editValue, setEditValue] = useState(''); // Estado para el valor editado

  const handleChange = (event) => {
    console.log('Valor del input:', event.target.value);
    setData(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addFood();
    }
  };

  const addFood = () => {
    console.log('Agregando alimento:', data);
    if (data.trim()) {
      const newFood = {
        id: Date.now().toString(),
        label: data.trim(),
      };
      setFoods((prev) => [...prev, newFood]);
      setData('');
    }
  };

  const removeFood = (id) => {
    setFoods((prev) => prev.filter((alimento) => alimento.id !== id));
    if (editingFoodId === id) {
      setEditingFoodId(null); // Salir del modo de edición si se elimina el alimento
      setEditValue('');
    }
  };

  const startEditing = (food) => {
    setEditingFoodId(food.id);
    setEditValue(food.label); // Cargar el valor actual en el input de edición
  };

  const handleEditChange = (event) => {
    setEditValue(event.target.value); // Actualizar el valor del input de edición
  };

  const saveEdit = (id) => {
    if (editValue.trim()) {
      setFoods((prev) =>
        prev.map((food) =>
          food.id === id ? { ...food, label: editValue.trim() } : food
        )
      );
    }
    setEditingFoodId(null); // Salir del modo de edición
    setEditValue('');
  };

  const handleEditKeyPress = (event, id) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveEdit(id);
    }
  };

  return (
    <>
      {/* Jumbotron */}
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5 d-flex flex-column align-items-center text-center">
          <h1 className="display-5 fw-bold">Mi Despensa</h1>
          <p className="col-md-8 fs-4">
            Ingresa los alimentos que tengas en tu despensa y recibe recetas adaptadas a ti
          </p>
          <button
            className="btn btn-lg"
            type="button"
            style={{ backgroundColor: '#03C329', color: 'white' }}
            onClick={addFood}
          >
            Agregar alimento
          </button>
        </div>
      </div>

      {/* Lista de alimentos */}
      <div className="d-flex flex-column align-items-center mt-3">
        <h2>Alimentos en tu despensa</h2>

        <div className="mb-3 w-50">
          <input
            className="form-control"
            type="text"
            name="alimento"
            value={data}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Agregar alimento"
          />
        </div>

        <ul className="list-group w-50 shadow-lg">
          {foods.length === 0 ? (
            <li className="list-group-item text-muted">
              No hay alimentos, añade alimentos
            </li>
          ) : (
            foods.map((food) => (
              <li
                key={food.id}
                className="list-group-item d-flex align-items-center"
              >
                {editingFoodId === food.id ? (
                  <div className="d-flex w-100">
                    <input
                      type="text"
                      className="form-control me-2"
                      value={editValue}
                      onChange={handleEditChange}
                      onKeyDown={(e) => handleEditKeyPress(e, food.id)}
                      autoFocus
                    />
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => saveEdit(food.id)}
                      aria-label="Guardar cambios"
                    >
                      💾
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingFoodId(null)}
                      aria-label="Cancelar edición"
                    >
                      ❌
                    </button>
                  </div>
                ) : (
                  <>
                    <span
                      onClick={() => startEditing(food)}
                      style={{ cursor: 'pointer', flex: 1 }}
                    >
                      {food.label}
                    </span>
                    <button
                      className="btn btn-danger btn-sm ms-auto"
                      onClick={() => removeFood(food.id)}
                      aria-label="Eliminar alimento"
                    >
                      🗑️
                    </button>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
        <p className="text-muted text-center mt-3">
          {foods.length} alimento{foods.length !== 1 ? 's' : ''} en la despensa
        </p>
      </div>
    </>
  );
}

export default MiDespensa;