console.log("Code Power está funcionando correctamente 🎮"); 

// 1. Efecto en la consola al hacer clic en los juegos
const botonesJuego = document.querySelectorAll(".boton-juego"); 

botonesJuego.forEach(function(boton) {
boton.addEventListener("click", function() {
console.log("Abriendo juego...");
});
}); 

// 2. Efecto de sombra en el menú al hacer scroll
const encabezado = document.querySelector(".encabezado"); 

if (encabezado) {
window.addEventListener("scroll", function() {
if (window.scrollY > 50) {
encabezado.style.boxShadow = "0 5px 15px rgba(100, 70, 130, 0.15)";
} else {
encabezado.style.boxShadow = "0 3px 12px rgba(100, 70, 130, 0.10)";
}
});
} 

// 3. Cambiar cursor a las tarjetas interactivas
const tarjetas = document.querySelectorAll(".juego-card, .integrante, .tecnologia"); 

tarjetas.forEach(function(tarjeta) {
tarjeta.addEventListener("mouseenter", function() {
tarjeta.style.cursor = "pointer";
});
}); 

// 4. Mensaje de bienvenida
window.addEventListener("load", function() {
console.log("¡Bienvenidos a Code Power! 💜");
});
