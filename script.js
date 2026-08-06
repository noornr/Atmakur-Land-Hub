console.log("Atmakur Land Hub Loaded");

// Search
const searchInput = document.querySelector(".search-box input");
const cards = document.querySelectorAll(".card");

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase().trim();

        cards.forEach(card => {
            if (card.innerText.toLowerCase().includes(value)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// WhatsApp Enquiry
function sendWhatsApp() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    let text =
`🏡 New Property Enquiry

Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}`;

    window.open(
        `https://wa.me/91YOURNUMBER?text=${encodeURIComponent(text)}`,
        "_blank"
    );
}

//Properties images section 

let images = [];



let current = 0;

function showSlide(index) {

    const slide = document.getElementById("slide");

    if (!slide || images.length === 0) return;

    slide.src = images[index];

}

function nextSlide() {

    if(images.length===0) return;

    current = (current + 1) % images.length;

    showSlide(current);

}
function prevSlide() {

    if(images.length===0) return;

    current = (current - 1 + images.length) % images.length;

    showSlide(current);

}
if (document.getElementById("slide")) {
    setInterval(nextSlide, 3000);
}

function openFullscreen() {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightboxImg").src =
        document.getElementById("slide").src;
}

function closeFullscreen() {
    document.getElementById("lightbox").style.display = "none";
}

const pageUrl = window.location.href;

const whatsapp = document.getElementById("share-whatsapp");
const facebook = document.getElementById("share-facebook");
const x = document.getElementById("share-x");
const copy = document.getElementById("copy-link");

if (whatsapp) {
    whatsapp.href = `https://wa.me/?text=${encodeURIComponent(pageUrl)}`;
}

if (facebook) {
    facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
}

if (x) {
    x.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}`;
}

if (copy) {
    copy.addEventListener("click", () => {
        navigator.clipboard.writeText(pageUrl);
        alert("Property link copied!");
    });
}
/* ==========================================
   Premium Scroll Reveal Animation
========================================== */

const reveals = document.querySelectorAll(".reveal");

function revealSections() {

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;
        const visible = window.innerHeight - 120;

        if (top < visible) {
            section.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealSections);

window.addEventListener("load", revealSections);


function toggleFavorite(id) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    updateFavoriteButtons();
}

function updateFavoriteButtons() {

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    document.querySelectorAll(".favorite-btn").forEach(button => {

        const id = button.getAttribute("data-id");

        if (favorites.includes(id)) {
            button.innerHTML = "❤️";
        } else {
            button.innerHTML = "🤍";
        }

    });

}

document.addEventListener("DOMContentLoaded", updateFavoriteButtons);








/* ==========================================
   Dynamic Property Page
========================================== */

const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

if (propertyId && typeof properties !== "undefined") {

    const property = properties[propertyId];

    if (property) {

        images = property.images;

        document.getElementById("property-id").textContent =
            "ID : " + property.id;

        document.getElementById("property-map").src = property.map;

        document.getElementById("property-price").textContent =
            property.price;

        document.getElementById("property-area").textContent =
            property.area;

        document.getElementById("property-land").textContent =
            property.land;

        document.getElementById("property-road").textContent =
            property.road;

        document.getElementById("property-description").textContent =
            property.description;

        if(document.getElementById("slide")){
            document.getElementById("slide").src =
                property.images[0];
        }

    }

}

/* ==========================================
   Related Properties
========================================== */

const relatedContainer =
document.getElementById("relatedProperties");

if (
    relatedContainer &&
    typeof properties !== "undefined" &&
    propertyId
) {

    relatedContainer.innerHTML = "";

    Object.values(properties)
    .filter(p => p.id !== propertyId)
    .slice(0,2)
    .forEach(p => {

        relatedContainer.innerHTML += `

<div class="card">

<img src="${p.images[0]}" alt="${p.id}">

<div class="card-content">

<h3>${p.id}</h3>

<p>${p.price}</p>

<a href="property.html?id=${p.id}"
class="details-btn">

View Details

</a>

</div>

</div>

`;

    });

}

/* ==========================================
   Generate Home Page Property Cards
========================================== */

const propertyGrid = document.getElementById("propertyGrid");

if (propertyGrid && typeof properties !== "undefined") {

    propertyGrid.innerHTML = "";

    Object.values(properties).forEach(property => {

        propertyGrid.innerHTML += `

<div class="card">

    <div class="card-image">

        <img src="${property.images[0]}" alt="${property.id}">

        <span class="badge ${property.status.toLowerCase()}">
            ${property.status}
        </span>

        <button
            class="favorite-btn"
            data-id="${property.id}"
            onclick="toggleFavorite('${property.id}')">
            🤍
        </button>

    </div>

    <div class="card-content">

        <h3>
            <span>ID:${property.id}</span>
        </h3>

        <p>📍 ${property.area}</p>

        <p>📍 ${property.areaTelugu}</p>

        <p>📐 ${property.land} / ${property.landTelugu}</p>

        <p>⤴️ ${property.facing} / ${property.facingTelugu}</p>

        <p class="price">${property.price}</p>

        <div class="card-buttons">

            <a href="property.html?id=${property.id}"
               class="details-btn">

               View Details

            </a>

            <a href="https://wa.me/918977201211"
               class="whatsapp-btn">

               WhatsApp

            </a>

        </div>

    </div>

</div>

`;

    });

    updateFavoriteButtons();

}

/* ==========================================
   Generate Home Page Property Cards + Pagination
========================================== */

const propertyGrid = document.getElementById("propertyGrid");
const pagination = document.getElementById("pagination");

const cardsPerPage = 20;
let currentPage = 1;

function displayProperties(page){

    if(!propertyGrid || typeof properties==="undefined") return;

    propertyGrid.innerHTML="";

    const allProperties = Object.values(properties);

    const start = (page-1) * cardsPerPage;
    const end = start + cardsPerPage;

    const pageProperties = allProperties.slice(start,end);

    pageProperties.forEach(property=>{

        propertyGrid.innerHTML += `

<div class="card">

<div class="card-image">

<img src="${property.images[0]}" alt="${property.id}">

<span class="badge ${property.status.toLowerCase()}">
${property.status}
</span>

<button
class="favorite-btn"
data-id="${property.id}"
onclick="toggleFavorite('${property.id}')">

🤍

</button>

</div>

<div class="card-content">

<h3><span>ID:${property.id}</span></h3>

<p>📍 ${property.area}</p>

<p>📍 ${property.areaTelugu}</p>

<p>📐 ${property.land} / ${property.landTelugu}</p>

<p>⤴️ ${property.facing} / ${property.facingTelugu}</p>

<p class="price">${property.price}</p>

<div class="card-buttons">

<a href="property.html?id=${property.id}"
class="details-btn">

View Details

</a>

<a href="https://wa.me/918977201211"
class="whatsapp-btn">

WhatsApp

</a>

</div>

</div>

</div>

`;

    });

    updateFavoriteButtons();

}

function setupPagination(){

    if(!pagination || typeof properties==="undefined") return;

    pagination.innerHTML="";

    const totalPages =
    Math.ceil(Object.keys(properties).length / cardsPerPage);

    for(let i=1;i<=totalPages;i++){

        const btn=document.createElement("button");

        btn.innerText=i;

        if(i===currentPage){

            btn.classList.add("active");

        }

        btn.onclick=function(){

            currentPage=i;

            displayProperties(currentPage);

            setupPagination();

        };

        pagination.appendChild(btn);

    }

}

displayProperties(currentPage);

setupPagination();
