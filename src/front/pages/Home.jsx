import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		
		<>
		<div className="container bg-success fondo container0 text-white py-5">
  <p className="text-start fs-1"><strong>Descubre qué<br />cocinar con lo<br />que tienes</strong></p>
  <p className="fs-4 p1">Escribe tus ingredientes y recibe<br />recetas al instante, sin complicaciones</p>
  <img className="imagen mt-4" src="https://chatgpt.com/backend-api/public_content/enc/eyJpZCI6Im1fNjhhYTc3MjUyMjU4ODE5MThkNTU1ODg1ZTJkMGI4MDM6ZmlsZV8wMDAwMDAwMDY4ZDg2MjMwYmVhMGQ3MTI2OTg0MmRkYiIsInRzIjoiNDg3Nzc4IiwicCI6InB5aSIsInNpZyI6ImM0NGM4MmVmN2E2NDk2OGY2ZGY3ZTc1N2VjOTgxYWVkYjQ0NzhhZTMyNGZjZThkYzRiMDAwZjQ2MWYzZmQ4OGMiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsfQ==" alt="Cocina con lo que tienes" />
</div>

<div className="Funcionalidades container py-5">
  <p className="fs-1 text-center mb-4"><strong>Funcionalidades .</strong></p>

  <div className="mb-4">
	<img  className="symbol1" src="https://www.shutterstock.com/image-vector/green-chef-logo-design-template-260nw-2639161045.jpg"></img>
    <p className="fs-4"><i>Recetas a tu medida</i></p>
    <p className="fs-6">Ingresa los ingredientes que tengas en tu despensa y recibe recetas adaptadas a ti</p>
  </div>

  <div className="mb-4">
	<img className="symbol1" src="https://media.istockphoto.com/id/2163736632/es/vector/cuadro-de-icono-de-contorno-delgado-que-contiene-comida-se%C3%B1al-de-l%C3%ADnea-como-comida-para.jpg?s=612x612&w=0&k=20&c=GOcwM8JNZAW7Pp3xghWbN7xKfYew_FWJNPhEJdtHEfs="></img>
    <p className="fs-4"><i>Gestiona tu despensa</i></p>
    <p className="fs-6">Mantén un inventario de tus ingredientes y evita desperdicios</p>
  </div>

  <div className="mb-4">
	<img className="symbol1" src="https://media.istockphoto.com/id/1173167531/vector/plate-fork-and-knife-line-icons-stock-vector.jpg?s=612x612&w=0&k=20&c=VtgZYE_z9fUVtppmwwTAw2ht0CgPO8NRKKNZ1d0JOOw="></img>
    <p className="fs-4"><i>Cumple tus objetivos</i></p>
    <p className="fs-6">Logra tus metas nutricionales cocinando con lo que ya tienes</p>
  </div>

  <div className="mb-4">
	<img className="symbol1" src="https://media.istockphoto.com/id/1433529839/vector/time-is-money-clock-and-coin-exchange-vector-illustration.jpg?s=612x612&w=0&k=20&c=tEmy9-qJ7LfHP3Af6QPFRKcZR3FnmCcS0zNcPKU89y4="></img>
    <p className="fs-4"><i>Ahorra tiempo y dinero</i></p>
    <p className="fs-6">Aprovecha lo que tienes, cocina rápido y sin gastar de más</p>

  </div> 
  <div className="imagen3">
  <div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://chatgpt.com/backend-api/public_content/enc/eyJpZCI6Im1fNjhhYjg0NDIwMzY4ODE5MThjZTA2YTVlZDUxMDg2MTA6ZmlsZV8wMDAwMDAwMDJiMjQ2MWY5OWVhYmMyMzA4YjhjMDdjMCIsInRzIjoiNDg3Nzk3IiwicCI6InB5aSIsInNpZyI6IjNmNDRjY2RhNmU1Y2IxM2Q4MDNmOWI1MmZlYTFjZmY3MWU0NzRmOTM2NDg4YzlhMjk1Yzc0OTkxMWI1YWQxZWQiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsfQ==" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://chatgpt.com/backend-api/public_content/enc/eyJpZCI6Im1fNjhhYjg0ZDNjMjQ0ODE5MTgwY2Q0NzAxMmVmNmVmN2Q6ZmlsZV8wMDAwMDAwMDI0ZTg2MWY2ODA2YjUwNzgyNWI1MDI1ZiIsInRzIjoiNDg3Nzk3IiwicCI6InB5aSIsInNpZyI6IjU0YTFlOWRmYWYxYWY3MGQ0N2ZhMTE3MzdiYWMzYTZmZDdlOGI0NTI0M2ZmMWMxNWUxMjk0NjU2NzQzMGY1OTYiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsfQ==" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://chatgpt.com/backend-api/public_content/enc/eyJpZCI6Im1fNjhhYjg1YWQyMzUwODE5MWE4MDE1ZDg2ZWI4ZTkxMTE6ZmlsZV8wMDAwMDAwMGM3NmM2MWY5YTdhMTVhOWUyMTU4OTYwNyIsInRzIjoiNDg3Nzk3IiwicCI6InB5aSIsInNpZyI6IjhmNTc2MzJlNzlhYWI5ZWU4YTZmYjA5ODI2MWQ1ZGNiYzQ0YmZhMmYxNmQ5MDkyMTgyOTBhZDVkODQ0YWQ4YjAiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsfQ==" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</div>


