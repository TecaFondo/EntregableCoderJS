//Código para agregar productos a carrito, es necesario hacer adaptaciones.
function addLocalStorageItem(productId, action) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

    if (action == 'add') {
        if (carrito[productId] == undefined) {
            carrito[productId] = { 'cantidad': 1 };
        } else {
            carrito[productId]['cantidad'] += 1;
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        swal("Producto agregado al carrito", "", "success")
        .then((value) => {
            location.reload();
        });
    }

    if (action == 'remove') {
        if (carrito[productId] && carrito[productId]['cantidad'] > 1) {
            carrito[productId]['cantidad'] -= 1;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            location.reload();
        } else {
            swal("El producto se eliminará del carrito", "", "warning")
            .then((value) => {
                if (value && carrito[productId]) {
                    delete carrito[productId];
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    location.reload();
                }
            });
        }
    }
}



function getLocalStorageItem(name) {
    let carrito = JSON.parse(localStorage.getItem(name));
    return carrito || {};
}

function getLocalStorageTotalItems(){
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    let total = 0;
    for (let key in carrito) {
        total += carrito[key]['cantidad'];
    }
    return total;
}

function getLocalSotrageTotalAmountValue(name) {
    return fetch('../static/JS/productos.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let productos = data.productos;
            //console.log(productos);
            let carrito = JSON.parse(localStorage.getItem(name));
            let total = 0;
            for (let key in carrito) {
                const precioEncontrado = productos.find(producto => producto.codigo === key).precio
                //console.log(precioEncontrado);
                total += carrito[key]['cantidad'] * precioEncontrado.replace(/\D/g, '');
            }
            return total;
        });
}

function getLocalStorageTotalItemsById(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    let total = 0;
    for (let key in carrito) {
        if (key == id) {
            total += carrito[key]['cantidad'];
        }
    }
    return total;
}

function formatearPrecio(valor) {
    return valor.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    });
  }

let carrito = getLocalStorageItem("carrito");

if (Object.keys(carrito).length === 0) {
    carrito = {};
    localStorage.setItem('carrito', JSON.stringify(carrito));
} else {
    //console.log(carrito);
}

//console.log(getLocalStorageTotalItems());
getLocalSotrageTotalAmountValue("carrito")
    .then(function(total) {
        //console.log("Total:", total);
    })
    .catch(function(error) {
        //console.error("Error:", error);
    });