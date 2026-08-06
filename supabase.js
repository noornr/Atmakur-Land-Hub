alert("admin.js loaded");

const SUPABASE_URL = "https://soltusisytegacqbjhsh.supabase.co";

const SUPABASE_KEY = "PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function addProperty() {

    const property = {

        property_id: document.getElementById("property_id").value.trim(),

        price: document.getElementById("price").value.trim(),

        area: document.getElementById("area").value.trim(),

        area_telugu: document.getElementById("area_telugu").value.trim(),

        land: document.getElementById("land").value.trim(),

        land_telugu: document.getElementById("land_telugu").value.trim(),

        facing: document.getElementById("facing").value.trim(),

        facing_telugu: document.getElementById("facing_telugu").value.trim(),

        road: document.getElementById("road").value.trim(),

        road_telugu: document.getElementById("road_telugu").value.trim(),

        description: document.getElementById("description").value.trim(),

        description_telugu: document.getElementById("description_telugu").value.trim(),

        status: document.getElementById("status").value,

        map: document.getElementById("map").value.trim(),

        images: document.getElementById("images").value.trim(),

        featured: document.getElementById("featured").checked

    };

    console.log(property);

    const { error } = await supabase
        .from("properties")
        .insert([property]);

    if (error) {

        console.error(error);

        alert("Error: " + error.message);

        return;

    }

    alert("Property Added Successfully!");

    location.reload();

}
