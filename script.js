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
    const hora = document.querySelector("#horacaso").value;
    const time = document.querySelector("#time").value;
    
    fetch('https://api.sheetmonkey.io/form/stxiYNh36PsvzSqh2o4589', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({LDAP, dataAtendimento, numeroCaso, statusAtendimento, novoStatus, tarefas, print, hora, time})
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

//Firebase


// Importe as funções necessárias do SDK do Firebase
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// Obtenha uma referência para o Firestore
const db = getFirestore();

// Obtenha referências para os elementos do formulário
const form = document.getElementById("formControle");
const LDAP = document.getElementById("LDAP");
const dataAtendimento = document.getElementById("dataAtendimento");
const numeroCaso = document.getElementById("numeroCaso");
const statusAtual = document.getElementById("statusAtual");
const statusAtualizados = document.getElementById("statusAtualizados");
const tarefas = document.getElementById("tarefas");
const screenshot = document.getElementById("screenshot");
const horacaso = document.getElementById("horacaso");
const time = document.getElementById("time");

// Adicione um ouvinte de evento para o envio do formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Impede o envio padrão do formulário

  // Crie um objeto com os dados do formulário
  const formData = {
    LDAP: LDAP.value,
    dataAtendimento: dataAtendimento.value,
    numeroCaso: numeroCaso.value,
    statusAtual: statusAtual.value,
    statusAtualizado: statusAtualizados.value,
    tarefas: tarefas.value,
    screenshot: screenshot.value,
    horacaso: horacaso.value,
    time: parseInt(time.value), // Certifique-se de que o tempo seja interpretado como um número
  };

  try {
    // Adicione os dados do formulário ao Firestore (ou Realtime Database, se estiver usando)
    await addDoc(collection(db, "casos"), formData);
    alert("Dados do formulário enviados com sucesso!");
    form.reset(); // Limpa o formulário após o envio
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
  }
});

