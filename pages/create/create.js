window.onload = function () {

    //добавление тегов на страницу

    let tags = document.getElementById('tags');

    data.tags.forEach(function (item, i){
        let tag = ce("li", item, "tag");
        tags.append(tag);
    }

    )




    //убрать

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

    //Добавление обработчика события

    tag.addEventListener("click",addLi);



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

    if(event!=undefined && fn!=undefined) {
        element.addEventListener(event,fn);
    }

    return element;
}




