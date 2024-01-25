"use strict"

class Casillero {

    //Constructor de la clase 
    constructor(x, y, img, ctx) {
        this.ocupado = false;
        this.x = x;
        this.y = y;
        this.widthCasilla = 65;
        this.heightCasilla = 65;
        this.img = img;
        this.ctx = ctx;
        this.fichaOcupa = null;
    }

    //Dibuja un tableroSpot
    drawImage(n, ctx) {
        let img = this.img;
        let x = this.x;
        let y = this.y;
        if (n == 0) {
            this.img.onload = function() {
                ctx.drawImage(img, x, y, this.widthCasilla, this.heightCasilla);
            }
        } else {
            ctx.drawImage(img, x, y, this.widthCasilla, this.heightCasilla);
        }
    }
}