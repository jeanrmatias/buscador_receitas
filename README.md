# 🍳 Buscador de Receitas

Projeto web de consumo de API desenvolvido com **JavaScript puro** (sem frameworks), criado como exercício prático de estudo. A aplicação permite buscar receitas por nome ou ingrediente e exibi-las em cards com imagem.

## 📋 Sobre o projeto

O usuário digita um termo de busca (em inglês, ex.: `chicken`, `pasta`), a aplicação consulta a API **TheMealDB** e renderiza as receitas encontradas na tela, com foto, nome e status da busca.

O objetivo do projeto é praticar os fundamentos de consumo de API no navegador:

- Requisições HTTP com `fetch`
- Programação assíncrona com `async/await`
- Conversão de respostas JSON
- Manipulação do DOM
- Tratamento de erros com `try/catch`

## 🛠️ Tecnologias

- **HTML5** — estrutura da página
- **CSS3** — estilização (embutido no `index.html`)
- **JavaScript (ES6+)** — lógica e consumo da API

## 🌐 API utilizada

[TheMealDB](https://www.themealdb.com/api.php) — banco de receitas aberto e gratuito para uso educacional.

- **Chave de teste:** `1` (não exige cadastro)
- **Endpoint principal:**

    https://www.themealdb.com/api/json/v1/1/search.php?s={termo}

- **Resposta:** objeto JSON com a propriedade `meals` (array de receitas ou `null` quando nada é encontrado)

Exemplo de retorno (simplificado):

    {
      "meals": [
        {
          "strMeal": "Chicken Handi",
          "strMealThumb": "https://www.themealdb.com/images/media/meals/...",
          "strInstructions": "..."
        }
      ]
    }

## 📁 Estrutura de arquivos

    buscador-receitas/
    ├── index.html    → estrutura da página e estilos
    ├── app.js        → lógica de consumo da API
    └── README.md     → esta documentação

## 🚀 Como executar

1. Baixe ou clone os arquivos em uma mesma pasta.
2. Abra o `index.html` no navegador (duplo clique).
3. Digite um termo **em inglês** e clique em **Buscar**.

Opcional (recomendado): use o VS Code com a extensão **Live Server** para recarregamento automático a cada salvamento.

> ⚠️ As receitas da TheMealDB estão em inglês. Buscar `frango` não retorna resultados — use `chicken`.

## 🧠 Lógica da aplicação

O fluxo de consumo da API segue 6 etapas:

1. **Captura do evento** — o `addEventListener('submit')` intercepta o envio do formulário e o `preventDefault()` impede o recarregamento da página.
2. **Montagem da URL** — o termo digitado é concatenado ao endpoint base após `?s=`.
3. **Requisição assíncrona** — o `fetch` envia a requisição HTTP; o `await` pausa a função até a resposta chegar.
4. **Validação** — `resposta.ok` é verificada manualmente, porque o `fetch` não trata status de erro (404, 500) como falha.
5. **Conversão** — `resposta.json()` transforma o corpo da resposta em objeto JavaScript.
6. **Renderização** — o array de receitas é transformado em HTML com `.map()` + template literals e injetado no DOM via `innerHTML`.

Trecho central do fluxo:

    const resposta = await fetch(URL_BASE + termo);
    if (!resposta.ok) throw new Error('Erro HTTP: ' + resposta.status);
    const dados = await resposta.json();

Erros de rede e respostas inválidas são capturados pelo `try/catch`, que exibe uma mensagem amigável ao usuário em vez de quebrar a aplicação.

## 🐞 Solução de problemas

| Sintoma | Causa provável |
|---|---|
| Nada acontece ao buscar | Termo em português — a API só tem receitas em inglês |
| Erro "Cannot read properties of null" no Console | `id` do HTML diferente do usado no `querySelector` |
| Nenhuma requisição aparece na aba Network | Página aberta via `file://` — use o Live Server |
| Código alterado não surte efeito | Cache do navegador — recarregue com Ctrl + Shift + R |

## 📈 Melhorias futuras

- [ ] Modal com a receita completa (ingredientes e modo de preparo)
- [ ] Busca por categoria ou país de origem
- [ ] Histórico de buscas com `localStorage`
- [ ] Layout responsivo para mobile

## 👤 Autor

**Jean R. Matias** 