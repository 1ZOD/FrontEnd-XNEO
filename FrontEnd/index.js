$(document).ready(function() {
    // Carregar as tarefas existentes
    loadTasks();
  
    // Enviar tarefa ao pressionar o botão 'Adicionar'
    $('#task-form').submit(function(event) {
      event.preventDefault();
  
      var taskInput = $('#task-input');
      var task = taskInput.val();
  
      if (task !== '') {
        addTask(task);
        taskInput.val('');
      }
    });
  
    // Excluir tarefa ao pressionar o botão 'Excluir'
    $(document).on('click', '.delete-button', function() {
      var taskId = $(this).data('id');
      deleteTask(taskId);
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
            var taskItem = '<li>' + data[i].description + '<button class="delete-button" data-id="' + data[i].id + '">Excluir</button></li>';
            taskList.append(taskItem);
          }
        } else {
          taskList.append('<li>Não há tarefas cadastradas</li>');
        }
      }
    });
  }
  
  function addTask(task) {
    $.ajax({
      url: 'http://127.0.0.1:5000/registrar-tarefa',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json', // Adiciona o cabeçalho Content-Type
      data: JSON.stringify({ task_content: task }), // Converte o objeto em JSON
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
      contentType: 'application/json', // Adiciona o cabeçalho Content-Type
      data: JSON.stringify({ id: taskId }), // Converte o objeto em JSON
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