"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from src.api.models import db, User
from flask_cors import CORS
from src.api.extensions import bcrypt
from src.api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from src.api.agent import generate_recipe


api = Blueprint('api', __name__)
CORS(api, resources={r"/*": {"origins": "*"}})
# Allow CORS requests to this API
# (api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/user', methods=['POST'])
def create_user():
    print("Request JSON:", request.json)  # depurar
    email = request.json.get("email")
    if email is None:
        return jsonify({"message": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    if user is not None:
        return jsonify({"message": "User already exists"}), 400

    password = request.json.get("password")
    if password is None:
        return jsonify({"message": "Password is required"}), 400
    elif len(password) < 8:
        return jsonify({"message": "Password must be at least 8 characters"}), 400

    user = User()
    user.email = email
    user.name = request.json.get("name")
    # user.is_active = True

    # hashed password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user.password = hashed_password
    access_token = create_access_token(identity=email)

    db.session.add(user)
    db.session.commit()

    return jsonify({"access_token": access_token, "user": user.serialize()}), 200


@api.route('/user/login', methods=['POST'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    print("email: " + email)
    if email is None or password is None:
        return jsonify({"message": "Email and password are required"}), 400
    print("texto cualquera")
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"message": "User does not exist"}), 400
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Invalid password"}), 400
    print("otro cualquera")
    access_token = create_access_token(identity=email)
    # user.access_token = access_token
    db.session.commit()
    return jsonify({"access_token": access_token, "user": user.serialize()}), 200

# crear vistas protegidas (privdas)


@api.route('/users')
@jwt_required()
def get_all_users():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200

# agregar funcion para validar el token cuando caduque

 # obtener nombre de usuario en mensaje de bienvenida de mi despensa


@api.route('/generate-recipe', methods=['POST'])
def handle_generate_recipe():
    try:
        data = request.json
        
        ingredients = data.get('ingredients', '')
        customization = data.get('customization', '')
        
        if not ingredients:
            return jsonify({"error": "Se requieren ingredientes"}), 400
        
        result = generate_recipe(ingredients, customization)
        
        if "error" in result:
            return jsonify(result), 500
            
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({"error": f"Error interno del servidor: {str(e)}"}), 500
