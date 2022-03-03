/*DEFINIR VARIABLES*/
const flexContainer = document.getElementById("flexContainer")
const totalHtml = document.getElementById("total")
let carrito = []
let carritoLS = JSON.parse(localStorage.getItem("Figura"))
const comprar = document.getElementById("comprar")
const vaciar = document.getElementById("vaciar")
const cerrar = document.getElementById("cerrar")
const productosCard = document.getElementById("productosCard")
const carritoIcono = document.getElementById("carritoIcono")




/*CONSTRUCTOR DE FIGURA*/
class Figura{
    constructor(nombre, precio){
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.image = `./images/${nombre.toLowerCase()}.jpg`
        this.id
        this.cantidad = 0
    }
}

/*INVENTARIO*/
const figuras = [

new Figura("Bob esponja", 3000),
new Figura("Puro hueso", 8000), 
new Figura("Chowder", 2000), 
new Figura("Alien X", 2700),
new Figura("Ben 10", 10000),
new Figura("Cristiano Ronaldo", 6340),
new Figura("Meiya", 50000),
new Figura("Umongosaurio", 4000),
new Figura("Messi", 9000),

];



/*MOSTRAR FIGURAS*/
function mostrarFiguras(){
    let id = 0
    for(Figura of figuras){
        Figura.id = id
        flexContainer.innerHTML += `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${Figura.image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${Figura.nombre}</h5>
          <p class="card-text">${Figura.precio}$</p>
          <a href="#" class="btn btn-primary" onclick="anadirAlCarrito(${id})">Añadir al carrito</a>
        </div>
      </div></div>`
      id++
    }
}

/*CARRITO*/


/*CLICKEAR EL BOTON DE COMPRAR*/
function comprarCarrito(){
    carritoProductos.innerHTML = `<li class="list-group-item">¡Muchas gracias!</li>`
    carrito = []
    localStorage.clear()
    for(Figura of figuras){
        Figura.cantidad = 0
    }
}
comprar.addEventListener("click", () => {
    carrito.length === 0 ? carritoProductos.innerHTML = `<li class="list-group-item">Debe seleccionar al menos un producto para comprar.</li>`:comprarCarrito();
})

/*CLICKEAR EL BOTON DE VACIAR*/
vaciar.addEventListener("click", () => {
    carrito.length === 0 ? carritoProductos.innerHTML = `<li class="list-group-item">¡El carrito ya estaba vacio!</li>`:vaciarCarrito();
})

function vaciarCarrito(){
    carritoProductos.innerHTML = ""
    carrito = []
    localStorage.clear()
    actualizarCarrito()
    for(Figura of figuras){
        Figura.cantidad = 0
    }
}

/*CLICKEAR EL BOTON DE CERRAR*/
cerrar.addEventListener("click", () => productosCard.style.display = "none")

/*CLICKEAR EL ICONO DEL CARRITO*/
carritoIcono.addEventListener("click", () => { 
    productosCard.style.display = "block"
    comprar.style.display = "inline-block"
    vaciar.style.display = "inline-block"
})


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
    }
}


/*EJECUTAR CODIGO*/
mostrarFiguras()
renderCarrito()
actualizarCarrito()
