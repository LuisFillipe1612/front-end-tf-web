// Function for datetime conversion with Minas Gerais (Brazil) timezone
function convertDateTimeLocalBrazil(datetimeLocalValue) {
    // Create a Date object from the datetime-local input
    const date = new Date(datetimeLocalValue);
    
    // Convert to Brazil/Sao Paulo timezone
    const brazilTimestamp = date.toLocaleString('en-US', { 
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    });
    
    // ISO timestamp in Brazil timezone
    const brasilISOTimestamp = new Date(brazilTimestamp).toISOString();
    
    // Unix timestamp (adjusted for Brazil timezone)
    const brazilUnixTimestamp = Math.floor(
        new Date(brasilISOTimestamp).getTime() / 1000
    );
    
    return {
        brazilTimestamp,     // Readable Brazil time
        brasilISOTimestamp,  // ISO format timestamp
        brazilUnixTimestamp  // Unix timestamp
    };
}

document.getElementById('novoshow').addEventListener('submit', function(event) {
    event.preventDefault();

    const dateValue = document.getElementById('data').value;
    const { brasilISOTimestamp, brazilUnixTimestamp } = convertDateTimeLocalBrazil(dateValue);
    
    // Check if the date is within a reasonable range (e.g., within the next 10 years)
    const now = Date.now();
    const tenYearsFromNow = now + 10 * 365 * 24 * 60 * 60 * 1000;
    if (brazilUnixTimestamp * 1000 < now || brazilUnixTimestamp * 1000 > tenYearsFromNow) {
        alert('Data fora do intervalo aceitável. Por favor, insira uma data dentro dos próximos 10 anos.');
        return;
    }

    const showData = {
        codigo: document.getElementById('codigo').value,
        endereco: document.getElementById('endereco').value,
        pessoas: document.getElementById('pessoas').value,
        artista: document.getElementById('artista').value,
        data_hora: brasilISOTimestamp, // Use the validated ISO timestamp
        valor_disp: document.getElementById('valor_disp').value,
        valor_final: document.getElementById('valor_final').value,
        responsavel: document.getElementById('responsavel').value
    };

    console.log('Show Data:', showData); // Log the show data

    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    fetch('https://back-end-tf-web-pink.vercel.app/show', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token // Include the token in the headers
        },
        body: JSON.stringify(showData)
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error:', error);
        alert('Erro ao adicionar show.');
    });
});
