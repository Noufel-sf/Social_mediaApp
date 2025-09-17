const token = localStorage.getItem('accessToken');
const API_URL1 = `${process.env.API_URL}/api/auth`;
const API_URL2 = `${process.env.API_URL}/api/messages`;

const socket = io(`${process.env.API_URL}`, {
    auth: {
        token: token,
    }
});

socket.on('connect', () => {
    console.log('Connected to server with socket: ', socket.id);
});

socket.on('connect_error', (error) => {
    console.log('Connection error: ', error.message)
});

document.getElementById("logoutButton").addEventListener("click", async () => {
    try {
        await fetch(`${process.env.API_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
    } catch (error) {
        console.error("logout error", error);
    } finally {
        localStorage.removeItem("accessToken");
        window.location.href = "index.html";
    }
});


function scrollToBottom() {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

let textInputThing = false;



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
            const chatBtn = document.createElement("button");
            

            div.classList.add("friend");

            div.textContent = friend.firstName + " " + friend.lastName;
            chatBtn.textContent = 'Chat';

            container.appendChild(div);
            container.appendChild(chatBtn);

            
            chatBtn.addEventListener('click', async () => {
                
                

                const bigMessageContainer = document.getElementById('messages-container');
                const messageContainer = document.getElementById('messages');
                const sendBtn = document.createElement('button');
                const textInput = document.createElement('input');
                textInput.placeholder = 'Type a message...';
                textInput.type = "text";
                sendBtn.textContent = 'send';

                const inputContainer = document.createElement('div');
                inputContainer.classList.add("input-container");

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

                    messageDiv.textContent = `(${message.senderId.firstName}): ${message.text}`;

                    messageContainer.appendChild(messageDiv);
                });

                scrollToBottom();

                socket.on("private_message", (message) => {
                    const sender = message.senderId.firstName;
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
                    const friendId = friend._id;
                    
                    socket.emit('private_message', {recieverId: friendId, text});

                    const messageDiv = document.createElement('div');


                    messageDiv.textContent = `(${loggedInUser1.firstName}): ${text}`;

                    messageContainer.appendChild(messageDiv);

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
    } catch (error) {
        console.error("Error loading friends:", error);
    }
};

