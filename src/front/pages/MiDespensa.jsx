import React, { useState } from 'react';

function MiDespensa() {
  const [data, setData] = useState('');
  const [foods, setFoods] = useState([]);

  const handleChange = (event) => {
    console.log('Valor del input:', event.target.value); // Depuración.
    setData(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addFood();
    }
  };

  const addFood = () => {
    console.log('Agregando alimento:', data); // Depuración
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
            onClick={addFood} // Opcional: permite agregar alimentos con el botón
          >
            Agregar alimentos
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
                <span>{food.label}</span>
                <button
                  className="btn btn-danger btn-sm ms-auto"
                  onClick={() => removeFood(food.id)}
                  aria-label="Eliminar alimento"
                >
                  🗑️
                </button>
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