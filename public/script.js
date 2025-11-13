//Datos de prueba
//Seleccion del DOM

const grid = document.querySelector('#grid-videojuegos');
const estadoCarga = document.querySelector('#estado-carga');
const estadoError = document.querySelector('#estado-error');
const imputBusqueda = document.querySelector(
    'input[placeholder="Buscar videojuego..."]'
);

//Local data de videojuegos si la API falla
const videojuegos = [
    {
        title: "Elden Ring",
        thumb:"https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png",
        normalPrice: "$60",
        salePrice: "$45",
        savings: 25
    },
    {
        title: "Zelda: TOTK",
        thumb: "https://images.igdb.com/igdb/image/upload/t_cover_big/co48qj.png",
        normalPrice: "$70",
        salePrice: "$50",
        savings: 28
    },
    {
        title: "Fortnite",
        thumb: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5d.png",
        normalPrice: "$0",
        salePrice: "$0",
        savings: null
    }
];


//Funciones para pintar las cards
function renderVideojuegos(lista) {
    grid.innerHTML = ''; //Limpiamos el grid antes de renderizar

    lista.forEach((juego) => {

        //Extraemos los datos necesarios con fallback
        const titulo = juego.title || juego.external || "Juego";
        const thumb = juego.thumb || juego.thumbnail || "";

        //Precios y ahorros con fallback
        //Usamos ?? para valores nulos o indefinidos
        const normal = juego.normalPrice ?? "_";
        const oferta = juego.salePrice ?? juego.cheapest ?? "_";

        //Ahorro redondeado si existe o null si no existe
        const ahorro = juego.savings ? Math.round(juego.savings) : null;

        //Creanos el html de cada card
        const card = document.createElement('article');
        card.className = "bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 flex flex-col";

        //Insertamos el contenido de la card
        card.innerHTML = `
        <img src="${thumb}" 
        alt="${titulo}" 
        class="h-40 w-full object-cover"
        />
        <div class="p-4 flex flex-col gap-2 flex-1">
            <h3 class="text-md font-semibold text-slate-900">${titulo}</h3>

            <p class="text-sm text-slate-500">
            Precio: ${
                normal && normal !== "_" ? `<s>$${normal}</s>` : "-"
            } 
            ${
                oferta && oferta !== "_" 
                ? ` <strong class="font-semibold text-slate-900">$${oferta}</strong>` : ""
            } 
            ${ ahorro ? ` Ahorro ${ahorro}%` : ""}
            </p>

            <button class="mt-2 w-full bg-slate-900 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            Ver detalle
            </button>
        </div>
        `;

        //Añadimos la card al grid
        grid.appendChild(card);
    })
}

//Cargar y renderizar videojuegos al inicio
//asynic significa que la funcion maneja operaciones asincronas
//asincronicas significa que el codigo puede esperar por resultados de otras operaciones
//como llamadas a APIs  sin bloquear la ejecucion del resto del codigo

async function cargarVideojuegosInicial() {

    estadoCarga.classList.remove('hidden'); 
    estadoError.classList.add('hidden');

    try {
        const url ="https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=20";
        const resp = await fetch(url); //Espera la respuesta de la API
        if (!resp.ok) {
            throw new Error("Error en la respuesta de la API");
        }
        const data = await resp.json(); //Espera la conversion a JSON

        //Esto los guarda en cache
        window._juegosCache = data;
        renderVideojuegos(data);
    } catch (e) {
        console.error("Error al cargar Cheapshark", e);
        estadoError.classList.remove('hidden');
        renderVideojuegos(videojuegos);
    } finally {
        estadoCarga.classList.add('hidden');

      }  
    }
cargarVideojuegosInicial();

