var gtipo,
    gdificultad,
    gid,
    numeroComprobar,
    secciones = [],
    imagenes = [],
    nombre = [],
    textoComprobar = "",
    contenedor = "",
    tiempo_splash = 2500,
    contenedorNomPelicula = "",
    contenedorLetras = "",
    contenedorDato = "",
    contenedorTicket = "",
    contenedorFinal = "",
    ayuda = !1,
    letraAyuda = "",
    arrayCuadros = [],
    arrayLetras = [],
    letrasDevolver = [],
    salidaCuadrados = [],
    pruebas = [],
    componentes = [],
    DatosCuriosos = [];
    
function inicializarReferencias() {
    (secciones[1] = document.getElementById("inicio")),
        (secciones[2] = document.getElementById("categoria")),
        (secciones[3] = document.getElementById("nivel")),
        (secciones[4] = document.getElementById("seleccion")),
        (secciones[5] = document.getElementById("juego")),
        (secciones[6] = document.getElementById("final")),
        (secciones[7] = document.getElementById("instrucciones")),
        (secciones[8] = document.getElementById("creditos")),
        (secciones[9] = document.getElementById("splash")),
        (contenedorNomPelicula = document.getElementById("nomPelicula")),
        (contenedorLetras = document.getElementById("letras")),
        (contenedorDato = document.getElementById("datoCurioso")),
        (contenedorTicket = document.getElementById("cntTicket")),
        (contenedorFinal = document.getElementById("contenedorFinal")),
        (componentes[1] = contenedorLetras),
        (componentes[2] = document.getElementById("pistaImg")),
        (componentes[3] = document.getElementById("abrirAyuda")),
        (componentes[4] = document.getElementById("cntBotonVolver"));
}
function tipoJuego(e) {
    gtipo = 1 == e ? 15 : 0;
}
function cambioDificultad(e) {
    var a = [],
        o = "",
        n = "";
    (n = 0 == e ? ((gdificultad = 0), '<h2 id="dificultadActual">Fácil</h2>') : 1 == e ? ((gdificultad = 5), '<h2 id="dificultadActual">Medio</h2>') : ((gdificultad = 10), '<h2 id="dificultadActual">Difícil</h2>')),
        (a[1] = document.getElementById("lvl1")),
        (a[2] = document.getElementById("lvl2")),
        (a[3] = document.getElementById("lvl3")),
        (a[4] = document.getElementById("lvl4")),
        (a[5] = document.getElementById("lvl5"));
    var i = gtipo + gdificultad;
    document.getElementById("dificultadActual").innerHTML = n;
    for (var r = 1; r <= 5; r++) {
        (contenedor = a[r]), (o = '<img  class ="btn_Selec" src="' + imagenes[i + r] + '"></img>'), (contenedor.innerHTML = o);
    }
}
function cambioNivel(e) {
    nivel = gtipo + gdificultad + e;
    var a = imagenes[nivel],
        o = "";
    (o += '<img class="Ticket" src="img/Ticket.png" alt=""></img>'),
        (o += '<div id="numTicket" class="numTicket">' + localStorage.getItem("puntos") + "</div>"),
        (contenedorTicket.innerHTML = o),
        (contenedor = document.getElementById("pistaImg"));
    (salida = '<img  id ="imgNivel" src="' + a + "\" style= 'width:200px; height:200px;' ></img>"), (contenedor.innerHTML = salida), (numeroComprobar = nivel), repartirPalabras(nivel);
}
function repartirPalabras(e) {
    var a = nombre[e].split("");
    arrayCuadros = shuffle(a);
    for (var o = "", n = 0; n < a.length; n++) (arrayLetras[n] = '<div class="cuadradosLetras block" id="letra' + n + '" onclick="comprobarNivel(' + n + ')">' + arrayCuadros[n] + "</div>"), (o += arrayLetras[n]);
    contenedorLetras.innerHTML = o;
}
function comprobarNivel(e) {
    var a = '<div class="cuadrados block" id="letravalidar' + e + '" ondblclick="regresar()">' + arrayCuadros[e] + "</div>";
    salidaCuadrados.push(a);
    for (var o = "", n = 0; n < salidaCuadrados.length; n++) o += salidaCuadrados[n];
    contenedorNomPelicula.innerHTML = o;
    var i = document.getElementById("letravalidar" + e);
    pruebas.push(i.innerHTML), letrasDevolver.push(e), (arrayLetras[e] = '<div class="cuadradosLetras oculto" id="letra' + e + '" onclick="comprobarNivel(' + e + ')">' + arrayCuadros[e] + "</div>");
    var r = "";
    for (n = 0; n < arrayLetras.length; n++) r += arrayLetras[n];
    (contenedorLetras.innerHTML = r), comprobarCorrecto();
}
function regresar() {
    salidaCuadrados.pop(), pruebas.pop();
    var e = letrasDevolver.pop();
    arrayLetras[e] = '<div class="cuadradosLetras block" id="letra' + e + '" onclick="comprobarNivel(' + e + ')">' + arrayCuadros[e] + "</div>";
    for (var a = "", o = 0; o < salidaCuadrados.length; o++) a += salidaCuadrados[o];
    contenedorNomPelicula.innerHTML = a;
    var n = "";
    for (o = 0; o < arrayLetras.length; o++) n += arrayLetras[o];
    contenedorLetras.innerHTML = n;
}
function comprobarCorrecto() {
    if ((textoComprobar = pruebas.join("")) == nombre[numeroComprobar])
        cambiarSeccion(6), modificarPuntaje(0), crearFinal(), (ayuda = !1), (textoComprobar = ""), (arrayCuadros = []), (arrayLetras = []), (letrasDevolver = []), (pruebas = []);
    else {
        var e = document.getElementById("nomPelicula");
        letrasDevolver.length == arrayCuadros.length ? (e.className = "animated jello ") : (e.className = "");
    }
}
function shuffle(e) {
    var a, o, n;
    for (n = e.length - 1; 0 < n; n--) (a = Math.floor(Math.random() * (n + 1))), (o = e[n]), (e[n] = e[a]), (e[a] = o);
    return e;
}
function cambiarSplash() {
    (secciones[9].className = "splash oculto"), (secciones[1].className = "inicio flex");
}
function cambiarSeccion(e) {
    if (4 == e) {
        for (var a in secciones) secciones[a].classList.remove("flex"), secciones[a].classList.add("oculto");
        secciones[e].classList.remove("oculto"), secciones[e].classList.add("flex"), (arrayCuadros = []), (arrayLetras = []), (letrasDevolver = []), (salidaCuadrados = []), (pruebas = []);
    } else {
        for (var a in secciones) secciones[a].classList.remove("flex"), secciones[a].classList.add("oculto");
        secciones[e].classList.remove("oculto"), secciones[e].classList.add("flex");
    }
    document.getElementById("nomPelicula").innerHTML = "";
}
function botonVolver(e) {
    (ayuda = !1), cambiarSeccion(e);
}
function pedirAyuda() {
    var e = document.getElementById("ventana");
    if (0 == ayuda) {
        (document.getElementById("ayudaContenido").innerHTML =
            '<div class="parrafo"><label id="texto">¿Esta seguro que quiere pedir una ayuda por 15 puntos?</label></div><div class="btnAlerta"><input type="button" id="btnSI" onclick="modificarPuntaje(1)" value="Si" ><input type="button" id="btnNO" onclick="retornar()"value="No" ></div>'),
            e.classList.remove("oculto");
        for (var a = 1; a < componentes.length; a++) componentes[a].classList.add("oculto");
    } else {
        e.classList.remove("oculto");
        for (a = 1; a < componentes.length; a++) componentes[a].classList.add("oculto");
    }
}
function ayudar(e) {
    if (1 == e) {
        var a = ((o = document.getElementById("ayudaContenido")).innerHTML = "");
        (a += '<div class="Parrafo"><label id="texto">La pelicula o personaje empieza por la letra "' + nombre[numeroComprobar].split("")[0] + '"</label></div>'),
            (a += '<div class=BtnAlerta"><input type="button" id="btnOK" onclick="retornar()" value="Ok" ></input></div>'),
            (o.innerHTML = a),
            (ayuda = !0);
    } else {
        var o;
        a = (o = document.getElementById("ayudaContenido")).innerHTML = "";
        (a += '<div class="Parrafo"><label id="texto">"Puntos Insuficientes"</label></div>'), (a += '<div class=BtnAlerta"><input type="button" id="btnOK" onclick="retornar()" value="Ok" ></input></div>'), (o.innerHTML = a);
    }
}
function retornar() {
    document.getElementById("ventana").classList.add("oculto");
    for (var e = 1; e < componentes.length; e++) componentes[e].classList.remove("oculto");
}
function actualizarPuntaje() {
    var e = "";
    (e += '<img class="ticket" src="img/Ticket.png" alt=""></img>'), (e += '<div id="numTicket" class="numTicket">' + localStorage.getItem("puntos") + "</div>"), (contenedorTicket.innerHTML = e);
}
function modificarPuntaje(e) {
    var a,
        o = localStorage.getItem("puntos");
    1 == e ? (15 <= (a = parseInt(o, 10)) ? ((a -= 15), ayudar(1), localStorage.setItem("puntos", a), actualizarPuntaje()) : ayudar(0)) : (a = parseInt(o, 10)) <= 60 && ((a += 3), localStorage.setItem("puntos", a), actualizarPuntaje());
}
function crearFinal() {
    var e = "",
        a = "";
    (e += '<div id="cntTicket2" class="contenedorTicket2"></div>'),
        (e += "<p>¡¡ Correcto !!</p>"),
        (e += '<img id ="imgFinal" src="' + imagenes[numeroComprobar] + '"></img>'),
        (e += '<div id="nomPeliculaFinal"></div>'),
        (e += '<div class="titulo">Sabias que...</div>'),
        (e += '<div id="datoCurioso" class="dato">' + DatosCuriosos[numeroComprobar] + "</div>"),
        (contenedorFinal.innerHTML = e);
    for (var o = document.getElementById("nomPeliculaFinal"), n = document.getElementById("cntTicket2"), i = "", r = 0; r < salidaCuadrados.length; r++) i += salidaCuadrados[r];
    (o.innerHTML = i), (a += '<img class="ticket" src="img/Ticket.png" alt=""></img>'), (a += '<div id="numTicket" class="numTicket">' + localStorage.getItem("puntos") + "</div>"), (n.innerHTML = a);
}
function quitarNombre() {
    salidaCuadrados = [];
}
(window.onload = function () {
    inicializarReferencias(), setTimeout(cambiarSplash, tiempo_splash), null == localStorage.getItem("puntos") && localStorage.setItem("puntos", "15");
}),
    (imagenes[1] = "img/peliculas/facil/aladdin.jpg"),
    (imagenes[2] = "img/peliculas/facil/toystory.jpg"),
    (imagenes[3] = "img/peliculas/facil/jurassicpark.jpg"),
    (imagenes[4] = "img/peliculas/facil/monstersinc.jpg"),
    (imagenes[5] = "img/peliculas/facil/ratatouille.jpg"),
    (imagenes[6] = "img/peliculas/normal/walle.jpg"),
    (imagenes[7] = "img/peliculas/normal/kingkong.jpg"),
    (imagenes[8] = "img/peliculas/normal/mobydick.jpg"),
    (imagenes[9] = "img/peliculas/normal/viernes13.jpg"),
    (imagenes[10] = "img/peliculas/normal/volveralfuturo.jpg"),
    (imagenes[11] = "img/peliculas/dificil/cazafantasmas.jpg"),
    (imagenes[12] = "img/peliculas/dificil/psicosis.png"),
    (imagenes[13] = "img/peliculas/dificil/pulpfiction.jpg"),
    (imagenes[14] = "img/peliculas/dificil/sexandthecity.jpg"),
    (imagenes[15] = "img/peliculas/dificil/taxidriver.jpg"),
    (imagenes[16] = "img/personajes/facil/batman.jpg"),
    (imagenes[17] = "img/personajes/facil/capitanamerica.jpg"),
    (imagenes[18] = "img/personajes/facil/deadpool.jpg"),
    (imagenes[19] = "img/personajes/facil/ironman.jpg"),
    (imagenes[20] = "img/personajes/facil/spiderman.jpg"),
    (imagenes[21] = "img/personajes/normal/blancanieves.jpg"),
    (imagenes[22] = "img/personajes/normal/rocky.jpg"),
    (imagenes[23] = "img/personajes/normal/tintin.jpg"),
    (imagenes[24] = "img/personajes/normal/sherlockholmes.jpg"),
    (imagenes[25] = "img/personajes/normal/venom.jpg"),
    (imagenes[26] = "img/personajes/dificil/amelie.jpg"),
    (imagenes[27] = "img/personajes/dificil/brillantina.jpg"),
    (imagenes[28] = "img/personajes/dificil/dumbo.jpg"),
    (imagenes[29] = "img/personajes/dificil/elreyleon.jpg"),
    (imagenes[30] = "img/personajes/dificil/harry potter.jpg"),
    (nombre[1] = "ALADDIN"),
    (nombre[2] = "TOYSTORY"),
    (nombre[3] = "JURASSICPARK"),
    (nombre[4] = "MONSTERSINC"),
    (nombre[5] = "RATATOUILLE"),
    (nombre[6] = "WALLE"),
    (nombre[7] = "KINGKONG"),
    (nombre[8] = "MOBYDICK"),
    (nombre[9] = "VIERNES13"),
    (nombre[10] = "VOLVERALFUTURO"),
    (nombre[11] = "CAZAFANTASMAS"),
    (nombre[12] = "PSICOSIS"),
    (nombre[13] = "PULPFICTION"),
    (nombre[14] = "SEXANDTHECITY"),
    (nombre[15] = "TAXIDRIVER"),
    (nombre[16] = "BATMAN"),
    (nombre[17] = "CAPITANAMERICA"),
    (nombre[18] = "DEADPOOL"),
    (nombre[19] = "IRONMAN"),
    (nombre[20] = "SPIDERMAN"),
    (nombre[21] = "BLANCANIEVES"),
    (nombre[22] = "ROCKY"),
    (nombre[23] = "TINTIN"),
    (nombre[24] = "SHERLOCKHOLMES"),
    (nombre[25] = "VENOM"),
    (nombre[26] = "AMELIE"),
    (nombre[27] = "BRILLANTINA"),
    (nombre[28] = "DUMBO"),
    (nombre[29] = "ELREYLEON"),
    (nombre[30] = "HARRYPOTTER"),
    (DatosCuriosos[1] = "Robin Williams, quien le dio la voz al Genio, grabó 20 versiones diferentes de cada diálogo en un total de 16 horas."),
    (DatosCuriosos[2] = "El nombre original de la película era You Are A Toy, lo que viene siendo “Tú eres un juguete”."),
    (DatosCuriosos[3] = "Solo se utilizó uno de los robots de dinosaurios en el rodaje al aire libre."),
    (DatosCuriosos[4] = "Sulley tiene 2,320,413 pelos en su cuerpo. Esto fue un reto para Pixar, pues fue el primer personaje que tuvo cada cabello animado."),
    (DatosCuriosos[5] = "Para que se viera más realista, se cocinaron y fotografiaron todos los platos que aparecen en la cinta. Unos 270."),
    (DatosCuriosos[6] = "En la película “Star Wars” aparece WALL-E entre los robots que han secuestrado R2-D2 y C3P-O, el cual sale a verlos cuando éstos llegan."),
    (DatosCuriosos[7] = "Aunque en la pantalla parecía enorme, el King Kong de la primera película en realidad solo levantaba 45 centímetros del suelo."),
    (DatosCuriosos[8] = "El Oxford English Dictionary define supercalifragilisticexpialidocious como: “extraordinariamente bueno; maravilloso”"),
    (DatosCuriosos[9] = "La tasa de niños que se apuntaron a campamentos de verano cayó un 69%, tras el estreno del primer film."),
    (DatosCuriosos[10] = "A pesar de ser una película de ciencia-ficción, la cinta solo tiene 32 escenas con efectos especiales."),
    (DatosCuriosos[11] = "El logotipo de Los cazafantasmas es considerado uno de los veinte logos más reconocibles del mundo junto al de Coca Cola o Superman. Está inspirado en el fantasma Casper."),
    (DatosCuriosos[12] = "El director utilizó solomillos y una variedad de melones para imitar el sonido del apuñalamiento de un cuerpo humano."),
    (DatosCuriosos[13] = "La palabra jod*** (en inglés) se usa 265 veces en la cinta."),
    (DatosCuriosos[14] = "Kim Cattrall rechazó en dos ocasiones interpretar a Samantha. La actriz ha declarado que en un inicio, pensó que el papel era de mamá de alguna de las chicas"),
    (DatosCuriosos[15] = "Scorsese leyó el guión en 1972, pero tuvo que esperar dos años hasta que Columbia dio el visto bueno a la película, protagonizada por De Niro, que había ganado el Oscar por la segunda entrega de El Padrino."),
    (DatosCuriosos[16] = "El nombre de Gotham City proviene del anuncio de una joyería llamada Gotham Jewlers encontrado en la guía telefónica de Nueva York. "),
    (DatosCuriosos[17] = "Capitán América fue presentado al mundo en 1941 en su propio cómic como un símbolo y ejemplo del orgullo estadounidense utilizado para motivar al público en una época de guerra."),
    (DatosCuriosos[18] = "Deadpool es el único personaje capaz de romper la pared invisible imaginaria entre el cómic o la pantalla y la realidad."),
    (DatosCuriosos[19] = "Una de las extravagancias más grandes de Tony Stark en los cómics fue la de adquirir del Gobierno de EEUU la propiedad sobre la famosa Área 51."),
    (DatosCuriosos[20] = "Los padres de Peter, antes de morir, fueron Agentes de Shield. Incluso salvaron la vida a Logan (Wolverine)."),
    (DatosCuriosos[21] = "En Inglaterra fue prohibida en un principio a menores de 16 años porque la horrible bruja intentaba matar a Blancanieves."),
    (DatosCuriosos[22] = "Butkus, su mascota en la película, era su perro en la vida real."),
    (DatosCuriosos[23] = "Shrek es la primera película de animación digital protagonizada por humanos."),
    (DatosCuriosos[24] = "Existe una casa-museo dedicada a la vida del famoso detective. El museo, ubicado en Baker Street, es el segundo lugar más visitado del Reino Unido."),
    (DatosCuriosos[25] = "Ni Samantha, Charlotte o Miranda repitieron algún atuendo a lo largo de la serie. La única que lo hizo fue Carrie, quien utilizó el mismo abrigo de la primera temporada en el último episodio de la serie. "),
    (DatosCuriosos[26] = "La paleta de colores es muy importante en el filme. De acuerdo a Bonetto, cada personaje debía tener su propia paleta. "),
    (DatosCuriosos[27] = "La canción “You’re The One That I Want” fue grabada en tan sólo una tarde. Esta es llegando casi al final del musical y sin duda se convirtió en una de las escenas más clásicas"),
    (DatosCuriosos[28] = "El nombre del circo (visto en un cartel cuando el tren sale de la estación de invierno) es WDP Circus (Walt Disney Productions)."),
    (DatosCuriosos[29] = "Varios animadores de Disney viajaron a África para estudiar la vida de los leones. También trabajaron con estos felinos dentro del estudio de producción."),
    (DatosCuriosos[30] = "Los dementores representan la depresión de la autora J.K. Rowling.");
