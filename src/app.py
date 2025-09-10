"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask_bcrypt import bcrypt
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from dotenv import load_dotenv
from phi.agent import Agent
from phi.model.openai import OpenAIChat
import os, json
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.extensions import jwt

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
load_dotenv()

agent = Agent(
    model=OpenAIChat(
        id="gpt-4o-mini",
        api_key=os.getenv("OPENAI_API_KEY")
    ),
    description="soy un asistente que genera recetas de cocina",
    instructions=[
        "Responde SIEMPRE con un JSON válido.",
        "Genera una receta de cocina a solo con los ingredientes que te doy y que la preparacion sea detallada",
        "Usa solo los ingredientes proporcionados por el usuario; no agregues otros. Si falta algo esencial, indícalo en los ingredientes como sugerencia opcional.",
        "Responde en formato json con los campos: titulo, ingredientes (lista) y preparacion (lista), dificultad (con una puntuacion entre 1-5), y tiempo estimado de la preparacion.",
        #"Devuelve un objeto con la clave 'opciones', que sea una lista de exactamente 3 recetas.",
        "Escribe en español y NO añadas texto fuera del JSON."
        ],
    show_tool_calls=True,
    markdown=False, #esto estaba hacienndo que la respuesta del json no fuera un json valido
)

@app.route('/api/recipe', methods=['POST'])
def ap_recipes():
    payload = request.get_json(force=True) or {}
    ingredients = payload.get("ingredientes", [])
    if not ingredients:
        return jsonify({"error": "No se proporcionaron ingredientes"}), 400
    mensaje = {
        "role": "user",
        "content": f"genera recetas con estos ingredientes: {', '.join(ingredients)}"
    }
    # Lógica para generar recetas a partir de los ingredientes
    response = agent.run(mensaje)

    data = response.content # aaaaaaaaaaaaa
    print(data)

    return jsonify(data), 200


# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app.url_map.strict_slashes = False
jwt.init_app(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
