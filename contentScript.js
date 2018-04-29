debugger;

class App {
    removePoint(url, position){
        chrome.storage.local.get(url, function (result) {
            var points = result[url];
            var i = points.indexOf(position);
            if(i !== -1) {
                points.splice(i, 1);
            }
            chrome.storage.local.set(result);
        });
    };
    bindPoints() {
        let id = 'bookmarkssidenav';
        let panel = document.getElementById(id);
        if(panel){
            $(panel).remove();
        }
        let url = document.URL;
        let outer = this;
        panel = $(`<div oncontextmenu="return false;" class="sidenav" id="${id}"></div>`);
        chrome.storage.local.get(url, function (result) {
            if (!$.isEmptyObject(result)) {
                let points = result[url];
                let pageHeight = document.body.offsetHeight;
                for (let i = 0; i < points.length; i++) {
                    let position = points[i];
                    let paddingTop = (position / pageHeight) * 100;
                    let point = $(`<div oncontextmenu="return false;" style="top: ${paddingTop}%;"></div>`);
                    $(point).on('click', function (e) {
                        window.scroll({'left': 0, 'top': position, 'behavior': 'smooth'});
                    });
                    $(point).mousedown(function(e){
                        if(e.button === 2){
                            $(point).remove();
                            outer.removePoint(url, position);
                            return false;
                        }
                        return true;
                    });
                    panel.append(point);
                }
                $(document.body).prepend(panel);
            }
        });
    };

    constructor() {
        let outer = this;
        let url = document.URL;
        window.onload = function () {
            outer.bindPoints();
        };

        chrome.storage.sync.get(url, function(result) {
            if(!$.isEmptyObject(result)){
                chrome.storage.local.set(result);
            }
        });

        chrome.runtime.onMessage.addListener(
            function (request) {
                if (request.action == 'getHeight') {
                    $(document).one('mousemove', function (e) {
                        chrome.storage.local.get(url, function (result) {
                            let obj;
                            if (!$.isEmptyObject(result) && result[url].length > 0) {
                                obj = result;
                                obj[url].push(e.pageY);
                            }
                            else {
                                obj = {};
                                obj[url] = [e.pageY];
                            }
                            obj[url].sort();
                            chrome.storage.local.set(obj);
                            chrome.storage.sync.set(obj);
                            outer.bindPoints();
                        });
                    });
                }
            }
        );
    }
}
new App();




