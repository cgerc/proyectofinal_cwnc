import React, { useState } from "react";

const Generator = ({ foods }) => {
    const [recipes, setRecipes] = useState(null);

    const generateRecipes = async () => {
        const ingredients = foods.map(food => food.label);
        try {
            const response = await fetch("http://localhost:3001/api/recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ingredientes: ingredients })
            });
            const data = await response.json();
            setRecipes(data);
            console.log(data);
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div>
            <button className='btn btn-success mt-3' onClick={generateRecipes}>
                Generate Recipes
            </button>
            {recipes && (
                <div className='mt-3'>
                    <h3>Suggested Recipes</h3>
                    <pre>{JSON.stringify(recipes, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Generator;