alert("admin.js loaded");

function test() {
    alert("Button clicked");
}

async function addProperty() {
    alert("addProperty started");

    const property = {
        property_id: document.getElementById("property_id").value,
        price: document.getElementById("price").value,
        area: document.getElementById("area").value,
        area_telugu: document.getElementById("area_telugu").value,
        land: document.getElementById("land").value,
        land_telugu: document.getElementById("land_telugu").value,
        facing: document.getElementById("facing").value,
        facing_telugu: document.getElementById("facing_telugu").value,
        road: document.getElementById("road").value,
        road_telugu: document.getElementById("road_telugu").value,
        description: document.getElementById("description").value,
        description_telugu: document.getElementById("description_telugu").value,
        status: document.getElementById("status").value,
        map: document.getElementById("map").value,
        images: document.getElementById("images").value,
        featured: document.getElementById("featured").checked
    };

    alert("Collected data");
}

const SUPABASE_URL = "https://soltusisytegacqbjhsh.supabase.co";

const SUPABASE_KEY = "sb_publishable_stQnnktiByN2OEGK2bURWQ_W3TQb8B_";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

window.properties = {};

async function loadProperties() {

    const { data, error } = await supabase
        .from("properties")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    window.properties = {};

    data.forEach(p => {

        window.properties[p.property_id] = {

            id: p.property_id,
            price: p.price,
            area: p.area,
            areaTelugu: p.area_telugu,
            land: p.land,
            landTelugu: p.land_telugu,
            facing: p.facing,
            facingTelugu: p.facing_telugu,
            road: p.road,
            roadTelugu: p.road_telugu,
            description: p.description,
            descriptionTelugu: p.description_telugu,
            status: p.status,
            featured: p.featured,
            map: p.map,
            images: ["images/" + p.images]

        };

    });

    

if (typeof displayProperties === "function") {
    displayProperties(1);
}

if (typeof setupPagination === "function") {
    setupPagination();
}

}

window.addEventListener("load", loadProperties);
