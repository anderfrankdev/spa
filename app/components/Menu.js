export function Menu() {
	const $menu = document.createElement("nav")
	$menu.classList.add("menu")
	$menu.innerHTML=`
		<a href="#">Home</a>
		<span>-</span>
		<a href="#/search">Búsqueda</a>
		<span>-</span>
		<a href="#/contacto">Contacto</a>
		<span>-</span>
		<a href="http://aprendejavascript.org" target="_blank">Aprendejs.org</a>`
	return $menu
}