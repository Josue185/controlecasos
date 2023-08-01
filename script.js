const button = document.querySelector('button');

const adicionaLoading = () => {
    button.innerHTML = '<img src="loading.png" class="loading"></img>';
}

const removeLoading = () => {
    button.innerHTML = 'Enviar';
}

const handleSubmit = (event) => {
    event.preventDefault();
    adicionaLoading();

    const LDAP = document.querySelector("#LDAP").value;
    const dataAtendimento = document.querySelector("#dataAtendimento").value;
    const numeroCaso = document.querySelector("#numeroCaso").value;
    const statusAtendimento = document.querySelector("#statusAtual").value;
    const novoStatus = document.querySelector("#statusAtualizados").value;
    const print = document.querySelector("#screenshoot").value;
    
    
    fetch('https://api.sheetmonkey.io/form/stxiYNh36PsvzSqh2o4589', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({LDAP, dataAtendimento, numeroCaso, statusAtendimento, novoStatus, print})
    })
        .then(() => {
            removeLoading();
            document.querySelector("#Agente").value = '';
            document.querySelector("#LDAP").value = '';
            document.querySelector("#cogId").value = '';
            document.querySelector("#teamLeader").value = '';
            document.querySelector("#dataOfAbsance").value = '';
            document.querySelector("#dateOfReturn").value = '';
            document.querySelector("#totalDay").value = '';
            
        });
}

document.querySelector('form').addEventListener('submit', handleSubmit);
