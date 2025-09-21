from phi.agent import Agent
from phi.model.openai import OpenAIChat
import os
from dotenv import load_dotenv
import json

# Por temas de buenas practicas, dejaremos el agente en 
# este archivo por separado para no combinar
# la logica del agente con la logica de la aplicacion <3 

load_dotenv() 

agent = Agent(
    model=OpenAIChat(
        id="gpt-4o-mini",
        api_key=os.getenv("OPENAI_API_KEY")
    ),
    description="soy un asistente que genera recetas de cocina inteligente",
    instructions=[
        "Responde SIEMPRE con un JSON válido.",
        "Genera recetas de cocina utilizando SOLO ALGUNOS de los ingredientes disponibles, no todos.",
        "Selecciona ingredientes que combinen bien entre sí para crear platos coherentes y deliciosos.",
        "Puedes usar entre 3-8 ingredientes de la lista disponible por receta, dependiendo del tipo de plato.",
        "NO uses todos los ingredientes de la despensa en una sola receta - eso sería poco realista.",
        "Crea recetas variadas: algunas pueden ser platos principales, otras ensaladas, sopas, postres, etc.",
        "Si faltan ingredientes básicos (sal, aceite, agua), puedes mencionarlos como 'ingredientes básicos necesarios'.",
        "Responde en formato JSON con estos campos EXACTOS:",
        "- titulo: string (nombre de la receta)",
        "- ingredientes: array de strings (lista de ingredientes con cantidades)",
        "- preparacion: array de strings (pasos de preparación numerados)",
        "- dificultad: number (puntuación 1-5)",
        "- tiempo_estimado: string (tiempo como '30 minutos', '1 hora', etc.)",
        "Devuelve un objeto con la clave 'opciones', que sea una lista de exactamente 3 recetas diferentes.",
        "Cada receta debe usar una combinación diferente de ingredientes de la despensa.",
        "IMPORTANTE: USA EXACTAMENTE estos nombres de campos: titulo, ingredientes, preparacion, dificultad, tiempo_estimado",
        "Escribe en español y NO añadas texto fuera del JSON.",
        "Ejemplo de formato: {'opciones': [{'titulo': 'Nombre', 'ingredientes': ['ing1', 'ing2'], 'preparacion': ['paso1', 'paso2'], 'dificultad': 3, 'tiempo_estimado': '25 minutos'}]}"
        ],
    show_tool_calls=True,
    markdown=False, 
)

# Funcion para generar recetas con una seleccion inteligente de ingredientes!!
# No se puede dejar todo en un prompt base, se tiene que entregar el contexto a poco para que arme bien la respuesta
# Es una inyeccion de informacion al prompt base
def generate_recipe(ingredients, customization=None):
    prompt = f"Ingredientes disponibles en la despensa: {ingredients}. " # con esto estamos inyectando los ingredientes al string del prompt, para eso sirve la f
    prompt += "Selecciona SOLO los ingredientes que necesites para cada receta, no uses todos. " # agregar mas texto al prompt
    prompt += "Crea 3 recetas diferentes, cada una usando una combinación distinta de ingredientes."
    
    if customization:
        prompt += f" Requisitos especiales del usuario: {customization}" # con esto igual estamos inyectando las condiciones al prompot
    
    try:
        response = agent.run(prompt)
        content = response.content
        
        # Parsear el JSON
        data = json.loads(content)
        
        # Validar que tenga la estructura correcta
        if 'opciones' in data and isinstance(data['opciones'], list):
            # Validar cada receta
            for recipe in data['opciones']:
                required_fields = ['titulo', 'ingredientes', 'preparacion', 'dificultad', 'tiempo_estimado']
                for field in required_fields:
                    if field not in recipe:
                        return {"error": f"Campo faltante en receta: {field}"}
                        
        return data
        
    except json.JSONDecodeError as e:
        return {"error": f"Error parsing JSON: {str(e)}"}
    except Exception as e:
        return {"error": str(e)}

def main():
    print("--- CookIA ---")
    while True: # Bucle para interactuar con el agente

        pregunta = input("tú: ").strip() # Entrada del usuario, osea los ingredientes para la receta y elimina los espacios al final

        if pregunta.lower() in ["exit", "quit", "salir"]: # comandos para salir del bucle (sin importar mayusculas)
            print("Saliendo...") # mensaje de salida
            break # ruptura del bucle
        if not pregunta: # Si la petiicion esta vacia se imprime un mensaje
            print("No se proporcionaron ingredientes.")
            continue # se continua con el bucle
        
        try: #intenta ejecturar el siguiente codigo
            print("agente:", end="", flush=True) # "agente" y fuerza la impresion inmediata
            respuesta = agent.run(pregunta) # se ejecuta la respuesta del agente 
            print(respuesta.content) # impresion de la respuesta
        except Exception as e: #manejo de error e impresion de un mensaje error
            print("Error:", e)

if __name__ == "__main__":
    main()
