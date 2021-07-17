    //adding set of tags on page

       firebase.database().ref().on('value', (snap) => {
            let data = snap.val();
            let tags = document.getElementById('alltags');
            data.tags.forEach(function (item){
                    let tag = ce("li", item, "tag plus");
                    tags.append(tag);
                }
            )
            activateTags();
        })


    //function of selecting tags

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


    //button "Add new block"

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

// form submit

    //reference articles collection
    let articlesRef = firebase.database().ref('articles')

    document.getElementById('form').addEventListener('submit', submitForm);
    //submit
    function submitForm(e) {

        //get values for form

        //***title
        let title = document.getElementById('title').value;

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
        let author = localStorage.getItem("author");

        //***img
        //name of image for form
        let imgFile = document.getElementById("upload-file__input_1").files[0];
        let img = "img/"+imgFile.name;
        console.log(img)
        //send image to the server
        let storageRefII = firebase.storage().ref('img');
        let thisRef = storageRefII.child(imgFile.name);

        thisRef.put(imgFile).then(res =>{
            console.log("image was send successful")
            }).catch (e => {
            console.log("Error" + e);
        })

        //***date
        let date = new Date().toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"long"});

        //save (send) article
        saveArticle(title, subtitles, tags, text, img, author, date);

        /*//show notification about successful form sending
        document.getElementById("alert").style.display = "block";
        setTimeout(function () {
            document.getElementById("alert").style.display = "none";
            }, 3000);*/
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

    // downloading image for article and it`s drag-n-drop

    document.addEventListener('DOMContentLoaded', () => {

        const forms = document.querySelectorAll('form');

        for (let i = 1; i <= 4; i++) { // place to drug-&-drop files (4)
            window['uploadDragFiles_'+i] = new Object();
        }

        document.querySelectorAll('.upload-file__wrapper').forEach(function (current_item, index) {

            const inputFile = current_item.querySelector('.upload-file__input');

            // array of files
            let fileList = [];

            // button "Add cover"
            let textSelector = current_item.querySelector('.upload-file__text');

            // event of selecting file
            inputFile.addEventListener('change', function () {
                fileList.push(...inputFile.files);
                // console.log(inputFile.files);
                // вызов функции для каждого файла
                fileList.forEach(file => {
                    uploadFile(file);
                });
            });

            // checking of file`s size and display the name
            const uploadFile = (file) => {

                // file`s size <5 Mb
                if (file.size > 5 * 1024 * 1024) {
                    alert('Файл должен быть не более 5 МБ.');
                    return;
                }

                // display the name of downloading file
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


            //*** «Drag-and-drop»

            const dropZone = current_item.querySelector('.upload-file__label');
            const dropZoneText = current_item.querySelector('.upload-file__text');
            const maxFileSize = 5000000; // max size - 5 Mb.

            // checking «Drag-and-drop»
            if (typeof (window.FileReader) === 'undefined') {
                dropZone.textContent = 'Drag&Drop Не поддерживается браузером!';
                dropZone.classList.add('error');
            }
            // event of «Drag-and-drop»
            dropZone.ondragover = function () {
                this.classList.add('hover');
                return false;
            };
            // event of cancel «Drag-and-drop»
            dropZone.ondragleave = function () {
                this.classList.remove('hover');
                return false;
            };
            // event - the file was dragged
            dropZone.addEventListener('drop', function (e) {
                e.preventDefault();
                this.classList.remove('hover');
                this.classList.add('drop');

                uploadDragFiles = e.dataTransfer.files[0]; // один файл

                // checking of file`s size
                if (uploadDragFiles.size > maxFileSize) {
                    dropZoneText.textContent = 'Размер превышает допустимое значение!';
                    this.addClass('error');
                    return false;
                }

                // display of downloading files
                if (uploadDragFiles.length > 1) {
                    if (uploadDragFiles.length <= 4) {
                        dropZoneText.textContent = `Выбрано ${uploadDragFiles.length} файла`;
                    } else {
                        dropZoneText.textContent = `Выбрано ${uploadDragFiles.length} файлов`;
                    }
                } else {
                    dropZoneText.textContent = e.dataTransfer.files[0].name;
                }

                // add file in object "uploadDragFiles_i"
                window['uploadDragFiles_'+index] = uploadDragFiles;
            });

        });

    });

    //preview of loading image
    document.getElementById("upload-file__input_1").onchange = function () {
        let reader = new FileReader();

        reader.onload = function (e) {
            // get loaded data and render thumbnail.
            document.getElementById("image").src = e.target.result;
        };

        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
    };