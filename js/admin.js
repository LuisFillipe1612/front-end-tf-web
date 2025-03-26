const urlBase = "https://back-end-tf-web-pink.vercel.app";

const tabelaCorpo = document.getElementById("tabela-shows");

try {
  const endpoint = '/shows';
  const urlFinal = urlBase + endpoint;
  const response = await fetch(urlFinal);

  if (!response.ok) {
    throw new Error("Erro na requisição: " + response.status);
  }

  const data = await response.json();
  tabelaCorpo.innerHTML = '';

  data.forEach(show => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
                <td>${show.codigo}</td>
                <td>${show.endereco}</td>
                <td>${show.data_hora}</td>
                <td>${show.valor_disp}</td>
                <td>${show.valor_final}</td>
                <td>${show.artista}</td>
                <td>${show.pessoas}</td>
                <td>${show.responsavel}</td>
            `;
    tabelaCorpo.appendChild(linha);
  });
} catch (error) {
  console.error("Erro:", error);
}