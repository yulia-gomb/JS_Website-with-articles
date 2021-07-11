


function check() {
    let submit = document.getElementById("sign-in-google");
    if (document.getElementById('google-terms').checked)
        submit.disabled = false;
    else
        submit.disabled = true;
}

/*import firebase from "firebase/app";
import "firebase/auth";*/

/*var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');*/

/*function SignIn(e){
    console.log("sssssss")

}*/

/*function googleSignInPopup(provider) {
    /!*e.preventDefault();*!/
    console.log("log in");

    // [START auth_google_signin_popup]
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /!** @type {firebase.auth.OAuthCredential} *!/
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
        }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
    // [END auth_google_signin_popup]
}*/

/*function googleSignInRedirectResult() {
    // [START auth_google_signin_redirect_result]
    firebase.auth()
        .getRedirectResult()
        .then((result) => {
            if (result.credential) {
                /!** @type {firebase.auth.OAuthCredential} *!/
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // ...
            }
            // The signed-in user info.
            var user = result.user;
        }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
    // [END auth_google_signin_redirect_result]
}*/
