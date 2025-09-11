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

from src.api.utils import APIException, generate_sitemap
from src.api.models import db
from src.api.routes import api
from src.api.admin import setup_admin
from src.api.commands import setup_commands
from src.api.extensions import jwt


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
load_dotenv()

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