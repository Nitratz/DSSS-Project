$(document).ready(function () {
    $(".dropdown-trigger").dropdown({hover: false});
});

let login = document.querySelector('.modal-login');
let signup = document.querySelector('.modal-signup');

let iLogin = M.Modal.init(login);
let iSignup = M.Modal.init(signup);

$('#login').click(() => {
    iLogin.open();
});

$('#signup').click(() => {
    iSignup.open();
});

$('#login-submit').click(() => {
   let username = $('#username').val();
   let password = $('#password').val();

   if (!username) {
       M.toast({html: 'Username is required'});
       return;
   }
   if (!password) {
       M.toast({html: 'Password is required'});
       return;
   }

});

$('#register-submit').click(() => {
    let username = $('#username_signup').val();
    let password = $('#password_signup').val();
    let birthdate = parseDate($('#birthdate').val());
    let city = $('#city').val();

    if (!username) {
        M.toast({html: 'Username is required'});
        return;
    }
    if (!password) {
        M.toast({html: 'Password is required'});
        return;
    }
    if (!birthdate) {
        M.toast({html: 'Password is required'});
        return;
    }
    if (!city) {
        M.toast({html: 'Password is required'});
        return;
    }

    $.ajax({
        type: "POST",
        url: "/accounts/create",
        data: {
            username,
            password,
            birthdate,
            city
        },
        success: function(result) {
            console.log(result);
        },
        error: function(xhr, text, error) {

        }
    });
});

function parseDate(date) {
    let b = date.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
}