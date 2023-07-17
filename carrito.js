//Código para agregar productos a carrito, es necesario hacer adaptaciones.

let updateBtns = document.getElementsByClassName('editar-carrito')

for (let i = 0; i < updateBtns.length; i++) {
    updateBtns[i].addEventListener('click', function() {
        let cod_prod = this.dataset.producto //producto es el nombre del dataset data-producto
        let action = this.dataset.action
        console.log("El codigo es: ", cod_prod, "action: ", action)

        //se obtiene usuario desde context
        let user = this.dataset.usuario
        if (user == 'AnonymousUser') {
            addCookieItem(cod_prod, action)
        } else {
            updateUserOrder(cod_prod, action)
        }
    })
}

function addCookieItem(productId,action){
    console.log("User is not authenticated")

    if(action == 'add'){
        if(carrito[productId] == undefined){
            carrito[productId] = {'cantidad':1}
        }else{
            carrito[productId]['cantidad'] += 1
        }
    }

    if(action == 'remove'){
        carrito[productId]['cantidad'] -= 1

        if(carrito[productId]['cantidad'] <= 0){
            console.log("Remove Item")
            delete carrito[productId];
        }
    }
    console.log("carrito:", carrito)
    document.cookie = 'carrito=' + JSON.stringify(carrito) + ";domain=;path=/"
    location.reload()
    
}



function updateUserOrder(cod_prod, action) {
    console.log('User is logged in, sending data...')

    let url = '/actualizar_carrito/'

    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ 'productId': cod_prod, 'action': action })
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log('data:', data)
            location.reload()
        })
}

function getCookie(name){
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++){
        let cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()){
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}



let carrito = JSON.parse(getCookie("carrito"));

if(carrito == undefined){
    carrito = {};
    document.cookie = 'carrito=' + JSON.stringify(carrito) + ";domain=;path=/"
}else{
    console.log(carrito);
}
