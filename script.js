
function mudarPagina() {
   
    window.location.href = 'http://127.0.0.1:5500/formulario.html';
  //  carregarCards();  
 }

 function voltarAoMenu(){
    window.location.href = "http://127.0.0.1:5500/index.html"
 }

 function cadastrarRegistro(nome,cpf,fone,marca,modelo,servicos,btus,descricao,total,status,pagamento) {
    
    // Captura os valores do formulário
   
    var  nome = document.getElementById("nome").value;
    var  cpf = document.getElementById("cpf").value;
    var  fone = document.getElementById("fone").value;
    var  marca = document.getElementById("marca").value;
    var  modelo = document.getElementById("modelo").value;
    var  btus = document.getElementById("btus").value;
    var  servicos = document.getElementById("servicos").value;
    var  descricao = document.getElementById("descricao").value;
    var  total = document.getElementById("total").value;
    var  status = document.getElementById("status").value;
    var  pagamento = document.getElementById("pagamento").value;
    
    
    // Cria um objeto com os dados a serem enviados
    var data = {
  
        nome: nome,
        cpf: cpf,
        fone: fone,
        marca: marca,
        modelo: modelo,
        btus: btus,
        servicos: servicos,
        descricao: descricao,        
        total: total,
        status: status,
        pagamento: pagamento
            
    };

    // Envia os dados para o servidor
    fetch('http://localhost:8080/ar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar registro.');
            
        }
        return response.json();
    })
    .then(data => {
        console.log( 'Registro cadastrado com sucesso:', data);
        alert("Cadastro realizado com sucesso !")
        fetchDataAndPopulateTable();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
     
     document.getElementById("nome").value ="";
     document.getElementById("cpf").value ="";
     document.getElementById("fone").value ="";
     document.getElementById("marca").value ="";
     document.getElementById("modelo").value ="";
     document.getElementById("btus").value ="";
     document.getElementById("servicos").value ="";
     document.getElementById("descricao").value ="";
     document.getElementById("total").value ="";
     document.getElementById("status").value ="";
     document.getElementById("pagamento").value ="";   
    // window.location.href = "";
   
}
    function validarFormulario() { 
        
    var nome = document.getElementById('nome').value;
    var cpf = document.getElementById('cpf').value;
    var fone = document.getElementById('fone').value;
    var marca = document.getElementById('marca').value;
    var modelo = document.getElementById('modelo').value;
    var btus = document.getElementById('btus').value;
    var servicos = document.getElementById('servicos').value;
    var descricao = document.getElementById('descricao').value;
    var total = document.getElementById('total').value;
    var status = document.getElementById('status').value;
    var pagamento = document.getElementById('pagamento').value;
   
   
    if (nome === '') {
        alert('Por favor, preencha o campo Nome.');
        return false;
    }
    if (cpf === '') {
        alert('Por favor, preencha o campo cpf.');
        return false;
    }

    if (fone === '') {
        alert('Por favor, preencha o campo Telefone.');
        return false;
    }

    if (marca === '') {
        alert('Por favor, preencha o campo Marca.');
        return false;
    }

    if (modelo === '') {
        alert('Por favor, preencha o campo Modelo.');
        return false;
    }

    if (btus === '') {
        alert('Por favor, preencha o campo Btus.');
        return false;
    }
    if (servicos === '') {
        alert('Por favor, preencha o campo Serviços.');
        return false;
    }
    if (descricao === '') {
        alert('Por favor, preencha o campo Descricao.');
        return false;
    }

    if (total === '') {
        alert('Por favor, preencha o campo Total.');
        return false;
    }
    
    if (status === '') {
        alert('Por favor, preencha o campo Status.');
        return false;
    }
    if (pagamento === '') {
        alert('Por favor, preencha o campo Pagamento.');
        return false;
    }

    // Se a validação passar, você pode chamar a função para salvar os registros
     cadastrarRegistro(nome,cpf,fone,marca,modelo,btus,servicos,descricao,total,status,pagamento);

    // Retorna true para permitir o envio do formulário após salvar os registros
    return true;
}

async function fetchDataAndPopulateTable() {
    try {
      // Substitua 'URL_DA_SUA_API' pela URL real da sua API
      const response = await fetch( 'http://localhost:8080/ar');
      const data = await response.json();

      // Limpa a tabela antes de inserir novos dados
      const tbody = document.querySelector('#tabela tbody');
      tbody.innerHTML = '';

      // Preenche a tabela com os dados recebidos da API
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.ordem}</td>          
          <td>${item.nome}</td>       
          <td>${item.fone}</td>        
          <td>${item.modelo}</td>
          <td>${item.servicos}</td>
          <td>${item.descricao}</td>
          <td>${item.total}</td> 
          <td>${item.status}</td> 
          <td>${item.pagamento}</td>          
          
          <td><button  class="btn btn-eye" title="Visualizar"  onclick="buscarDados(${item.id})"><i class="fas fa-eye"></i></button></td>          
          <td><button  class="btn btn-trash" title="Excluir" onclick="deletarRegistro(${item.id})"> <i class="fas fa-trash-alt"></i></button></td> `;
        
          
          tbody.appendChild(row);
      });
    } catch (error) {
      console.error('Erro ao buscar e preencher dados:', error);
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
  // Chama a função para buscar e preencher os dados quando a página carrega
   fetchDataAndPopulateTable();
});
 


async function buscarDados(id) {
    try { 
        // URL da API, substitua pela sua URL
        const response = await fetch(`http://localhost:8080/ar/${id}`);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }

        // Converte a resposta em JSON
        const data = await response.json();
        openModal();
      

      document.getElementById('id').value = data.id;
      document.getElementById('ordem').value = data.ordem;
      document.getElementById('nome').value = data.nome;
      document.getElementById('fone').value = data.fone;  
      document.getElementById('modelo').value = data.modelo;
      document.getElementById('servicos').value = data.servicos;
      document.getElementById('descricao').value = data.descricao; 
      document.getElementById('total').value = data.total; 
      document.getElementById('status').value = data.status; 
      document.getElementById('pagamento').value = data.pagamento; 





    } catch (error) {
    console.error('Erro:', error);
   }

  }
    

  function openModal() {

// Seleciona o modal pelo ID
   var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

// Abre o modal
  myModal.show();


}



