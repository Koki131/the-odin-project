import 'animate.css';

export function contactContent(content, image) {

    const contactContainer = document.createElement('div');
    contactContainer.id = "contact-container";

    const imageContainer = document.createElement('div');
    const textContainer = document.createElement('div');
    imageContainer.id = 'contact-image-container';
    textContainer.id = 'contact-text-container';

    imageContainer.classList.remove('animate__animated', 'animate__fadeInLeft');
    imageContainer.classList.add('animate__animated', 'animate__fadeInLeft');

    textContainer.classList.remove('animate__animated', 'animate__fadeInRight');
    textContainer.classList.add('animate__animated', 'animate__fadeInRight');

    const imageHeader = document.createElement('div');
    const imageContentContainer = document.createElement('div');
    const h2 = document.createElement('h2');
    imageHeader.id = 'image-header';
    
    h2.textContent = "Contact Us";

    imageHeader.appendChild(h2);

    const img = new Image();

    img.src = image;

    imageContentContainer.appendChild(img);

    imageContainer.appendChild(imageHeader);
    imageContainer.appendChild(imageContentContainer);


    const locationDiv = document.createElement('div');
    locationDiv.id = 'location-div';
    const locationH4 = document.createElement('h4');
    locationH4.textContent = 'Location';
    const locationP = document.createElement('p');
    locationP.textContent = 'P. Sherman, 42 Wallaby Way, Sydney';
    locationDiv.appendChild(locationH4);
    locationDiv.appendChild(locationP);

    const phoneDiv = document.createElement('div');
    phoneDiv.id = 'phone-div';
    const phoneH4 = document.createElement('h4'); 
    phoneH4.textContent = 'Phone';
    const phoneP = document.createElement('p'); 
    phoneP.textContent = '+624 123 652';
    phoneDiv.appendChild(phoneH4);
    phoneDiv.appendChild(phoneP);
    
    const socialsDiv = document.createElement('div');
    socialsDiv.id = 'socials-div';
    const ul = document.createElement('ul');

    const li1 = document.createElement('li');
    const a1 = document.createElement('a');
    const i1 = document.createElement('i');
    a1.href = 'https://facebook.com';
    a1.appendChild(i1);
    i1.classList.add('fa-brands', 'fa-facebook-f');
    li1.appendChild(a1);
    
    const li2 = document.createElement('li');
    const a2 = document.createElement('a');
    const i2 = document.createElement('i');
    a2.href = 'https://linkedin.com';
    a2.appendChild(i2);
    i2.classList.add('fa-brands', 'fa-linkedin');
    li2.appendChild(a2);

    const li3 = document.createElement('li');
    const a3 = document.createElement('a');
    const i3 = document.createElement('i');
    a3.href = 'https://twitter.com';
    a3.appendChild(i3);
    i3.classList.add('fa-brands', 'fa-twitter');
    li3.appendChild(a3);

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    socialsDiv.appendChild(ul);
    
    textContainer.appendChild(locationDiv);
    textContainer.appendChild(phoneDiv);
    textContainer.appendChild(socialsDiv);

    contactContainer.appendChild(imageContainer);
    contactContainer.appendChild(textContainer);


    content.appendChild(contactContainer);

}