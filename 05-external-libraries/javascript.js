//A welcome toast when the page loads
document.addEventListener('DOMContentLoaded', function () {
    Toastify({
        text: "Bunvenuto! Welcome to Trattoria Trussardi", 
        duration: 2500,
        close: true,
        gravity: "top",
        position: "right",
    }).showToast();
    //Show a quick toast whenever an item on the nav bar is clicked. 
    document.querySelectorAll('.navigation a').forEach(function(link) {
        link.addEventListener('click', function () {
            const target = link.getAttribute('href') || "#";
            Toastify({
                text: "Jumping to" + target,
                duration: 1200,
                gravity: "top",
                position: "center",
                style: {background: "#101010"}
            }).showToast();
        });
    });
});