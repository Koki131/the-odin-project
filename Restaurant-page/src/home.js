import 'animate.css';


const textContentFactory = function(h3, pDiv, p) {

    return {h3, pDiv, p};
}

const homeContent = function(content, image) {

    
    const contentContainer = document.createElement('div');
    

    const imageContainer = document.createElement('div');
    const imageHeaderContainer = document.createElement('div');
    const imageContent = document.createElement('div');
    const imageHeader = document.createElement('h2');
    
    imageContainer.classList.remove('animate__animated', 'animate__fadeInLeft');
    imageContainer.classList.add('animate__animated', 'animate__fadeInLeft');


    const textContainer = document.createElement('div');
    const aboutContainer = document.createElement('div');
    const hoursContainer = document.createElement('div');
    const locationContainer = document.createElement('div');

    textContainer.classList.remove('animate__animated', 'animate__fadeInRight');
    textContainer.classList.add('animate__animated', 'animate__fadeInRight');
    
    contentContainer.id = 'content-container';
    
    imageContainer.id = 'image-container';
    imageHeaderContainer.id = 'image-header-container';
    imageContent.id = 'image-content';
    imageHeader.textContent = "Moon Restaurant";
    
    textContainer.id = 'text-container';
    aboutContainer.id = 'about-container';
    hoursContainer.id = 'hours-container';
    locationContainer.id = 'location-container';


    const img = new Image();
    
    img.src = image;

    imageHeaderContainer.appendChild(imageHeader);
    imageContent.appendChild(img);
    imageContainer.appendChild(imageHeaderContainer);
    imageContainer.appendChild(imageContent);

    textContainer.appendChild(aboutContainer);
    textContainer.appendChild(hoursContainer);
    textContainer.appendChild(locationContainer);

    const textContainerDivs = textContainer.querySelectorAll('div');

    const textContentObj = {};
    let count = 0;

    textContainerDivs.forEach(div => {

        div.classList.add('text-grid-container');

        const divOne = document.createElement('div');
        const divTwo = document.createElement('div');
        
        const pDiv = document.createElement('div');
        pDiv.classList.add('p-div');

        const h3 = document.createElement('h3');
        const p = document.createElement('p');

        pDiv.appendChild(p);


        divOne.id = div.id + '-header';
        divTwo.id = div.id + '-content';

        divOne.appendChild(h3);
        divTwo.appendChild(pDiv);
        div.appendChild(divOne);
        div.appendChild(divTwo);

        textContentObj[count] = textContentFactory(h3, pDiv, p);
        count++; 


    });

    textContentObj[0].h3.textContent = "About";
    textContentObj[0].p.textContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley" + 
    "of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." + 
    "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    const listItems = [
        "Monday CLOSED",
        "Tuesday 8:00 - 22:00",
        "Wednesday 8:00 - 22:00",
        "Thursday 8:00 - 22:00",
        "Friday 8:00 - 02:00",
        "Saturday 8:00 - 02:00",
        "Sunday 8:00 - 22:00"
    ];

    textContentObj[1].h3.textContent = "Hours";
    textContentObj[1].pDiv.style = '';

    const ul = document.createElement('ul');

    for (let n = 0; n < 7; n++) {

        const li = document.createElement('li');

        li.textContent = listItems[n];

        ul.appendChild(li);

    }

    textContentObj[1].pDiv.appendChild(ul);


    const textContentUl = textContentObj[1].pDiv.querySelector('ul');
    const textContentLi = textContentUl.querySelectorAll('li');
    
    textContentUl.style = 'list-style-type: none;';
    textContentLi.forEach(li => {
        li.style = 'display: inline-block; padding: 10px;';
    });


    textContentObj[2].h3.textContent = "Location";
    textContentObj[2].p.textContent = "P. Sherman, 42 Wallaby Way, Sydney";

    contentContainer.appendChild(imageContainer);
    contentContainer.appendChild(textContainer);
    content.appendChild(contentContainer);


}

export {homeContent};