async function deletarRegistro(id) {
    try {
      // Substitua 'URL_DA_SUA_API' pela URL real da sua API para deletar
      const response = await fetch(`http://localhost:8080/ar/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Adicione cabeçalhos adicionais, se necessário
        },
      });
        //alert("Tem certeza que deseja deletar esta resercva?");
      if (response.ok) {
        console.log(`Registro com ID ${id} deletado com sucesso.`);
        // Atualiza a tabela após a exclusão
        fetchDataAndPopulateTable();
      } else {
        console.error('Erro ao deletar registro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar registro:', error);
    }
  }
async function updateUserData() {    
    const idInput =  document.getElementById("id");   
    const nomeInput = document.getElementById("nome");     
    const foneInput = document.getElementById("fone");
    const totalInput = document.getElementById("total");
    const statusInput = document.getElementById("status");    
    const pagamentoInput = document.getElementById("pagamento");   
    
      
    const updateId =  idInput.value    
    const updateNome = nomeInput.value  
    const updateFone =  foneInput.value
    const updateTotal =  totalInput.value
    const updateStatus = statusInput.value
    const updatePagamento = pagamentoInput.value 
   
   
  
    try {
      const response =  await fetch(`http://localhost:8080/ar`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updateId,                  
          nome: updateNome, 
          fone: updateFone,
          total: updateTotal,
          status: updateStatus,        
          pagamento: updatePagamento,        
          
                    
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
  
      alert('Dados do usuário atualizados com sucesso!');
      fetchDataAndPopulateTable();          
    } catch (error) {
      console.error(`Erro durante a atualização dos dados: ${error.message}`);
    }
    ocument.getElementById("id").value = "";       
    document.getElementById("nome").value = "";   
    document.getElementById("fone").value ="";
    document.getElementById("total").value ="";
    ocument.getElementById("status").value = "";   
    ocument.getElementById("pagamento").value = "";   
    
  }

  async function buscarPorNome() {
    const nome = document.getElementById('campo-busca').value.trim(); // Obtém o valor do campo de busca
    const tabela = document.getElementById('tabela').querySelector('tbody'); // Seleciona o tbody
    tabela.innerHTML = ''; // Limpa os registros atuais da tabela

    if (!nome) {
        alert('Por favor, insira um nome para buscar.');
        return;
    }

    try {
        const url = `http://localhost:8080/ar/buscarNome?nome=${encodeURIComponent(nome)}`; // URL com filtro pelo nome
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na busca: ${response.status} - ${response.statusText}`);
        }

        const registros = await response.json(); // Converte o resultado para JSON

        if (registros.length === 0) {
            tabela.innerHTML = '<tr><td colspan="3">Nenhum registro encontrado.</td></tr>';
        } else {
            registros.forEach(registro => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${registro.id}</td>
                    <td>${registro.ordem}</td>
                    <td>${registro.nome}</td>
                    <td>${registro.fone}</td>
                    <td>${registro.modelo}</td>
                    <td>${registro.servicos}</td>
                    <td>${registro.descricao}</td>
                    <td>${registro.total}</td>
                    <td>${registro.status}</td>
                    <td>${registro.pagamento}</td>

                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao buscar registros:', error);
        tabela.innerHTML = '<tr><td colspan="3">Erro ao buscar registros.</td></tr>';
    }
}

  