$(document).ready(function() {
    var tasks = [];

    // Quando o formulário é submetido impede o envio do formulário padrão
    $('#task-form').submit(function(e) {
        e.preventDefault(); 

        // Obtém o valor do campo de entrada
        var taskName = $('#new-task').val();

        if (taskName) {
            // Cria um elemento <li> que contenha a tarefa e o ícone de seta
            var listItem = $('<li><i class="fas fa-arrow-right"></i>' + "   " + taskName + '</li>');

            // Adiciona a tarefa à lista
            $('#task-list').append(listItem);
            $('#new-task').val(''); // Limpa o campo de entrada

            // Adiciona a tarefa ao array
            tasks.push(taskName);

            // Adiciona um ouvinte de eventos de clique para a nova tarefa
            listItem.click(function() {
                $(this).toggleClass('completed');
            });
        }
    });

    // Quando o botão "Salvar Tarefas" é clicado
    $('#save-tasks').click(function() {
        // Verifica se há tarefas para salvar
        if (tasks.length > 0) {
            // Cria um texto a partir do array de tarefas
            var tasksText = tasks.join('\n');

            // Cria um objeto Blob para salvar o texto em um arquivo .txt
            var blob = new Blob([tasksText], { type: "text/plain" });

            // Cria um link para download
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'tarefas.txt';

            // Simula um clique no link para iniciar o download
            a.click();

            // Libera a URL do Blob
            URL.revokeObjectURL(a.href);

            showSuccessAlert();
        }
    });

    function showSuccessAlert() {
        // Cria um elemento para o alerta centralizado
        const alertDiv = document.createElement('div');
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '50%';
        alertDiv.style.left = '50%';
        alertDiv.style.transform = 'translate(-50%, -50%)';
        alertDiv.style.background = '#4CAF50';
        alertDiv.style.color = '#034706';
        alertDiv.style.padding = '10px';
        alertDiv.style.borderRadius = '8px';

        // Texto do alerta
        alertDiv.innerHTML = 'Tarefas salvas com sucesso!';

        // Adicione o alerta ao corpo do documento
        document.body.appendChild(alertDiv);

        // Remova o alerta após alguns segundos 
        setTimeout(function() {
            document.body.removeChild(alertDiv);
        }, 3000); // 3000 milissegundos (3 segundos)
    }
});