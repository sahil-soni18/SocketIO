const socket = io();

    const buttons = document.querySelectorAll('button');
    const statusDiv = document.getElementById('status');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const choice = button.id;
        socket.emit('playerMove', { choice });
        statusDiv.textContent = `You chose ${choice}. Waiting for opponent...`;
      });
    });

    socket.on('gameResult', (result) => {
      statusDiv.textContent = result;
    });

    socket.on('errorMessage', (message) => {
      statusDiv.textContent = message;
    });