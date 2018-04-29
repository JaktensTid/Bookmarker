debugger;

window.onload = function() {
    var url = document.URL;
    chrome.storage.local.get(url, function(result) {
        window.scroll({'left': 0, 'top': result[url], 'behavior': 'smooth'});
    });
};

chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.action == 'getHeight'){
            $(document).one('mousemove', function(e){
                var url = document.URL;
                var result = {};
                result[url] = e.pageY;
                chrome.storage.local.set(result);
            });
            return true;
        }
    });