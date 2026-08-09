console.log("Atmakur Land Hub Loaded");

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
   Generate Home Page Property Cards + Pagination
========================================== */

const propertyGrid = document.getElementById("propertyGrid");
const pagination = document.getElementById("pagination");

const cardsPerPage = 20;

let currentPage = 1;

let currentFilter = "ALL";

function displayProperties(page){

    if(!propertyGrid || typeof properties==="undefined") return;

    propertyGrid.innerHTML="";

    let allProperties = Object.values(properties);

    /* =========================================================
   ADVANCED FILTER
========================================================= */

const filterAreaValue =
    document.getElementById("filterArea")
    ?.value.toLowerCase().trim() || "";

const belowPriceValue =
    Number(
        document.getElementById("belowPrice")?.value
    ) || 0;

const filterCentsValue =
    Number(
        document.getElementById("filterCents")?.value
    ) || 0;

const filterFacingValue =
    document.getElementById("filterFacing")
    ?.value.toLowerCase().trim() || "";


/* AREA / ROAD */

if(filterAreaValue){

    allProperties = allProperties.filter(property => {

        const area =
            (property.area || "").toLowerCase();

        const road =
            (property.road || "").toLowerCase();

        return (
            area.includes(filterAreaValue) ||
            road.includes(filterAreaValue)
        );

    });

}


/* BELOW PRICE */

if(belowPriceValue > 0){

    allProperties = allProperties.filter(property => {

        const priceMatch =
            String(property.price || "")
            .match(/₹\s?[\d,]+/);

        if(!priceMatch){

            return false;

        }

        const price =
            Number(
                priceMatch[0]
                .replace(/[₹,\s]/g, "")
            );

        return price <= belowPriceValue;

    });

}


/* LAND SIZE */

if(filterCentsValue > 0){

    allProperties = allProperties.filter(property => {

        const landMatch =
            String(property.land || "")
            .match(/[\d.]+/);

        if(!landMatch){

            return false;

        }

        const cents =
            Number(landMatch[0]);

        return cents >= filterCentsValue;

    });

}


/* FACING */

if(filterFacingValue){

    allProperties = allProperties.filter(property => {

        const facing =
            (property.facing || "").toLowerCase();

        return facing.includes(filterFacingValue);

    });

}

const keyword =
document.getElementById("searchInput")
?.value.toLowerCase().trim() || "";

if(keyword){

allProperties = allProperties.filter(property=>{

return (

property.id.toLowerCase().includes(keyword) ||

property.area.toLowerCase().includes(keyword) ||

property.areaTelugu.includes(keyword) ||

property.price.toLowerCase().includes(keyword) ||

property.road.toLowerCase().includes(keyword) ||

property.status.toLowerCase().includes(keyword)

);

});

}

if(currentFilter !== "ALL"){

    allProperties = allProperties.filter(property =>
        property.status === currentFilter
    );

}

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

    let allProperties = Object.values(properties);

if(currentFilter !== "ALL"){

    allProperties = allProperties.filter(property =>
        property.status === currentFilter
    );

}

const totalPages =
Math.ceil(allProperties.length / cardsPerPage);

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


/* ==========================================
   FILTER BUTTONS
========================================== */

document.querySelectorAll(".filter-btn").forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelectorAll(".filter-btn")
        .forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        currentPage = 1;

        displayProperties(currentPage);

        setupPagination();

    });

});



const searchInput =
document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("input",()=>{

currentPage=1;

displayProperties(currentPage);

setupPagination();

});

}

const searchBox =
document.getElementById("searchInput");

if(searchBox){

    searchBox.addEventListener("input",()=>{

        currentPage = 1;

        displayProperties(currentPage);

        setupPagination();

    });

}

/* ==========================================
   DYNAMIC FEATURED PROPERTY
========================================== */

const featuredContainer =
document.getElementById("featuredProperty");

if(featuredContainer && typeof properties !== "undefined"){

    const featured =
    Object.values(properties).find(property => property.featured === true);

    if(featured){

        featuredContainer.innerHTML = `

<div class="featured-card">

    <img
        src="${featured.images[0]}"
        alt="${featured.id}"
        loading="lazy">

    <div class="featured-content">

        <h3>${featured.id}</h3>

        <p>
            <strong>📍 Area:</strong>
            ${featured.area}
        </p>

        <p>
            <strong>📍 ప్రాంతం:</strong>
            ${featured.areaTelugu}
        </p>

        <p>
            <strong>📐 Land:</strong>
            ${featured.land} / ${featured.landTelugu}
        </p>

        <p>
            <strong>💰 Price:</strong>
            ${featured.price}
        </p>

        <a
            href="property.html?id=${featured.id}"
            class="details-btn">

            View Details

        </a>

    </div>

</div>

`;

    }else{

        featuredContainer.style.display = "none";

    }

}

/* ==========================================
   PROPERTY COUNTER
========================================== */

const propertyCount =
document.getElementById("propertyCount");

