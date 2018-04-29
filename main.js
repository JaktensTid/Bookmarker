class App {
    addOptionToContextMenu() {
        chrome.contextMenus.create({
            id: "createABookmark", title: "Add bookmark here", contexts: ["page"]
        });

        chrome.contextMenus.onClicked.addListener(function (e){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {action: "getHeight"}, function(response) {

                });
            });
        });


    }
}

var app = new App();

chrome.runtime.onInstalled.addListener(function () {
    app.addOptionToContextMenu();
});