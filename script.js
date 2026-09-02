/* ==================================
   CODE POWER
   SCRIPT DE LA PÁGINA PRINCIPAL
================================== */


/* MENSAJE EN CONSOLA */

console.log("Code Power está funcionando correctamente 🎮");


/* ==================================
   BOTONES DE LOS JUEGOS
================================== */

const botonesJuego =
    document.querySelectorAll(".boton-juego");


botonesJuego.forEach(function(boton) {

    boton.addEventListener("click", function() {

        console.log("Abriendo juego...");

    });

});


/* ==================================
   EFECTO DEL ENCABEZADO
================================== */

const encabezado =
    document.querySelector(".encabezado");


window.addEventListener("scroll", function() {

    if (window.scrollY > 50) {

        encabezado.style.boxShadow =
            "0 5px 15px rgba(100, 70, 130, 0.15)";

    } else {

        encabezado.style.boxShadow =
            "0 3px 12px rgba(100, 70, 130, 0.10)";

    }

});


/* ==================================
   ANIMACIÓN DE LAS TARJETAS
================================== */

const tarjetas =
    document.querySelectorAll(
        ".juego-card, .integrante, .tecnologia"
    );


tarjetas.forEach(function(tarjeta) {

    tarjeta.addEventListener(
        "mouseenter",
        function() {

            tarjeta.style.cursor = "pointer";

        }
    );

});


/* ==================================
   MENSAJE AL CARGAR
================================== */

window.addEventListener("load", function() {

    console.log(
        "¡Bienvenidos a Code Power! 💜"
    );

});
