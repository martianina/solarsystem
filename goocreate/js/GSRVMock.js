window.gsrv = {
	track: function(){},
	exit: function(){}
};


function showControls(e) {
    var key = (String.fromCharCode(e.keyCode || e.charCode).toUpperCase());
    if ("I" === key) {
        var controls = document.querySelector('.dg.ac');
        if (controls.style.display === 'none')
        {
            controls.style.display = 'block';
        } else {
            controls.style.display = 'none';
        }
    }
}

document.addEventListener('keypress', showControls);
console.info("Press the 'I' key to toggle controls.");
