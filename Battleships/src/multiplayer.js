

const connectStompClient = () => {

    const socket = new SockJS('http://localhost:8080/battleships-websocket');
    const stompClient = Stomp.over(socket);
    stompClient.debug = () => {}

    return new Promise((resolve, reject) => {
        stompClient.connect({}, function() {
            console.log('Connected to WebSocket');
            resolve(stompClient);
        }, function(error) {
            console.error('Error connecting to WebSocket:', error);
            reject(error);
        });
    });
}


const getUsers = async () => {
    
    const response = await fetch("http://localhost:8080/getUsers");

    const data = await response.json();

    return data;

}

const getCurrentUser = async () => {

    const response = await fetch("http://localhost:8080/getCurrentUser", {
        method: 'GET',
        credentials: 'include' // Include credentials (cookies) with the request
    });

    const user = await response.json();

    return user;
}

const checkReferrer = (() => {

    window.addEventListener("load", async () => {
        if (document.referrer.indexOf('http://localhost:8080') === -1) {
            window.location.replace("http://localhost:8080/");
        }
    });
})();


const onConnected = async (gameData) => {

    const user = await getCurrentUser();
    const stompClient = await connectStompClient();
    

    for (const data of Object.keys(gameData.playerBoard.arr)) {
        const vals = gameData.playerBoard.arr[data];

        user.board[data] = vals[2]; 
    }

    
    
    return new Promise((resolve) => {

        stompClient.send('/app/queue.join', {}, JSON.stringify(user));

        stompClient.subscribe("/topic/join", (message) => {
            const gameMessage = JSON.parse(message.body);
            resolve({stompClient, gameMessage});
        });
    });
    
}






export {getUsers, getCurrentUser, checkReferrer, onConnected};