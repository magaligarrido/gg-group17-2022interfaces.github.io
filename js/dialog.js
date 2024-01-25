"use strict"

let btnOpenDialog = document.querySelectorAll(".i-info-card");
let btnCloseDialog = document.querySelector("#btn-close-dialogo");


btnOpenDialog.forEach(b => b.addEventListener("click", function() {
    let juego = b.getAttribute("id").split("-")[3];
    openDialog(juegos[juego]);
}));
btnCloseDialog.addEventListener("click", closeDialog);

function openDialog(juego) {
    document.querySelector("#dialogo-info-juego").style.width = "80%";
    document.querySelector("#id-titulo-dialogo").innerHTML = juego.titulo;
    document.querySelector("#id-img-dialogo").src = `${juego.img}`;
    document.querySelector("#id-precio-dialogo").innerHTML = juego.precio;
    document.querySelector("#id-descripcion-dialogo").innerHTML = juego.descripcion;
    document.querySelector("#id-anchor-juego-dialogo").href = juego.url;
    if(juego.precio === 'Gratis' || juego.precio === 'Ya compraste este juego'){
        document.querySelector("#id-anchor-juego-dialogo").style.visibility = 'visible';
    } else {
        document.querySelector("#id-anchor-juego-dialogo").style.visibility = 'hidden';
    }
       
    if (juego.estado === 'Agregado al carrito' || juego.estado === 'Agregar al carrito' ){
        document.querySelector("#id-carrito-dialogo").style.visibility = 'visible';
        document.querySelector("#id-carrito-dialogo").style.display = 'block'; 
        document.querySelector("#id-carrito-dialogo").innerHTML = juego.estado;         
    } else{
        document.querySelector("#id-carrito-dialogo").style.visibility = 'hidden'; 
        document.querySelector("#id-carrito-dialogo").style.display = 'none';     
        document.querySelector("#id-carrito-dialogo").innerHTML = "";      
    }
}

function closeDialog() {
    document.querySelector("#dialogo-info-juego").style.width = "0";
}