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
        localStorage.setItem('authorized', true);
        localStorage.setItem('avatar', result.additionalUserInfo.profile.picture);
        window.location.href="../../index.html";
        /*window.history.back(2);*/

    }).catch(function (err) {
        console.log("error")
        console.log(err)
    })
}
// button Log out

buttonLogOut.addEventListener("click", googleSignOut);

function googleSignOut() {

    firebase.auth().signOut().then(function (result) {
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
    buttonCreatePost.classList.remove("hidden");
    buttonLogOut.classList.remove("hidden");
    let img = localStorage.avatar;
    avatar.setAttribute("style",`background-image: url(${img})`);
    avatar.classList.remove("hidden");
}

if(!localStorage.authorized){
    buttonLogIn.classList.remove("hidden");
}

// getting data from Firebase

    firebase.database().ref().on('value', (snap) => {
        let data = snap.val();
        console.log(data)
        creatingTags(data);
        creatingArticles(data);
        filter();
        search();
    })

//function of adding tags on page

    function creatingTags(data) {
        let tags = document.getElementById('tags');
        data.tags.forEach(function (item, i){
                let tag = ce("li", item, "tag");
                tags.append(tag);
            }
        )
    }

//function of adding articles on page

    function creatingArticles(data) {
        let arts = document.getElementById('articles');
        Object.keys(data.articles).forEach(function (item, i) {
            /*console.log('item')
            console.log(data.articles[item])*/

            let frame = ce("div","", "frame")
            arts.append(frame)
            let framePlace = document.getElementsByClassName("frame")[i];
            let link = ce("a","", "link");
            link.setAttribute("href", "pages/article/article.html");
            framePlace.append(link);
            let linkPlace = document.getElementsByClassName("link")[i];

            let artImage = ce("img","", "articleImage");
            var storageRef = firebase.storage().ref();

            storageRef.child(`${data.articles[item].img}`).getDownloadURL().then(url => {
                artImage.setAttribute("src", url)
                }).catch(e =>
                console.log(e)
            )

            let artTitle = ce("div", data.articles[item].title, "articleTitle")
            let artDescription = ce("div", data.articles[item].description, "articleDescription")
            let artTags = ce("div", data.articles[item].tags, "articleTags") //***tags

            let artTextForSearching = (data.articles[item].title + data.articles[item].description + data.articles[item].subtitles + data.articles[item].text).toLowerCase();

            let areaOfSearching = ce("div", artTextForSearching,  "artTextForSearching")
            linkPlace.append(artImage, artTitle, artDescription, artTags, areaOfSearching);
        })

    }

// filter for articles on active tags

function filter() {

    const allTags = document.querySelectorAll('.tag');
    const allArticleTags = document.querySelectorAll('.articleTags')

    allTags.forEach(tag => {
            tag.addEventListener('click', () =>{
                    const isClassActive = tag.classList.contains('active');
                    if (isClassActive) {
                        tag.classList.remove('active')
                    } else {
                        tag.classList.add('active')
                    }
                     let activeTags =[];
                        document.querySelectorAll('.active').forEach(i => {
                            activeTags.push(i.innerHTML);
                        } )
                    filterTitles(activeTags, allArticleTags);
                }
            )
        }

    )

    function filterTitles(active, tags) {
        if (active.length!=0){
            tags.forEach((tag) => {
                    tag.parentNode.parentNode.classList.add('hidden');
                }
            )
            tags.forEach((tag) => {
                const itemFiltered = tag.parentNode.parentNode;
                const inner = tag.innerHTML.split(',')

                active.forEach((item) => {
                        const isTags = inner.includes(item)

                        if(isTags){
                            itemFiltered.classList.remove('hidden')
                        }
                    }
                )
            })
        } else {
            tags.forEach((tag) => {
                    tag.parentNode.parentNode.classList.remove('hidden');
                }
            )
        }
    }
}
// searching for article

function search() {
    document.querySelector('.button-search').oninput = function() {
        let searchText = this.value.toLowerCase();
        console.log(searchText)
        let searchingArea = document.querySelectorAll('.artTextForSearching')
        if(searchText!== undefined){
            searchingArea.forEach(elem =>{
                if(elem.innerHTML.search(searchText) === -1) {
                    elem.parentNode.parentNode.classList.add('hidden');
                } else {
                    elem.parentNode.parentNode.classList.remove('hidden');
                }
                })
        } else {
            searchingArea.forEach(elem =>{
                elem.parentNode.parentNode.classList.remove('hidden');
            })
        }
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

    /*if(event!=undefined && fn!==undefined) {
        element.addEventListener(event,fn);
    }*/

    return element;
}



