console.log("Atmakur Land Hub Loaded");
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const cards = document.querySelectorAll(".property-card");

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
