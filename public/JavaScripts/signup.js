const user = document.getElementById('username');
const mobile = document.getElementById('mobile');
const pass = document.getElementById('password');
const email = document.getElementById('email');
const form = document.getElementById('signup-form');
form.addEventListener("submit",function(e) {

    if (user.value === "" || user.value == null) {
        e.preventDefault(); 
        alert("Please Enter Username");
        user.style.borderColor = "red";
    }else

    if (mobile.value === "" || mobile.value == null) {
        e.preventDefault(); 
        alert("Please Enter Valid Mobile Number");
        mobile.style.borderColor = "red";
    }else

    if (mobile.value.length != 10) {
        e.preventDefault();
        alert("Number Should Be 10 Digit");
        password.style.borderColor = "red";
    }else

    if (email.value === "" || email.value == null) {
        e.preventDefault(); 
        alert("Please Enter Valid Email");
        email.style.borderColor = "red";
    }else

    if (password.value === "" || password.value == null) {
        e.preventDefault(); 
        alert("Please Enter Valid Password");
        password.style.borderColor = "red";
    }else

    if (password.value.length < 8) {
        e.preventDefault();
        alert("Password Should Contains Atleast 8 Characters");
        password.style.borderColor = "red";
    }else

    if (password.value.length > 16) {
        e.preventDefault();
        alert("Password Should Not Contains 16+ Characters");
        password.style.borderColor = "red";
    }

});