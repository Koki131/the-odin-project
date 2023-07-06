import './style.css';
import homeImage from './home.jpg';
import contentImage from './content.jpg';
import contactImage from './images/contact.jpg';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

import { homeContent } from './home';
import { menuContent } from './menu';
import { contactContent } from './contact';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';




const container = document.querySelector('#container');

(function createElements() {



    const header = document.createElement('div');
    const content = document.createElement('div');
    header.id = 'header';
    content.id = 'content';

    const home = document.createElement('button');
    const menu = document.createElement('button');
    const contact = document.createElement('button');
    const homeI = document.createElement('i');
    const menuI = document.createElement('i');
    const contactI = document.createElement('i');
    homeI.classList.add('fa-solid', 'fa-house');
    menuI.classList.add('fa-solid', 'fa-book-open');
    contactI.classList.add('fa-solid', 'fa-address-book');

    home.appendChild(homeI);
    menu.appendChild(menuI);
    contact.appendChild(contactI);

    header.appendChild(home);
    header.appendChild(menu);
    header.appendChild(contact);

    let img = new Image();

    img.onload = function(){
        container.style.backgroundImage = "url('" + img.src + "')";
    };

    img.src = homeImage;


    container.appendChild(header);
    container.appendChild(content);

    homeContent(content, contentImage);

    home.addEventListener('click', function() {
        home.classList.add('active');
        contact.classList.remove('active');
        menu.classList.remove('active');

        content.innerHTML = "";
        homeContent(content, contentImage);
    });
    
    menu.addEventListener('click', function() {
        home.classList.remove('active');
        contact.classList.remove('active');
        menu.classList.add('active');

        content.innerHTML = "";
        menuContent(content);
    });

    contact.addEventListener('click', function() {
        home.classList.remove('active');
        contact.classList.add('active');
        menu.classList.remove('active');

        content.innerHTML = "";
        contactContent(content, contactImage);
    });

})();


