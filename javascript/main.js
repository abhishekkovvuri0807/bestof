let applicationPath = "http://127.0.0.1:5500/src/html/";

// to 
$(document).ready(function () {
    $('.logo').click(function () {
        window.location.href = "../index.html";
    });
});

// to expand and contract nav menu on click.
function toggleNav() {
    let element = document.getElementsByClassName("switch-toggle")[0];
    if (element.classList && element.classList.contains("open-toggle")) {
        document.getElementsByTagName("nav")[0].style.width = "0";
        document.getElementsByTagName("main")[0].style.marginLeft = "0";
        element.classList.remove("open-toggle");
        document.getElementById("overlay").style.display = "none";
    } else {
        element.classList.add("open-toggle");
        overlayOn();
        document.getElementsByTagName("nav")[0].style.top = document.getElementsByTagName("header")[0].offsetHeight + 'px';
        document.getElementsByTagName("nav")[0].style.width = "250px";
        document.getElementsByTagName("main")[0].style.marginLeft = "250px";
    }
}

// to set styles to overlay div element.
function overlayOn() {
    document.getElementById("overlay").style.left = "250px";
    document.getElementById("overlay").style.top = document.getElementsByTagName("header")[0].offsetHeight + 'px';
    document.getElementById("overlay").style.display = "block";
}

// to close the nav.
function overlayOff() {
    toggleNav();
}

// to get user details from local storage.
function getUserDetailsFromLocalStorage() {
    let user = localStorage.getItem("userDetails");
    if (user) {
        return JSON.parse(user);
    }
    return null;
}

// to set user first name in the header. 
function setUserName() {
    let user = getUserDetailsFromLocalStorage();
    if (user) {
        $('.user-name').text(user.firstName);
        addSignOffButton();
    }
}

// to add sign off button in the header after successful user log in.
function addSignOffButton() {
    let signOffHtml = '<div class="header-nav-link col-m-2 col-l-2 col-xl-2"><a class="user-logout" onclick="signOffUser()">' +
        '<i class="fas fa-sign-out-alt padding-right-4"></i>Log Out</a></div>';
    $('.header-nav').append(signOffHtml);
}

// to clear local storgae after log out.
function logoutUser() {
    localStorage.clear();
    window.location.href = "login.html";
}

// to validate email.
function validateEmail(email) {
    let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return pattern.test(String(email).toLowerCase());
}