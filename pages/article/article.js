//getting ID of article from localStorage

let articleID = localStorage.getItem('artID');
console.log(articleID)

//adding tags on page

firebase.database().ref().on('value', (snap) => {
    let articleData = snap.val().articles[articleID];

    console.log(articleData)

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






/*
let img = document.getElementById("article-main-image")*/
