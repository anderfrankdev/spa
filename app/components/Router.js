import api from "../helpers/wp_api.js"
import {ajax} from "../helpers/ajax.js"
import {PostCard} from './PostCard.js';
import {SearchCard} from './SearchCard.js';
import {ContactForm} from './ContactForm.js';
import {Post} from './Post.js';

export async function Router(){

	const $posts = document.getElementById("main")

	$posts.innerHTML=null;

	if (!location.hash || location.hash=== "#/" ) {
		await ajax({
			url:api.POSTS,
			cbSuccess:(posts)=>{
				let html = ""
				posts.forEach((post)=> html += PostCard(post));
				document.querySelector(".loader").style.display = "none";
				document.getElementById("main").innerHTML = html ;
				
			}
		})
	}else if(location.hash==="#/contacto"){
		document.getElementById("main").appendChild(ContactForm())
	}else if(location.hash.includes("#/search")){
		let query = localStorage.getItem("wpSearch")
		if (!query) {
			document.querySelector(".loader").style.display="none"
			return false
		}

		await ajax({
			url:`${api.SEARCH}${query}`,
			cbSuccess:(search)=>{
				let html = ""
				console.log(search)
				if (search.length === 0) {
					html = `
						<p class="error">
							No existen los resultados de busqueda para el termino
							<mark>${query}</mark>
						</p>
					`
				}else{
					search.forEach(post=>(html+= SearchCard(post)))
				}
				document.getElementById("main").innerHTML = html ;
			}
		})

	}else{

		await ajax({
			url:`${api.POST}${localStorage.getItem("wpPostId")}`,
			cbSuccess:(post)=>{
				console.log(post)
				document.getElementById("main").innerHTML = Post(post)
			}
		})
	}

		document.querySelector(".loader").style.display = "none";
	/**/	
}