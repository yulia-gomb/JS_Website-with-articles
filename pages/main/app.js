// Initialize Firebase

var firebaseConfig = {
    apiKey: "AIzaSyATt36GJHPvqSKNaTIcdXpU47Xdv0_Ofmg",
    authDomain: "leverx-745ad.firebaseapp.com",
    projectId: "leverx-745ad",
    storageBucket: "leverx-745ad.appspot.com",
    messagingSenderId: "33580969644",
    appId: "1:33580969644:web:b12ab304545fb49a5ab909",
    databaseURL: "https://leverx-745ad-default-rtdb.europe-west1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseConfig);

// elements of header

let buttonLogOut = document.getElementById("button-log-out");
let buttonLogIn = document.getElementById("button-log-in");
let buttonCreatePost = document.getElementById("button-create-post");
let avatar = document.getElementById("avatar");

// button Sign in

function googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        /*console.log("success")
        console.log(result)
        console.log(result.additionalUserInfo.profile.picture)*/
        localStorage.setItem('authorized', true);
        localStorage.setItem('avatar', result.additionalUserInfo.profile.picture);
        /*window.location.href="../../index.html";*/
        window.history.back(2);

    }).catch(function (err) {
        console.log("error")
        console.log(err)
    })
}
// button Log out

buttonLogOut.addEventListener("click", googleSignOut);

function googleSignOut() {

    firebase.auth().signOut().then(function (result) {
        /*console.log("success")
        console.log(result)*/
        buttonLogIn.classList.remove("hidden");
        buttonLogOut.classList.add("hidden");
        buttonCreatePost.classList.add("hidden");
        avatar.classList.add("hidden");

        delete localStorage.authorized;
        delete localStorage.avatar;

    }).catch(function (err) {
        console.log("error")
        console.log(err)
    })
}

//creating header

if(localStorage.authorized){
    /*console.log("localStorage")*/
    buttonCreatePost.classList.remove("hidden");
    buttonLogOut.classList.remove("hidden");
    let img = localStorage.avatar;
    /*console.log(img)*/
    avatar.setAttribute("style",`background-image: url(${img})`);
    avatar.classList.remove("hidden");

}

if(!localStorage.authorized){
    buttonLogIn.classList.remove("hidden");
}


window.onload = function () {

    // getting data from Firebase

    firebase.database().ref().on('value', (snap) => {
        let data = snap.val();
        console.log(data)
        creatingTags(data);
        creatingArticles(data);
    })

    //function of adding tags on page

    function creatingTags(data) {
        let tags = document.getElementById('tags');
        data.tags.forEach(function (item, i){
                if (i===0) {
                    let tag = ce("li", item, "active");
                    tags.append(tag);
                }
                else {
                    let tag = ce("li", item, "tag");
                    tags.append(tag);}
            }
        )
    }

    //function of adding articles on page

    function creatingArticles(data) {
        let arts = document.getElementById('articles');
        data.articles.forEach(function (item, i) {
            let frame = ce("div","", "frame")
            arts.append(frame)
            let framePlace = document.getElementsByClassName("frame")[i];

            let link = ce("a","", "link");
            link.setAttribute("href", "pages/article/article.html");

            framePlace.append(link);

            let linkPlace = document.getElementsByClassName("link")[i];

            let artImage = ce("img","", "articleImage");

            var storageRef = firebase.storage().ref();
            storageRef.child(`${item.img}`).getDownloadURL().then(url => {
                artImage.setAttribute("src", url)
                }).catch(e =>
                console.log(e)
            )


            let artTitle = ce("div", item.title, "articleTitle")
            let artDescription = ce("div", item.description, "articleText")
            linkPlace.append(artImage, artTitle, artDescription);
        })

    }






}

// general function of creating elements

function ce(name,text,className,event,fn) {
    let element = document.createElement(name);
    if(text!==undefined) {
        element.innerHTML = text;
    }

    if(className!==undefined) {
        element.className = className;
    }

   /* if(event!=undefined && fn!==undefined) {
        element.addEventListener(event,fn);
    }*/

    return element;
}



