
const form = document.querySelector('#myForm');
const button = document.querySelector('#account-btn');
const first = document.querySelector('#first');
const firstP = first.querySelector('p');






let password = document.querySelector('#password');
let matchingPassword = document.querySelector('#matchingPassword');

let p = "";
let mP = "";

password.addEventListener('keyup', function() {

    p = password.value;

    if (!isValid(p, mP)) {
        password.style.border = '1px solid red';
        matchingPassword.style.border = '1px solid red';
        firstP.textContent = '*Passwords must match';
        firstP.style = 'color: red; position: relative; top: 10px;';
    } else {
        password.style.border = '1px solid green';
        matchingPassword.style.border = '1px solid green';
        firstP.textContent = '*Passwords match';
        firstP.style = 'color: green; position: relative; top: 10px;';
    }


});

matchingPassword.addEventListener('keyup', function() {

    mP = matchingPassword.value;
    if (!isValid(p, mP)) {

        password.style.border = '1px solid red';
        matchingPassword.style.border = '1px solid red';
        firstP.textContent = '*Passwords must match';
        firstP.style = 'color: red; position: relative; top: 10px;';
    
    } else {

        firstP.textContent = '*Passwords match';
        firstP.style = 'color: green; position: relative; top: 10px;';
        password.style.border = '1px solid green';
        matchingPassword.style.border = '1px solid green';
    
    }
});



function isValid(p, mp) {
    return p === mp;
}


function isBlank() {

    return password.value === '' && matchingPassword.value === '';

}


button.addEventListener('click', function() {

    if (isValid(p, mP) && !isBlank()) {
        form.submit();
    } else if (!isValid(p, mP)) {
        firstP.textContent = '*Passwords must match';
        firstP.style = 'color: red; position: relative; top: 10px;';
    } else {
        firstP.textContent = '*Passwords cannot be empty';
        firstP.style = 'color: red; position: relative; top: 10px;';
    }

});


