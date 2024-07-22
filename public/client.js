let ws;

function connectWebSocket() {
    // 1/ Create an instance
    ws = new WebSocket('ws://localhost:3003');

    // 2/ Event handing - open, onmessage, onconsole
    // - Connectionw 
    ws.onopen = () => {
        console.log('Connected to the server');
    };
    //  - Server sends a message to me
    ws.onmessage = (event) => {
        // Server sends data as a 'blob' - event.data
        const chat = document.getElementById('chat')
        const message = document.createElement('div')
        const reader = new FileReader();

        reader.onload = () => {
            console.log(reader.result);
            message.textContent = reader.result;
            chat.appendChild(message)
        };

        if (event.data instanceof Blob) {
            reader.readAsText(event.data);
        }
    };

    //  - Connection to server closed
    ws.onconsole = () => {

    };
}

function sendMessage() {
    if (ws.readyState === WebSocket.OPEN) {
        const input = document.getElementById('message');
        ws.send(input.value);

        // Cleare the input text
        input.value = '';
    }
}

connectWebSocket();