console.log("Atmakur Land Hub Loaded");
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const cards = document.querySelectorAll(".card");

searchButton.addEventListener("click", () => {
    const value = searchInput.value.toLowerCase();

    cards.forEach(card => {
        if (card.innerText.toLowerCase().includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
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
