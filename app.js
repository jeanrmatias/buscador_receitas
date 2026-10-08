const form = document.querySelector('#form-busca');
const campoBusca = document.querySelector('#campo-busca');
const divResultado = document.querySelector('#resultado');
const statusEl = document.querySelector('#status');

const URL_BASE = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

form.addEventListener('submit', function (evento) {
  evento.preventDefault();
  buscarReceitas(campoBusca.value.trim());
});

async function buscarReceitas(termo) {
  if (!termo) return;

  statusEl.textContent = 'Buscando receitas...';
  divResultado.innerHTML = '';

  try {
    const resposta = await fetch(URL_BASE + termo);

    if (!resposta.ok) {
      throw new Error('Erro na requisição: ' + resposta.status);
    }

    const dados = await resposta.json();

    if (!dados.meals) {
      statusEl.textContent = 'Nenhuma receita encontrada para "' + termo + '".';
      return;
    }

    statusEl.textContent = dados.meals.length + ' receita(s) encontrada(s).';
    renderizarReceitas(dados.meals);
  } catch (erro) {
    statusEl.textContent = 'Algo deu errado. Verifique sua conexão e tente novamente.';
    console.error(erro);
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