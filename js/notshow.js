const btDelete = document.getElementById('submit');
const codigo = document.getElementById('codigo');
btDelete.addEventListener('click', deleteShow);

const token = localStorage.getItem('jwt');

async function deleteShow(e) {
    e.preventDefault();
    const url = `https://back-end-tf-web-mu.vercel.app/show/${codigo.value}`;
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
        
        alert("Show deletado com sucesso!");

    } catch (error) {
        console.error("Erro:", error);
        alert("Show não deletado!");
    }
}