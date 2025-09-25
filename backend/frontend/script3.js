const token = localStorage.getItem('accessToken');
const API_URL1 = "http://localhost:8000/api/auth";
const API_URL2 = "http://localhost:8000/api/messages";

const socket = io('http://localhost:8000', {
    auth: {
        token: token,
    }
});

async function checkAuth() {
    const accessToken = localStorage.getItem("accessToken");

    // If no access token → go back to login
    if (!accessToken) {
        window.location.href = "index.html";
        return;
    }

    try {
        // Try to call the "me" endpoint with access token
        const res = await fetch("http://localhost:8000/api/auth/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
        });

        if (res.status === 401) {
            // Token expired → try refreshing
            const refreshRes = await fetch("http://localhost:8000/api/auth/refresh", {
                method: "POST",
                credentials: "include", // sends cookies
            });

            if (!refreshRes.ok) {
                // Refresh also failed → logout
                localStorage.removeItem("accessToken");
                window.location.href = "index.html";
                return;
            }

            const data = await refreshRes.json();
            localStorage.setItem("accessToken", data.accessToken);
        }

    } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("accessToken");
        window.location.href = "index.html";
    }
}


checkAuth();

socket.on('connect', () => {
    console.log('Connected to server with socket: ', socket.id);
});

socket.on('connect_error', (error) => {
    console.log('Connection error: ', error.message)
});



function scrollToBottom() {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

let textInputThing = false;

socket.on('user_status', ({userId, status}) => {
            const friendDiv = document.getElementById(`status-${userId}`);

            if(status == 'online'){
                friendDiv.classList.add('online');
                friendDiv.classList.remove('offline');
                friendDiv.textContent='(online)'
            }else{
                friendDiv.classList.remove('online');
                friendDiv.classList.add('offline');
                friendDiv.textContent='(offline)';
            }
});

socket.on('online_users', (usersIds) => {
    usersIds.forEach((userId) => {
        const friendDiv = document.getElementById(`status-${userId}`);

        if(friendDiv) {
            friendDiv.classList.add('online');
            friendDiv.classList.remove('offline');
            friendDiv.textContent = '(online)';
        }
    })
});

async function showFriends() {
    try {
        
        const res = await fetch(`${API_URL1}/friends`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        //   console.log(res.json());

        if (!res.ok) {
            throw new Error(`Http error! status: ${res.status}`);
        }

        const data = await res.json();
        const friends = Array.isArray(data) ? data : data.message || [];

        // console.log(friends);

        const container = document.getElementById("friends");

        container.innerHTML = '';

        friends.forEach((friend) => {
            const div = document.createElement("div");
            const statusDiv = document.createElement('div');
            const chatBtn = document.createElement("button");
            
            div.id = `friend-${friend._id}`;
            div.classList.add("friend");
            
            statusDiv.id = `status-${friend._id}`;
            statusDiv.classList.add('offline');
            statusDiv.textContent = '(offline)';

            div.textContent = friend.username;
            chatBtn.textContent = 'Chat';

            container.appendChild(div);
            container.appendChild(statusDiv);
            container.appendChild(chatBtn);
            

            
            chatBtn.addEventListener('click', async () => {
                
                

                const bigMessageContainer = document.getElementById('messages-container');
                const messageContainer = document.getElementById('messages');
                const sendBtn = document.createElement('button');
                const textInput = document.createElement('input');
                textInput.placeholder = 'Type a message...';
                textInput.type = "text";
                sendBtn.textContent = 'send';

                textInput.addEventListener("keydown", (e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            sendBtn.click();
                        }
                    });


                const inputContainer = document.getElementById('input-container');

                const res = await fetch(`${API_URL2}/${friend._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error(`Http error! status: ${res.status}`);
                };

                const data = await res.json();

                const messages = Array.isArray(data) ? data : data.message || [];

                messageContainer.innerHTML = '';

                messages.forEach((message) => {
                    const messageDiv = document.createElement('div');

                    messageDiv.classList.add("message");

                    messageDiv.textContent = `(${message.senderId.username}): ${message.text}`;

                    messageContainer.appendChild(messageDiv);
                });

                scrollToBottom();

                socket.on("private_message", (message) => {
                    const sender = message.senderId.username;
                    const text = message.text;

                    const messageDiv = document.createElement('div');

                    messageDiv.classList.add("message");

                    messageDiv.textContent = `(${sender}): ${text}`;

                    messageContainer.appendChild(messageDiv);

                    scrollToBottom();
                });

                sendBtn.addEventListener('click', async () => {
                    const loggedInUser = await fetch(`${API_URL1}/me`, {
                                            method: "GET",
                                            headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${token}`,
                                            },
                                        });

                    const loggedInUser1 = await loggedInUser.json();

                    const text = textInput.value.trim();
                    if(!text) return;

                    const friendId = friend._id;
                    
                    socket.emit('private_message', {recieverId: friendId, text});

                    const messageDiv = document.createElement('div');


                    messageDiv.textContent = `(${loggedInUser1.username}): ${text}`;

                    messageContainer.appendChild(messageDiv);

                    textInput.value = '';

                    scrollToBottom();

                    
                });

                if(!textInputThing) {
                    inputContainer.appendChild(textInput);
                    inputContainer.appendChild(sendBtn);
                    bigMessageContainer.appendChild(inputContainer);
                }

                textInputThing = true;



            });

        });

        socket.emit('request_online_users');

        
    } catch (error) {
        console.error("Error loading friends:", error);
    }
};


