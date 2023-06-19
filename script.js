function  isValidEmail(correo){
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if(regex.test(correo)){
    return true;
  }else{
    alert("El correo electrónico no es válido");
    return false;
  }
}

function encuestaUsuario(){
  if(confirm("Hola, apreciamos tu opinión. ¿Desea contestar una encuesta con fin de mejorar la experiencia de usuario?")){

    while(isNaN(edad = prompt("¿Cuál es tu edad?")) || edad <= 0 || edad > 100){
      alert("La edad debe ser un número entre 1 y 100");
    };

    while(isNaN(nombre = prompt("¿Cuál es su nombre?")) == false){
      alert("El nombre no puede ser un número");
      nombre = prompt("¿Cuál es su nombre?");
    };

    while(isValidEmail(correo = prompt("Ingresa tu correo electrónico"))==false);

    while(isNaN(productoEsperado = prompt("¿Qué producto esperas encontrar en nuestra tienda?")) == false){
      if(productoEsperado === ""){
        alert("El producto no puede estar vacío");
      }
      else{
        alert("El producto no puede ser un número");
      }
    };

    datosUsuario = {
      "edad": edad,
      "correo": correo,
      "productoEsperado": productoEsperado
    };

    datpsUsuario = JSON.stringify(datosUsuario);
    localStorage.setItem("datosUsuario", datosUsuario);

    console.log("Datos del usuario");
    console.log(datosUsuario);
    alert(`Gracias por tu tiempo ${nombre}`);
  }
}

encuestaUsuario();

//encuestaUsuario();

// Obtener el elemento donde se mostrarán los datos
let personasContainer = document.getElementById('productos');

// Cargar los datos del archivo JSON
fetch('productos.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let personas = data.personas;

    // Recorrer cada persona y agregarla al HTML
    personas.forEach(function(persona) {
        let nombre = persona.nombre;
        let precio = persona.precio;
        let foto = persona.img;
        let pantalla = persona.pantalla;
        let procesador = persona.procesador;
        let cpu = persona.cpu;
        let grafica = persona.grafica;

        // Crear un elemento de párrafo para mostrar los datos
        let card = document.createElement('div');
        card.classList.add('card'); //Agrega la clase card al div
        let prodNom = document.createElement('p');
        prodNom.classList.add('card-text'); //Agrega la clase card-text al párrafo
        prodNom.classList.add('comparador');//Agrega la clase comparador al párrafo
        let prodPrec = document.createElement('p');
        prodPrec.classList.add('precio');//Agrega la clase precio al párrafo
        let prodPant = document.createElement('p');
        prodPant.classList.add('pantalla');//Agrega la clase pantalla al párrafo
        let prodProc = document.createElement('p');
        prodProc.classList.add('procesador');//Agrega la clase procesador al párrafo
        let prodCpu = document.createElement('p');
        prodCpu.classList.add('cpu');//Agrega la clase cpu al párrafo
        let prodGraf = document.createElement('p');
        prodGraf.classList.add('grafica');//Agrega la clase grafica al párrafo

        //Se genra boton de comprar
        let boton = document.createElement('button');
        boton.classList.add('btn');
        boton.classList.add('btn-primary');
        boton.classList.add('btn-comprar');
        boton.classList.add('comprarComparador');
        

        // Se asignan los valores a los elementos
        prodNom.textContent = nombre;
        prodPrec.textContent =  precio;
        let imagen = document.createElement('img');
        imagen.src = foto;
        prodPant.textContent = pantalla+'"';
        prodProc.textContent = procesador;
        prodCpu.textContent = cpu;
        prodGraf.textContent = grafica;
        boton.textContent = "Comprar";

        // Agrega los elementos al contenedor
        personasContainer.appendChild(card);
        card.appendChild(imagen);
        card.appendChild(prodNom);
        card.appendChild(prodPrec);
        card.appendChild(prodPant);
        card.appendChild(prodProc);
        card.appendChild(prodCpu);
        card.appendChild(prodGraf);
        card.appendChild(boton);


    });
  })
  .catch(function(error) {
    console.log('Error: ' + error);
  });




  //decalracion de funcion preguntar genero

  function preguntarGenero(){
    let genero = prompt("¿Qué géero de música electrónica es tu favorito?");
    if (genero == "house" || genero == "tech house"){ //tienes que agregar los valores que faltan de la misma forma  || es un "or" y && es un "and"
      console.log("Interesante elección") //esto se va a mostrar en la consola
    }
    else{ //este else va a ejecutarse siempre que no se cumpla la condición de arriba
      console.log("No es un género válido"); 
      return preguntarGenero(); //vuelve a preguntar el género (esto es una forma más elegante de hacer un loop)
    }
  }


  //Puedes tener codigo acá arriba
  preguntarGenero(); //esta linea llama a la funcion que acabamos de crear

  // o puedes tener codigo acá abajo