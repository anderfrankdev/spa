export function Loader(){
	const $loader = document.createElement("img")
	$loader.alt="Cargando..."
	$loader.src="app/assets/loader.svg"
	$loader.classList.add("loader")
	return $loader
}