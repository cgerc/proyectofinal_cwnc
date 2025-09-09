import React from 'react';
import { useState, useEffect } from "react";
import Generator from "../components/Generator.jsx"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { use } from 'react';
import Card from '../components/Card.jsx';


function Recipe() {

    const [foods, setFoods] = useState([]); // guardamos los alimentos
    const [recipes, setRecipes] = useState(null); // guardamos las recetas generadas

    // Receta de ejemplo para mostrar cuando no hay receta generada
    const exampleRecipe = {
        titulo: "Pasta con Tomate y Albahaca",
        ingredientes: [
            "400g de pasta (espaguetis o penne)",
            "4 tomates grandes maduros",
            "3 dientes de ajo",
            "Hojas de albahaca fresca",
            "4 cucharadas de aceite de oliva extra virgen",
            "Sal y pimienta al gusto",
            "Queso parmesano rallado (opcional)"
        ],
        preparacion: [
            "Hierve agua abundante con sal en una olla grande y cocina la pasta según las instrucciones del paquete.",
            "Mientras tanto, pela y pica finamente los tomates y el ajo.",
            "En una sartén grande, calienta el aceite de oliva a fuego medio y añade el ajo. Sofríe por 1 minuto.",
            "Agrega los tomates picados, sal y pimienta. Cocina por 10-15 minutos hasta que se forme una salsa.",
            "Escurre la pasta y mézclala con la salsa de tomate.",
            "Añade las hojas de albahaca fresca y mezcla suavemente.",
            "Sirve caliente, espolvoreando queso parmesano si lo deseas."
        ],
        dificultad: 2,
        tiempo_estimado: "25 minutos"
    };

    useEffect(() => {
        const savedFoods = localStorage.getItem('pantryFoods');
        setFoods(savedFoods ? JSON.parse(savedFoods) : []); // si hay algun alimento, se guarda en local storage
    }, []);


    return (
        <div>
            <div className='row'>
                <div className='col-12'>
                    <img src="https://i.postimg.cc/ncmqWbKz/Chat-GPT-Image-Aug-20-2025-04-00-31-PM.png"
                        alt="Recipe"
                        className="recipe-img"
                        style={{ height: "25vh", objectFit: "cover" }} />
                </div>
            </div>

            <div className='d-flex justify-content-center mt-3'>
                <div className="text-center">
                    <h2 className="text-success">Generar Recetas</h2>
                    <Generator foods={foods} setRecipes={setRecipes} />
                </div>
            </div>
            {/* 
            <Card />
            */}

            <div className="container text-success">
                <h1>{recipes ? recipes.titulo : exampleRecipe.titulo}</h1>
                {!recipes && <p className="text-muted small">Esta es una receta de ejemplo. Genera tu propia receta usando los ingredientes de tu despensa.</p>}
            </div>
            {(recipes || (!recipes && exampleRecipe)) && (
                <div className="row">
                    <div className='col-md-6 col-sm-12 border-end border-success border-3 px-3'>
                        {/* Ingredients */}
                        <h2 className='text-success'>Ingredients</h2>
                        <ul className="list-group list-group-flush text-start">
                            {(recipes ? recipes.ingredientes : exampleRecipe.ingredientes) && (recipes ? recipes.ingredientes : exampleRecipe.ingredientes).map((ing, index) => (
                                <li key={index} className="list-group-item border-success">{ing}</li>
                            ))}
                        </ul>
                        <h2 className='text-success mt-3 text-start'>Difficulty</h2>
                        <p className='text-start text-success'>{"★".repeat(recipes ? recipes.dificultad : exampleRecipe.dificultad) + "☆".repeat(5 - (recipes ? recipes.dificultad : exampleRecipe.dificultad))}</p>
                        <h2 className='text-success mt-3 text-start'>Prep time</h2>
                        <p className='text-start'>{recipes ? recipes.tiempo_estimado : exampleRecipe.tiempo_estimado}</p>
                    </div>
                    <div className='col-md-6 col-sm-12 px-3'>
                        {/* Recipe */}
                        <h2 className='text-success'>Instructions:</h2>
                        <div className='text-start'>
                            <ol className="list-group list-group-numbered">
                                {(recipes ? recipes.preparacion : exampleRecipe.preparacion) && (recipes ? recipes.preparacion : exampleRecipe.preparacion).map((step, index) => (
                                    <li key={index} className="list-group-item border-success">{step.replace(/^\d+\.\s*/, '')}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            )}
            <div className='row'>
                <div className="d-flex gap-5 overflow-auto"
                    style={{ whiteSpace: "nowrap" }}>

                </div>
            </div>
        </div>
    );
}

export default Recipe;