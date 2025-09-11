import React, { useState, useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import pantryImg from "./imagen/pantry.png";

function Pantry() {
  const [data, setData] = useState('');
<<<<<<< HEAD
  const [foods, setFoods] = useState(() => {
    // Cargar datos de localStorage al iniciar
    const savedFoods = localStorage.getItem('pantryFoods');
    return savedFoods ? JSON.parse(savedFoods) : [];
=======
  const [customPrompt, setCustomPrompt] = useState('');
  const [customConditions, setCustomConditions] = useState(() => {
    const savedConditions = localStorage.getItem('customConditions'); // vamos a leer si hay alguna condicion guardada en el local storage
    return savedConditions ? JSON.parse(savedConditions) : []; // si hay alguna condicion, lo convertimos a JSON, si no hay condicion se devuelve un array vacio
  });
  const [foods, setFoods] = useState(() => {     // Cargar datod de localStorage al iniciar
    const savedFoods = localStorage.getItem('pantryFoods'); // vamos a ller si hay algun alimento guardado en local storage
    return savedFoods ? JSON.parse(savedFoods) : [];  // si hay alimentos, lo convertimos a JSON, si no, devolvemos un array vacio
>>>>>>> feature/condition-for-recipes
  });
  const [editingFoodId, setEditingFoodId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const { store } = useGlobalReducer();

  useEffect(() => {
    localStorage.setItem('pantryFoods', JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem('customConditions', JSON.stringify(customConditions));
  }, [customConditions]);

  const incrementQuantity = (id) => {
    setFoods((prev) =>
      prev.map((food) =>
        food.id === id ? { ...food, quantity: food.quantity + 1 } : food
      )
    );
  };

  const decrementQuantity = (id) => {
    setFoods((prev) =>
      prev.map((food) =>
        food.id === id && food.quantity > 1
          ? { ...food, quantity: food.quantity - 1 }
          : food
      )
    );
  };

  const handleChange = (event) => {
    console.log('Valor del input:', event.target.value);
    setData(event.target.value);
  };

  const handleCustomPromptChange = (event) => {
    setCustomPrompt(event.target.value); // actualizamos el estado de customPrompt
  };

  const handleCustomPromptKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addCustomCondition(); // Agregamosn la condicion cuando se presione enter
    }
  };

  // Funcion para agregar una condicion personalizada
  const addCustomCondition = () => {
    if (customPrompt) {
      setCustomConditions(prev => [...prev, customPrompt]); // agregamos una condicion a las condiciones que ya estaban
      setCustomPrompt('');
    }
  };

  // Funcion para eliminar una condicion personalizada
  const removeCustomCondition = (condition) => {
    setCustomConditions(prev => prev.filter(c => c !== condition)); //filtramos las condiciones y eliminamos la que no queremos, condition representa cada condicion que tengams en el array, osea quiero quedarme con todos las condiciones que sean distintas a la que quiero borrar
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
      setFoods((prev) => {
        const existingFood = prev.find((food) => food.label.toLowerCase() === data.trim().toLowerCase());
        if (existingFood) {
          return prev.map((food) =>
            food.id === existingFood.id ? { ...food, quantity: food.quantity + 1 } : food
          );
        } else {
          const newFood = {
            id: Date.now().toString(),
            label: data.trim(),
            quantity: 1,
          };
          return [...prev, newFood];
        }
      });
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

  console.log(store.user);
  return (
    <>
      {/* Jumbotron */}
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5 d-flex flex-column align-items-center text-center">
          <h1 className="display-5 fw-bold">¡Bienvenido {store.user.name} a Mi Despensa!</h1>
          <div className="container my-5">
          <img
            src={pantryImg}
            alt="jumbotron-imagen"
            className="img-fluid rounded w-100"
            style={{ objectFit: 'cover', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}
          />
          </div>
          <p className="col-md-8 fs-4">
            Ingresa los alimentos que tengas en tu despensa y recibe recetas adaptadas a ti
          </p>
<<<<<<< HEAD
=======

          <div className="mb-3 w-50">
            <label className="form-label text-start w-100">
              <strong>Personaliza tu experiencia:</strong>
            </label>
            <input
              className="form-control bg-success-subtle"
              type="text"
              name="customPrompt"
              value={customPrompt}
              onChange={handleCustomPromptChange}
              onKeyDown={handleCustomPromptKeyPress}
              placeholder="Escribe una condición y presiona Enter (ej: sin gluten, vegetariano...)"
            />

            {/* Chips de condiciones */}
            {customConditions.length > 0 && (
              <div className="mt-2">
                {customConditions.map((condition, index) => (
                  <span key={index} className="badge bg-success me-2 mb-1">
                    {condition}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      style={{ fontSize: '0.7em' }}
                      onClick={() => removeCustomCondition(condition)}
                      aria-label="Eliminar condición"
                    />
                  </span>
                ))}
              </div>
            )}
          </div>



>>>>>>> feature/condition-for-recipes
        </div>
      </div>

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
                      {food.label} ({food.quantity || 1})
                    </span>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => incrementQuantity(food.id)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => decrementQuantity(food.id)}
                        aria-label="Disminuir cantidad"
                        disabled={(food.quantity || 1) <= 1}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-danger btn-sm ms-auto"
                        onClick={() => removeFood(food.id)}
                        aria-label="Eliminar alimento"
                      >
                        🗑️
                      </button>
                    </div>
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

export default Pantry;