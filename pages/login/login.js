
function check() {
    let submit = document.getElementById("sign-in-google");
    if (document.getElementById('google-terms').checked)
        submit.disabled = false;
    else
        submit.disabled = true;
}



