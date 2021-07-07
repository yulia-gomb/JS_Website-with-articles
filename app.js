window.onload = function () {

    const data = {
        tags: ['Angular', 'Design', 'SAP ABAP', 'Product Development', 'Web Disign', 'SAP TM Consultant',
            'DevOps', 'UX/UI Design', 'Android', 'Frontend', 'Java ', 'Programmer', 'Python'],
        articles: [
            {
                id: 1,
                title: 'High quality',
                text: 'Straightforward APIs with consistent cross platform behaviour..',
            },
            {
                id: 2,
                title: 'How to RxJS in Angular',
                text: 'As the values of your component inputs change over time, you may want to do something ' +
                    'with that data inside your component.',
            }
        ]
    }
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



    let ul = ce("ul");
    document.body.append(ul);



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




