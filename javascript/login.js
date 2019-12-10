// triggered when the document is loaded, the error messages in 
// the login page are set to display none.
$(document).ready(function () {
    $('#error-email-message,#error-password-message,#invalid-cred').css('display', 'none');
    $("#login-email").keyup(function () {
        $("#error-email-message").css('display', 'none');
    });
    $("#login-password").keyup(function () {
        $("#error-password-message").css('display', 'none');
    });

});


// on click of login button, function is executed, reads values from input fields.
function login() {
    let email = $('#login-email').val();
    let password = $('#login-password').val();
    validateCredentials(email, password);
}

// validate user credentials and show respective error messages.
function validateCredentials(email, password) {
   
    // declaring and initilizing boolean variables for validating email and password.
    let isLoginSuccessful = false;
    let isEmailValid = false;
    let isPasswordValid = false;

    // validating email 
    if (email != '') {
        if (!validateEmail(email)) {
            $('#error-email-message').text('Please enter a valid email');
            $('#error-email-message').css('display', 'block');
        } else {
            isEmailValid = true;
        }
    }
    else {
        $('#error-email-message').text('Please enter email');
        $('#error-email-message').css('display', 'block');
    }

    // validating password.
    if (password != '') {
        isPasswordValid = true;
    } else {
        $('#error-password-message').text('Please enter password');
        $('#error-password-message').css('display', 'block');
    }

    // executes when the email and password are valid.
    if (isEmailValid && isPasswordValid) {
        let userList = JSON.parse(localStorage.getItem('users'));
        if (userList) {
            userDetailList = userList;
        } else {
            userDetailList = userDetails;
        }
        for (let i = 0; i < userDetailList.users.length; i++) {
            if (email == userDetailList.users[i].email && password == userDetailList.users[i].password) {
                isLoginSuccessful = true;
                setUserDetailsInLocalStorage(userDetailList.users[i]);
                navigateToCategoryPage();
            }
        }
    }
    if (isEmailValid && isPasswordValid && !isLoginSuccessful) {
        $('#invalid-cred').css('display', 'block');
    }
}

// navigate to category page
function navigateToCategoryPage() {
    window.location.href = "../index.html";
}

// to set the logged in user details in local storage.
function setUserDetailsInLocalStorage(user) {
    localStorage.setItem("userDetails", JSON.stringify(user));
}