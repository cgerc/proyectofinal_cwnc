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
    instructions=["Genera una receta de cocina a partir de los ingredientes que te doy. Responde en formato json con los campos: titulo, ingredientes (lista) y preparacion (lista). Si no me das ningun ingrediente, inventate una receta tu solo."],
    show_tool_calls=True,
    markdown=True, 
)

def main():
    print("--- Agent ---")
    while True:

        pregunta = input("tú: ").strip()

        if pregunta.lower() in ["exit", "quit", "salir"]:
            print("Saliendo...")
            break
        if not pregunta:
            print("No se proporcionaron ingredientes.")
            continue
        
        try:
            print("agente:", end="", flush=True)
            respuesta = agent.run(pregunta)
            print(respuesta.content)
        except Exception as e:
            print("Error:", e)

if __name__ == "__main__":
    main()
