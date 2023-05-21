/*let nombre = prompt("¿Cuál es tu nombre?");

alert(`Hola ${nombre}, bienvenido!`);
console.log(`Hola ${nombre}, bienvenido!`);

let num1 = parseInt(prompt("Ingrese un número"));
let num2 = parseInt(prompt("Ingrese otro número"));

alert(`La suma de los números es ${num1 + num2}`);
console.log(`La suma de los números es ${num1 + num2}`);

let historia1 = prompt("Ingrese una historia");
let historia2 = prompt("Ingrese otra historia");

console.log(`Ambas historias juntas serían: ${historia1} ${historia2}`);
alert(`Ambas historias juntas serían: ${historia1} ${historia2}`);*/

/*function calcularMundiales(anno_nac, anno_actual){
    let mundiales = 0;
    mundiales= Math.floor((anno_actual - anno_nac) / 4); //Se calcula la cantidad de mundiales vividos.

    if((1938> anno_nac) || (anno_nac < 1949)){ //Se resta 1 a la cantidad de mundiales si el usuario no nació en el periodo de 1938 a 1946.
        mundiales = mundiales - 1;
    }
    return mundiales;
}

function getEdad(){ 
    let edad = 0;
    let mundiales = 0;
    let anno_nac = 0;
    let anno_actual = 0;
    while(anno_nac>2022){ //Se valida que el año de nacimiento sea válido.
        anno_nac = parseInt(prompt("Ingresa un año de nacimiento válido:"));
    }
    anno_nac = prompt("Ingresa tu año de nacimiento:");
    anno_actual = parseInt(new Date().getFullYear()); //Se obtiene el año actual.
    edad = anno_actual - anno_nac; //Se calcula la edad.
    mundiales = calcularMundiales(anno_nac, anno_actual);

    console.log(`Tienes ${edad} años y has vivido ${mundiales} mundiales.`);
    return mundiales; //se retorna la edad.
}
//console.log(getEdad()); //Se llama a la función getEdad() para que se ejecute.
*/


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
        let edad = persona.edad;
        let foto = persona.img;

        // Crear un elemento de párrafo para mostrar los datos
        
        let card = document.createElement('div');
        card.classList.add('card');
        let p = document.createElement('p');
        p.classList.add('card-text');
        let p2 = document.createElement('p');
        p.textContent = nombre;
        p2.textContent = 'Edad: ' + edad;
        let imagen = document.createElement('img');
        imagen.src = foto;
        console.log('persona.imagen '+persona.imagen);
        // Agregar el elemento de párrafo al contenedor
        personasContainer.appendChild(card);
        card.appendChild(imagen);
        card.appendChild(p);
        card.appendChild(p2);
    });
  })
  .catch(function(error) {
    console.log('Error: ' + error);
  });
