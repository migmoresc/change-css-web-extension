chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'nombreWeb') {
        getCurrentWeb().then(sendResponse).catch(() => {
            console.log('Algo ha salido mal en el\
             archivo background.js');
        });
        return true;
    }
});

async function getCurrentWeb() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return new URL(tab.url).hostname;
}