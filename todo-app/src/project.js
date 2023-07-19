import { makeCalendarItemsClickable as clickableItems } from "./calendar";

const projectsLink = document.querySelector('#projects-link');
const dropdownContent = document.querySelector('#dropdown-content');
const projectsLinkI = projectsLink.querySelector('i');


projectsLink.addEventListener('click', function() {

    if (projectsLink.className == 'active') {

        dropdownContent.style.display = 'none';
        projectsLink.classList.remove('active');

    } else {

        dropdownContent.style.display = 'flex';
        projectsLink.classList.add('active');
    }


});



const populateCalendarDynamically = function(taskFactory, addTaskH3, displayTasksH3, calendar, dayFactory, project, year, month,  calendarContent, days, selectedMonthYear, yearContainer, monthContainer, dayContainer) {
    

        let count = 1;

        const divTasks = document.querySelectorAll('.div-tasks');

        
        divTasks.forEach(div => {

            try {
            
                let getTasks = yearContainer.get(year).get(month)[count].tasks;

                let taskLength =  getTasks[project].length;

                if (taskLength > 0) {
                    div.style.backgroundColor = '#E1EBEE';
                } else { 
                    div.style.backgroundColor = 'white';
                }

                taskLength = taskLength == 1 ? taskLength + " task" : taskLength + " tasks";
    
    
                div.textContent = taskLength;



            
            } catch (error) {
    
                let taskLength = dayContainer[count].tasks[project].length;

                if (taskLength > 0) {
                    div.style.backgroundColor = '#E1EBEE';
                } else { 
                    div.style.backgroundColor = 'white';
                }

                taskLength = taskLength == 1 ? taskLength + " task" : taskLength + " tasks";

                div.textContent = taskLength;



            
            }

            count++;
    


        });



    makeCalendarItemsClickable(taskFactory, addTaskH3, displayTasksH3, calendar, dayFactory, project, year, month,  calendarContent, days, selectedMonthYear, yearContainer, monthContainer, dayContainer);


};


const makeCalendarItemsClickable = function(taskFactory, addTaskH3, displayTasksH3, calendar, dayFactory, project, year, month,  calendarContent, days, selectedMonthYear, yearContainer, monthContainer, dayContainer) {

    const currentMonthDate = calendarContent.querySelectorAll('.current-month-date');
    const formContainer = document.querySelector('.form-container');
    const taskContainer = document.querySelector('.task-container');

    const title = document.querySelector('#title');
    const description = document.querySelector('#description');
    const priority = document.querySelector('#priority');
    const proj = document.querySelector('#project');
    proj.style.display = 'none';
    const form = document.querySelector('.form form');

    const closeLink = document.querySelectorAll('#close a');
    
    const dateClose = document.querySelector('#close-task-date');

    const taskDate = document.querySelector('#task-date');

    
    dateClose.appendChild(addTaskH3);
    taskDate.appendChild(displayTasksH3);

    const addTask = function(divTasks, divDate) {
        
        addTaskH3.textContent = `${divDate} ${calendar().months[month]} ${year}`;
        
        let clickedDate = yearContainer.get(year).get(month)[divDate];


         form.onsubmit = function(event) {
                 
            event.preventDefault();

                
            clickedDate.addProjectTask(taskFactory(title.value, description.value, priority.value, project), project);

            
            let taskLength = clickedDate.tasks[project].length + " tasks";

            divTasks.style.backgroundColor = '#E1EBEE';

            divTasks.textContent = taskLength;
        
            formContainer.style.display = 'none';

        }

        

    }


    closeLink.forEach(link => {

        link.addEventListener('click', function(event) {

            event.preventDefault();
    
            formContainer.style.display = 'none';
            taskContainer.style.display = 'none';

        });

    });


    const displayTasks = function(divTasks, divDate) {



        displayTasksH3.textContent = `${divDate} ${calendar().months[month]} ${year}`;
        taskContainer.style.display = 'flex';


        const tasks = document.querySelector('#task-tasks');

        tasks.innerHTML = "";

        const projectContainer = document.createElement('div');
        const h3 = document.createElement('h3');
        const high = document.createElement('div');
        const medium = document.createElement('div');
        const low = document.createElement('div');

        projectContainer.appendChild(h3);

        projectContainer.appendChild(high);
        projectContainer.appendChild(medium);
        projectContainer.appendChild(low);



        tasks.appendChild(projectContainer);


        try {
            
            
            let clickedTasks = yearContainer.get(year).get(month)[divDate].tasks;
            

            for (let key in clickedTasks) {
                
                for (let value in clickedTasks[key]) {
                    
                    let currTask = clickedTasks[key][value];

                    

                    if (currTask.project == project) {
                        h3.textContent = project;
                        clickableItems(calendarContent).checkPriority(divTasks, value, clickedTasks, key, currTask, high, medium, low);
                    }


                }

            }


        } catch (error) {

        }

    }



    currentMonthDate.forEach(e => {

        const divDate = e.childNodes[0].textContent;
        const divTasks = e.childNodes[1];
        const divAddTask = e.childNodes[2];

        divTasks.addEventListener('click', function() {
            displayTasks(divTasks, divDate);
        });
        
        divAddTask.addEventListener('click', function() {

            
            monthContainer.get(month)[divDate] = dayContainer[divDate];
            yearContainer.set(year, monthContainer);


            formContainer.style.display = 'block';


            addTask(divTasks, divDate);
            


        });


    });

}



export { populateCalendarDynamically };