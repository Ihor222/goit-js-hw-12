import{a as m,S as y,i}from"./assets/vendor-CrlV4O_2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const g="50677647-868d585e754b962a191c6dabd",p="https://pixabay.com/api/";async function h(r,t){const o={key:g,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};try{return(await m.get(p,{params:o})).data}catch{throw new Error("Error fetching data from Pixabay API")}}const d=document.querySelector(".gallery"),L=document.querySelector(".load-more"),u=document.querySelector(".loader"),w=new y(".gallery a",{captionsData:"alt",captionDelay:250});function v(r){const t=r.map(o=>`
    <div class="gallery-item">
      <a href="${o.largeImageURL}">
        <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
      </a>
      <div class="image-info">
        <p><strong>Likes:</strong> ${o.likes}</p>
        <p><strong>Views:</strong> ${o.views}</p>
        <p><strong>Downloads:</strong> ${o.downloads}</p>
        <p><strong>Comments:</strong> ${o.comments}</p>
      </div>
    </div>
  `).join("");d.insertAdjacentHTML("beforeend",t),w.refresh()}function b(){d.innerHTML=""}function q(){u.classList.remove("is-hidden")}function S(){u.classList.add("is-hidden")}function P(){L.classList.remove("is-hidden")}const $=document.querySelector(".form"),B=document.querySelector(".load-more");let c="",l=1,E=0;$.addEventListener("submit",async r=>{if(r.preventDefault(),c=r.target.elements.searchQuery.value.trim(),!c){i.error({message:"Please enter a search term!"});return}l=1,b(),await f()});B.addEventListener("click",async()=>{l+=1,await f(!0)});async function f(r=!1){try{q();const t=await h(c,l);if(t.hits.length===0){i.info({message:"No images found. Try a different query."});return}v(t.hits),E=t.totalHits,P(),r&&A()}catch{i.error({message:"Failed to fetch images. Try again later."})}finally{S()}}function A(){const{height:r}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
