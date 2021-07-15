

    //adding tags on page

    firebase.database().ref().on('value', (snap) => {
        let data = snap.val();
        console.log(data)
        let tags = document.getElementById('alltags');
        data.tags.forEach(function (item){
                let tag = ce("li", item, "tag plus");
                tags.append(tag);
            }
        )
        activateTags();

    })

    //adding new block

    let button = document.getElementById('button-add-new-block');

    button.addEventListener("click",addBlock);

    function addBlock(e){
        e.preventDefault();
        let newBlockSubsription = ce("h2","Enter the subtitle of your article")

        let newBlock= ce("input", "", "input-enter-subtitle");
        newBlock.setAttribute("type", "text");
        newBlock.setAttribute("placeholder", "Enter Subtitle");

        let newStorySubsription = ce("h2","Tell your story");
        let newStory= ce("textarea");
        let placeNewBlock=document.getElementById("new-block");

        placeNewBlock.append(newBlockSubsription,newBlock, newStorySubsription, newStory);

    }

//***function activateTags

function activateTags(){
    const allTags = document.querySelectorAll('.tag');

    const activeTagsArea = document.getElementById("activeTags")
    let tagsForForm = [];
    allTags.forEach(tag => {
            tag.addEventListener('click', add)
    })

    function add(e) {

        let newTag = e.target.innerHTML
        if(!tagsForForm.includes(newTag)){
            tagsForForm.push(newTag)
            }

        let remove = document.querySelectorAll('.active');

        remove.forEach(i => {
            i.remove()
        })

        tagsForForm.forEach(item => {
            let activatedTag = ce("li",item, "tag active");
            activeTagsArea.append(activatedTag);
        })
    }

}


// form submit

    //reference articles collection
    let articlesRef = firebase.database().ref('articles')

    document.getElementById('form').addEventListener('submit', submitForm);
    //submit
    function submitForm(e) {
        e.preventDefault();

        //get values for form

        //***title
        let title = getInputVal('title');
        //***subtitles
        let subtitlesTags = document.querySelectorAll('.input-enter-subtitle')
        let subtitles = []
        subtitlesTags.forEach(sub => {
            subtitles.push(sub.value)
        })
        //***tags
        let tagsForForm = document.querySelectorAll('.active')
        let tags = []
        tagsForForm.forEach(sub => {
            tags.push(sub.innerHTML)
        })
        //***text
        let textarea = document.querySelectorAll('textarea')
        let text = []
        textarea.forEach(sub => {
            text.push(sub.value)
        })
        //***author
        let author = localStorage.getItem("author")
        //***img
        let img = "img/article4.png"
        //***date
        let date = new Date().toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"long"});
        //save article
        saveArticle(title, subtitles, tags, text, img, author, date);
}

//function to get input value

function getInputVal(id) {
    return document.getElementById(id).value;
}
//save article to firebase

function saveArticle(title, subtitles, tags, text, img, author, date) {
    let newArticleRef = articlesRef.push();
    newArticleRef.set({
        title: title,
        description: subtitles,
        subtitles: subtitles,
        tags: tags,
        text: text,
        img: img,
        author: author,
        date: date
    })
    
}

    // загрузка файла-картинки для статьи и ее перетаскивание

    document.addEventListener('DOMContentLoaded', () => {

        const forms = document.querySelectorAll('form');

        for (let i = 1; i <= 4; i++) { // сюда будем помещать drug-&-drop файлы (4)
            window['uploadDragFiles_'+i] = new Object();
        }

        document.querySelectorAll('.upload-file__wrapper').forEach(function (current_item, index) {

            const inputFile = current_item.querySelector('.upload-file__input');

            // создаём массив файлов
            let fileList = [];

            // Кнопка «Прикрепить файл»
            let textSelector = current_item.querySelector('.upload-file__text');

            // Событие выбора файла
            inputFile.addEventListener('change', function () {
                fileList.push(...inputFile.files);
                // console.log(inputFile.files);
                // вызов функции для каждого файла
                fileList.forEach(file => {
                    uploadFile(file);
                });
            });

            // Проверяем размер файлов и выводим название
            const uploadFile = (file) => {

                // размер файла <5 Мб
                if (file.size > 5 * 1024 * 1024) {
                    alert('Файл должен быть не более 5 МБ.');
                    return;
                }

                // Показ загружаемых файлов
                if (file && fileList.length > 1) {
                    if (fileList.length <= 4) {
                        textSelector.textContent = `Выбрано ${fileList.length} файла`;
                    } else {
                        textSelector.textContent = `Выбрано ${fileList.length} файлов`;
                    }
                } else {
                    textSelector.textContent = file.name;
                }
                fileList = [];
            }


            /////////// Загрузка файлов при помощи «Drag-and-drop» ///////////
            // const dropZones = document.querySelectorAll('.upload-file__label');
            const dropZone = current_item.querySelector('.upload-file__label');
            const dropZoneText = current_item.querySelector('.upload-file__text');
            const maxFileSize = 5000000; // максимальный размер файла - 5 мб.

            // Проверка поддержки «Drag-and-drop»
            if (typeof (window.FileReader) === 'undefined') {
                dropZone.textContent = 'Drag&Drop Не поддерживается браузером!';
                dropZone.classList.add('error');
            }
            // Событие - перетаскивания файла
            dropZone.ondragover = function () {
                this.classList.add('hover');
                return false;
            };
            // Событие - отмена перетаскивания файла
            dropZone.ondragleave = function () {
                this.classList.remove('hover');
                return false;
            };
            // Событие - файл перетащили
            dropZone.addEventListener('drop', function (e) {
                e.preventDefault();
                this.classList.remove('hover');
                this.classList.add('drop');

                uploadDragFiles = e.dataTransfer.files[0]; // один файл

                // Проверка размера файла
                if (uploadDragFiles.size > maxFileSize) {
                    dropZoneText.textContent = 'Размер превышает допустимое значение!';
                    this.addClass('error');
                    return false;
                }

                // Показ загружаемых файлов
                if (uploadDragFiles.length > 1) {
                    if (uploadDragFiles.length <= 4) {
                        dropZoneText.textContent = `Выбрано ${uploadDragFiles.length} файла`;
                    } else {
                        dropZoneText.textContent = `Выбрано ${uploadDragFiles.length} файлов`;
                    }
                } else {
                    dropZoneText.textContent = e.dataTransfer.files[0].name;
                }

                // добавляем файл в объект "uploadDragFiles_i"
                window['uploadDragFiles_'+index] = uploadDragFiles;
            });

        });

    });