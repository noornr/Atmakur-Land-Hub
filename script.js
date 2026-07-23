console.log("Atmakur Land Hub Loaded");
alert("script.js loaded");

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

const images = [
    "images/property1.jpg",
    "images/property1-2.jpg",
    "images/property1-3.jpg",
    "images/property1-4.jpg"
];

let current = 0;

function showSlide(index){
    document.getElementById("slide").src = images[index];
}

function nextSlide(){
    current = (current + 1) % images.length;
    showSlide(current);
}

function prevSlide(){
    current = (current - 1 + images.length) % images.length;
    showSlide(current);
}
