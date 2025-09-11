import React, { useState, useEffect } from 'react';

function Favorites() {
    const [savedRecipes, setSavedRecipes] = useState(() => {
        // Cargar recetas guardadas de localStorage al iniciar
        const saved = localStorage.getItem('savedRecipes');
        return saved ? JSON.parse(saved) : [];
    });
    const [editingRecipeId, setEditingRecipeId] = useState(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }, [savedRecipes]);

    const removeRecipe = (id) => {
        setSavedRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
        if (editingRecipeId === id) {
            setEditingRecipeId(null);
            setEditValue('');
        }
    };

    const startEditing = (recipe) => {
        setEditingRecipeId(recipe.id);
        setEditValue(recipe.titulo);
    };

    const handleEditChange = (event) => {
        setEditValue(event.target.value);
    };

    const saveEdit = (id) => {
        if (editValue.trim()) {
            setSavedRecipes((prev) =>
                prev.map((recipe) =>
                    recipe.id === id ? { ...recipe, titulo: editValue.trim() } : recipe
                )
            );
        }
        setEditingRecipeId(null);
        setEditValue('');
    };

    const handleEditKeyPress = (event, id) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            saveEdit(id);
        }
    };

    const cancelEdit = () => {
        setEditingRecipeId(null);
        setEditValue('');
    };

    return (
        <div className="container mt-4">
            <div className='row'>
                <div className='col-12'>
                    <img src="https://i.postimg.cc/ncmqWbKz/Chat-GPT-Image-Aug-20-2025-04-00-31-PM.png"
                        alt="Mis Recetas"
                        className="recipe-img w-100"
                        style={{ height: "25vh", objectFit: "cover" }} />
                </div>
            </div>

            <div className='d-flex justify-content-center mt-3'>
                <h2 className="text-success">Mis Recetas Favoritas</h2>
            </div>

            {savedRecipes.length === 0 ? (
                <div className="text-center mt-4">
                    <p className="text-muted">No tienes recetas guardadas aún. Ve a "Generate Recipes" para crear y guardar algunas.</p>
                </div>
            ) : (
                <div className="row mt-4">
                    {savedRecipes.map((recipe) => (
                        <div key={recipe.id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card border-success">
                                <div className="card-body">
                                    {editingRecipeId === recipe.id ? (
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editValue}
                                                onChange={handleEditChange}
                                                onKeyPress={(e) => handleEditKeyPress(e, recipe.id)}
                                                autoFocus
                                            />
                                            <div className="mt-2 d-flex justify-content-center gap-2">
                                                <button
                                                    className="btn btn-success btn-sm px-3"
                                                    onClick={() => saveEdit(recipe.id)}
                                                    style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
                                                >
                                                    ✓ Guardar
                                                </button>
                                                <button
                                                    className="btn btn-outline-secondary btn-sm px-3"
                                                    onClick={cancelEdit}
                                                >
                                                    ✕ Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <h5 className="card-title text-success">{recipe.titulo}</h5>
                                    )}

                                    <div className="mb-2 text-success">
                                        <strong>Dificultad:</strong> {"★".repeat(recipe.dificultad) + "☆".repeat(5 - recipe.dificultad)}
                                    </div>
                                    <div className="mb-2 text-success">
                                        <strong>Tiempo:</strong> {recipe.tiempo_estimado}
                                    </div>
                                    <div className="mb-3 text-success">
                                        <strong>Ingredientes:</strong>
                                        <ul className="small text-dark">
                                            {recipe.ingredientes.slice(0, 3).map((ing, index) => (
                                                <li key={index}>{ing}</li>
                                            ))}
                                            {recipe.ingredientes.length > 3 && <li className="text-muted">... y {recipe.ingredientes.length - 3} más</li>}
                                        </ul>
                                    </div>

                                    <div className="d-flex justify-content-center gap-2 mt-3">
                                        {editingRecipeId !== recipe.id && (
                                            <button
                                                className="btn btn-success btn-sm px-3"
                                                onClick={() => startEditing(recipe)}
                                                style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
                                            >
                                                ✏️ Editar Título
                                            </button>
                                        )}
                                        <button
                                            className="btn btn-danger btn-sm px-3"
                                            onClick={() => removeRecipe(recipe.id)}
                                            style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                                        >
                                            🗑️ Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;
