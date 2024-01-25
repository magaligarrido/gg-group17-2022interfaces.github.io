//CLASE FICHA
"use strict"

class Ficha {
    //Constructor de la clase 
    constructor(x, y, img, ctx, jugador) {
        this.selected = false;
        this.posicionada = false;
        this.x = x;
        this.y = y;
        this.xi = x;
        this.yi = y;

        this.fichaWidth = 55;
        this.fichaHeight = 55;
        this.img = img;
        this.ctx = ctx;
        this.jugador = jugador;
    }

    //Devuelve la coordenada x de la ficha
    getX() {
        return this.x;
    }

    //Devuelve la coordenada y de la ficha
    getY() {
        return this.y;
    }


    //Dibuja una ficha
    drawImage(n, ctx) {

        let img = this.img;
        let x = this.x;
        let y = this.y;
        let xf = this.fichaWidth;
        let yf = this.fichaHeight;
        if (n == 0) {
            this.img.onload = function() {
                ctx.drawImage(img, x, y, xf, yf);
            }
        } else {
            ctx.drawImage(img, x, y, xf, yf);
        }
    }

    //Verifica si en la posición donde fue clickeado el mouse hay una ficha
    verificarSelect(e, x, y) {
        if (!this.selected && !this.posicionada) {

            let xCursor = e.clientX - x;
            let yCursor = e.clientY - y;
            if (xCursor > this.x && xCursor < this.x + this.fichaWidth && yCursor > this.y && yCursor < this.y + this.fichaHeight) {
                this.selected = true;
            }
        }
    }

    //Corrige la posición del mouse para que se desplace la ficha desde el centro  
    actualizarPos(x, y) {
        if (this.selected && !this.posicionada) {
            this.x = x - (this.fichaWidth / 2);
            this.y = y - (this.fichaHeight / 2);

        }

    }
}