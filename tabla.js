class TablaUser extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        //Creamos los elementos como el contenedor de la tabla, los slots y los estilos en el constructor
        this.tablacontainer = document.createElement('div');
        this.tablacontainer.classList.add('tabla-container');

        this.slotcontainer = document.createElement("div");
        this.slotcontainer.classList.add("slot-container");

        this.styletabla = document.createElement('style');      //Aquí van los estilos para las clases que desarrollemos
        this.styletabla.textContent = `
        .tabla-container {
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 1000px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
            }

        .error {
            color: #d9534f; /* Rojo suave */
            font-weight: bold;
            text-align: center;
            margin-top: 20px;
        }

        .empy-alert {
            color: #f0ad4e; /* Naranja */
            font-weight: bold;
            text-align: center;
            margin-top: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
        }

        th {
            background-color: #f4f4f4;
            font-weight: bold;
            color: #333;
        }

        td {
            background-color: #fff;
        }

        tr:nth-child(even) td {
            background-color: #f9f9f9;
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
        }
        `;//Añadimos los estilos, los slots y la tabla al shadow DOM en ese orden
        this.shadowRoot.appendChild(this.styletabla);
        this.shadowRoot.appendChild(this.slotcontainer); 
        this.shadowRoot.appendChild(this.tablacontainer);

        //Creación de slots dinámicos, como lo muestran en clases :
        const slot = document.createElement('slot');
        this.slotcontainer.appendChild(slot);
    
    }
    connectedCallback(){    //Aquí llamamos a la propiedad src para que nos de el vínculo de la API
        const src = this.getAttribute('src');
        this.fetchData(src);

    }
    fetchData = async (src) =>{     //Con el fetch se obtienen los datos y se los transforma a un arreglo json
        try{
            const response = await fetch(src);
            const data = await response.json();
            console.log(`Se obtuvieron ${data.length} datos` ); //Mensaje de prueba aprendido en clase
            this.render(data);

        }catch(error){
            console.log(`Error con la api: ${error}`);
            this.tablacontainer.innerHTML= `<p class ="error">Error al cargar la API</p>`
        }
    }

    render=(data)=>{                //En el render usamos la información recibida y construimos la tabla
        if (data.length==0){
            this.tablacontainer.innerHTML=`
            <p class="empy-alert">No existen datos disponibles</p>`;

        }
//encabezado de la tabla
        let tableHtml = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Street</th>
                        <th>Suite</th>
                        <th>City</th>
                        <th>Zipcode</th>
                        <th>Geo (Lat, Lng)</th>
                    </tr>
                </thead>
                <tbody>
            `;
//cuerpo de la tabla
        data.forEach(dato=>{        //Para colocar los datos dinámicos creamos el iterador dato en otro fetch para recorrer todos los datos 
            tableHtml+=`            
                <tr>
                    <td>${dato.id}</td>
                    <td>${dato.name}</td>
                    <td>${dato.username}</td>
                    <td>${dato.email}</td>
                    <td>${dato.address.street}</td>
                    <td>${dato.address.suite}</td>
                    <td>${dato.address.city}</td>
                    <td>${dato.address.zipcode}</td>
                    <td>${dato.address.geo.lat}, ${dato.address.geo.lng}</td>
                </tr
            `;
        })

//final de la tabla
        tableHtml +=`
        </tbody>
        </table>
        <br>
        `;
        this.tablacontainer.innerHTML=tableHtml;


    }

    }

window.customElements.define('componente-tabla', TablaUser); //unión al index
