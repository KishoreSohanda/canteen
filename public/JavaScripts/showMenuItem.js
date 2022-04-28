const form = document.getElementById('form');
form.addEventListener("submit",function(e) {
    const Text = "Do You Really Want To Delete The Item From Menu"
    if (confirm(Text) != true) {
        e.preventDefault(); 
    }
});