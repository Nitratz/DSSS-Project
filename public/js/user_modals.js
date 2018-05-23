$(document).ready(function () {
    $(".dropdown-trigger").dropdown({hover: false});
});

let login = document.querySelector('.modal-login');
let signup = document.querySelector('.modal-signup');
let training = document.querySelector('.modal-training');
let weight = document.querySelector('.modal-weight');

let iLogin = M.Modal.init(login);
let iSignup = M.Modal.init(signup);
let iWeight = M.Modal.init(weight);
let iTraining = M.Modal.init(training);

$('#login').click(() => {
    iLogin.open();
});

$('#signup').click(() => {
    iSignup.open();
});

$('#new-training').click(() => {
    iTraining.open();
});

$('#new-weight').click(() => {
    iWeight.open();
});

$('#weight-submit').click(() => {
    let userId = localStorage.userId;
    let date = parseDate($('#weight-date').val(), "");
    let weight = $('#weight').val();

    date = date.getTime();

    if (!date) {
        M.toast({html: 'Date is required'});
        return;
    }
    if (!weight) {
        M.toast({html: 'Weight is required'});
        return;
    }

    $.ajax({
        type: "POST",
        url: "/weights",
        xhrFields: {
            withCredentials: true
        },
        data: {
            userId,
            date,
            weight
        },
        success: function (result) {
            console.log(result);
        },
        error: function (xhr, text, error) {

        }
    });
});

$('#training-submit').click(() => {
    let userId = localStorage.userId;
    let start = $('#start-training-date').val();
    let start_time = $('#start-training-time').val();
    let stop = $('#stop-training-date').val();
    let stop_time = $('#stop-training-time').val();
    let desc = $('#description-training').val();

    if (!start) {
        M.toast({html: 'Start Date is required'});
        return;
    }
    if (!stop) {
        M.toast({html: 'Stop Date is required'});
        return;
    }
    if (!start_time) {
        M.toast({html: 'Start Time is required'});
        return;
    }
    if (!stop_time) {
        M.toast({html: 'Stop Time is required'});
        return;
    }
    if (!desc) {
        desc = "No description";
    }

    start = parseDate(start, start_time).getTime();
    stop = parseDate(stop, stop_time).getTime();

    $.ajax({
        type: "POST",
        url: "/training-activities",
        xhrFields: {
            withCredentials: true
        },
        data: {
            userId,
            start,
            stop,
            desc
        },
        success: function (result) {
            console.log(result);
        },
        error: function (xhr, text, error) {

        }
    });
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

    $.ajax({
        type: "POST",
        url: "/tokens",
        xhrFields: {
            withCredentials: true
        },
        data: {
            username,
            password
        },
        success: function (result) {
            localStorage.userId = result.message.userId;
            onLoggedIn()
        },
        error: function (xhr, text, error) {

        }
    });
});

$('#register-submit').click(() => {
    let username = $('#username_signup').val();
    let password = $('#password_signup').val();
    let birthdate = parseDate($('#birthdate').val(), "");
    let city = $('#city').val();

    birthdate = birthdate.getTime();

    if (!username) {
        M.toast({html: 'Username is required'});
        return;
    }
    if (!password) {
        M.toast({html: 'Password is required'});
        return;
    }
    if (!birthdate) {
        M.toast({html: 'Birthdate is required'});
        return;
    }
    if (!city) {
        M.toast({html: 'City is required'});
        return;
    }

    $.ajax({
        type: "POST",
        url: "/accounts/create",
        xhrFields: {
            withCredentials: true
        },
        data: {
            username,
            password,
            birthdate,
            city
        },
        success: function (result) {
            console.log(result);
        },
        error: function (xhr, text, error) {

        }
    });
});

$('#logout-submit').click(() => {
    $.ajax({
        type: "POST",
        url: "/logout",
        xhrFields: {
            withCredentials: true
        },
        data: {},
        success: function (result) {
            console.log(result);
            onLoggedOut()
        },
        error: function (xhr, text, error) {

        }
    });
});

function parseDate(date, time) {
    let b = date.split(/\D/);
    if (time !== "") {
        let t = time.split(/\D/);
        return new Date(b[0], --b[1], b[2], t[0], t[1]);
    } else
        return new Date(b[0], --b[1], b[2]);
}

function onLoggedIn() {
    localStorage.logged = true;
    $('#login-nav').css("display", "none");
    $('#logout-nav').css("display", "block");
    $('#training-nav').css("display", "block");
    $('#weight-nav').css("display", "block");
}

function onLoggedOut() {
    localStorage.logged = false;
    localStorage.userId = null;
    $('#login-nav').css("display", "block");
    $('#logout-nav').css("display", "none");
    $('#training-nav').css("display", "none");
    $('#weight-nav').css("display", "none");
}