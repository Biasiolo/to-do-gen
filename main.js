$(document).ready(function () {
    var tasks = [];
    var completedTasks = [];

    function updateTaskList() {
        $('#task-list').empty();
        tasks.forEach(function (task, index) {
            var listItem = $('<li><i class="fas fa-arrow-right"></i> ' + task + '<button class="delete-button">X</button></li>');
            if (completedTasks.indexOf(index) !== -1) {
                listItem.addClass('completed');
            }

            listItem.click(function () {
                if (listItem.hasClass('completed')) {
                    listItem.removeClass('completed');
                    var taskIndex = completedTasks.indexOf(index);
                    if (taskIndex !== -1) {
                        completedTasks.splice(taskIndex, 1);
                    }
                } else {
                    listItem.addClass('completed');
                    completedTasks.push(index);
                }
                saveTasksToCookies();
            });

            listItem.find('.delete-button').click(function (e) {
                e.stopPropagation();
                var taskIndex = tasks.indexOf(task);
                if (taskIndex !== -1) {
                    tasks.splice(taskIndex, 1);
                    if (completedTasks.indexOf(index) !== -1) {
                        completedTasks.splice(completedTasks.indexOf(index), 1);
                    }
                    listItem.remove();
                    saveTasksToCookies();
                }
            });

            $('#task-list').append(listItem);
        });
    }

    function saveTasksToCookies() {
        var tasksData = JSON.stringify({ tasks: tasks, completedTasks: completedTasks });
        document.cookie = 'tasksData=' + tasksData;
    }

    function loadTasksFromCookies() {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.startsWith('tasksData=')) {
                var tasksData = cookie.substring('tasksData='.length);
                var parsedData = JSON.parse(tasksData);
                tasks = parsedData.tasks || [];
                completedTasks = parsedData.completedTasks || [];
                updateTaskList();
                break;
            }
        }
    }

    loadTasksFromCookies();

    $('#task-form').submit(function (e) {
        e.preventDefault();
        var taskName = $('#new-task').val();
        if (taskName) {
            tasks.push(taskName);
            saveTasksToCookies();
            updateTaskList();
            $('#new-task').val('');
        }
    });

    $('#save-tasks').click(function () {
        var tasksText = tasks.join('\n');
        var blob = new Blob([tasksText], { type: "text/plain" });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'tasks.txt';
        a.click();
        URL.revokeObjectURL(a.href);
        showSuccessAlert();
    });

    function showSuccessAlert() {
        const alertDiv = document.createElement('div');
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '50%';
        alertDiv.style.left = '50%';
        alertDiv.style.transform = 'translate(-50%, -50%)';
        alertDiv.style.background = '#4CAF50';
        alertDiv.style.color = '#034706';
        alertDiv.style.padding = '12px';
        alertDiv.style.borderRadius = '8px';
        alertDiv.innerHTML = 'Tarefas salvas com sucesso!';
        document.body.appendChild(alertDiv);
        setTimeout(function () {
            document.body.removeChild(alertDiv);
        }, 3000);
    }
});



