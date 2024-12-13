**Componentes usados
    componente-tabla
        -Para este componente se seguió los pasos de la clase para la correcta creación del render, ya que ahora no usamos un template, sino únicamente un fectch con un arreglo que recorría los campos de la tabla para irla construyendo
        -Se usa el conocimiento anterior para la creación de slots dinámicos en cada componente
        
    pokemon-gallery
        -Se basa en la creación de la galería ya antes utilizada con la diferencia que se tiene que hacer una doble búsqueda para el arreglo ya que la API utilizada fue: "https://pokeapi.co/api/v2/pokemon?limit=20", y se ve algo así:
        {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        Al llevarnos a otra api, no podíamos colocar la línea:
        image.src = pokemon.image, debido a que la url iba a otra api
        entonces investigando se utiliza la línea: 
        image.src = pokemonData.sprites.front_default --Que nos otorgó la imagen por default de la url ya filtrada con doble fetch

    perfil-usuario:
        Se realiza el contructor como los demás componentes, solo que ahora se declara todo en el connectedCallback, ya que no hay funciones que renderizar, también se usan estilos encapsulados.
        

        Adicional a este último ajuste los componentes son muy simimlares en estructura a los mostrados en clase

        El menú se realizó mediante enlaces, por ello se crean 3 index, uno para el menú y uno por componente, debido a que realizar un componente de menú resultó complejo y fuera de mi dominio actual en la materia, entonces se cumple la condición de menú funcional.

        Por ello se incluye otra hoja de estilos para el footer, los botones y este nuevo index principal que contiene el menú, pero se prueba que los estilos de los componentes están correctamente encapsulados porque esta hoja de estilos no les afectó.

        Conclusión:

        Se aplicaron conocimientos adquiridos en clase e investigación en algunas dificultades presentadas para resolver la tarea, a ppesar de ello puede no estar resuelta correctamente, ya que existen más index de los que debieron, sin embargo, se espera en esta materia seguir aprendiendo para posteriormente superar desafíos que hoy parecen complejos.
        