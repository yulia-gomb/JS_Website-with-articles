window.onload = function () {

    const data = {
        tags: ['Angular', 'Design', 'SAP ABAP', 'Product Development', 'Web Disign', 'SAP TM Consultant',
            'DevOps', 'UX/UI Design', 'Android', 'Frontend', 'Java ', 'Programmer', 'Python'],
        articles: [
            {
                id: 1,
                title: 'High quality',
                text: 'Straightforward APIs with consistent cross platform behaviour..',
                url: 'img/article1.png'
            },
            {
                id: 2,
                title: 'How to RxJS in Angular',
                text: 'As the values of your component inputs change over time, you may want to do something with that data inside your component.',
                url: 'img/article2.png'
            },
            {
                id: 3,
                title: 'Top 15 Features of Angular',
                text: 'It has added the information for the dependency and also regarding the ng-content selections for the data.',
                url: 'img/article3.png'
            },
            {
                id: 4,
                title: 'Angular team streamlines \n' +
                    'feature requests',
                text: 'Feature requests will be reviewed for alignment with existing projects on the Angular roadmap.',
                url: 'img/article4.png'
            },
            {
                id: 5,
                title: 'How to RxJS in Angular',
                text: 'As the values of your component inputs change over time, you may want to do something with that data inside your component.',
                url: 'img/article2.png'
            },
            {
                id: 6,
                title: 'Top 15 Features of Angular ',
                text: 'It has added the information for the dependency and also regarding the ng-content selections for the data.',
                url: 'img/article3.png'
            },
            {
                id: 7,
                title: 'Angular team streamlines \n' +
                    'feature requests',
                text: 'Feature requests will be reviewed for alignment with existing projects on the Angular roadmap.',
                url: 'img/article4.png'
            },
            {
                id: 8,
                title: 'High quality',
                text: 'Straightforward APIs with consistent cross platform behaviour..',
                url: 'img/article1.png'
            },
        ]
    }

    //добавление тегов на страницу

    let tags = document.getElementById('tags');

    data.tags.forEach(function (item, i){
        if (i===0) {
            let tag = ce("li", item, "active");
            tags.append(tag);
        }
        else {let tag = ce("li", item, "tag");
        tags.append(tag);}
        }
    )

    //добавление артикулов на страницу

    let arts = document.getElementById('articles');

    console.log(data.articles)

    data.articles.forEach(function (item, i) {
        let frame = ce("div","", "frame")
        arts.append(frame)
        console.log(item, i)
        let framePlace = document.getElementsByClassName("frame")[i]
        let artImage = ce("img","", "articleImage");
        artImage.setAttribute("src", item.url)
        console.log(artImage)
        let artTitle = ce("div", item.title, "articleTitle")
        let artText = ce("div", item.text, "articleText")
        framePlace.append(artImage, artTitle, artText)
    })


    //



    const addLi = () =>{
        const liClick = (e) =>{
            if (e.ctrlKey){
                e.target.classList.add("active");
            }

            else{
                li.addEventListener("reset",resetActive);
                resetActive();

                e.target.classList.add("active");
            }
        }


        let li = ce("li", random(1,10), undefined, "click" , liClick);

        ul.append(li);
    }

    const resetActive = () =>{
        let active = document.querySelectorAll("ul > li.active");
        for(let i = 0 ; i< active.length ; i++) {
            active[i].removeAttribute("class");
        }

    }

    /* tag.addEventListener("click",addLi); */
    //Добавление обработчика события (фильтрация статей по тегу при нажатии на кнопку)


}


function ce(name,text,className,event,fn) {
    let element = document.createElement(name);
    if(text!=undefined) {
        element.innerHTML = text;
    }

    if(className!=undefined) {
        element.className = className;
    }

    if(event!=undefined && fn!=undefined) {
        element.addEventListener(event,fn);
    }

    return element;
}




