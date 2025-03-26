const btDelete = document.getElementById('submit');
btDelete.addEventListener('click', deleteShow);
const codigo = document.getElementById('codigo');

const url = `https://back-end-tf-web-mu.vercel.app/show/${codigo}`
const token = localStorage.getItem('jwt');

try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });
  
    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.status);
    }

  } catch (error) {
    console.error("Erro:", error);
    alert("Show não encontrado!");
  }
  
  async function deleteShow(e) {
    e.preventDefault();
    try {  
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'x-access-token': token
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.status);
      }
      
      alert("Curso deletado com sucesso!");
  
    } catch (error) {
      console.error("Erro:", error);
      alert("Curso não deletado!");
    }
  }