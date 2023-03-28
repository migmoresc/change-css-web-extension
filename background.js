chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'nombreWeb') {
        if (sender.tab) {
            sendResponse(new URL(sender.url).hostname);
        } else {
            getCurrentTab().then(sendResponse);
            return true;
        }
    }
});

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return new URL(tab.url).hostname;;
}