//Datos de prueba

const videojuegos = [
    {
        id: 1,
        nombre: "Elder Ruing",
        descripcion: "Acción · RPG · PC / PS5 / Xboxn ",
        rating: 4.8,
        imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png"
    },
    {
        id: 2,
        nombre: "God of War",
        descripcion: "Acción · Aventura · PS4 / PS5",
        rating: 4.9,
        imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6a5r.png"
    },
    {


         id: 3,
        nombre: "Zelda: TOTK",
        descripcion: "Aventura · Mundo abierto · Switch",
        rating: 4.7,
        imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co48qj.png"
    },
    {

        id: 4,
        nombre: "Fortnite",
        descripcion: "Battle Royale · Multiplataforma",
        rating: 4.3,
        imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5d.png"
}
];

const grid = document.querySelector('#grid-videojuegos');
//Funciones para pintar las cards
function renderVideojuegos(lista) {
    grid.innerHTML = ''; //Limpiamos el grid antes de renderizar

    lista.forEach((juego) => {

        //Creanos el html de cada card
        const card = document.createElement('article');
        card.className = "bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 flex flex-col";

        //Insertamos el contenido de la card
        card.innerHTML = `
        <img src="${juego.imagen}" 
        alt="${juego.nombre}" 
        class="h-40 w-full object-cover"
        />
        <div class="p-4 flex flex-col gap-2 flex-1">
            <h3 class="text-md font-semibold text-slate-900">${juego.nombre}</h3>
            <p class="text-sm text-slate-500 flex-1">${juego.descripcion}</p>
            <p class="text-sm text-slate-700 flex-1">${juego.rating}</p>
            <button class="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Ver detalle
            </button>
        </div>
        `;

        //Añadimos la card al grid
        grid.appendChild(card);
    })
}

renderVideojuegos(videojuegos);
