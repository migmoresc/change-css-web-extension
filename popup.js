//
let web;

document.getElementById("añadir").addEventListener("click", añadirEstilo);
document.getElementById("ejecutar").addEventListener("click", ejecutarEstilo);
document.getElementById("eliminar").addEventListener("click", eliminarEstilo);
document.getElementById("borrarTodo").addEventListener("click", borrarWeb);
document.getElementById("selectores").addEventListener("click", (event) => {
    obtenerEstilo(event.target.value);
});

function css(texto) {
    let selector = texto.split("{")[0].replaceAll(" ", "");
    let reglas = texto.split("{")[1].split("}")[0].replaceAll(" ", "")
        .replaceAll("\n", "").replaceAll("\"", "");
    return [selector, reglas];
}

function getEstilo() {
    return css(document.getElementById("entrada").value);
}

function putEstilo(texto) {
    document.getElementById("entrada").value = texto;
}

async function ejecutarEstilo() {
    try {
        let queryOptions = { active: true, lastFocusedWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        let [selector, reglas] = getEstilo();
        const response = await chrome.tabs.sendMessage(
            tab.id, { selector: selector, propiedades: reglas });
    } catch (error) {
        console.log(error);
    }
}

function insertaEnLista(selector) {
    document.getElementById("selectores").insertAdjacentHTML("beforeend",
        `<option value="${selector}">${selector}</option>`);
}

async function añadirEstilo() {
    let [selector, reglas] = getEstilo();
    let arrayWeb = [];

    let obj = await chrome.storage.local.get(web);

    if (obj[web]) {
        arrayWeb = obj[web];
        arrayWeb.push([selector, reglas]);
    } else {
        arrayWeb = [[selector, reglas]];
    }
    await chrome.storage.local.set({ [web]: arrayWeb });
    document.getElementById("entrada").value = "";
    insertaEnLista(selector);
}

async function eliminarEstilo() {
    let [selector, reglas] = getEstilo();
    let arrayWeb = [];

    let obj = await chrome.storage.local.get(web);

    if (obj[web]) {
        for (let estilo of obj[web]) {
            if (estilo[0] != selector) {
                arrayWeb.push([estilo[0], estilo[1]])
            }
        }
        await chrome.storage.local.remove(web);
        await chrome.storage.local.set({ [web]: arrayWeb });
    }

    document.getElementById("entrada").value = "";
    document.getElementById("selectores").innerHTML = "";
    cargaSelectores();
}

async function borrarWeb() {
    await chrome.storage.local.remove(web);
    document.getElementById("selectores").innerHTML = "";
    putEstilo("");
}

async function obtenerEstilo(selector) {
    let obj = await chrome.storage.local.get(web);
    if (obj[web]) {
        for (let selectorStorage of obj[web]) {
            if (selectorStorage[0] === selector) {
                let texto = `${selectorStorage[0]} {\n`;
                selectorStorage = selectorStorage[1].split(";").slice(0, -1);
                selectorStorage.forEach(element => {
                    texto += element + ";\n";
                });
                texto += "}";
                putEstilo(texto)
            }
        }
    }
}

async function getNombreWeb() {
    let nombreWeb = await chrome.runtime.sendMessage('nombreWeb');
    web = nombreWeb;
    document.querySelectorAll(".pagina")[0].innerHTML = web;
}

async function cargaSelectores() {
    getNombreWeb().then(async () => {
        let obj = await chrome.storage.local.get(web);
        if (obj[web]) {
            for (let selector of obj[web]) {
                insertaEnLista(selector[0])
            }
        }
    });
}

cargaSelectores();