if(propertyCount && typeof properties !== "undefined"){

    propertyCount.textContent =
        Object.keys(properties).length + "+";

}

/* =========================================================
   ADVANCED PROPERTY FILTER
========================================================= */

const advancedApplyFilter =
    document.getElementById("applyFilter");

const advancedClearFilter =
    document.getElementById("clearFilter");

const advancedFilterArea =
    document.getElementById("filterArea");

const advancedMinPrice =
    document.getElementById("minPrice");

const advancedMaxPrice =
    document.getElementById("maxPrice");

const advancedFilterCents =
    document.getElementById("filterCents");

const advancedFilterFacing =
    document.getElementById("filterFacing");


/* ---------------------------------------------------------
   NORMALIZE TEXT
--------------------------------------------------------- */

function normalizeFilterText(text){

    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

}


/* ---------------------------------------------------------
   APPLY ADVANCED FILTER
--------------------------------------------------------- */

if(advancedApplyFilter){

    advancedApplyFilter.addEventListener("click", function(){

        const area =
            normalizeFilterText(
                advancedFilterArea.value
            );

        const minPrice =
            Number(advancedMinPrice.value) || 0;

        const maxPrice =
            Number(advancedMaxPrice.value) || Infinity;

        const requiredCents =
            Number(advancedFilterCents.value) || 0;

        const facing =
            normalizeFilterText(
                advancedFilterFacing.value
            );


        const propertyCards =
            document.querySelectorAll(".property-card");


        propertyCards.forEach(function(card){

            const cardText =
                normalizeFilterText(
                    card.innerText
                );


            let showCard = true;


            /* ------------------------------------------------
               AREA / ROAD - SMART PARTIAL SEARCH
           ------------------------------------------------ */

       if(area){

         const searchWords =
        area.split(/\s+/).filter(Boolean);

       searchWords.forEach(function(word){

        if(!cardText.includes(word)){

            showCard = false;
 
            }

        });

     }


            /* ------------------------------------------------
               PRICE
            ------------------------------------------------ */

            const priceMatches =
                card.innerText.match(/₹\s?[\d,]+/g);


            if(
                (minPrice > 0 || maxPrice < Infinity) &&
                priceMatches
            ){

                const lastPrice =
                    priceMatches[priceMatches.length - 1]
                        .replace(/[₹,\s]/g, "");


                const propertyPrice =
                    Number(lastPrice);


                if(
                    propertyPrice < minPrice ||
                    propertyPrice > maxPrice
                ){

                    showCard = false;

                }

            }


            /* ------------------------------------------------
               LAND SIZE / CENTS
            ------------------------------------------------ */

            if(requiredCents > 0){

                const centsMatch =
                    card.innerText.match(
                        /(\d+(?:\.\d+)?)\s*Cents?/i
                    );


                if(centsMatch){

                    const propertyCents =
                        Number(centsMatch[1]);


                    if(propertyCents < requiredCents){

                        showCard = false;

                    }

                }else{

                    showCard = false;

                }

            }


            /* ------------------------------------------------
               FACING
            ------------------------------------------------ */

            if(facing){

                if(!cardText.includes(facing)){

                    showCard = false;

                }

            }


            /* ------------------------------------------------
               SHOW / HIDE
            ------------------------------------------------ */

            card.style.display =
                showCard ? "" : "none";

        });


        /* CLOSE POPUP */

        const overlay =
            document.getElementById("filterOverlay");

        if(overlay){

            overlay.classList.remove("show");

        }

    });

}


/* =========================================================
   CLEAR ADVANCED FILTER
========================================================= */

if(advancedClearFilter){

    advancedClearFilter.addEventListener("click", function(){

        advancedFilterArea.value = "";

        advancedMinPrice.value = "";

        advancedMaxPrice.value = "";

        advancedFilterCents.value = "";

        advancedFilterFacing.value = "";


        const propertyCards =
            document.querySelectorAll(".property-card");


        propertyCards.forEach(function(card){

            card.style.display = "";

        });


        const overlay =
            document.getElementById("filterOverlay");


        if(overlay){

            overlay.classList.remove("show");

        }

    });

}

/* =========================================================
   FILTER POPUP OPEN / CLOSE
========================================================= */

const openFilterButton =
    document.getElementById("openFilter");

const closeFilterButton =
    document.getElementById("closeFilter");

const filterPopup =
    document.getElementById("filterOverlay");


/* OPEN FILTER */

if(openFilterButton){

    openFilterButton.addEventListener("click", function(){

        filterPopup.classList.add("show");

    });

}


/* CLOSE FILTER */

if(closeFilterButton){

    closeFilterButton.addEventListener("click", function(){

        filterPopup.classList.remove("show");

    });

}


/* CLOSE WHEN CLICKING OUTSIDE */

if(filterPopup){

    filterPopup.addEventListener("click", function(event){

        if(event.target === filterPopup){

            filterPopup.classList.remove("show");

        }

    });

}
