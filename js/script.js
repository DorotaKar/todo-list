{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks, {content: newTaskContent }
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex +1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex +1),
        ]
        render();
    };

   
    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindtoggleDoneEvents = () => {
        const toggleDoneEvents = document.querySelectorAll(".js-done");
        
        toggleDoneEvents.forEach((toggleDoneEvents, taskIndex) => {
            toggleDoneEvents.addEventListener("click", () => {
                 toggleTaskDone(taskIndex);
        });
    });
    };

    const renderTasks = () => {
        let htmlString = " ";

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__item js-task">
                <button class="tasks__button tasks__button--taskDone js-done">${task.done ? "✓" : ""}</button>

                <span class=" tasks__content${task.done ? " tasks__content--done" : "" }"> ${task.content}</span>
            
               <button class="tasks__button tasks__button--remove js-remove">🗑</button>
            </li>
        `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

    };

    const render = () => {
        renderTasks();
        bindRemoveEvents();
        bindtoggleDoneEvents();
    };



    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}