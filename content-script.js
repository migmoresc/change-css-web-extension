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

chrome.runtime.sendMessage('nombreWeb', (response) => {
    console.log(response);
    chrome.storage.local.get(response).then((listaEstilo) => {
        for (estilo of Object.values(listaEstilo)[0]) {
            document.querySelector(estilo[0]).style.cssText = estilo[1];
        }
    }).catch(() => { console.log("No existe ningún estilo para esta web.") });
});
