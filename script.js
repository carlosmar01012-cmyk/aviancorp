 // ==========================================
// MENÚ PRINCIPAL
// ==========================================

const btnMenu = document.getElementById("btnMenu");
const menuOverlay = document.getElementById("menuOverlay");
const menuCerrar = document.getElementById("menuCerrar");

function cerrarMenu() {
    menuOverlay.classList.remove("activo");
    document.body.style.overflow = "";
}

btnMenu.addEventListener("click", () => {
    menuOverlay.classList.add("activo");
    document.body.style.overflow = "hidden";
});

menuCerrar.addEventListener("click", cerrarMenu);

menuOverlay.querySelectorAll('a[href^="#"]').forEach((enlace) => {
    enlace.addEventListener("click", (e) => {

        const destinoId = enlace.getAttribute("href");

        if (!destinoId || destinoId === "#") {
            return;
        }

        const seccion = document.querySelector(destinoId);

        if (seccion) {
            e.preventDefault();
            cerrarMenu();

            setTimeout(() => {
                seccion.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 150);
        }
    });
});


// ==========================================
// IDA Y VUELTA / SOLO IDA
// ==========================================

const btnIdaVuelta = document.getElementById("btnIdaVuelta");
const btnSoloIda = document.getElementById("btnSoloIda");
const campoRegreso = document.getElementById("campoNuevoRegreso");
const fechaRegreso = document.getElementById("nuevoRegreso");
const campoPasajeros = document.getElementById("campoPasajeros");
campoPasajeros.style.display = "none";
 btnIdaVuelta.addEventListener("click", () => {

    btnIdaVuelta.classList.add("activo");
    btnSoloIda.classList.remove("activo");

    campoRegreso.style.display = "";
    campoPasajeros.style.display = "none";
});

btnSoloIda.addEventListener("click", () => {

    btnSoloIda.classList.add("activo");
    btnIdaVuelta.classList.remove("activo");

    campoRegreso.style.display = "none";
    campoPasajeros.style.display = "";

    fechaRegreso.value = "";
});
// ==========================================
// CONSULTA DE RUTA AÉREA
// ==========================================

const botonConsultar = document.getElementById("botonConsultar");

const nuevoOrigen = document.getElementById("nuevoOrigen");
const nuevoDestino = document.getElementById("nuevoDestino");
const nuevaSalida = document.getElementById("nuevaSalida");
const nuevoRegreso = document.getElementById("nuevoRegreso");

const modalRuta = document.getElementById("modalRuta");
const cerrarModalRutaX = document.getElementById("cerrarModalRutaX");
const cerrarModalRuta = document.getElementById("cerrarModalRuta");
const modalSolicitarCotizacion = document.getElementById("modalSolicitarCotizacion");

const modalRutaSeleccionada = document.getElementById("modalRutaSeleccionada");
const modalFechaSalida = document.getElementById("modalFechaSalida");
const modalFechaRegreso = document.getElementById("modalFechaRegreso");
const modalFilaRegreso = document.getElementById("modalFilaRegreso");


// CÓDIGOS DE AEROPUERTOS
const codigosAeropuertos = {
    pasto: "PSO",
    bogota: "BOG",
    cali: "CLO",
    medellin: "MDE",

    miami: "MIA",
    madrid: "MAD",
    "san-andres": "ADZ",
    cartagena: "CTG",
    cancun: "CUN"
};


// NOMBRES CORTOS PARA EL MODAL
const nombresAeropuertos = {
    pasto: "Pasto",
    bogota: "Bogotá",
    cali: "Cali",
    medellin: "Medellín",

    miami: "Miami",
    madrid: "Madrid",
    "san-andres": "San Andrés",
    cartagena: "Cartagena",
    cancun: "Cancún"
};


// ABRIR RESULTADO
botonConsultar.addEventListener("click", () => {

    const origen = nuevoOrigen.value;
    const destino = nuevoDestino.value;
    const salida = nuevaSalida.value;
    const regreso = nuevoRegreso.value;

    const esSoloIda = btnSoloIda.classList.contains("activo");


    // VALIDACIÓN
    if (!origen || !destino || !salida) {
        alert("Por favor complete el origen, destino y fecha de salida.");
        return;
    }

    if (!esSoloIda && !regreso) {
        alert("Por favor seleccione la fecha de regreso.");
        return;
    }


    // RUTA
    const nombreOrigen = nombresAeropuertos[origen];
    const nombreDestino = nombresAeropuertos[destino];

    const codigoOrigen = codigosAeropuertos[origen];
    const codigoDestino = codigosAeropuertos[destino];

    modalRutaSeleccionada.textContent =
        `${nombreOrigen} (${codigoOrigen}) ➜ ${nombreDestino} (${codigoDestino})`;


    // FECHA DE SALIDA
    modalFechaSalida.textContent = salida;


    // IDA Y VUELTA / SOLO IDA
    if (esSoloIda) {

        modalFilaRegreso.style.display = "none";

    } else {

        modalFilaRegreso.style.display = "flex";
        modalFechaRegreso.textContent = regreso;

    }


    // ABRIR MODAL
    modalRuta.classList.add("activo");
    document.body.style.overflow = "hidden";

});


// FUNCIÓN CERRAR
function cerrarConsultaRuta() {
    modalRuta.classList.remove("activo");
    document.body.style.overflow = "";
}


// X
cerrarModalRutaX.addEventListener("click", cerrarConsultaRuta);


// BOTÓN CERRAR
cerrarModalRuta.addEventListener("click", cerrarConsultaRuta);


// CLIC FUERA DEL CUADRO
modalRuta.addEventListener("click", (e) => {

    if (e.target === modalRuta) {
        cerrarConsultaRuta();
    }

});


// SOLICITAR COTIZACIÓN
modalSolicitarCotizacion.addEventListener("click", () => {

    cerrarConsultaRuta();

});
// Mostrar la fecha solamente después de seleccionarla
[nuevaSalida, nuevoRegreso].forEach(campo => {

    campo.addEventListener("change", () => {
        campo.classList.toggle("fecha-elegida", campo.value !== "");
    });

});
