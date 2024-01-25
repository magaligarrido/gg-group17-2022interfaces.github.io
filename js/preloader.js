"use strict"

function go() {
    let start = Date.now();

    let timer = setInterval(function() {

        let timePassed = Date.now() - start;
        let porcentaje = document.getElementById("id-porcentaje");
        let h2porcentaje = setInterval(function() {
            let porcentajeactual = parseInt(porcentaje.innerHTML.split("%")[0]);
            if (porcentajeactual >= 100) {
                return;
            }
            porcentaje.innerHTML = `${porcentajeactual+1}%`;
        }, 1000);

        if (timePassed > 5000) {
            clearInterval(timer);
            document.querySelector("#id-spin").style.display = "none";

            document.querySelector("#id-div-contenido").style.filter = "inherit";

            return;
        }

    }, 20);
}

go();