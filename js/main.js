var velocidad = 50,
    cajaElemento = document.getElementById('caja_palabra'),
    juegoElemento = document.getElementById('juego'),
    vidasElemento = document.getElementById('numero_vidas'),
    botonDerrotaElement = document.getElementById('boton_derrota'),
    botonInicioElement = document.getElementById('boton_inicio'),
    palabraElemento = document.getElementById('palabra'),
    puntosElemento = document.getElementById('puntos'),
    alcanzoElFinal = false,
    vidasExtra = 3,
    altura = juegoElemento.scrollHeight,
    intervalId = 0,
    tiempoMovimiento = 1000,
    puntos = 0;
    palabraActual =
        {
            "ingles": "",
            "espanol": "",
            "puntos": 0
        };

var palabras = [
    {
        "ingles": "DOG",
        "espanol": "PERRO",
        "puntos": 1
    },
    {
        "ingles": "SCHOOL",
        "espanol": "ESCUELA",
        "puntos": 5
    },
    {
        "ingles": "GREEN",
        "espanol": "VERDE",
        "puntos": 2
    },
    {
        "ingles": "BED",
        "espanol": "CAMA",
        "puntos": 2
    },
    {
        "ingles": "PENCIL",
        "espanol": "LAPIZ",
        "puntos": 4
    },
    {
        "ingles": "CAT",
        "espanol": "GATO",
        "puntos": 1
    },
    {
        "ingles": "DOOR",
        "espanol": "PUERTA",
        "puntos": 3
    },
    {
        "ingles": "WINDOW",
        "espanol": "VENTANA",
        "puntos": 5
    }
]

botonInicioElement.addEventListener('click', empezarJuego);
botonDerrotaElement.addEventListener('click', empezarJuego);
palabraElemento.addEventListener('input', validarPalabra);

function validarPalabra() {
    console.log("ENTRA A VALIDAR")
    var palabraEscrita = palabraElemento.value.toUpperCase();
    console.log(palabraEscrita)
    console.log(palabraActual.ingles)
    if (palabraEscrita === palabraActual.ingles) {
        agregarPuntos();
        cajaElemento.innerHTML = palabraActual.espanol;
        palabraElemento.setAttribute('disabled', "true");
        clearInterval(intervalId);

        setTimeout(function () {
            siguientePalabra();
        }, 3000);
    }
}

function siguientePalabra( ){
    elegirPalabra();
    cajaElemento.innerHTML = palabraActual.ingles;
    cajaElemento.style.top = '0px';
    intervalId = window.setInterval(moverCaja, tiempoMovimiento);
    palabraElemento.removeAttribute('disabled')
    palabraElemento.value = "";
    palabraElemento.focus();
}

function agregarPuntos() {
    puntos = puntos + palabraActual.puntos;
    puntosElemento.textContent = 'puntos=' + puntos;
}

function empezarJuego() {
    elegirPalabra();
    cajaElemento.innerHTML = palabraActual.ingles;
    vidasExtra = 3;
    vidasElemento.textContent = 'vidas=' + vidasExtra;
    puntos = 0;
    puntosElemento.textContent = 'puntos=' + puntos;
    botonInicioElement.classList.add("oculto");
    botonDerrotaElement.classList.add("oculto");
    cajaElemento.classList.remove("oculto");
    palabraElemento.removeAttribute('disabled')
    intervalId = window.setInterval(moverCaja, tiempoMovimiento);
    palabraElemento.focus();
}

function moverCaja() {
    if (cajaElemento) {
        var cajaPosicionSuperior = cajaElemento.offsetTop,
            cajaAltura = cajaElemento.offsetHeight,
            nuevaPosicion = cajaPosicionSuperior + velocidad;

        if (nuevaPosicion + cajaAltura < altura && !alcanzoElFinal) {
            cajaElemento.style.top = nuevaPosicion + 'px';
        } else if (nuevaPosicion + cajaAltura >= altura && !alcanzoElFinal) {
            nuevaPosicion = altura - cajaAltura;
            cajaElemento.style.top = nuevaPosicion + 'px';
            alcanzoElFinal = true;
        } else {
            restarVidas();
            cajaElemento.style.top = '0px';
            alcanzoElFinal = false;
        }
    }
}

function mostarLetreroPerder() {
    palabraElemento.setAttribute('disabled', 'true');
    cajaElemento.classList.add("oculto");
    botonDerrotaElement.classList.remove("oculto");
    clearInterval(intervalId);
}

function restarVidas() {
    if (vidasExtra < 1) {
        mostarLetreroPerder();
    } else {
        vidasExtra = vidasExtra - 1;
        vidasElemento.textContent = 'vidas=' + vidasExtra;
    }
}

function elegirPalabra() {
    palabraActual = palabras[Math.floor(Math.random() * palabras.length)];
}