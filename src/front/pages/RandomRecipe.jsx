import React, { useState } from "react";

function RandomRecipe() {
  const RECETAS = [
    {
      titulo: "Arroz con huevo",
      ingredientes: ["arroz", "huevo"],
      tiempo: 20,
      dificultad: "fácil",
    },
    {
      titulo: "Pasta al ajo",
      ingredientes: ["pasta", "ajo", "aceite"],
      tiempo: 15,
      dificultad: "fácil",
    },
    {
      titulo: "Tortilla de papa",
      ingredientes: ["papa", "huevo", "cebolla"],
      tiempo: 30,
      dificultad: "media",
    },
    {
      titulo: "Ensalada fresca",
      ingredientes: ["lechuga", "tomate", "pepino", "aceite"],
      tiempo: 10,
      dificultad: "fácil",
    },
    {
      titulo: "Pollo al horno",
      ingredientes: ["pollo", "papa", "ajo", "limón"],
      tiempo: 45,
      dificultad: "media",
    },
     {
      titulo: "Huevos revueltos con espinacas",
      ingredientes: ["2 huevos", "Un puñado de espinacas", "Sal, pimienta y aceite de oliva"],
      tiempo: 20,
      dificultad: "fácil",
    },
    
  ];



  const [receta, setReceta] = useState(null);

  const generarReceta = () => {
    const random = RECETAS[Math.floor(Math.random() * RECETAS.length)];
    setReceta(random);
  };

  return (
    <div className="generator">
      <h1 className="titulo"> Generador de recetas random</h1>
      <button onClick={generarReceta}>Sorpréndeme con un platillo</button>

      {receta && (
        <div>
          <div className="titulo2">{receta.titulo}</div>
          <p>
            <strong>Ingredientes:</strong> {receta.ingredientes.join(", ")}
          </p>
          <p>
            <strong>Tiempo:</strong> {receta.tiempo} min
          </p>
          <p>
            <strong>Dificultad:</strong> {receta.dificultad}
          </p>
        </div>
      )}
       </div>
  );
}

export default RandomRecipe;