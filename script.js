/*DEFINIR VARIABLES*/
const flexContainer = document.getElementById("flexContainer")
let carrito = []
let figuras = []
let carritoLS = JSON.parse(localStorage.getItem("Figura"))
const comprar = document.getElementById("comprar")
const vaciar = document.getElementById("vaciar")
const cerrar = document.getElementById("cerrar")
const productosCard = document.getElementById("productosCard")
const carritoIcono = document.getElementById("carritoIcono")
let carritoAbierto = false
var notyf = new Notyf();


//TOMAR LOS PRODUCTOS DE UN .json
function mostrarProductos(){
    fetch('./productos.json')
    .then(res => res.json())
    //MOSTRAR PRODUCTOS
    .then (productos => {
        productos.forEach((producto) => {
            flexContainer.innerHTML += `<div class="card" style="width: 18rem;">
            <img class="card-img-top" src="images/${producto.imagen}.jpg" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.precio}$</p>
            <a class="btn btn-dark" onclick="anadirAlCarrito(${producto.id})">Añadir al carrito</a>
            </div>
        </div></div>`
        figuras.push(producto)
        })
    })
}


/*CARRITO*/


/*CLICKEAR EL BOTON DE COMPRAR*/
function comprarCarrito(){
    carritoProductos.innerHTML = ""
    notyf.success('¡Muchas gracias por su compra!');
    carrito = []
    localStorage.clear()
    for(Figura of carrito){
        Figura.cantidad = 0
    }
    actualizarCarrito()
    abrirOCerrarCarrito()
}

comprar.addEventListener("click", () => {
    carrito.length === 0 ? notyf.error('Debe seleccionar al menos un producto para proceder con la compra.'):comprarCarrito();
})

/*CLICKEAR EL BOTON DE VACIAR*/
vaciar.addEventListener("click", () => {
    carrito.length === 0 ? notyf.error('¡El carrito ya estaba vacio!'):vaciarCarrito();
})


function vaciarCarrito(){
    carritoProductos.innerHTML = ""
    carrito = []
    localStorage.clear()
    actualizarCarrito()
    for(Figura of figuras){
        Figura.cantidad = 0
    }
    notyf.success('El carrito fue limpiado correctamente.');
}

function abrirOCerrarCarrito(){
    if (carritoAbierto === false){
        productosCard.style.display = "block"
        comprar.style.display = "inline-block"
        vaciar.style.display = "inline-block"
        carritoAbierto = true
    }
    else{
        productosCard.style.display = "none"
        comprar.style.display = "none"
        vaciar.style.display = "none"
        carritoAbierto = false
    }
}

/*CLICKEAR EL BOTON DE CERRAR*/

cerrar.addEventListener("click", () => abrirOCerrarCarrito())

/*CLICKEAR EL ICONO DEL CARRITO*/
carritoIcono.addEventListener("click", () => abrirOCerrarCarrito())


/*BOTON DE AÑADIR AL CARRITO*/
function anadirAlCarrito(id){
    for(Figura of figuras){
        if(Figura.id === id){
            if(Figura.cantidad > 0){
                Figura.cantidad += 1;
            }
            else{
                Figura.cantidad += 1;
                carrito.push(Figura);
            }
            carritoProductos.innerHTML = "";
            notyf.success(`Figura de ${Figura.nombre} añadida al carrito.`);
        }
    }
    localStorage.setItem("Figura", JSON.stringify(carrito))
    actualizarCarrito()
}

/*ACTUALIZAR CARRITO DESPUES DE AÑADIR ALGUN ITEM*/

function actualizarCarrito(){
    let total = 0
    for(Figura of carrito){
        carritoProductos.innerHTML += `<li class="list-group-item">x${Figura.cantidad} ${Figura.nombre} - ${Figura.cantidad * Figura.precio}$</li>`
        total += Figura.cantidad * Figura.precio
    }
    carritoProductos.innerHTML += `<li class="list-group-item">Total: ${total}$</li>`
}

/*SI EL CARRITO DEL STORAGE ES UN ARRAY, CARRITO GUARDA LOS DATOS DEL STORAGE*/

function renderCarrito(){
    if (Array.isArray(carritoLS)){
        carrito = carritoLS
        notyf.success('Su compra sin procesar fue cargada en el carrito exitosamente.');
    }
}


/*EJECUTAR CODIGO*/
mostrarProductos()
renderCarrito()
actualizarCarrito()