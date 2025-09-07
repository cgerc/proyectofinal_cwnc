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

    useEffect(() => {
        const savedFoods = sessionStorage.getItem('pantryFoods');
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
                <h2>Generate Recipes</h2>
                <Generator foods={foods} setRecipes={setRecipes} />
            </div>
            {/* 
            <Card />
            */}

            <div className="container text-success">
                <h1>{recipes ? recipes.titulo : null}</h1>
            </div>
            <div className="row">
                <div className='col-md-6 col-sm-12 border-end border-success border-3 px-3'>
                    {/* Ingredients */}
                    <h2 className='text-success'>Ingredients</h2>
                    <ul className="list-group list-group-flush text-start">
                        <li className="list-group-item border-success">2 filetes de salmón fresco (150-200 g cada uno, con piel).</li>
                        <li className="list-group-item border-success">3-4 papas medianas.</li>
                        <li className="list-group-item border-success">200 ml de crema (nata para cocinar).</li>
                        <li className="list-group-item border-success">1 diente de ajo.</li>
                        <li className="list-group-item border-success">½ cebolla pequeña. </li>
                        <li className="list-group-item border-success">Ciboulette fresco, picado. </li>
                        <li className="list-group-item border-success">Mantequilla 30 g. </li>
                        <li className="list-group-item border-success">Aceite de oliva. </li>
                        <li className="list-group-item border-success">Sal y pimienta al gusto. </li>
                    </ul>
                    <h2 className='text-success mt-3 text-start'>Difficult</h2>
                    <p className='text-start text-success'>★★★☆☆</p>
                    <h2 className='text-success mt-3 text-start'>Prep time</h2>
                    <p className='text-start'>1 hora y 45 minutos</p>
                </div>
                <div className='col-md-6 col-sm-12 px-3'>
                    {/* Recipe */}
                    <h2 className='text-success'>
                        Instuctions:
                    </h2>
                    <div className='text-start'>
                        <div>
                            <h3>1. Papas fondant</h3>
                            <ul className="list-group list-group-flush list-group-numbered">
                                <li className="list-group-item border-success">Pela las papas y córtalas en cilindros de unos 3-4 cm de alto. </li>
                                <li className="list-group-item border-success">En una sartén, dora las papas con mantequilla y un poco de aceite de oliva hasta que tengan un color dorado por ambos lados. </li>
                                <li className="list-group-item border-success">Añade ajo machacado, orégano seco, sal y pimienta. </li>
                                <li className="list-group-item border-success">Agrega caldo o agua hasta cubrir la mitad de las papas. Tapa y deja cocinar a fuego bajo hasta que estén tiernas por dentro (unos 20-25 minutos). </li>
                            </ul>
                        </div>
                        <div>
                            <h3>2. Salsa cremosa de ciboulette</h3>
                            <ul className="list-group list-group-flush list-group-numbered">
                                <li className="list-group-item border-success">En otra sartén, sofríe la cebolla y el ajo finamente picados en mantequilla hasta que estén transparentes. </li>
                                <li className="list-group-item border-success">Desglasa con un chorrito de vino blanco </li>
                                <li className="list-group-item border-success">Añade la crema, deja reducir a fuego bajo unos minutos. </li>
                                <li className="list-group-item border-success">Agrega ciboulette fresco picado, sal, pimienta y un toque de ralladura de limón. La salsa debe quedar suave y aromática. </li>
                            </ul>
                        </div>
                        <div>
                            <h3>3. Salmón</h3>
                            <ul className="list-group list-group-flush list-group-numbered">
                                <li className="list-group-item border-success">Sazona los filetes de salmón con sal, pimienta y un poco de aceite de oliva. </li>
                                <li className="list-group-item border-success">En una sartén caliente, coloca el salmón con la piel hacia abajo y cocínalo 4-5 minutos para que quede crujiente. </li>
                                <li className="list-group-item border-success">Voltea y cocina 2-3 minutos más, buscando que quede jugoso por dentro. </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="d-flex gap-5 overflow-auto"
                    style={{ whiteSpace: "nowrap" }}>

                </div>
            </div>
        </div>
    );
}

export default Recipe;