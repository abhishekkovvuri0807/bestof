// triggered when the document is loaded, the error messages in 
// the sign-up page are set to display none.
$(document).ready(function () {
    $('#error-firstname-message, #error-lastname-message, #error-phone-number-message' +
    '#error-sign-up-email-message, #error-sign-up-password-message, #error-confirm-password-message').css('display', 'none');

    $("#first-name").keyup(function () {
        $("#error-firstname-message").css('display', 'none');
    });

    $("#last-name").keyup(function () {
        $("#error-lastname-message").css('display', 'none');
    });

    $("#phone-number").keyup(function () {
        $("#error-phone-number-message").css('display', 'none');
    });

    $("#email").keyup(function () {
        $("#error-sign-up-email-message").css('display', 'none');
    });

    $("#password").keyup(function () {
        $("#error-sign-up-password-message").css('display', 'none');
    });

    $("#confirm-password").keyup(function () {
        $("#error-confirm-password-message").css('display', 'none');
    });

});

// creating a user object and assigning field values to object properties.
function signUp() {
    let user = {};
    user.firstName = $('#first-name').val();
    user.lastName = $('#last-name').val();
    user.phoneNumber = $('#phone-number').val();
    user.email = $('#email').val();
    user.password = $('#password').val();
    user.confirmPassword = $('#confirm-password').val();
    validateUserDetails(user);
}

// validate user entered details.
function validateUserDetails(user) {
    let isUserValid = true;
    if (user.firstName == '') {
        isUserValid = false;
        showErrorMessage('error-firstname-message', 'Please enter firstname');
    }
    if (user.lastName == '') {
        isUserValid = false;
        showErrorMessage('error-lastname-message', 'Please enter lastname');
    }

    if (user.phoneNumber == '') {
        isUserValid = false;
        showErrorMessage('error-phone-number-message', 'Please enter phone number');
    } else if (!validatePhoneNumber(user.phoneNumber)) {
        isUserValid = false;
        showErrorMessage('error-phone-number-message', 'Please enter valid phone number');
    }

    if (user.email == '') {
        isUserValid = false;
        showErrorMessage('error-sign-up-email-message', 'Please enter email');
    } else if (!validateEmail(user.email)) {
        isUserValid = false;
        showErrorMessage('error-sign-up-email-message', 'Please enter valid email');
    }

    if (user.password == '') {
        isUserValid = false;
        showErrorMessage('error-sign-up-password-message', 'Please enter password');
    }

    if (user.confirmPassword == '') {
        isUserValid = false;
        showErrorMessage('error-confirm-password-message', 'Please enter password');
    } else if (user.password != user.confirmPassword) {
        isUserValid = false;
        showErrorMessage('error-confirm-password-message', 'Entered passwords not matching');
    }

    if (isUserValid) {
        addUserDetailsToLocalStorage(user);
    }
}

// add signed-up new user to local storage or user data object.
function addUserDetailsToLocalStorage(userData) {
    let user = {};
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.email = userData.email;
    user.password = userData.password;
    user.phoneNumber = userData.phoneNumber;
    let userList = JSON.parse(localStorage.getItem('users'));
    if (userList) {
        userList.users.push(user);
        localStorage.setItem('users', JSON.stringify(userList));
    } else {
        userDetails.users.push(user);
        localStorage.setItem('users', JSON.stringify(userDetails));
    }
    navigateToLogin();
}

// to navigate to login page.
function navigateToLogin() {
    window.location.href = "login.html"
}

// show error message when element Id and error message is provided.
function showErrorMessage(elementId, message) {
    $('#' + elementId).text(message);
    $('#' + elementId).css('display', 'block');

}

// to validate phone number.
function validatePhoneNumber(val) {
    let pattern = /^\d{10}$/;
    if (val.match(pattern)) {
        return true;
    }
    return false;
}