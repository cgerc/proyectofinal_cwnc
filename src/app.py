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
        "Responde en formato json con los campos: titulo, ingredientes (lista) y preparacion (lista), dificultad (con una puntuacion entre 1-5), y tiempo_estimado de la preparacion.",
        "IMPORTANTE: Genera siempre una receta diferente y creativa. No repitas la misma receta. Varía el estilo de cocina, técnicas de preparación, o combinaciones de ingredientes.",
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
    
    # Añadir variabilidad para evitar repetir recetas
    import random
    cooking_styles = ["casera", "gourmet", "rápida", "saludable", "tradicional", "moderna", "mediterránea", "asiática"]
    random_style = random.choice(cooking_styles)
    
    mensaje = {
        "role": "user",
        "content": f"genera una receta {random_style} con estos ingredientes: {', '.join(ingredients)}. Asegúrate de que sea diferente y creativa."
    }
    # Lógica para generar recetas a partir de los ingredientes
    response = agent.run(mensaje)

    data = response.content
    print(data)
    
    # Si la respuesta viene envuelta en markdown, extraer solo el JSON
    if isinstance(data, str):
        if data.startswith('```json') and data.endswith('```'):
            # Extraer el JSON del markdown
            json_start = data.find('{')
            json_end = data.rfind('}') + 1
            if json_start != -1 and json_end > json_start:
                try:
                    import json
                    data = json.loads(data[json_start:json_end])
                except json.JSONDecodeError:
                    return jsonify({"error": "Error parsing AI response"}), 500
        else:
            try:
                import json
                data = json.loads(data)
            except json.JSONDecodeError:
                return jsonify({"error": "Invalid JSON response from AI"}), 500

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

#CRUD
#POST +
#GET +
#PUT +
#DELETE +
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))           
    description = db.Column(db.String(250))     

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description
        }

# GET all tasks
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    result = []
    for t in tasks:
        result.append(t.serialize())
    return jsonify(result)

# POST create a task
@app.route('/api/task', methods=['POST'])
def create_task():
    data = request.get_json()
    new = Task(title=data.get('title'), description=data.get('description'))
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "task created"}), 201
# PUT update a task
@app.route('/api/task/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.get_json()
    task = Task.query.get(id)
    if task:
        task.title = data.get('title', task.title)
        task.description = data.get('description', task.description)
        db.session.commit()
        return jsonify({"message": "task updated"})
    else:
        return jsonify({"error": "task not found"}), 404

# DELETE a task
@app.route('/api/task/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "task deleted"})
    else:
        return jsonify({"error": "task not found"}), 404