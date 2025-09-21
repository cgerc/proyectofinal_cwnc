import React from "react";

function Card(props) {
    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <img src="https://i.postimg.cc/9MsT4wsv/DALL-E-2025-09-04-22-41-41-A-highly-realistic-elegant-and-minimalist-gourmet-dish-of-real-food.webp" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">Difficult: {props.difficult}</p>
                    <p className="card-text">Prep time: {props.prepTime}</p>
                    <a href="#" className="btn btn-success">Start Cooking</a>
                </div>
            </div>
        </div>
    )
}

export default Card;