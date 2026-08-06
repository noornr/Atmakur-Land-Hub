const SUPABASE_URL =
"https://soltusisytegacqbjhsh.supabase.co";

const SUPABASE_KEY =
"sb_publishable_stQnnktiByN2OEGK2bURWQ_W3TQb8B_";

const supabaseClient =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

async function testConnection() {

    const { data, error } =
    await supabaseClient
    .from("properties")
    .select("*");

    if(error){

        console.log("Supabase Error:", error);

    }else{

        console.log("Supabase Connected");

        console.log(data);

    }

}

testConnection();
