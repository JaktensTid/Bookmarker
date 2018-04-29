debugger;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == 'getHeight'){
            $(document).one('mousemove', function(e){
                sendResponse({'height': document.body.offsetHeight, 'Y': e.pageY});
            });
            return true;
        }
    });