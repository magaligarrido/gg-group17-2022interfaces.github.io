//CLASE JUGADOR

class Jugador {
    constructor(pila, ctx, ladoJugador, canvasHeight, filas, nombre) {
        this.fichas = ((filas * (filas + 1)) / 2);
        this.pila = pila;
        this.ctx = ctx;
        this.ladoJugador = ladoJugador;
        this.canvasHeight = canvasHeight;
        this.filas = filas;
        this.nombre = nombre;
        this.unidadFicha = 55;
        this.widthLJ = ladoJugador;
    }

    setFilas(filas) {
        this.filas = filas;
        this.fichas = ((this.filas * (parseInt(this.filas) + 1)) / 2);
    }

    getFichas() {
        return this.fichas;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    clear() {
        this.pila = []
    }

    inicializar(imagen) {
        let fichasPorColumna;
        if (this.fichas > 20) {
            fichasPorColumna = (this.fichas / 3);  
            this.ladoJugador = this.widthLJ;            
        } else {
            fichasPorColumna = (this.fichas / 2);
            if (parseInt(this.widthLJ) === 0) {
                this.ladoJugador = this.widthLJ + 80;
            }
        }
        let heightMax = this.canvasHeight / (fichasPorColumna + 1);
        let distancia;
        if (heightMax > this.unidadFicha) {
            distancia = this.unidadFicha
        } else {
            distancia = heightMax;
        }
        //CALCULO DE X e Y INICIALES CON RESPECTO AL JUGADOR
        let xInit = this.ladoJugador;   
        let yInit;    
        if (this.fichas > 22) {
            yInit = 5;      
        } else if (this.fichas > 14){
            yInit = 20;
        } else {
            yInit = 100;
        }

        for (let i = 0; i < this.fichas; i++) {
            let x;
            let y = yInit;
            if (i < fichasPorColumna) {
                x = xInit;
                y = y + (i * distancia);
            } else if (i < fichasPorColumna * 2) {
                x = xInit + this.unidadFicha;
                y = y + ((i - fichasPorColumna) * (distancia));
            } else {
                x = xInit + (this.unidadFicha * 2);
                y = y + ((i - fichasPorColumna * 2) * (distancia));
            }

            let img = new Image();
            img.src = imagen;
            this.pila[i] = new Ficha(x, y, img, this.ctx, this.nombre);
        }
    }

    dibujar(n, ctx) {
        for (let i = 0; i < this.fichas; i++) {
            this.pila[i].drawImage(n, ctx);
        }
    }
    
}