import React, { useState, useEffect } from "react";

const Generator = ({ foods, setRecipes }) => {
    // const [recipes, setRecipes] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [allRecipeOptions, setAllRecipeOptions] = useState([]);
    const [customConditions, setCustomConditions] = useState([]);

    // Cargar condiciones personalizadas de localStorage
    useEffect(() => {
        const savedConditions = localStorage.getItem('customConditions');
        setCustomConditions(savedConditions ? JSON.parse(savedConditions) : []);
    }, []);

    const generateRecipes = async () => {
        const ingredients = foods.map(food => food.label);
        const customization = customConditions.join(', ');

        try {
            const response = await fetch(`${backendUrl}/api/generate-recipe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ingredients: ingredients.join(', '),
                    customization: customization
                })
            });
            const data = await response.json();
            console.log('Respuesta completa del servidor:', data);

            if (data.error) {
                console.error('Error del servidor:', data.error);
                alert('Error del servidor: ' + data.error);
                return;
            }

            // Si el resultado tiene estructura de opciones, mostrar todas
            if (data.opciones && data.opciones.length > 0) {
                console.log('Procesando opciones de recetas:', data.opciones);
                setAllRecipeOptions(data.opciones);
                setRecipes(data.opciones[0]); // Mostrar la primera por defecto
                setCurrentRecipe(data.opciones[0]);
            } else if (data.titulo) {
                // Si es una receta única, envolver en opciones
                console.log('Procesando receta única:', data);
                setRecipes(data);
                setCurrentRecipe(data);
                setAllRecipeOptions([data]);
            } else {
                console.error('Formato de respuesta no válido:', data);
                alert('Error: Formato de respuesta no válido del servidor');
            }
            console.log('Recetas generadas:', data);
        } catch (error) {
            console.error("Error", error);
        }
    };


    // AQUI VA LA LOGICA DEL GUARDADO DE RECETAS A FAVORITOS!!!!!!!

    const saveRecipe = () => {
        if (!currentRecipe) return;

        const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        const newRecipe = {
            ...currentRecipe,
            id: Date.now().toString(),
            savedAt: new Date().toISOString()
        };

        const updatedRecipes = [...savedRecipes, newRecipe];
        localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));

        alert('¡Receta guardada en favoritos!');
    };

    const selectRecipe = (recipe, index) => {
        setRecipes(recipe);
        setCurrentRecipe(recipe);
        console.log(`Receta ${index + 1} seleccionada:`, recipe);
    };

    return (
        <div className="d-flex flex-column align-items-center">
            {/* Mostrar condiciones activas */}
            {customConditions.length > 0 && (
                <div className="mb-3">
                    <small className="text-muted">Condiciones personalizadas:</small>
                    <div className="mt-1">
                        {customConditions.map((condition, index) => (
                            <span key={index} className="badge bg-success me-1 mb-1">
                                {condition}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="d-flex gap-2">
                <button className='btn btn-success mt-3' onClick={generateRecipes}>
                    🍳 Generar Recetas
                    {customConditions.length > 0 && (
                        <small className="d-block">con condiciones personalizadas</small>
                    )}
                </button>
                {currentRecipe && (
                    <button className='btn btn-outline-success mt-3' onClick={saveRecipe}>
                        ⭐ Guardar Favorito
                    </button>
                )}
            </div>

            {/* Opciones de recetas generadas */}
            {allRecipeOptions.length > 1 && (
                <div className="mt-3">
                    <small className="text-muted">Opciones de recetas generadas:</small>
                    <div className="d-flex gap-2 mt-2 justify-content-center">
                        {allRecipeOptions.map((recipe, index) => (
                            <button
                                key={index}
                                className={`btn btn-sm ${currentRecipe === recipe ? 'btn-success' : 'btn-outline-success'}`}
                                onClick={() => selectRecipe(recipe, index)}
                            >
                                Receta {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {/* {recipes && (
                <div className='mt-3'>
                    <h3>Suggested Recipes</h3>
                    <p>{JSON.stringify(recipes, null, 2)}</p>
                </div>
            )} */}
        </div>
    );
};

export default Generator;