import React, { useState } from "react";

const Generator = ({ foods, setRecipes }) => {
    // const [recipes, setRecipes] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    const [currentRecipe, setCurrentRecipe] = useState(null);

    const generateRecipes = async () => {
        const ingredients = foods.map(food => food.label);
        try {
            const response = await fetch(`${backendUrl}/api/recipe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ingredientes: ingredients })
            });
            const data = await response.json();
            setRecipes(data);
            setCurrentRecipe(data);
            console.log(data);
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

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex gap-2">
                <button className='btn btn-success mt-3' onClick={generateRecipes}>
                    Generar Recetas
                </button>
                {currentRecipe && (
                    <button className='btn btn-outline-success mt-3' onClick={saveRecipe}>
                        ⭐ Guardar Favorito
                    </button>
                )}
            </div>
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