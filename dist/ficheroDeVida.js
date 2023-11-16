var _a;
import { Paises } from "./clases/Paises.js";
let paises = new Paises();
let paisesRecibidos = [];
let div = document.querySelector("#contenido");
/*paises.getDatos("https://restcountries.com/v3.1/region/europe").then(datos => {
    paisesRecibidos = datos
  
    paisesRecibidos.forEach(pais => {
        let h1 = document.createElement("h1")
        h1.innerHTML = `${pais.name.official} - ${pais.capital}`
        div?.appendChild(h1)
    })
}).catch(error=>{//respuesta del error
    let h1= document.createElement("h1")
    h1.innerHTML=error
    div?.appendChild(h1)
})*/
(_a = document.querySelector("#continente")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", () => {
    let h1 = document.querySelector("#error");
    h1.innerHTML = "";
    let selectContinentes = document.querySelector("#continente");
    let selectPaises = document.querySelector("#paises");
    let value = selectContinentes.selectedOptions[0].value;
    if (value === "0") {
        selectPaises.innerHTML = "";
        let option = document.createElement("option");
        option.value = "0";
        option.text = "Seleciona Pais....";
        h1.innerHTML = "Deber seleccionar un continente";
        selectPaises === null || selectPaises === void 0 ? void 0 : selectPaises.appendChild(option);
    }
    paises
        .getDatos("https://restcountries.com/v3.1/region/" +
        selectContinentes.selectedOptions[0].value)
        .then((datos) => {
        selectPaises.innerHTML = "";
        let optionInicial = document.createElement("option");
        optionInicial.value = "0";
        optionInicial.text = "Seleccciona pais...";
        selectPaises === null || selectPaises === void 0 ? void 0 : selectPaises.appendChild(optionInicial);
        datos.forEach((pais) => {
            var _a, _b, _c, _d;
            // (pais) me pongo encima del error y sale corrección rápida
            let option = document.createElement("option");
            option.value = pais.name.common;
            if (((_a = pais.translations) === null || _a === void 0 ? void 0 : _a.spa) === undefined)
                option.text = (_b = pais.name) === null || _b === void 0 ? void 0 : _b.common;
            else
                option.text = (_d = (_c = pais.translations) === null || _c === void 0 ? void 0 : _c.spa) === null || _d === void 0 ? void 0 : _d.common;
            selectPaises === null || selectPaises === void 0 ? void 0 : selectPaises.appendChild(option);
        });
        let btnGeneral = document.querySelector("#generales");
        let btnGeograficos = document.querySelector("#geograficos");
        let btnBanderas = document.querySelector("#banderas");
        let btnTraducciones = document.querySelector("#banderas");
        btnGeneral === null || btnGeneral === void 0 ? void 0 : btnGeneral.addEventListener("click", function () {
            let paisSel = selectPaises.selectedOptions[0]
                .value;
            let contenido = document.querySelector("#contenido");
            let h3Contenido = document.createElement("h3");
            // Encuentra el país correspondiente en los datos
            let paisSeleccionado = datos.find((pais) => pais.name.common === paisSel);
            if (paisSeleccionado) {
                // Accede al nombre común y agrégalo al elemento h1Contenido
                let textoGenerales = `Nombre común: ${paisSeleccionado.name.common} </br>
          Nombre Oficial: ${paisSeleccionado.capital} </br>
          Capital: ${paisSeleccionado.capital} </br>
          Población Total: ${paisSeleccionado.population} </br>`;
                // Limpia el contenido actual antes de agregar el nuevo enlace
                if (contenido) {
                    contenido.innerHTML = "";
                }
                h3Contenido.innerHTML = textoGenerales;
                h3Contenido.style.lineHeight = '2em';
                contenido === null || contenido === void 0 ? void 0 : contenido.appendChild(h3Contenido);
            }
        });
        btnGeograficos === null || btnGeograficos === void 0 ? void 0 : btnGeograficos.addEventListener("click", function () {
            let paisSel = selectPaises.selectedOptions[0]
                .value;
            let contenido = document.querySelector("#contenido");
            let h3Contenido = document.createElement("h3");
            // Encuentra el país correspondiente en los datos
            let paisSeleccionado = datos.find((pais) => pais.name.common === paisSel);
            if (paisSeleccionado) {
                // Accede al nombre común y agrégalo al elemento h1Contenido
                let textoGenerales = `Area: ${paisSeleccionado.area} </br>
          Fronteras: ${paisSeleccionado.borders} </br>
        <a href="${paisSeleccionado.maps.googleMaps}" target="_blank">Google Maps </a></br>
          <a href="${paisSeleccionado.maps.openStreetMaps}" target="_blank"> Open Street Maps</a> </br>`;
                // Limpia el contenido actual antes de agregar el nuevo enlace
                if (contenido) {
                    contenido.innerHTML = "";
                }
                h3Contenido.innerHTML = textoGenerales;
                h3Contenido.style.lineHeight = '2em';
                contenido === null || contenido === void 0 ? void 0 : contenido.appendChild(h3Contenido);
            }
        });
        btnBanderas === null || btnBanderas === void 0 ? void 0 : btnBanderas.addEventListener("click", function () {
            let paisSel = selectPaises.selectedOptions[0]
                .value;
            let contenido = document.querySelector("#contenido");
            let h3Contenido = document.createElement("h3");
            // Encuentra el país correspondiente en los datos
            let paisSeleccionado = datos.find((pais) => pais.name.common === paisSel);
            if (paisSeleccionado) {
                // Accede al nombre común y agrégalo al elemento h1Contenido
                let textoGenerales = `Escudo:  <img src="${paisSeleccionado.coatOfArms.svg}" width="100px" heigth="100px"/></br>
          Bandera:  <img src="${paisSeleccionado.flags.svg}" width="100px" heigth="100px"/> </br>`;
                // Limpia el contenido actual antes de agregar el nuevo enlace
                if (contenido) {
                    contenido.innerHTML = "";
                }
                h3Contenido.innerHTML = textoGenerales;
                h3Contenido.style.lineHeight = '4em';
                contenido === null || contenido === void 0 ? void 0 : contenido.appendChild(h3Contenido);
            }
        });
    });
});