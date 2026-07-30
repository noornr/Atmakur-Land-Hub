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

const images = [
    "images/property1.jpg",
    "images/property1-2.jpg",
    "images/property1-3.jpg",
    "images/property1-4.jpg"
];

let current = 0;

function showSlide(index) {
    document.getElementById("slide").src = images[index];
}

function nextSlide() {
    current = (current + 1) % images.length;
    showSlide(current);
}

function prevSlide() {
    current = (current - 1 + images.length) % images.length;
    showSlide(current);
}
setInterval(nextSlide, 3000);

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


const API_URL = "https://script.google.com/macros/s/AKfycbyHU_YKlWR4l4Z7_QDWmAbNbf6SfgDORFHFBDzuhHK28cV14wvb-WT4B2QEYIiFDXBtdg/exec";

async function loadProperties() {

    const grid = document.getElementById("propertyGrid");

    if (!grid) return;

    try {

        const res = await fetch(API_URL);
        const properties = await res.json();

        grid.innerHTML = "";

        properties.forEach(property => {

            grid.innerHTML += `
            <div class="card">

                <div class="card-image">
                    <img src="${property.Image}" alt="${property.Tittle}">
                    <span class="badge available">${property.Status}</span>
                </div>

                <div class="card-content">

                    <h3>${property.Tittle}</h3>

                    <p>📍 <strong>Area :</strong> ${property.Area}</p>

                    <p>📐 <strong>Land :</strong> ${property["Land Size"]}</p>

                    <p class="price">${property.Price}</p>

                    <a href="${property["Map Link"]}" class="details-btn">
                        View Location
                    </a>

                    <a href="https://wa.me/${property.WhatsApp}" class="whatsapp-btn">
                        WhatsApp
                    </a>

                </div>

            </div>
            `;

        });

    } catch (err) {

        console.log(err);

    }

}

loadProperties();
