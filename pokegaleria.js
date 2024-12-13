class PokemonGallery extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        // Creamos el contenedor principal y el estilo
        this.galleryContainer = document.createElement('div');
        this.galleryContainer.classList.add('gallery-container');
        
        this.slotcontainer = document.createElement("div");
        this.slotcontainer.classList.add("slot-container");

        this.styleContainer = document.createElement('style');
        this.styleContainer.textContent = `
        .gallery-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            padding: 20px;
            background-color: #f0f4f8;
        }
        .pokemon-card {
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            background-color: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .pokemon-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }
        .pokemon-card img {
            max-width: 100%;
            border-radius: 50%;
            margin-bottom: 16px;
            border: 3px solid #e0e0e0;
        }
        .pokemon-card h2 {
            font-size: 1rem;
            color: #333333;
            margin: 0;
            margin-bottom: 8px;
        }
        .pokemon-card h5 {
            font-size: 0.9rem;
            color: #555555;
            margin: 0;
        }
        .error-message {
            color: #d32f2f;
            text-align: center;
            font-size: 1rem;
            font-weight: bold;
        }
        .slot-container {
            padding: 16px;
            text-align: center;
            background-color: #f4f4f4;
            border-radius: 8px;
        }
        .slot-container h1 {
            font-size: 1.5rem;
            color: #333;
            margin-bottom: 8px;
        }`;

        //Realizamos la plantilla con un template
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <div class="pokemon-card">
                <img src="" alt="Imagen de Pokémon">
                <h2>Nombre</h2>
            </div>`;

        // Agregamos estilos y contenedor al shadow DOM
        this.shadow.appendChild(this.styleContainer);
        this.shadowRoot.appendChild(this.slotcontainer); 
        this.shadow.appendChild(this.galleryContainer);

         //Creación de slots dinámicos, como lo muestran en clases :
         const slot = document.createElement('slot');
         this.slotcontainer.appendChild(slot);
    }
    connectedCallback(){    //Aquí llamamos a la propiedad src para que nos de el vínculo de la API
        const src = this.getAttribute('src');
        this.fetchData(src);

    }
    fetchData = async (src) =>{     //Con el fetch se obtienen los datos y se los transforma a un arreglo json

        try {
            const response = await fetch(src);
            const data = await response.json();
            const pokemonList = data.results; //Añadimos la lista de imagnes
            this.render(pokemonList);
        } catch (error) {
            console.error('Error en la petición fetch', error);
            this.galleryContainer.innerHTML = '<p class="error-message">No se pudo cargar la galería</p>';
        }
    }

    render = (pokemonList) => {
        this.galleryContainer.innerHTML = ""; // Limpiamos el contenedor

        // Iteramos sobre la lista de Pokémon
        pokemonList.forEach(pokemon => {
            fetch(pokemon.url)
                .then(response => response.json())
                .then(pokemonData => {
                // Clonamos la plantilla y asignamos valores
                const card = this.template.content.cloneNode(true);
                const image = card.querySelector('img');
                const name = card.querySelector('h2');
                

                image.src = pokemonData.sprites.front_default; //Relacionamos con las propiedades de la imagen
                name.textContent = pokemon.name.toUpperCase(); // Relacionamos con el nombre
                


                this.galleryContainer.appendChild(card); // Agregamos la tarjeta al contenedor
           
        });
    });
    }
}

window.customElements.define('pokemon-gallery', PokemonGallery);
