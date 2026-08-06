alert("admin.js loaded");

const SUPABASE_URL = "https://soltusisytegacqbjhsh.supabase.co";

const SUPABASE_KEY = "sb_publishable_stQnnktiByN2OEGK2bURWQ_W3TQb8B_";

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

    const { data, error } = await supabase
    .from("properties")
    .select("*");

if (error) {
    alert("Supabase Error: " + error.message);
    return;
}

alert("Loaded " + data.length + " properties");

    alert("Property Added Successfully!");

    location.reload();

}
