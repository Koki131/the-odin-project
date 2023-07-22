
import { populateCalendarDynamically } from "./project";
import { displayAllTasks } from "./header";
import { addTaskGlobally } from "./header";

import 'animate.css';

let date = new Date();
let day = date.getDate();
let year = date.getFullYear();
let month = date.getMonth();

let calendarStart = 1;

const currentMonth = month;
const currentYear = year;

const calendarContent = document.querySelector('#calendar');
const days = document.querySelector('#days');
const selectedMonthYear = document.querySelector('#month-year');


const yearContainer = new Map();
let monthContainer = new Map();
const dayContainer = {};




const dayFactory = function(day) {

    let tasks = {
        home: [],
        school: [],
        work: []
    };


    const addProjectTask = function(task, project) {

        tasks[project].push(task);

    }


    const addTask = function(task) {

        switch (task.project) {
            case "home":
                tasks.home.push(task);
                break;
            case "school":
                tasks.school.push(task);
                break;
            case "work":
                tasks.work.push(task);
                break;
        }

    }

    return { day, tasks, addTask, addProjectTask };


}

const taskFactory = function(title, description, priority, project) {

    
    
    return { title, description, priority, project };
}


const calendar = function() {


    let firstDay = new Date(year, month, 1).getDay();


    let lastDate = new Date(year, month + 1, 0).getDate();

    let previousMonthLastDate = new Date(year, month, 0).getDate();

    const days = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday", "Saturday" 
    ];

    const months = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    return {firstDay, lastDate, previousMonthLastDate, days, months};

}


const populateCalendar = function() {

    for (let i = 0; i < 12; i++) {

        if (!monthContainer.has(i)) {
            monthContainer.set(i, []);
        }

    }

    if (!yearContainer.has(year)) {
        yearContainer.set(year, new Map());
    }



    const calendarDays = calendar().days;
    const calendarMonths = calendar().months;

    let firstDayOfMonth = calendar().firstDay;
    let lastDateOfPreviousMonth = calendar().previousMonthLastDate;
    let lastDateOfCurrMonth = calendar().lastDate;

    for (let i = 0; i < calendarDays.length; i++) {
        
        const div = document.createElement('div');
        div.classList.add('animate__animated', 'animate__fadeIn');
        div.textContent = calendarDays[i];

        days.appendChild(div);

    }

    for (let i = firstDayOfMonth; i > 0; i--) {

        const div = document.createElement('div');
        div.classList.add('animate__animated', 'animate__fadeIn');
        div.classList.add("previous-month-date");
        div.textContent = lastDateOfPreviousMonth - i + 1;

        calendarContent.appendChild(div);

    }
    
    if (month == currentMonth) {
        calendarStart = day;
    } else {
        calendarStart = 1;
    }

    for (let i = calendarStart; i <= lastDateOfCurrMonth; i++) {

        const div = document.createElement('div');
        const divDate = document.createElement('div');
        const divTasks = document.createElement('div');
        const divAddTask = document.createElement('div');
        const plusContainer = document.createElement('div');
        const plusSymbol = document.createElement('i');

        div.classList.add('animate__animated', 'animate__fadeIn');
        div.classList.add('current-month-date');
        divDate.classList.add('div-date');
        divTasks.classList.add('div-tasks');
        divAddTask.classList.add('div-add-task');
        plusSymbol.classList.add("fa-solid", "fa-plus");
        plusContainer.classList.add('plus-container');

        
        dayContainer[i] = dayFactory(i);
        
        try {
            
            let getTasks = yearContainer.get(year).get(month)[i].tasks;
            let taskLength = getTasks.home.length + getTasks.work.length + getTasks.school.length;
         
            if (taskLength > 0) {
                divTasks.style.backgroundColor = '#E1EBEE';
            } else { 
                divTasks.style.backgroundColor = 'white';
            }


            taskLength = taskLength == 1 ? taskLength + " task" : taskLength + " tasks";

            divTasks.textContent = taskLength;

            
        
        } catch (error) {

            let taskLength = dayContainer[i].tasks.home.length + dayContainer[i].tasks.work.length + dayContainer[i].tasks.school.length;
       
            if (taskLength > 0) {
                divTasks.style.backgroundColor = '#E1EBEE';
            } else { 
                divTasks.style.backgroundColor = 'white';
            }

            taskLength = taskLength == 1 ? taskLength + " task" : taskLength + " tasks";

            divTasks.textContent = taskLength;


        }


        divDate.textContent = dayContainer[i].day;
   
        plusContainer.appendChild(plusSymbol);    
        divAddTask.appendChild(plusContainer);    
        div.appendChild(divDate);
        div.appendChild(divTasks);
        div.appendChild(divAddTask);


        calendarContent.appendChild(div);
    }



    selectedMonthYear.textContent = calendarMonths[month] + " " + year;

    makeCalendarItemsClickable(calendarContent);


};




