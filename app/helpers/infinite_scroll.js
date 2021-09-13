import api from "./wp_api.js"
import {ajax} from "./ajax.js"
import {PostCard} from "../components/PostCard.js"

import {SearchCard} from "../components/SearchCard.js"

export async function infiniteScroll(){
	let query = localStorage.getItem("wpSearch"),
	apiURL,
	Component;

	window.addEventListener("scroll",async e=>{
		let {scrollTop, clientHeight, scrollHeight} = document.documentElement,
		{hash} = window.location

		if (scrollTop + clientHeight >= scrollHeight) {
			api.page++;

			if(!hash||hash==="#/"){
				apiURL = `${api.POSTS}&page=${api.page}`
				Component=PostCard
			}else if(hash.includes("·/search")){
				apiURL = `${api.SEARCH}&page=${api.page}`
				Component = SearchCard;
			}else{
				return false
			}

			await ajax({
				url: apiURL,
				cbSuccess:(posts)=>{
					let html = "";
					posts.forEach((post)=>html+=Component(post))
					document.getElementById("main").insertAdjacentHTML("beforeend",html)
					document.querySelector(".loader").style.display="none"

				}
			})
		}
	})
}