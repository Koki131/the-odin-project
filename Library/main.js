

let myLibrary = [];


function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}




const table = document.querySelector('table');

const tableBody = table.querySelector('tbody');

const contentContainer = document.querySelector('#content-container');

const form = contentContainer.querySelector('#add-form');

const addButton = contentContainer.querySelector('#add-button');

const displayButton = contentContainer.querySelector('#display-books');

const saveButton = form.querySelector("#save-button");

const updateB = form.querySelector('#update-button');

let i = 0;

 function displayForm() {

    form.querySelectorAll('input').forEach(i => i.value = "");


    table.style = 'display: none;';
    addButton.style = 'display: none;';

    form.style = 'display: block;';
    displayButton.style = 'display: block;';
    saveButton.style = 'display: block;';
    updateB.style = 'display: none;';


 }



saveButton.addEventListener('click', function(event) {

    event.preventDefault();



    const bookName = form.querySelector('#name').value;
    const bookAuthor = form.querySelector('#author').value;
    const bookPages = form.querySelector('#pages').value;
    const bookRead = form.querySelector('#read').value;

    
    table.style = 'text-align: center';
    addButton.style = '';

    form.style = 'display: none;';
    displayButton.style = 'display: none';

    
    myLibrary.push(new Book(bookName, bookAuthor, bookPages, bookRead));


    addBooksToLibrary();

});



function addBooksToLibrary() {

    tableBody.innerHTML = "";

    for (let n = 0; n < myLibrary.length; n++) {

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');

        let updateButton = document.createElement('button');
        updateButton.textContent = "Update";
        updateButton.classList.add('btn', 'btn-sm', 'btn-success');
        updateButton.style = 'color: white; background-color: rgba(0, 255, 150, 0.6); border: 1px solid transparent;';

        let deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
        deleteButton.style = 'color: white; background-color: rgba(255, 0, 150, 0.6); border: 1px solid transparent;';

        let readButton = document.createElement('button');
        readButton.textContent = `${myLibrary[n].read}`;
        readButton.classList.add('btn', 'btn-sm', 'btn-primary');

        if (readButton.textContent == 'Read') {
            readButton.style = 'color: white; background-color: rgba(0, 255, 150, 0.6); border: 1px solid transparent;';
        } else {
            readButton.style = 'color: white; background-color: rgba(255, 0, 150, 0.6); border: 1px solid transparent;';
        }

        readButton.addEventListener('click', function() {

            if (readButton.textContent == 'Read') {
                myLibrary[n].read = 'Not Read';
                readButton.textContent = 'Not Read';
                readButton.style = 'color: white; background-color: rgba(255, 0, 150, 0.6); border: 1px solid transparent;';
            } else {
                myLibrary[n].read = 'Read';
                readButton.textContent = 'Read';
                readButton.style = 'color: white; background-color: rgba(0, 255, 150, 0.6); border: 1px solid transparent;';

            }

        });


        td1.textContent = `${myLibrary[n].name}`;
        td2.textContent = `${myLibrary[n].author}`;
        td3.textContent = `${myLibrary[n].pages}`;
        td5.appendChild(readButton);
        td4.appendChild(deleteButton);
        td4.appendChild(updateButton);

        

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td5);
        tr.appendChild(td4);

        tableBody.appendChild(tr);

        deleteButton.addEventListener('click', function() {
            
            myLibrary[n] = undefined;

            let library = myLibrary.filter(item => item != undefined);

            myLibrary = library;
            addBooksToLibrary();

        });

        updateButton.addEventListener('click', function() {

            i = n;

            displayForm();

            saveButton.style = 'display: none;';
            updateB.style = 'display: block;';

            let bookName = form.querySelector('#name');
            let bookAuthor = form.querySelector('#author');
            let bookPages = form.querySelector('#pages');
            let bookRead = form.querySelector('#read');


            bookName.value = myLibrary[n].name;
            bookAuthor.value = myLibrary[n].author;
            bookPages.value = myLibrary[n].pages;
            bookRead.value = myLibrary[n].read;

        });

    }

}

updateB.addEventListener('click', function(event) {

    event.preventDefault();


    let bookName = form.querySelector('#name').value;
    let bookAuthor = form.querySelector('#author').value;
    let bookPages = form.querySelector('#pages').value;
    let bookRead = form.querySelector('#read').value;

    myLibrary[i].name = bookName;
    myLibrary[i].author = bookAuthor;
    myLibrary[i].pages = bookPages;
    myLibrary[i].read = bookRead;

        
    table.style = 'text-align: center;';
    addButton.style = '';

    form.style = 'display: none;';
    displayButton.style = 'display: none';
    
    addBooksToLibrary();

    

});