</div>

<div className="Como_Funciona container py-5 bg-light">
  <p className="fs-1 text-center mb-5"><strong>Como funciona?</strong></p>

  <div className="d-flex flex-column align-items-center">
    <img className="imagen1 mb-3" src="https://www.trasteros-madrid.com/wp-content/uploads/2022/05/como-organizar-despensa.jpg" alt="Organiza tu despensa" />
    <p className="fs-3 text-center"><i>Agrega lo que tienes en tu despensa</i></p>

    <img className="imagen symbol my-3" src="https://media.istockphoto.com/id/688550958/es/vector/signo-de-negro-s%C3%ADmbolo-positivo.jpg?s=612x612&w=0&k=20&c=LyVTdpQ0VUUnhYVyY6Emy6CXx96dUOU9O7GXmEN_Vxo=" alt="más" />
    <img className="imagen2 mb-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDFCwshOxt7clpVVlNwxThB_xd0_Ifxk7O4g&s" alt="Recetas sugeridas" />
    <p className="fs-3 text-center"><i>Recibe recetas sugeridas</i></p>

	  <img className="imagen symbol my-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Gzj_YWabZcy8fAq3eAvJtaIvC7_0W3AOcg&s" alt="más" />

	 <img className="imagen2 mb-3" src="https://www.eatthis.com/wp-content/uploads/sites/4/2022/09/happy-cooking-in-kitchen.jpg?quality=82&strip=1" alt="Recetas sugeridas" />
    <p className="fs-3 text-center"><i>Cocina facil y disfruta</i></p>

  </div>
</div>

<div className="Testimonios container py-5">
  <p className="fs-1 text-center mb-4"><strong>Testimonios</strong></p>

  <div className="row">
    <div className="col-md-6 mb-4">
      <div className="bg-white p-3 rounded shadow">
        <p className="fs-5">"Me ahorro tiempo pensando que cocinar"</p>
        <p className="text-muted">_Gabriel</p>
      </div>
    </div>
    <div className="col-md-6 mb-4">
      <div className="bg-white p-3 rounded shadow">
        <p className="fs-5">“No tengo que botar más alimentos vencidos”</p>
        <p className="text-muted">_Paula</p>
      </div>
    </div>
	  <div className="col-md-6 mb-4">
      <div className="bg-white p-3 rounded shadow">
        <p className="fs-5">“Tengo una guía de como alcanzar mis objetivos alimenticios por porciones”</p>
        <p className="text-muted">_Laura</p>
      </div>
    </div>
  </div>
</div>

<div className="CallToAction text-center bg-success text-white py-5">
  <p className="fs-1"><strong>¡Empieza ahora!</strong></p>
  <p className="fs-4">Aprovecha lo que ya tienes en casa y deja que la cocina sea fácil</p>
  <button className="btn btn-light btn-lg mt-3">Registrar Ingredientes</button>
</div>

<footer className="bg-dark text-white py-4 mt-5">
  <div className="container text-center">
    <p className="mb-1">© 2025 CookIA</p>
    <p className="mb-0">Hecho con ❤️ para aprovechar tu despensa</p>
  </div>
</footer>

		
		
		
		</>


	);
}; 