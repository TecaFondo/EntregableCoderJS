function  isValidEmail(correo){
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if(regex.test(correo)){
    return true;
  }else{
    //lert("El correo electrónico no es válido");
    return false;
  }
}

/*
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
}*/

//encuestaUsuario();

//encuestaUsuario();


// Obtener el elemento donde se mostrarán los datos
let productosContainer = document.getElementById('productos');

// Cargar los datos del archivo JSON en index.html
fetch('/static/JS/productos.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let productos = data.productos;

    // Recorrer cada prducto y agregarla al HTML
    productos.forEach(function(producto) {
      let nombre = producto.nombre;
      let precio = producto.precio;
      let foto = producto.img;
      let pantalla = producto.pantalla;
      let procesador = producto.procesador;
      let cpu = producto.cpu;
      let grafica = producto.grafica;
      let codigo = producto.codigo;

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
      boton.classList.add = "editar-carrito";
      boton.addEventListener('click', function() {
        let cod_prod = this.dataset.producto; // 'producto' es el nombre del dataset data-producto
        let action = this.dataset.action; // 'action' es el nombre del dataset data-action
        console.log("El codigo es: ", cod_prod, "action: ", action);
        addLocalStorageItem(cod_prod, action);
      })

        // Se asignan los valores a los elementos
        prodNom.textContent = nombre;
        prodPrec.textContent =  precio;
        let imagen = document.createElement('img');
        imagen.src = '../'+foto;
        prodPant.textContent = pantalla+'"';
        prodProc.textContent = procesador;
        prodCpu.textContent = cpu;
        prodGraf.textContent = grafica;
        boton.textContent = "Comprar";
        boton.dataset.action = "add";
        boton.dataset.producto = codigo;

        // Agrega los elementos al contenedor
        productosContainer.appendChild(card);
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

  function validarEncuesta(respuestas){
    let edad = respuestas[0];
    let nombre = respuestas[1];
    let correo = respuestas[2];
    let productoEsperado = respuestas[3];
    let miModal = document.getElementById('encuestaModal');
    let flag = true;

    if(edad != "" && edad != null && (edad >= 0 && edad <= 100)){
      document.getElementById('edad').classList.add('border','border-success');
      console.log(edad);
    }
    else{
      document.getElementById('edad').classList.add('border','border-danger');
      flag = false;
    }
    if(nombre != "" && nombre != null){
      document.getElementById('nombre').classList.add('border','border-success');
      console.log(nombre);
    }
    else{
      document.getElementById('nombre').classList.add('border','border-danger');
      flag = false;
    }
    if(isValidEmail(correo)!=false){
      document.getElementById('correo').classList.add('border','border-success');
      console.log(correo);
    }
    else{
      document.getElementById('correo').classList.add('border','border-danger');
      flag = false;
    }
    if(productoEsperado != "" && productoEsperado != null){
      document.getElementById('productoEsperado').classList.add('border','border-success');
      console.log(productoEsperado);
    }
    else{
      document.getElementById('productoEsperado').classList.add('border','border-danger');
      flag = false;
    }
    if (flag == true){
      miModal.classList.remove('show');
      miModal.style.display = 'none';

      datosUsuario = {
        "edad": edad,
        "correo": correo,
        "productoEsperado": productoEsperado,
        "nombre": nombre,
      };
      console.log(datosUsuario);
      localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
    }
  }

  
  function preguntas(){
    let miModal = document.getElementById('encuestaModal');
    let cerrarModalCruz = document.getElementById('cerrarModalCruz');
    let textoCuerpoModal = document.getElementById('textoCuerpoModal');
    let siguienteModal = document.getElementById('Siguiente') || document.getElementById('enviar');

    textoCuerpoModal.textContent = "¿Qué edad tienes?";
    let edad = document.createElement('input');
    edad.type = "number";
    edad.id = "edad";
    edad.classList.add('form-control');
    edad.classList.add('form-control-sm');
    edad.classList.add('inputModal');
    edad.placeholder = "Ingresa tu edad";
    textoCuerpoModal.appendChild(edad);
    let textocuerpo2 = document.createElement('p');
    textocuerpo2.textContent = "¿Cuál es tu nombre?";
    let nombre = document.createElement('input');
    nombre.type = "text";
    nombre.id = "nombre";
    nombre.classList.add('form-control');
    nombre.classList.add('form-control-sm');
    nombre.classList.add('inputModal');
    nombre.placeholder = "Ingresa tu nombre";
    let textocuerpo3 = document.createElement('p');
    textocuerpo3.textContent = "¿Cuál es tu correo electrónico?";
    textoCuerpoModal.appendChild(textocuerpo2);
    textoCuerpoModal.appendChild(nombre);
    let correo = document.createElement('input');
    correo.type = "email";
    correo.id = "correo";
    correo.classList.add('form-control');
    correo.classList.add('form-control-sm');
    correo.classList.add('inputModal');
    correo.placeholder = "Ingresa tu correo electrónico";
    textoCuerpoModal.appendChild(textocuerpo3);
    textoCuerpoModal.appendChild(correo);
    let textocuerpo4 = document.createElement('p');
    textocuerpo4.textContent = "¿Qué producto esperas encontrar en nuestra tienda?";
    textoCuerpoModal.appendChild(textocuerpo4);
    let productoEsperado = document.createElement('input');
    productoEsperado.type = "text";
    productoEsperado.id = "productoEsperado";
    productoEsperado.classList.add('form-control');
    productoEsperado.classList.add('form-control-sm');
    productoEsperado.classList.add('inputModal');
    productoEsperado.placeholder = "¿Qué producto esperas encontrar en nuestra tienda?";
    textoCuerpoModal.appendChild(productoEsperado);
    siguienteModal.textContent = 'Enviar';
    siguienteModal.id = 'enviar';

    //obtener respuestas desde campos de texto y guardarlas en un arreglo

    siguienteModal.addEventListener('click', function() {
      let respuestas = [];
      respuestas.push(edad.value);
      respuestas.push(nombre.value);
      respuestas.push(correo.value);
      respuestas.push(productoEsperado.value);
      //console.log(respuestas);

      validarEncuesta(respuestas);
    
  }
  )};
  

  document.addEventListener('DOMContentLoaded', function() {
    let cerrarModalBtn = document.getElementById('cerrarModal');
    let miModal = document.getElementById('encuestaModal');
    let cerrarModalCruz = document.getElementById('cerrarModalCruz');
    let textoCuerpoModal = document.getElementById('textoCuerpoModal');
    let siguienteModal = document.getElementById('Siguiente');

    if(cerrarModalBtn){
      cerrarModalBtn.addEventListener('click', function() {
        miModal.classList.remove('show');
        miModal.style.display = 'none';
      });
      
      cerrarModalCruz.addEventListener('click', function() {
        miModal.classList.remove('show');
        miModal.style.display = 'none';
      });

      siguienteModal.addEventListener('click', function() {
        respuestas=preguntas();
      });
    }

  });

  
  if(localStorage.getItem("encuesta") == null){
    window.onload = function() {
      let miModal = document.getElementById('encuestaModal');
      let textoCuerpoModal = document.getElementById('textoCuerpoModal');
      textoCuerpoModal.textContent = "¿Te gustaría contestar una encuesta para mejorar tu experiencia de usuario?";
      localStorage.setItem("encuesta", "true");
      if (miModal) {
        miModal.classList.add('show');
        miModal.style.display = 'block';
      }
      
    };
  }

  let producto= document.getElementById("ProductoCarrito");
  if(producto){
    let carrito = getLocalStorageItem("carrito");
    let carritoContainer = document.getElementById("carritoContainer");
    let total = 0;
    
  }

  