const addTaskH3 = document.createElement('h3');
const displayTasksH3 = document.createElement('h3');


const makeCalendarItemsClickable = function(calendarContent) {

    const currentMonthDate = calendarContent.querySelectorAll('.current-month-date');
    const formContainer = document.querySelector('.form-container');
    const globalFormContainer = document.querySelector('#global-form-container');
    const taskContainer = document.querySelector('.task-container');

    const title = document.querySelector('#title');
    const description = document.querySelector('#description');
    const priority = document.querySelector('#priority');
    const project = document.querySelector('#project');
    project.style.display = '';


    const form = formContainer.querySelector('.form form');
    
    const formWrapper = formContainer.querySelector('.form');

    const closeLink = document.querySelectorAll('#close a');
    
    const dateClose = document.querySelector('#close-task-date');

    const taskDate = document.querySelector('#display-task-date');

    
    dateClose.appendChild(addTaskH3);


    const addTask = function(divTasks, divDate) {
        
        addTaskH3.textContent = `${divDate} ${calendar().months[month]} ${year}`;


         form.onsubmit = function(event) {
                 
            event.preventDefault();

            
            monthContainer.get(month)[divDate] = dayContainer[divDate];
            yearContainer.set(year, monthContainer);

            let clickedDate = yearContainer.get(year).get(month)[divDate];

                
            clickedDate.addTask(taskFactory(title.value, description.value, priority.value, project.value));
            
            let taskLength = clickedDate.tasks.home.length + clickedDate.tasks.work.length + clickedDate.tasks.school.length;

            taskLength = taskLength == 1 ? taskLength + " task" : taskLength + " tasks";

            divTasks.style.backgroundColor = '#E1EBEE';

            divTasks.textContent = taskLength;
        
            formContainer.style.display = 'none';

        }

        

    }


    closeLink.forEach(link => {

        link.addEventListener('click', function(event) {

            event.preventDefault();
            globalFormContainer.style.display = 'none';
            formContainer.style.display = 'none';
            taskContainer.style.display = 'none';

        });

    });


    const displayTasks = function(divTasks, divDate) {


        displayTasksH3.textContent = `${divDate} ${calendar().months[month]} ${year}`;
        taskContainer.style.display = 'flex';

        
        const tasks = document.querySelector('#task-tasks');

        tasks.innerHTML = "";
        taskDate.appendChild(displayTasksH3);

        const home = document.createElement('div');
        const homeH3 = document.createElement('h3');
        const homeHigh = document.createElement('div');
        const homeMedium = document.createElement('div');
        const homeLow = document.createElement('div');

        const work = document.createElement('div');
        const workH3 = document.createElement('h3');
        const workHigh = document.createElement('div');
        const workMedium = document.createElement('div');
        const workLow = document.createElement('div');

        const school = document.createElement('div');
        const schoolH3 = document.createElement('h3');
        const schoolHigh = document.createElement('div');
        const schoolMedium = document.createElement('div');
        const schoolLow = document.createElement('div');
        
        home.appendChild(homeH3);
        work.appendChild(workH3);
        school.appendChild(schoolH3);

        home.appendChild(homeHigh);
        home.appendChild(homeMedium);
        home.appendChild(homeLow);

        work.appendChild(workHigh);
        work.appendChild(workMedium);
        work.appendChild(workLow);

        school.appendChild(schoolHigh);
        school.appendChild(schoolMedium);
        school.appendChild(schoolLow);

        tasks.appendChild(home);
        tasks.appendChild(work);
        tasks.appendChild(school);

        try {
            
            
            let clickedTasks = yearContainer.get(year).get(month)[divDate].tasks;
            

            
            for (let key in clickedTasks) {
                
                for (let value in clickedTasks[key]) {
                    
                    let currTask = clickedTasks[key][value];

                    switch (currTask.project) {
                        case "home":

                            homeH3.textContent = "Home";
                            home.style.border = '0.1px solid grey';
                            home.style.margin = '10px';
                            home.style.padding = '10px';

                            checkPriority(divTasks, value, clickedTasks, key, currTask, homeHigh, homeMedium, homeLow);

                            break;
                        case "work":

                            workH3.textContent = "Work";
                            work.style.border = '0.1px solid grey';
                            work.style.margin = '10px';
                            work.style.padding = '10px';

                            checkPriority(divTasks, value, clickedTasks, key, currTask, workHigh, workMedium, workLow);

                            break;
                        case "school":

                            schoolH3.textContent = "School";
                            school.style.border = '0.1px solid grey';
                            school.style.margin = '10px';
                            school.style.padding = '10px';

                            checkPriority(divTasks, value, clickedTasks, key, currTask, schoolHigh, schoolMedium, schoolLow);

                            break;
                    }

                }

            }


        } catch (error) {

        }

    }


    const checkPriority = function(divTasks, value, clickedTasks, key, currTask, currHigh, currMedium, currLow) {

        let len = clickedTasks[key].length;

        if (currTask.priority == "High") {
            
            const tit = document.createElement('div');
            const h4 = document.createElement('h4');
            const p = document.createElement('p');
            const a = document.createElement('a');
            const i = document.createElement('i');
            const span = document.createElement('span');
            


            h4.textContent = `${currTask.title}`;
            tit.appendChild(h4);
            currHigh.appendChild(tit);
            
            i.style.color = "red";
            i.classList.add("fa-regular", "fa-circle");
            a.appendChild(i);
            p.appendChild(a);
            p.appendChild(span);
           
            span.textContent = `   ${currTask.description}`;
            currHigh.appendChild(p);

            a.onclick = function(event) {
                event.preventDefault();
                
                clickedTasks[key] = clickedTasks[key].filter(k => k != clickedTasks[key][value]);

                currHigh.removeChild(p);
                currHigh.removeChild(tit);
                len = clickedTasks.home.length + clickedTasks.work.length + clickedTasks.school.length;
                divTasks.textContent = len == 1 ? len + " task" : len + " tasks";

                if (len > 0) {
                    divTasks.style.backgroundColor = '#E1EBEE';
                } else { 
                    divTasks.style.backgroundColor = 'white';
                }
            
            };

        }

        if (currTask.priority == "Medium") {

            const tit = document.createElement('div');
            const h4 = document.createElement('h4');
            const p = document.createElement('p');
            const a = document.createElement('a');
            const i = document.createElement('i');
            const span = document.createElement('span');

            h4.textContent = `${currTask.title}`;
            tit.appendChild(h4);
            currMedium.appendChild(tit);

            i.style.color = "orange";
            i.classList.add("fa-regular", "fa-circle");
            a.appendChild(i);
            p.appendChild(a);
            p.appendChild(span);

            span.textContent = `    ${currTask.description}`;
            currMedium.appendChild(p);

            a.onclick = function(event) {
                event.preventDefault();
                clickedTasks[key] = clickedTasks[key].filter(k => k != clickedTasks[key][value]);
             
                currMedium.removeChild(p);
                currMedium.removeChild(tit);

                len = clickedTasks.home.length + clickedTasks.work.length + clickedTasks.school.length;
                divTasks.textContent = len == 1 ? len + " task" : len + " tasks";

                if (len > 0) {
                    divTasks.style.backgroundColor = '#E1EBEE';
                } else { 
                    divTasks.style.backgroundColor = 'white';
                }
            };

        }

        
        if (currTask.priority == "Low") {

            const tit = document.createElement('div');
            const h4 = document.createElement('h4');
            const p = document.createElement('p');
            const a = document.createElement('a');
            const i = document.createElement('i');
            const span = document.createElement('span');

            h4.textContent = `${currTask.title}`;
            tit.appendChild(h4);
            currLow.appendChild(tit);

            i.style.color = "grey";
            i.classList.add("fa-regular", "fa-circle");
            a.appendChild(i);
            p.appendChild(a);
            p.appendChild(span);
           
            span.textContent = `  ${currTask.description}`;
            currLow.appendChild(p);

            a.onclick = function(event) {

                event.preventDefault();
                clickedTasks[key] = clickedTasks[key].filter(k => k != clickedTasks[key][value]);

                currLow.removeChild(p);
                currLow.removeChild(tit);

               
                len = clickedTasks.home.length + clickedTasks.work.length + clickedTasks.school.length;
                divTasks.textContent = len == 1 ? len + " task" : len + " tasks";

                if (len > 0) {
                    divTasks.style.backgroundColor = '#E1EBEE';
                } else { 
                    divTasks.style.backgroundColor = 'white';
                }
            };
        }





    }



    currentMonthDate.forEach(e => {

        const divDate = e.childNodes[0].textContent;
        const divTasks = e.childNodes[1];
        const divAddTask = e.childNodes[2];

        const plusSymbol = divAddTask.childNodes[0];


        divTasks.addEventListener('click', function() {
            displayTasks(divTasks, divDate);
            taskContainer.classList.add('animate__animated', 'animate__fadeIn');
        });
        
        plusSymbol.addEventListener('click', function() {

            

            formContainer.style.display = 'block';
            formWrapper.classList.add('animate__animated', 'animate__fadeIn');

            addTask(divTasks, divDate);
            


        });


    });

    return {checkPriority};

}


