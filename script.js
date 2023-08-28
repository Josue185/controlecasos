const button = document.querySelector('button');

const adicionaLoading = () => {
    button.innerHTML = '<img src="loading.png" class="loading"></img>';
};

const removeLoading = () => {
    button.innerHTML = 'Enviar';
};

const handleSubmit = (event) => {
    event.preventDefault();
    adicionaLoading();

    const LDAP = document.querySelector("#LDAP").value;
    const dataAtendimento = document.querySelector("#dataAtendimento").value;
    const numeroCaso = document.querySelector("#numeroCaso").value;
    const statusAtendimento = document.querySelector("#statusAtual").value;
    const novoStatus = document.querySelector("#statusAtualizados").value;
    const tarefas = document.querySelector("#tarefas").value;
    const print = document.querySelector("#screenshot").value;
    const horaCaso = document.querySelector("#horacaso").value;
    const time = document.querySelector("#time").value;
    
    fetch('https://api.sheetmonkey.io/form/stxiYNh36PsvzSqh2o4589', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({LDAP, dataAtendimento, numeroCaso, statusAtendimento, novoStatus, tarefas, print, horacaso, time})
    })
    .then(() => {
        removeLoading();
        document.querySelector("#LDAP").value = '';
        document.querySelector("#dataAtendimento").value = '';
        document.querySelector("#numeroCaso").value = '';
        document.querySelector("#statusAtual").value = '';
        document.querySelector("#statusAtualizados").value = '';
        document.querySelector("#tarefas").value = '';
        document.querySelector("#screenshot").value = '';
        document.querySelector("#time").value = '';
    });
};

document.querySelector('#formControle').addEventListener('submit', handleSubmit);
