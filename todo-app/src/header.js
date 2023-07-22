
import { makeCalendarItemsClickable, calendar, populateCalendar } from "./calendar";

const taskContainer = document.querySelector('.task-container');
const taskContent = taskContainer.querySelector('#task-tasks');
const formContainer = document.querySelector('#global-form-container');



const days = document.querySelector('#days');
const calendarContent = document.querySelector('#calendar');



const displayAllTasks = function(yearContainer, displayTasksH3) {


    taskContainer.classList.add('animate__animated', 'animate__fadeIn');

    
    const checkPrio = function(key, value, tasks, currTask, currHigh, currMedium, currLow) {



        if (currTask.priority == 'High') {

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
           
            span.textContent = `  ${currTask.description}`;
            currHigh.appendChild(p);

            a.onclick = function(event) {
                event.preventDefault();
                
                tasks[key] = tasks[key].filter(k => k != tasks[key][value]);
                days.innerHTML = "";
                calendarContent.innerHTML = "";
                populateCalendar();
                
                currHigh.removeChild(p);
                currHigh.removeChild(tit);
                
            };

        }

        if (currTask.priority == 'Medium') {

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

            span.textContent = `  ${currTask.description}`;
            currMedium.appendChild(p);

            a.onclick = function(event) {
                event.preventDefault();
                
                tasks[key] = tasks[key].filter(k => k != tasks[key][value]);
                days.innerHTML = "";
                calendarContent.innerHTML = "";
                populateCalendar();

                currMedium.removeChild(p);
                currMedium.removeChild(tit);
                
            };
        }

        if (currTask.priority == 'Low') {

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
                
                tasks[key] = tasks[key].filter(k => k != tasks[key][value]);
            
                days.innerHTML = "";
                calendarContent.innerHTML = "";
                populateCalendar();

                currLow.removeChild(p);
                currLow.removeChild(tit);
                
            };
        }

    }


    displayTasksH3.textContent = "List of Tasks";
    taskContent.innerHTML = "";
    let keys = yearContainer.keys();
    taskContainer.style.display = 'block';




    for (let year of keys) {
        

        const yearDiv = document.createElement('div');
        const yearH3 = document.createElement('h3');
        yearH3.textContent = year;
        yearDiv.appendChild(yearH3);
        taskContent.appendChild(yearDiv);


        for (let month of yearContainer.get(year).keys()) {

            if (yearContainer.get(year).get(month).length > 0) {

                const monthDiv = document.createElement('div');

                
                for (let day in yearContainer.get(year).get(month)) {

                    let tasks = yearContainer.get(year).get(month)[day].tasks;
                    
                    if (tasks.home.length > 0 || tasks.work.length > 0 || tasks.school.length > 0) {
                            
                        const dayDiv = document.createElement('div');
                        const monthH3 = document.createElement('h3');
                        monthH3.textContent = day + " " + calendar().months[month];
                        
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
                        
                        
                        for (let key in tasks) {
    
                            for (let value in tasks[key]) {
    
                                let currTask = tasks[key][value];
    
                                if (currTask != undefined) {
                                    
                                    if (currTask.project == 'home') {
                                        homeH3.textContent = 'Home';
                                        checkPrio(key, value, tasks, currTask, homeHigh, homeMedium, homeLow);
                                    }
    
                                    if (currTask.project == 'work') {
                                        workH3.textContent = 'Work';
                                        checkPrio(key, value, tasks, currTask, workHigh, workMedium, workLow);
                                    }
    
                                    if (currTask.project == 'school') {
                                        schoolH3.textContent = 'School';
                                        checkPrio(key, value, tasks, currTask, schoolHigh, schoolMedium, schoolLow);
                                    }
    
                                }
    
                            }
    
                        }
                        
    
                        dayDiv.appendChild(monthH3);
                        dayDiv.appendChild(home);
                        dayDiv.appendChild(work);
                        dayDiv.appendChild(school);
                        dayDiv.style.border = '0.1px solid grey';
                        dayDiv.style.padding = '10px';
                        dayDiv.style.margin = '10px';
                        monthDiv.appendChild(dayDiv);

                    } else {
                        
                        taskContent.innerHTML = "";
                    
                    }



                }

                taskContent.appendChild(monthDiv);


            }
           

        }

    } 



}

const addTaskGlobally = function(currentMonth, currentYear, dayContainer, dayFactory, taskFactory, yearContainer, monthContainer) {


    const form = formContainer.querySelector('#global-form form');
    const formWrapper = formContainer.querySelector('#global-form');

    const taskDate = form.querySelector('#task-date');
    const closeTaskDate = form.querySelector('#close-task-date');
    taskDate.min = new Date().toISOString().split('T')[0];


    formContainer.style.display = 'block';
    closeTaskDate.textContent = 'Add Task';
    closeTaskDate.style = "font-weight: bold; font-size: 1.5em";
    formWrapper.classList.add('animate__animated', 'animate__fadeIn');

    form.onsubmit = function(event) {
        event.preventDefault();

        const title = form.querySelector('#title');
        const description = form.querySelector('#description');
        const project = form.querySelector('#project');
        const priority = form.querySelector('#priority');


        const date = new Date(Date.parse(taskDate.value));

  

        const year = date.getFullYear();
        const day = date.getDate();
        const month = date.getMonth();



        if (!yearContainer.has(year)) {
            monthContainer.set(month, []);
            yearContainer.set(year, monthContainer);
        } else if (yearContainer.get(year).get(month) == undefined){

            yearContainer.get(year).set(month, []);
        }

        if (yearContainer.get(year).get(month)[day] == undefined) {

            yearContainer.get(year).get(month)[day] = dayContainer[day];
        
        }

        let submittedDate = yearContainer.get(year).get(month)[day];

        submittedDate.addTask(taskFactory(title.value, description.value, priority.value, project.value));
        

        calendarContent.innerHTML = "";
        days.innerHTML = "";
        
        populateCalendar();
        formContainer.style.display = 'none';
        

    }
}

export { displayAllTasks, addTaskGlobally };