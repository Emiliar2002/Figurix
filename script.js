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


/*TOMA LOS PRODUCTOS DE productos.json. MUESTRA LA IMAGEN SOLO ACCEDIENDO A LA PROPIEDAD IMAGEN DEL OBJETO PRODUCTO, MUESTRA SU NOMBRE Y PARAMETROS DE LA MISMA FORMA
Y SU ID LO METE EN UN ONCLICK QUE EJECUTA LA FUNCION anadirAlCarrito TOMANDO EL ID COMO PARAMETRO. TODOS LOS OBJETOS DEL JSON SON ALMACENADOS EN EL ARRAY figuras*/
function mostrarProductos() {
    fetch('./productos.json')
        .then(res => res.json())
        //MOSTRAR PRODUCTOS
        .then(productos => {
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

/*SI EL CARRITO DEL STORAGE ES UN ARRAY, CARRITO GUARDA LOS DATOS DEL STORAGE Y NOTIFICA AL USUARIO.*/

function renderCarrito() {
    if (Array.isArray(carritoLS)) {
        carrito = carritoLS
        notyf.success('Su compra sin procesar fue cargada en el carrito exitosamente.');
    }
}


/*SECCION DEL CARRITO*/


/*CLICKEAR EL BOTON DE COMPRAR*/

comprar.addEventListener("click", () => {
    carrito.length === 0 ? notyf.error('Debe seleccionar al menos un producto para proceder con la compra.') : comprarCarrito();
})

function comprarCarrito() {
    carritoProductos.innerHTML = ""
    notyf.success('¡Muchas gracias por su compra!');
    carrito = []
    localStorage.clear()
    for (Figura of figuras) {
        Figura.cantidad = 0
    }
    actualizarCarrito()
    abrirOCerrarCarrito()
}



/*CLICKEAR EL BOTON DE VACIAR*/
vaciar.addEventListener("click", () => {
    carrito.length === 0 ? notyf.error('¡El carrito ya estaba vacio!') : vaciarCarrito();
})

function vaciarCarrito() {
    carritoProductos.innerHTML = ""
    carrito = []
    localStorage.clear()
    actualizarCarrito()
    for (Figura of figuras) {
        Figura.cantidad = 0
    }
    notyf.success('El carrito fue limpiado correctamente.');
}


/*CLICKEAR ICONO DEL CARRITO*/
carritoIcono.addEventListener("click", () => abrirOCerrarCarrito())

/*SI EL CARRITO ESTA OCULTO, AL CLICKEAR EL ICONO SE ABRE. SI EL CARRITO SE ESTÁ MOSTRANDO, CLICKEAR EL ÍCONO DE VUELTA LO OCULTA.*/
function abrirOCerrarCarrito() {
    if (carritoAbierto === false) {
        productosCard.style.display = "block"
        comprar.style.display = "inline-block"
        vaciar.style.display = "inline-block"
        carritoAbierto = true
    } else {
        productosCard.style.display = "none"
        comprar.style.display = "none"
        vaciar.style.display = "none"
        carritoAbierto = false
    }
}

/*CLICKEAR EL BOTON DE CERRAR. USA LA FUNCION ANTERIOR YA QUE CUANDO SE PRESIONE ESTE BOTON EL CARRITO EVIDENTEMENTE SE VA A ESTAR MOSTRANDO, POR LO QUE LO VA A OCULTAR.*/

cerrar.addEventListener("click", () => abrirOCerrarCarrito())

/*BOTON DE AÑADIR AL CARRITO. ITERA ENTRE LAS FIGURAS Y SI ENCUENTRA UNA DE IGUAL ID DE CANTIDAD MAYOR A 0, LA CANTIDAD AUMENTA. DE LO CONTRARIO, 
LA CANTIDAD AUMENTA Y EL OBJETO DE LA FIGURA ES EMPUJADO AL CARRITO. TODO SE GUARDA EN LOCALSTORAGE.*/
function anadirAlCarrito(id) {
    for (Figura of figuras) {
        if (Figura.id === id) {
            if (Figura.cantidad > 0) {
                Figura.cantidad += 1;
            } else {
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

function actualizarCarrito() {
    let total = 0
    for (Figura of carrito) {
        carritoProductos.innerHTML += `<li class="list-group-item">x${Figura.cantidad} ${Figura.nombre} - ${Figura.cantidad * Figura.precio}$</li>`
        total += Figura.cantidad * Figura.precio
    }
    carritoProductos.innerHTML += `<li class="list-group-item">Total: ${total}$</li>`
}


/*EJECUTAR CODIGO*/
mostrarProductos()
renderCarrito()
actualizarCarrito()