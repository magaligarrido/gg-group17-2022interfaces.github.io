"use strict";
//IMAGEN DE FONDO DEL CANVAS

let imageFondo = new Image();
imageFondo.src = "./images/fondo-juego.png";
imageFondo.onload = function() {
    ctx.drawImage(imageFondo, 0, 0, canvas.width, canvas.height);
}



const timer = 100;

//DECLARO VARIABLES
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let widthWindow = window.innerWidth;
let heightWindow = window.innerHeight;
let porsentajeDelWidth = (widthWindow * 80) / 100;
canvas.width = porsentajeDelWidth;
canvas.height = heightWindow - 180;
let cuadrilla = []; //MATRIZ CONTENEDORA DE CASILLEROS
let pilaFichasJ1 = [];
let pilaFichasJ2 = [];
let filas = 4; //NUMERO DE FILAS STANDARD
let imagenCasilla = "./images/piezaTablero.png"; //incia por defecto
let imagenFichaJ1 = "./images/ficha1.png"; // inicia por defecto
let imagenFichaJ2 = "./images/ficha2.png"; // inicia por defecto

let imagenReinicio = new Image();
imagenReinicio.src = "./images/reiniciar.png"; // buscar img de reinicoi

let btnReinicio;

let totalfichas = filas * (filas + 1);
let tablero = new Tablero(canvas, ctx, cuadrilla, filas);
let tiempo;
let intervalo;
let j1 = "Jugador 1";
let j2 = "Jugador 2";
let jugador1 = new Jugador(pilaFichasJ1, ctx, 0, canvas.height, filas, j1);
let jugador2 = new Jugador(pilaFichasJ2, ctx, (canvas.width - 165), canvas.height, filas, j2);
let jugadorDeTurno;
iniciar();
inicializarEventos();


function refactorizarCanvas(e) {
    e.preventDefault();
    let nFilas = document.querySelector("#inp-filas-selected");
    imagenCasilla = document.querySelector('input[name="inp-casillero"]:checked').value;
    imagenFichaJ1 = document.querySelector('input[name="inp-ficha-j1"]:checked').value;
    imagenFichaJ2 = document.querySelector('input[name="inp-ficha-j2"]:checked').value;

    j1 = document.querySelector('input[name="inp-nombre-j1"]').value;
    j2 = document.querySelector('input[name="inp-nombre-j2"]').value;
    filas = nFilas.value;

    //limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tablero.setFilas(filas);
    tablero.ganador = null;
    jugador1.setFilas(filas);
    jugador2.setFilas(filas);

    jugador1.setNombre(j1);
    jugador2.setNombre(j2);



    iniciar();

    closeDialogConfig();
}


function mostrarCantFilas(filas) {
    let x = filas;
    document.querySelector("#value-filas-selected").innerHTML = filas + ' en linea';
}

function decrementarTiempo() {
    if (tiempo > 0) {
        tiempo--;
        actualizar();
    }
}

function mostrarTiempo() {
    if (!tablero.ganador) {
        if (tiempo > 0) {
            let minutes = Math.floor(tiempo / 60);
            let segundos = tiempo % 60;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            segundos = segundos < 10 ? "0" + segundos : segundos;
            ctx.font = "3rem Arial";
            ctx.fillStyle = "#ffffff";
            ctx.fillText(`${minutes} : ${segundos}`, canvas.width / 2 - 80, 40);
        } else {
            finDePartida();
            jugadorDeTurno = null;
        }
    } else {
        ctx.fillText(`¡Gano ${tablero.ganador} !`, canvas.width / 2 - 80, 25);
        jugadorDeTurno = null;

    }
}

function finDePartida() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Se termino el tiempo :( , juego empatado ", canvas.width / 2 - 280, 35);

}

function mostrarJugadorDeTurno() {
    if (jugadorDeTurno) {
        ctx.font = "1.2rem Arial";
        ctx.fillStyle = "#ffffff";

        ctx.fillText(`Juega: ${jugadorDeTurno}`, canvas.width / 2 - 80, calcularFinTabla());

    }
}

function calcularFinTabla() {
    let posicionDebajoTabla = tablero.posicionUltimaFila() + 30;
    return posicionDebajoTabla;
}

function actualizar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageFondo, 0, 0, canvas.width, canvas.height);
    tablero.dibujar(1, ctx);
    jugador1.dibujar(1, ctx);
    jugador2.dibujar(1, ctx);
    btnReinicio.drawImage(1, ctx);
    mostrarTiempo();
    mostrarJugadorDeTurno();
}

function iniciar() {
    jugadorDeTurno = j1;
    ctx.drawImage(imageFondo, 0, 0, canvas.width, canvas.height);
    //INICIACION DEL TABLERO
    tablero.inicializar(imagenCasilla);
    tablero.ultimoMovimiento = null;
    tablero.ganador = null;
    jugador1.inicializar(imagenFichaJ1);
    jugador2.inicializar(imagenFichaJ2);
    tablero.dibujar(0, ctx);
    jugador1.dibujar(0, ctx);
    jugador2.dibujar(0, ctx);

    btnReinicio = new Ficha(canvas.width / 2 + 100, calcularFinTabla() - 22, imagenReinicio, ctx, "btn-reinicio");
    btnReinicio.fichaWidth = 30;
    btnReinicio.fichaHeight = 30;

    btnReinicio.drawImage(0, ctx);
    btnReinicio.selected = false;

    tiempo = timer;
    mostrarTiempo();
    mostrarJugadorDeTurno();

    if (intervalo) {
        clearInterval(intervalo);
    }
    intervalo = setInterval(decrementarTiempo, 1000);


}

