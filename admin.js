

alert("admin.js loaded");


async function addProperty() {

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

const { error } = await supabase
.from("properties")
.insert([property]);

if(error){

alert("Error: " + error.message);

}else{

alert("Property Added Successfully!");

location.reload();

}

}
