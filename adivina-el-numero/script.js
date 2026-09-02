* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #eee5ff, #e4f2ff, #ffe8f5);
    min-height: 100vh;
    color: #333;
}

/* ENCABEZADO */

header {
    width: 100%;
    padding: 20px 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.logo {
    font-size: 25px;
    font-weight: bold;
    color: #7b4bc4;
}

.volver {
    text-decoration: none;
    color: #6b42a8;
    font-weight: bold;
    padding: 10px 18px;
    border-radius: 20px;
    background: #f0e7ff;
    transition: 0.3s;
}

.volver:hover {
    background: #dcc8ff;
    transform: translateY(-2px);
}

/* CONTENIDO */

main {
    min-height: calc(100vh - 140px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
}

.juego {
    width: 100%;
    max-width: 600px;
    background: rgba(255, 255, 255, 0.92);
    padding: 45px;
    border-radius: 25px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(91, 58, 125, 0.15);
}

.icono {
    font-size: 55px;
    margin-bottom: 10px;
}

h1 {
    color: #7144ad;
    font-size: 36px;
    margin-bottom: 12px;
}

.descripcion {
    color: #666;
    font-size: 17px;
    line-height: 1.6;
}

/* INFORMACIÓN */

.informacion {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 30px 0;
}

.informacion div {
    background: #f4edff;
    padding: 15px 30px;
    border-radius: 15px;
    min-width: 130px;
}

.informacion span {
    display: block;
    font-size: 13px;
    color: #777;
    margin-bottom: 5px;
}

.informacion strong {
    color: #7042ad;
    font-size: 20px;
}

/* ZONA DEL JUEGO */

.zona-juego {
    background: #faf8ff;
    border-radius: 20px;
    padding: 30px;
}

label {
    display: block;
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 12px;
    color: #555;
}

input {
    width: 100%;
    padding: 15px;
    border: 2px solid #d9c7f5;
    border-radius: 12px;
    outline: none;
    text-align: center;
    font-size: 20px;
    margin-bottom: 15px;
}

input:focus {
    border-color: #8b5ac7;
}

#btnAdivinar {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 12px;
    background: #7d4fc1;
    color: white;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}

#btnAdivinar:hover {
    background: #673ca5;
    transform: translateY(-2px);
}

.mensaje {
    margin-top: 20px;
    min-height: 25px;
    font-size: 17px;
    font-weight: bold;
    color: #7042ad;
}

/* BOTÓN REINICIAR */

.reiniciar {
    margin-top: 25px;
    padding: 12px 25px;
    border: none;
    border-radius: 20px;
    background: #f1dff0;
    color: #704269;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}

.reiniciar:hover {
    background: #e6c6e2;
}

/* PIE DE PÁGINA */

footer {
    text-align: center;
    padding: 20px;
    color: #777;
    font-size: 14px;
}

/* RESPONSIVE */

@media (max-width: 600px) {

    header {
        padding: 18px 5%;
    }

    .logo {
        font-size: 21px;
    }

    .juego {
        padding: 30px 20px;
    }

    h1 {
        font-size: 29px;
    }

    .informacion {
        gap: 10px;
    }

    .informacion div {
        padding: 12px 15px;
        min-width: 110px;
    }
}
