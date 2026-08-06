const SUPABASE_URL = "https://soltusisytegacqbjhsh.supabase.co";

const SUPABASE_KEY = "sb_publishable_stQnnktiByN2OEGK2bURWQ_W3TQb8B_";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

let properties = {};

async function loadProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  data.forEach(p => {
    properties[p.property_id] = {
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

  displayProperties(currentPage);
  setupPagination();
}

loadProperties();
