// Número secreto entre 1 y 100
let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Contador de intentos
let cantidadIntentos = 0;

// Elementos de la página
const numero = document.getElementById("numero");
const btnAdivinar = document.getElementById("btnAdivinar");
const btnReiniciar = document.getElementById("btnReiniciar");
const mensaje = document.getElementById("mensaje");
const intentos = document.getElementById("intentos");

// Función para comprobar el número
function adivinarNumero() {

    const numeroUsuario = Number(numero.value);

    // Comprobar que el número sea válido
    if (numeroUsuario < 1 || numeroUsuario > 100 || numero.value === "") {
        mensaje.textContent = "⚠️ Escribe un número entre 1 y 100.";
        return;
    }

    cantidadIntentos++;
    intentos.textContent = cantidadIntentos;

    // Si el número es correcto
    if (numeroUsuario === numeroSecreto) {

        mensaje.textContent = 
            "🎉 ¡Correcto! Adivinaste el número en " +
            cantidadIntentos + " intento(s).";

        mensaje.classList.add("ganaste");

        numero.disabled = true;
        btnAdivinar.disabled = true;

    } 
    // Si el número es menor
    else if (numeroUsuario < numeroSecreto) {

        mensaje.textContent = "⬆️ El número secreto es mayor.";
        mensaje.classList.remove("ganaste");

    } 
    // Si el número es mayor
    else {

        mensaje.textContent = "⬇️ El número secreto es menor.";
        mensaje.classList.remove("ganaste");
    }

    numero.value = "";
    numero.focus();
}

// Función para reiniciar el juego
function reiniciarJuego() {

    numeroSecreto = Math.floor(Math.random() * 100) + 1;

    cantidadIntentos = 0;

    intentos.textContent = "0";

    mensaje.textContent = 
        "¡Escribe un número para comenzar!";

    mensaje.classList.remove("ganaste");

    numero.disabled = false;
    btnAdivinar.disabled = false;

    numero.value = "";
    numero.focus();
}

// Botón para adivinar
btnAdivinar.addEventListener("click", adivinarNumero);

// Permitir usar la tecla Enter
numero.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        adivinarNumero();
    }

});

// Botón para reiniciar
btnReiniciar.addEventListener("click", reiniciarJuego);
