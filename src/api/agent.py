from phi.agent import Agent
from phi.model.openai import OpenAIChat
import os
from dotenv import load_dotenv


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
        "Devuelve un objeto con la clave 'opciones', que sea una lista de exactamente 3 recetas.",
        "Escribe en español y NO añadas texto fuera del JSON."
        ],
    show_tool_calls=True,
    markdown=True, 
)

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
