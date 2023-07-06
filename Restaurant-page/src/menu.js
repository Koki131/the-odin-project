import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

import 'animate.css';

import pancake from './images/pancake.jpg';
import pasta from './images/pasta.jpg';
import ramen from './images/ramen.jpg';
import rice from './images/rice.jpg';
import sandwich from './images/sandwich.jpg';
import something from './images/something.jpg';
import steak from './images/steak.jpg';

const menuFactory = function(h3, p) {

    return {h3, p};
}

const menuItems = {};

export function menuContent(content) {

    const menuItems = {};

    const images = [pancake, pasta, ramen, rice, sandwich, something, steak];

    const menuContentContainer = document.createElement('div');
    menuContentContainer.id = "menu-content-container";


    const h2Div = document.createElement('div');
    h2Div.id = 'h2-div';
    const h2 = document.createElement('h2');
    h2.textContent = "Specialties";
    h2Div.appendChild(h2);
    menuContentContainer.appendChild(h2Div);

    h2.classList.remove('animate__animated', 'animate__fadeInDown');
    h2.classList.add('animate__animated', 'animate__fadeInDown');

    const owlContainer = document.createElement('div');
    owlContainer.classList.add("owl-carousel", "owl-theme");

    owlContainer.classList.remove('animate__animated', 'animate__fadeInUp');
    owlContainer.classList.add('animate__animated', 'animate__fadeInUp');

    for (let i = 0; i < 7; i++) {
        const div = document.createElement('div');
        const menuLayer = document.createElement('div');
        menuLayer.classList.add('menu-layer');
        
        const menuHeader = document.createElement('h3');
        const menuText = document.createElement('p');

        menuItems[i] = menuFactory(menuHeader, menuText);

        div.classList.add('item');
        
        const img = new Image();

        img.src = images[i];

        div.appendChild(img);
        menuLayer.appendChild(menuHeader);
        menuLayer.appendChild(menuText);
        div.appendChild(menuLayer);
        
        owlContainer.appendChild(div);

    }

    menuItems[0].h3.textContent = "Lorem Ipsum";
    menuItems[0].p.textContent = "Lorem Ipsum";
    menuItems[1].h3.textContent = "Lorem Ipsum";
    menuItems[1].p.textContent = "Lorem Ipsum";
    menuItems[2].h3.textContent = "Lorem Ipsum";
    menuItems[2].p.textContent = "Lorem Ipsum";
    menuItems[3].h3.textContent = "Lorem Ipsum";
    menuItems[3].p.textContent = "Lorem Ipsum";
    menuItems[4].h3.textContent = "Lorem Ipsum";
    menuItems[4].p.textContent = "Lorem Ipsum";
    menuItems[5].h3.textContent = "Lorem Ipsum";
    menuItems[5].p.textContent = "Lorem Ipsum";
    menuItems[6].h3.textContent = "Lorem Ipsum";
    menuItems[6].p.textContent = "Lorem Ipsum";


    menuContentContainer.appendChild(owlContainer);
    content.appendChild(menuContentContainer);


    $('.owl-carousel').owlCarousel({
        loop:true,
        autoplay: true,
        autoplayHoverPause: true,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000: {
                items:2
            },
            1600:{
                items:3
            }
        }
    })

}

