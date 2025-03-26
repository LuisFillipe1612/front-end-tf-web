document.addEventListener('DOMContentLoaded', function() {
    // Elementos dos formulários
    const signUpForm = document.getElementById('sign-up').querySelector('form');
    const signInForm = document.getElementById('sign-in').querySelector('form');
    const criarBtn = document.getElementById('criar');
    const entrarBtn = document.getElementById('entrar');

    // URLs da API
    const urlLogin = 'https://back-end-tf-web-pink.vercel.app/login';
    const urlRegister = 'https://back-end-tf-web-pink.vercel.app/admin';

    // Estado inicial
    document.getElementById('sign-up').style.display = 'none';
    document.getElementById('sign-in').style.display = 'block';

    // Alternar entre formulários
    criarBtn.addEventListener('click', function() {
        document.getElementById('sign-up').style.display = 'block';
        document.getElementById('sign-in').style.display = 'none';
        resetForms();
    });

    entrarBtn.addEventListener('click', function() {
        document.getElementById('sign-up').style.display = 'none';
        document.getElementById('sign-in').style.display = 'block';
        resetForms();
    });

    function resetForms() {
        signUpForm.reset();
        signInForm.reset();
    }

    function showError(message) {
        alert(message);
    }

    async function makeRequest(url, method, body) {
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro na requisição');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    // Manipulação do formulário de Cadastro
    signUpForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nome = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const senha = this.querySelector('input[type="password"]').value;
        
        // Validação básica
        if (!nome || !email || !senha) {
            showError('Por favor, preencha todos os campos!');
            return;
        }
        
        if (senha.length < 6) {
            showError('A senha deve ter pelo menos 6 caracteres!');
            return;
        }
        
        try {
            const response = await makeRequest(urlRegister, 'POST', {
                nome,
                email,
                senha
            });

            console.log('Cadastro realizado:', response);
            alert('Cadastro realizado com sucesso!');
            resetForms();
            document.getElementById('sign-in').style.display = 'block';
            document.getElementById('sign-up').style.display = 'none';
        } catch (error) {
            console.error('Erro no cadastro:', error);
            showError(error.message || 'Erro ao realizar cadastro');
        }
    });

    // Manipulação do formulário de Login
    signInForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = this.querySelector('#email').value;
        const senha = this.querySelector('#senha').value;
        
        if (!email || !senha) {
            showError('Por favor, preencha todos os campos!');
            return;
        }
        
        try {
            const response = await makeRequest(urlLogin, 'POST', {
                email,
                senha
            });

            console.log('Login realizado:', response);
            
            // Armazena o token e informações do usuário
            if (response.token) {
                localStorage.setItem('authToken', response.token);
                
                // Verifica se o usuário é admin ou comum
                if (response.userType === 'admin') {
                    window.location.href = '/admin-dashboard.html';
                  } else {
                    window.location.href = '/main.html';
                  }
            } else {
                showError('Token não recebido na resposta');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            showError(error.message || 'Erro ao realizar login');
        }
    });
});