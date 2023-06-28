$(document).ready(function() {
    loadTasks();
  
    $('#task-form').submit(function(event) {
      event.preventDefault();
  
      var taskInput = $('#task-input');
      var task = taskInput.val();
  
      if (task !== '') {
        addTask(task);
        taskInput.val('');
      }
    });
  
    $(document).on('click', '.delete-button', function() {
      var taskId = $(this).data('id');
      deleteTask(taskId);
    });
  
    $(document).on('click', '.update-button', function() {
      var taskId = $(this).data('id');
      var taskDescription = $(this).siblings('.task-description').text();
      var newTask = prompt('Digite o novo valor da tarefa:', taskDescription);

      if (newTask !== null) {
        updateTask(taskId, newTask);
      }
    });
});
  
function loadTasks() {
    $.ajax({
      url: 'http://127.0.0.1:5000/listar-tarefas',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var taskList = $('#task-list');
        taskList.empty();
  
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            var taskItem = '<li class="container-form-options">' + data[i].description +
            '<div class="actions">'+
            '<button class="delete-button" data-id="' + data[i].id + '">Excluir</button>' +
            '<button class="update-button" data-id="' + data[i].id + '">Update</button>'+
            '<div/>'+
            '</li>';
            taskList.append(taskItem);
          }
        } else {
          taskList.append('<li class="container-null">Não há tarefas cadastradas</li>');
        }
      }
    });
}
  
function addTask(task) {
    $.ajax({
      url: 'http://127.0.0.1:5000/registrar-tarefa',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ task_content: task }),
      success: function() {
        loadTasks();
      }
    });
}
  
  
function deleteTask(taskId) {
    $.ajax({
      url: 'http://127.0.0.1:5000/delete',
      type: 'DELETE',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ id: taskId }),
      success: function() {
        loadTasks();
      }
    });
}

function updateTask(taskId, newTask) {
    $.ajax({
      url: 'http://127.0.0.1:5000/update/' + taskId,
      type: 'PUT',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ task_content: newTask }),
      success: function() {
        loadTasks();
      }
    });
}
