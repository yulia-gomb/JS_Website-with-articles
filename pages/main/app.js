window.onload = function () {

    //добавление тегов на страницу

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

    //добавление артикулов на страницу

    let arts = document.getElementById('articles');

    console.log(data.articles)

    data.articles.forEach(function (item, i) {
        let frame = ce("div","", "frame")
        arts.append(frame)
        let framePlace = document.getElementsByClassName("frame")[i];

        let link = ce("a","", "link");
        link.setAttribute("href", "pages/article/article.html");
        console.log(link)
        framePlace.append(link);

        let linkPlace = document.getElementsByClassName("link")[i];

        let artImage = ce("img","", "articleImage");
        artImage.setAttribute("src", item.url)
        /*console.log(artImage)*/
        let artTitle = ce("div", item.title, "articleTitle")
        let artText = ce("div", item.text, "articleText")
        linkPlace.append(artImage, artTitle, artText);
    })

}

// функция создания элементов

function ce(name,text,className,event,fn) {
    let element = document.createElement(name);
    if(text!=undefined) {
        element.innerHTML = text;
    }

    if(className!=undefined) {
        element.className = className;
    }

   /* if(event!=undefined && fn!=undefined) {
        element.addEventListener(event,fn);
    }*/

    return element;
}




