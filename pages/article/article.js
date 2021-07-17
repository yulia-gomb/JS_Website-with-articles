//getting ID of article from localStorage

let articleID = localStorage.getItem('artID');
console.log(articleID)

//adding tags on page

firebase.database().ref().on('value', (snap) => {
    let articleData = snap.val().articles[articleID];

    console.log(articleData)

    //**adding image
    let sourceImage = articleData.img; //path to image
    let artImage = ce("img", "", "article-main-image"); //create elem of image
    var storageRef = firebase.storage().ref(); //ref to storage

    storageRef.child(`${sourceImage}`).getDownloadURL().then(url => {
        artImage.setAttribute("src", url); //set attribute src
        let imagePlace = document.getElementById("article-main-image");
        imagePlace.append(artImage);
    }).catch(e =>
        console.log(e)
    )

    //**adding title
    let title = document.getElementById('articleTitle');
    title.innerHTML = articleData.title;

    //**adding subtitles and text
    let subtitlesAndText = document.getElementById('subtitles-and-text');
    articleData.subtitles.forEach(function (item){
            let subtitle = ce("h2", item, "subtitle");
            subtitlesAndText.append(subtitle);
        }
    )
    articleData.text.forEach(function (item, i){
            let text = ce("p", item);
            let subtitlePlace = document.getElementsByClassName("subtitle")[i];
            subtitlePlace.after(text);
        }
    )

    //**adding author
    let author = document.getElementById('articleAuthor');
    author.innerHTML = articleData.author;

    //**adding date
    let date = document.getElementById('articleDate');
    date.innerHTML = articleData.date;

    //**adding tags
    let tags = document.getElementById('articleTags');
    articleData.tags.forEach(function (item){
            let tag = ce("li", item, "tag");
            tags.append(tag);
        }
    )
})







