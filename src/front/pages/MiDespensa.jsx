import React, { useState } from 'react';

function MiDespensa() {
  const [data, setData] = useState('');
  const [foods, setFoods] = useState([]);
  const [editingFoodId, setEditingFoodId] = useState(null); // Estado para el ID del alimento en edición
  const [editValue, setEditValue] = useState(''); // Estado para el valor editado

  const newFood = {
    id: Date.now().toString(),
    label: data.trim(),
    quantity: 1
  };


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

    </>
  );
}

export default MiDespensa;