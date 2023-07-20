//Código para agregar productos a carrito, es necesario hacer adaptaciones.
function addLocalStorageItem(productId, action) {
    console.log("User is not authenticated");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

    if (action == 'add') {
        if (carrito[productId] == undefined) {
            carrito[productId] = { 'cantidad': 1 };
        } else {
            carrito[productId]['cantidad'] += 1;
        }
    }

    if (action == 'remove') {
        carrito[productId]['cantidad'] -= 1;

        if (carrito[productId]['cantidad'] <= 0) {
            console.log("Remove Item");
            delete carrito[productId];
        }
    }

    console.log("carrito:", carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload();
}

function getLocalStorageItem(name) {
    let carrito = JSON.parse(localStorage.getItem(name));
    return carrito || {};
}

let carrito = getLocalStorageItem("carrito");

if (Object.keys(carrito).length === 0) {
    carrito = {};
    localStorage.setItem('carrito', JSON.stringify(carrito));
} else {
    console.log(carrito);
}