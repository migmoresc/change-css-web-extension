chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request) {
            let elemento = document.querySelector(request["selector"]);
            if (elemento) {
                document.querySelector(request["selector"]).style.cssText = request["propiedades"];
            }
        }
    }
);

async function getNombreWeb() {
    let nombreWeb = await chrome.runtime.sendMessage('nombreWeb');
    return nombreWeb;
}

async function cargaSelectores() {
    getNombreWeb().then(async (web) => {
        console.log(web)
        let listaEstilo = await chrome.storage.local.get(web);
        console.log(listaEstilo)
        console.log(typeof (listaEstilo))
        console.log(Object.values(listaEstilo))

        if (Object.values(listaEstilo).length != 0) {
            for (estilo of Object.values(listaEstilo)[0]) {
                if (document.querySelector(estilo[0])) {
                    document.querySelector(estilo[0]).style.cssText = estilo[1];
                }
            }
        }
    });
}

cargaSelectores();