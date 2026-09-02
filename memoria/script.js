/* =====================================
   CODE POWER
   JUEGO DE MEMORIA
===================================== */


/* ================================
   ELEMENTOS DEL HTML
================================ */

const tablero = document.getElementById("tablero");

const movimientosTexto =
    document.getElementById("movimientos");

const parejasTexto =
    document.getElementById("parejas");

const tiempoTexto =
    document.getElementById("tiempo");

const botonReiniciar =
    document.getElementById("reiniciar");

const mensajeVictoria =
    document.getElementById("mensajeVictoria");

const resultado =
    document.getElementById("resultado");

const jugarOtraVez =
    document.getElementById("jugarOtraVez");



/* ================================
   EMOJIS DE LAS CARTAS
================================ */

const simbolos = [
    "🍓",
    "🍓",

    "🍕",
    "🍕",

    "🎧",
    "🎧",

    "🌸",
    "🌸",

    "🦋",
    "🦋",

    "🍫",
    "🍫",

    "🎮",
    "🎮",

    "⭐",
    "⭐"
];



/* ================================
   VARIABLES
================================ */

let cartasVolteadas = [];

let parejasEncontradas = 0;

let movimientos = 0;

let tiempo = 0;

let intervalo;

let juegoBloqueado = false;

let juegoIniciado = false;



/* ================================
   MEZCLAR CARTAS
================================ */

function mezclarCartas(array) {

    return array.sort(
        () => Math.random() - 0.5
    );

}



/* ================================
   CREAR TABLERO
================================ */

function crearTablero() {

    tablero.innerHTML = "";

    cartasVolteadas = [];

    parejasEncontradas = 0;

    movimientos = 0;

    tiempo = 0;

    juegoBloqueado = false;

    juegoIniciado = false;


    clearInterval(intervalo);


    actualizarInformacion();


    const cartasMezcladas =
        mezclarCartas([...simbolos]);


    cartasMezcladas.forEach(
        function(simbolo, indice) {

            const carta =
                document.createElement("div");

            carta.classList.add("carta");


            carta.innerHTML = `

                <div class="carta-contenido">

                    <div class="carta frente">
                        ${simbolo}
                    </div>

                    <div class="carta atras">
                        ?
                    </div>

                </div>

            `;


            carta.dataset.simbolo =
                simbolo;

            carta.dataset.indice =
                indice;


            carta.addEventListener(
                "click",
                voltearCarta
            );


            tablero.appendChild(carta);

        }
    );

}



/* ================================
   VOLTEAR CARTA
================================ */

function voltearCarta() {

    if (juegoBloqueado) {
        return;
    }


    if (
        this.classList.contains("volteada") ||
        this.classList.contains("encontrada")
    ) {
        return;
    }


    if (!juegoIniciado) {

        iniciarTiempo();

        juegoIniciado = true;

    }


    this.classList.add("volteada");


    cartasVolteadas.push(this);


    if (cartasVolteadas.length === 2) {

        movimientos++;

        actualizarInformacion();

        comprobarPareja();

    }

}



/* ================================
   COMPROBAR PAREJA
================================ */

function comprobarPareja() {

    juegoBloqueado = true;


    const carta1 =
        cartasVolteadas[0];

    const carta2 =
        cartasVolteadas[1];


    const sonIguales =
        carta1.dataset.simbolo ===
        carta2.dataset.simbolo;


    if (sonIguales) {

        parejaCorrecta(
            carta1,
            carta2
        );

    } else {

        parejaIncorrecta(
            carta1,
            carta2
        );

    }

}



/* ================================
   PAREJA CORRECTA
================================ */

function parejaCorrecta(
    carta1,
    carta2
) {

    setTimeout(function() {

        carta1.classList.add(
            "encontrada"
        );

        carta2.classList.add(
            "encontrada"
        );


        carta1.classList.remove(
            "volteada"
        );

        carta2.classList.remove(
            "volteada"
        );


        parejasEncontradas++;


        actualizarInformacion();


        cartasVolteadas = [];

        juegoBloqueado = false;


        comprobarVictoria();

    }, 500);

}



/* ================================
   PAREJA INCORRECTA
================================ */

function parejaIncorrecta(
    carta1,
    carta2
) {

    setTimeout(function() {

        carta1.classList.remove(
            "volteada"
        );

        carta2.classList.remove(
            "volteada"
        );


        cartasVolteadas = [];

        juegoBloqueado = false;

    }, 900);

}



/* ================================
   ACTUALIZAR INFORMACIÓN
================================ */

function actualizarInformacion() {

    movimientosTexto.textContent =
        movimientos;


    parejasTexto.textContent =
        parejasEncontradas + " / 8";


    tiempoTexto.textContent =
        tiempo + " s";

}



/* ================================
   TEMPORIZADOR
================================ */

function iniciarTiempo() {

    intervalo =
        setInterval(function() {

            tiempo++;

            tiempoTexto.textContent =
                tiempo + " s";

        }, 1000);

}



/* ================================
   COMPROBAR VICTORIA
================================ */

function comprobarVictoria() {

    if (parejasEncontradas === 8) {

        clearInterval(intervalo);


        setTimeout(function() {

            resultado.textContent =
                "Movimientos: " +
                movimientos +
                " | Tiempo: " +
                tiempo +
                " segundos";


            mensajeVictoria.classList.add(
                "mostrar"
            );

        }, 500);

    }

}



/* ================================
   REINICIAR
================================ */

botonReiniciar.addEventListener(
    "click",
    function() {

        crearTablero();

    }
);



/* ================================
   JUGAR OTRA VEZ
================================ */

jugarOtraVez.addEventListener(
    "click",
    function() {

        mensajeVictoria.classList.remove(
            "mostrar"
        );

        crearTablero();

    }
);



/* ================================
   INICIAR JUEGO
================================ */

crearTablero();


console.log(
    "Juego de memoria cargado correctamente 🧠"
);
