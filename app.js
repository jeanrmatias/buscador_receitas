console.log('1. Script carregado');

const form = document.querySelector('#form-busca');
const campoBusca = document.querySelector('#campo-busca');
const divResultado = document.querySelector('#resultado');
const statusEl = document.querySelector('#status');

console.log('2. Elementos encontrados:', { form, campoBusca, divResultado, statusEl });

form.addEventListener('submit', function (evento) {
  evento.preventDefault();
  console.log('3. Formulário enviado. Termo digitado:', campoBusca.value);
  buscarReceitas(campoBusca.value.trim());
});

async function buscarReceitas(termo) {
  if (!termo) return;

  statusEl.textContent = 'Buscando receitas...';
  divResultado.innerHTML = '';

  try {
    console.log('4. Enviando requisição para a API...');
    const resposta = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + termo);
    console.log('5. Resposta recebida. Status HTTP:', resposta.status);

    if (!resposta.ok) throw new Error('Erro HTTP: ' + resposta.status);

    const dados = await resposta.json();
    console.log('6. Dados convertidos em objeto:', dados);

    if (!dados.meals) {
      console.log('7. meals veio null — a busca não retornou nada. Teste com "chicken".');
      statusEl.textContent = 'Nenhuma receita encontrada para "' + termo + '".';
      return;
    }

    statusEl.textContent = dados.meals.length + ' receita(s) encontrada(s).';
    renderizarReceitas(dados.meals);
    console.log('8. Receitas renderizadas:', dados.meals.length);
  } catch (erro) {
    console.error('ERRO capturado no catch:', erro);
    statusEl.textContent = 'Algo deu errado. Verifique sua conexão e tente novamente.';
  }
}

function renderizarReceitas(receitas) {
  divResultado.innerHTML = receitas.map(function (receita) {
    return `
      <div class="card">
        <img src="${receita.strMealThumb}" alt="${receita.strMeal}">
        <h3>${receita.strMeal}</h3>
      </div>
    `;
  }).join('');
}