import './style.css';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'


import { populateCalendar, homeCalendar, workCalendar, schoolCalendar, updateCalendar, displayAll, addGlobalTask } from './calendar';


populateCalendar();
updateCalendar();

const days = document.querySelector('#days');
const calendar = document.querySelector('#calendar');


const displayAllTasksByYear = document.querySelector('#header-display-all');
const addGlobal = document.querySelector('#header-plus');
const displayAllLink = document.querySelector('#display-all')
const homeLink = document.querySelector('#home-link');
const workLink = document.querySelector('#work-link');
const schoolLink = document.querySelector('#school-link');


homeLink.addEventListener('click', function(event) {
    event.preventDefault();
    homeLink.classList.add('active');
    schoolLink.classList.remove('active');
    workLink.classList.remove('active');
    displayAllLink.classList.remove('active');
    homeCalendar();
});


workLink.addEventListener('click', function(event) {
    event.preventDefault();
    homeLink.classList.remove('active');
    schoolLink.classList.remove('active');
    displayAllLink.classList.remove('active');
    workLink.classList.add('active');
    workCalendar();
});

schoolLink.addEventListener('click', function(event) {
    event.preventDefault();
    homeLink.classList.remove('active');
    workLink.classList.remove('active');
    displayAllLink.classList.remove('active');
    schoolLink.classList.add('active');   
    schoolCalendar();
});


displayAllLink.addEventListener('click', function(event) {
    event.preventDefault();
    days.innerHTML = "";
    calendar.innerHTML = "";
    homeLink.classList.remove('active');
    workLink.classList.remove('active');
    schoolLink.classList.remove('active');
    displayAllLink.classList.add('active');
    populateCalendar();

});

displayAllTasksByYear.addEventListener('click', function(event){
    event.preventDefault();
    displayAll();
});

addGlobal.addEventListener('click', function(event) {
    event.preventDefault();
    addGlobalTask();
});