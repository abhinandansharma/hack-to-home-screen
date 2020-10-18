/**
 * To-Do
 * Hack to Home Screen
 * 
 * PWA Pilipinas
 */
$(document).ready(() => {
    console.log('Mabuhay PWA Pilipinas!');
    $('.preloader').fadeOut();
});

//add Todo from input
$('#new__task').keypress(function(event) {
    if (event.which === 13) {
        //13 keyvalue is for enter key
        newTask(); 
    };
    $("#submit").unbind().click(function(e) { //user can also add tasks by pressing submit button.
        newTask();
        console.log()
    });
});

/**
* add new tasks and toast messages on addition
*/
const newTask = () => {
    let todo = $('#new__task').val()
    if (todo != "") {
        todo = $.trim(todo);
        addTask(todo); //add that todo
        M.toast({ html: 'New task added!', classes: 'green darken-1' }); //Materialize toast for task addition
    } 
    else {
        M.toast({ html: 'Please add an input first', classes: 'red darken-1' });
    }
    $('#new__task').val(""); //empty the input after clicking submit or enter key.
};
/**
 * getTasks
 */
const getTasks = () => {
    try {
        return (JSON.parse(localStorage.getItem('todo'))).sort((a,b) => a.id - b.id) || [];
    } catch (e) {
        return [];
    }
};

/**
 * getTasksList
 */
const getTasksList = () => {
    try {
        return (JSON.parse(localStorage.getItem('todo'))).sort((a,b) => b.id - a.id) || [];
    } catch (e) {
        return [];
    }
};

/**
 * addTask
 * @param {string} task 
 */
const addTask = (task) => {
    const taskList = getTasks() || [];
    taskList.push({ id: Date.now(), title: task, isDone: false });
    localStorage.setItem('todo', JSON.stringify(taskList));
    return taskList;
};

/**
 * deleteTask
 * @param {string | number} taskId 
 */
const deleteTask = (taskId) => {
    let taskList = getTasks() || [];
    taskList = taskList.filter(e => { if(e.id !== +taskId) return e });
    localStorage.setItem('todo', JSON.stringify(taskList));
    return taskList;
};

/**
 * getTask
 * @param {string | number} taskId 
 */
const getTask = (taskId) => {
    let taskList = getTasks() || [];
    task = taskList.find(e => e.id === +taskId);
    return task || {};
};

/**
 * toggleTask
 * @param {string | number} taskId 
 */
const toggleTask = (taskId) => {
    let taskList = getTasks() || [];
    taskList = taskList.map(e => {
        if(e.id === +taskId) e.isDone = e.isDone ? false : true;
        return e;
    })
    localStorage.setItem('todo', JSON.stringify(taskList));
    return taskList;
};
