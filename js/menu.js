"use strict"

let btnMenu = document.querySelector("#btn-sidebar-menu");
let btnCloseMenu = document.querySelector("#btn-close-menu");

btnMenu.addEventListener("click", openMenu);
btnCloseMenu.addEventListener("click", closeMenu);

function openMenu() {
    document.querySelector("#sidebar-menu").style.display = "block";
    document.querySelector("#btn-close-menu").style.display = "block";
}

function closeMenu(e) {
    e.preventDefault();
    document.querySelector("#sidebar-menu").style.display = "none";
    document.querySelector("#contenido-menu").style.marginLeft = "0";
    document.querySelector("#btn-close-menu").style.display = "none";
}