const updateCalendar = function() {

    
    const arrowRight = document.querySelector('#arrow-right');
    const arrowLeft = document.querySelector('#arrow-left');

    arrowRight.addEventListener('click', function() {

        if (month == 11) {
            year++;
            month = -1;
            monthContainer = new Map();
        }


        month++;


        calendarContent.innerHTML = "";
        days.innerHTML = "";
        selectedMonthYear.innerHTML = "";
        populateCalendar();
        checkActive();
        

    });

    arrowLeft.addEventListener('click', function() {
        
        
        if (month == 0) {
            year--;
            month = 12;
            
            if (yearContainer.has(year)) {
                monthContainer = yearContainer.get(year);
            } else {
                monthContainer = new Map();
            }

        }

        if (year > currentYear || month > currentMonth) {
           
            month--;

            calendarContent.innerHTML = "";
            days.innerHTML = "";
            selectedMonthYear.innerHTML = "";
            populateCalendar();
            checkActive();
        
        } 



    });


}

const checkActive = function() {
    
    const homeLink = document.querySelector('#home-link');
    const workLink = document.querySelector('#work-link');
    const schoolLink = document.querySelector('#school-link');


    if (homeLink.className == "active") {
        homeCalendar();
    } else if (workLink.className == "active") {
        workCalendar();
    } else if (schoolLink.className == "active") {
        schoolCalendar();
    } else {
        days.innerHTML = "";
        calendarContent.innerHTML = "";
        populateCalendar();
    }

}


const homeCalendar = function() {
    populateCalendarDynamically(taskFactory, addTaskH3, displayTasksH3, calendar, dayFactory, "home", year, month, currentMonth, day, calendarContent, days, selectedMonthYear, yearContainer, monthContainer, dayContainer);
}
const workCalendar = function() { 
    populateCalendarDynamically(taskFactory, addTaskH3, displayTasksH3, calendar, dayFactory, "work", year, month, currentMonth, day, calendarContent, days, selectedMonthYear, yearContainer, monthContainer, dayContainer);
}
const schoolCalendar = function() {
    populateCalendarDynamically(taskFactory, addTaskH3, displayTasksH3, calendar, dayFactory, "school", year, month, currentMonth, day, calendarContent, days, selectedMonthYear, yearContainer, monthContainer, dayContainer);
}
const displayAll = function() {
    displayAllTasks(yearContainer, displayTasksH3);
}

const addGlobalTask = function() {
    addTaskGlobally(currentMonth, currentYear, dayContainer, dayFactory, taskFactory, yearContainer, monthContainer);
}

export { calendar, homeCalendar, workCalendar, schoolCalendar, populateCalendar, updateCalendar, displayAll, makeCalendarItemsClickable, addGlobalTask };