//FUNCIONES PARA ABRIR Y CERRAR EL DIALOGO de configuracion
function OpenDialogConfig() {
    document.querySelector(".container-dialog-config").style.width = "80%";
    let nFilas = document.querySelector("#inp-filas-selected");
    //se guardan variables con las selecciones previas a cambiar
    let selectJ1 = document.querySelector('input[name="inp-ficha-j1"]:checked').getAttribute("id");
    let selectJ2 = document.querySelector('input[name="inp-ficha-j2"]:checked').getAttribute("id");

    document.querySelector("#value-filas-selected").innerHTML = nFilas.value + ' en linea';

    let nuevaSeleccionadaJ1 = document.querySelectorAll(".class-inp-ficha");
    nuevaSeleccionadaJ1.forEach(b => b.addEventListener("click", function() {

        let paraCambiar;
        let seleccionado = b.getAttribute("id").split("-");

        if (seleccionado[2] == "j1") {
            seleccionado[2] = "j2";
            paraCambiar = selectJ1.split("-");
            paraCambiar[2] = "j2";
            paraCambiar = paraCambiar.join("-");


        } else if (seleccionado[2] == "j2") {
            seleccionado[2] = "j1";
            paraCambiar = selectJ2.split("-");
            paraCambiar[2] = "j1";
            paraCambiar = paraCambiar.join("-");
        }
        let seleccionContraria = seleccionado.join("-");
        if (document.querySelector(`#${seleccionContraria}`).checked) {
            document.querySelector(`#${seleccionContraria}`).checked = false;
            document.querySelector(`#${paraCambiar}`).checked = true;
        }
        //controlar para que no sean iguales

        //seteo nuevamente el estado anterior
        selectJ1 = document.querySelector('input[name="inp-ficha-j1"]:checked').getAttribute("id");
        selectJ2 = document.querySelector('input[name="inp-ficha-j2"]:checked').getAttribute("id");

    }));

}

function closeDialogConfig() {
    document.querySelector(".container-dialog-config").style.width = "0";
}

//BOTON PARA CONFIGURAR EL CANVAS
let btnConfigurar = document.querySelector(".btn-configurar");
btnConfigurar.addEventListener("click", OpenDialogConfig);
//BOTON PARA CERRAR LA CONFIGURACION
let btnCloseDialogConfig = document.querySelector(".btn-close-dialogo");
btnCloseDialogConfig.addEventListener("click", closeDialogConfig);
//BOTON PARA CONFIMAR CAMBIOS DEL CANVAS
let btnGuardar = document.querySelector("#btn-guardar-configuracion");
btnGuardar.addEventListener("click", refactorizarCanvas);



function inicializarEventos(params) {
    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;
    canvas.onmousemove = mouseMove;
}

function verificarReinicio(e, x, y) {
    let xCursor = e.clientX - x;
    let yCursor = e.clientY - y;
    if (xCursor > btnReinicio.x && xCursor < btnReinicio.x + btnReinicio.fichaWidth && yCursor > btnReinicio.y && yCursor < btnReinicio.y + btnReinicio.fichaHeight) {

        btnReinicio.selected = true;
    }

}

//Verifica qué ficha fue seleccionada cuando el botón del mouse es presionado
function mouseDown() {
    let rect = canvas.getBoundingClientRect();
    verificarReinicio(event, rect.left, rect.top);

    if (jugadorDeTurno == j1) {
        pilaFichasJ1.forEach(f => f.verificarSelect(event, rect.left, rect.top));

    } else if (jugadorDeTurno == j2) {
        pilaFichasJ2.forEach(f => f.verificarSelect(event, rect.left, rect.top));
    }


}

//Verifica si la ficha puede colocarse a partir del lugar donde el botón del mouse es soltado 
function mouseUp() {
    if (btnReinicio.selected) {
        iniciar();
        return;
    } else if (jugadorDeTurno == j1) {

        pilaFichasJ1.forEach(f => tablero.verificarCasillero(f, event, canvas.offsetLeft));
        if (tablero.ultimoMovimiento == j1) {
            jugadorDeTurno = j2;
        }
    } else if (jugadorDeTurno == j2) {
        pilaFichasJ2.forEach(f => tablero.verificarCasillero(f, event, canvas.offsetLeft));
        if (tablero.ultimoMovimiento == j2) {
            jugadorDeTurno = j1;
        }
    }


}

//Mueve la ficha siguiendo la trayectoria del mouse
function mouseMove() {
    if (pilaFichasJ1) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        pilaFichasJ1.forEach(f => f.actualizarPos(x, y));
        pilaFichasJ2.forEach(f => f.actualizarPos(x, y));
        actualizar();

    }
}