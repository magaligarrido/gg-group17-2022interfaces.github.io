"use strict"
//CLASE TABLERO\
class Tablero {

    constructor(canvas, ctx, cuadrilla, filas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.cuadrilla = cuadrilla;
        this.filas = filas;
        this.columnasY = filas;
        this.filasX = filas - 1;
        this.ganador = null;
        this.unidadCasillero = 65;
        this.ultimoMovimiento = null;
    }

    setFilas(filas) {
        this.filas = filas;
    }

    inicializar(imagen) {
        //CALCULO DE X e Y INICIALES CON RESPECTO A LA CANTADIDAD DE FILAS
        let xInit = this.calcularInit(this.canvas.width, parseInt(this.filas) + 1);
        let yInit = this.calcularInit(this.canvas.height, this.filas);

        for (let i = 0; i < filas; i++) {
            this.cuadrilla[i] = [];
            for (let j = 0; j <= filas; j++) {
                let x = xInit + (j * (this.unidadCasillero));
                let y = yInit + (i * (this.unidadCasillero));
                let img = new Image();
                img.src = imagen;
                cuadrilla[i][j] = new Casillero(x, y, img, this.ctx);
            }
        }
    }

    dibujar(n, ctx) {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j <= this.filas; j++) {
                cuadrilla[i][j].drawImage(n, ctx);
            }
        }
    }

    calcularInit(medida, filas) {
        let centroCanvas = medida / 2;
        let centroTablero = (filas * this.unidadCasillero) / 2;
        return centroCanvas - centroTablero;
    }
    posicionUltimaFila() {
        let yInicial = this.calcularInit(this.canvas.height, this.filas);
        let yFinal = yInicial + (this.filas * this.unidadCasillero);
        return yFinal;
    }

    lineaHorizontal(i, j) {
        let contador = 0;
        for (let x = 0; x <= this.filas; x++) {
            if (this.cuadrilla[i][x].ocupado && this.cuadrilla[i][x].fichaOcupa.jugador == this.cuadrilla[i][j].fichaOcupa.jugador) {
                contador++;
            } else if (contador === this.filas) {
                return true;
            } else {
                contador = 0;;
            }
        }
        if (contador >= this.filas) {
            return true;
        }
        return false;
    }

    lineaVertical(i, j) {
        if (i === 0) {
            let cumple = false;
            for (let y = 0; y < this.filas; y++) {
                if (this.cuadrilla[y][j].ocupado && this.cuadrilla[y][j].fichaOcupa.jugador == this.cuadrilla[i][j].fichaOcupa.jugador) {
                    cumple = true;
                } else {
                    return false;
                }
            }
            return cumple;
        }
        return false;
    }

    diagonales(i, j) {
        let jugadorActual = this.cuadrilla[i][j].fichaOcupa.jugador;
        if (i === 0) {
            if (j <= 1) { //diagonal de derecha a izquierda 
                for (let x = 0; x <= this.filas - 1; x++) {
                    if (this.cuadrilla[i + x][j + x].fichaOcupa) {
                        if (this.cuadrilla[i + x][j + x].fichaOcupa.jugador != jugadorActual) {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
                return true;

            } else if (j >= (this.filas - 1)) { //diagonal de izquierda a derecha
                for (let x = 0; x <= this.filas - 1; x++) {
                    if ((parseInt(j) - x) >= 0) {
                        if (this.cuadrilla[i + x][j - x].fichaOcupa) {
                            if (this.cuadrilla[i + x][j - x].fichaOcupa.jugador != jugadorActual) {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
                return true;
            }
            return false;
        } else {
            return false;
        }
    }

    verificarJugada(i, j) {
        if (this.lineaHorizontal(i, j)) {
            let ganador = this.cuadrilla[i][j].fichaOcupa.jugador;
            this.ganador = ganador;

        } else if (this.lineaVertical(i, j)) {
            let ganador = this.cuadrilla[i][j].fichaOcupa.jugador;
            this.ganador = ganador;

        } else if (this.diagonales(i, j)) {
            let ganador = this.cuadrilla[i][j].fichaOcupa.jugador;
            this.ganador = ganador;

        }
    }

    verificarCasillero(ficha, e, x) {
        if (!ficha.posicionada && ficha.selected) {
            ficha.selected = false;
            let xCursor = e.clientX - x;
            let dentroDelTablero = false;

            for (let j = 0; j <= this.filas; j++) {

                if (xCursor > this.cuadrilla[0][j].x && xCursor < this.cuadrilla[0][j].x + this.unidadCasillero) {
                    dentroDelTablero = true;
                    let casilleroDisponible = false;
                    let indiceCasilleroDisponible;

                    for (let i = 0; i < this.filas; i++) {
                        if (!this.cuadrilla[i][j].ocupado) {
                            casilleroDisponible = true;
                            indiceCasilleroDisponible = i;
                        }
                    }
                    if (casilleroDisponible) {
                        this.cuadrilla[indiceCasilleroDisponible][j].ocupado = true;
                        ficha.x = this.cuadrilla[indiceCasilleroDisponible][j].x + 7;
                        ficha.y = this.cuadrilla[indiceCasilleroDisponible][j].y + 5;
                        // si era valida la posicion no se mueve mas
                        this.cuadrilla[indiceCasilleroDisponible][j].fichaOcupa = ficha;
                        ficha.posicionada = true;
                        this.ultimoMovimiento = ficha.jugador;
                        this.verificarJugada(indiceCasilleroDisponible, j);
                    } else {
                        ficha.x = ficha.xi;
                        ficha.y = ficha.yi;
                    }
                }
            }
            if (!dentroDelTablero) {
                ficha.x = ficha.xi;
                ficha.y = ficha.yi;

            }
        }
    }
}