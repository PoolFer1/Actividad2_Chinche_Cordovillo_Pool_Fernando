class PerfilUser extends HTMLElement {
    constructor() {
        super();

        // Crear el Shadow DOM
        this.shadow = this.attachShadow({ mode: 'open' });

        // Crear contenedor principal
        this.usercontainer = document.createElement('div');
        this.usercontainer.classList.add('user-container');
        // Crear los estilos
        this.stylecontainer = document.createElement('style');
        this.stylecontainer.textContent = `
            #perfil-usuario {
                background-color: white;
                border: 1px solid #ddd;
                padding: 20px;
                margin-top: 30px;
                display: inline-block;
                text-align: center;
                width: 300px; 
                margin: 30px auto; 
            }

            #perfil-usuario img {
                border-radius: 50%;
                width: 150px;
                height: 150px;
            }

            #perfil-usuario h2 {
                margin-top: 10px;
                color: #333;
            }

            #perfil-usuario p {
                color: #555;
            }
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50vh;
                box-sizing: border-box;
            }
        `;

        // Añadir los estilos al Shadow DOM
        this.shadow.appendChild(this.stylecontainer);
        this.shadow.appendChild(this.usercontainer);
    }

    connectedCallback() {
        this.usercontainer.innerHTML = `
        <div id="perfil-usuario">
            <img src="https://as1.ftcdn.net/v2/jpg/04/56/58/14/1000_F_456581427_5XpGqNqCwLAGwaFFvxVGvnW2teOfJ0ZL.jpg" alt="Imagen de Perfil">
            <h2>Pool Chinche</h2>
            <p><strong>Edad:</strong> 23 años</p>
            <p><strong>Hobbie:</strong> Videojuegos</p>
        </div>
        `;
    }
}


window.customElements.define('perfil-usuario', PerfilUser);
