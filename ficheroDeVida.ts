import { Paises } from "./clases/Paises.js";

let paises = new Paises()
let contenido = document.querySelector('#contenido');


document.querySelector("#continente")?.addEventListener("change", () => {
    let h1 = document.querySelector("#error");
    (h1 as HTMLHeadingElement).innerHTML = ""
    let selectContinentes = document.querySelector("#continente")
    let selectPaises = document.querySelector("#paises")
    let value = (selectContinentes as HTMLSelectElement).selectedOptions[0].value;
    if (value === "0") {
        (selectPaises as HTMLSelectElement).innerHTML = "";
        let option = document.createElement("option");
        option.value = "0";
        option.text = "Seleciona Pais....";
        (h1 as HTMLHeadingElement).innerHTML = "Debes seleccionar un continente"
        selectPaises?.appendChild(option)
    }

    paises.getDatos("https://restcountries.com/v3.1/region/" +
        (selectContinentes as HTMLSelectElement).selectedOptions[0].value).then(datos => {
            (selectPaises as HTMLSelectElement).innerHTML = ""
            let optionInicial = document.createElement("option");
            optionInicial.value = "0";
            optionInicial.text = "Seleccciona pais...";
            selectPaises?.appendChild(optionInicial);
            datos.sort((a:any,b:any)=>{
                return a.translations.spa.common.localeCompare(b.translations.spa.common)
                })
            datos.forEach((pais:
                {
                    name: {
                        common: string;
                        official:string;
                    };
                    translations: {
                        spa: {
                            official: string;
                            common: string;
                        };
                        
                    };
                }) => {
                // (pais) me pongo encima del error y sale corrección rápida
                let option = document.createElement("option");
                option.value = pais.name.common;
                if (pais.translations?.spa === undefined)
                    option.text = pais.name?.common;
                else
                    option.text = pais.translations?.spa?.common;
                selectPaises?.appendChild(option)

              });
              

let btnGeneral = document.querySelector('#generales') as HTMLButtonElement;
let btnGeograficos = document.querySelector('#geograficos') as HTMLButtonElement;
let btnBanderas = document.querySelector('#banderas') as HTMLButtonElement;
let btnTraducciones = document.querySelector('#traducciones') as HTMLButtonElement;

btnGeneral?.addEventListener('click', function () {
    let paisSel = (selectPaises as HTMLSelectElement).selectedOptions[0].value;
    let contenido = document.querySelector('#contenido');
    let h3Contenido = document.createElement('h3');

    // Encuentra el país correspondiente en los datos
    let paisSeleccionado = datos.find((pais: any) => pais.name.common === paisSel);

    if (paisSeleccionado) {
        // Combina el nombre común y la capital en un enlace
        let enlace = `Nombre común: ${paisSeleccionado.name.common}</br> Nombre Oficial: ${paisSeleccionado.name.official} </br>
        Capital: ${paisSeleccionado.capital} </br> Población: ${paisSeleccionado.population}`;
        
        // Limpia el contenido actual antes de agregar el nuevo enlace
        limpiarContenido()
        
        // Agrega el nuevo enlace al elemento h1Contenido
        h3Contenido.innerHTML = enlace;
        h3Contenido.style.lineHeight = '2em';
        contenido?.appendChild(h3Contenido);
    }

    
});
btnGeograficos?.addEventListener('click', function () {
    let paisSel = (selectPaises as HTMLSelectElement).selectedOptions[0].value;
    let contenido = document.querySelector('#contenido');
    let h3Contenido = document.createElement('h3');

    // Encuentra el país correspondiente en los datos
    let paisSeleccionado = datos.find((pais: any) => pais.name.common === paisSel);

    if (paisSeleccionado) {
        // Combina el nombre común y la capital en un enlace
        let enlace = `Area: ${paisSeleccionado.area}</br> Frontera: ${paisSeleccionado.borders || 'Es isla o no está disponible la frontera'} </br>
        <a href="${paisSeleccionado.maps.googleMaps}" target="_blank">Google Maps</a> </br> <a href="${paisSeleccionado.maps.openStreetMaps}" target="_blank">Open Street Maps</a>`;
        
        // Limpia el contenido actual antes de agregar el nuevo enlace
        limpiarContenido()
        
        
        // Agrega el nuevo enlace al elemento h1Contenido
        h3Contenido.innerHTML = enlace;
        h3Contenido.style.lineHeight = '2em';
        contenido?.appendChild(h3Contenido);
    }
    
});
btnBanderas?.addEventListener('click', function () {
    let paisSel = (selectPaises as HTMLSelectElement).selectedOptions[0].value;
    let contenido = document.querySelector('#contenido');
    let h3Contenido = document.createElement('h3');

    // Encuentra el país correspondiente en los datos
    let paisSeleccionado = datos.find((pais: any) => pais.name.common === paisSel);

    if (paisSeleccionado) {
        // Combina el nombre común y la capital en un enlace
        let enlace = `Escudo: <img src="${paisSeleccionado.coatOfArms.svg}" width="100px" height="100px" alt="Imagen del escudo de armas" style="margin-right: 50px"/> 
        Bandera: <img src="${paisSeleccionado.flags.svg}" width="100px" height="100px" alt="${paisSeleccionado.flags.alt}"/>
        `;
        
        // Limpia el contenido actual antes de agregar el nuevo enlace
        limpiarContenido()
        
        // Agrega el nuevo enlace al elemento h1Contenido
        h3Contenido.innerHTML = enlace;
        h3Contenido.style.lineHeight = '5em';
        h3Contenido.style.display = 'inline-block';
        contenido?.appendChild(h3Contenido);
    }
});
btnTraducciones?.addEventListener('click', function () {
    let paisSel = (selectPaises as HTMLSelectElement).selectedOptions[0].value;
    let contenido = document.querySelector('#contenido');
    let h3Contenido = document.createElement('h3');
    

    // Encuentra el país correspondiente en los datos
    let paisSeleccionado = datos.find((pais: any) => pais.name.common === paisSel);

    if (paisSeleccionado) {
        // Obtén todas las traducciones disponibles
        const traducciones = paisSeleccionado.translations || {};

        // Combina todas las traducciones en un enlace
        let enlace = "Traducciones:</br>";
        Object.entries(traducciones).forEach(([idioma, traduccion]: [string, any]) => {
            enlace += `${idioma}: ${traduccion.official || 'No disponible'}</br>`;
        });
        
        // Limpia el contenido actual antes de agregar el nuevo enlace
        limpiarContenido()
        
        // Agrega el nuevo enlace al elemento h1Contenido
        h3Contenido.innerHTML = enlace;
        h3Contenido.style.lineHeight = '4em';
        contenido?.appendChild(h3Contenido);
    }
});

})


})


function limpiarContenido(){
    if (contenido) {
        contenido.innerHTML = "";
    }
}