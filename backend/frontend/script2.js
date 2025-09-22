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


document.getElementById("logoutButton").addEventListener("click", async () => {
    try {
        await fetch("http://localhost:8000/api/auth/logout", {
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

async function showRequests() {
    try {
        const token = localStorage.getItem("accessToken");
        const API_URL1 = "http://localhost:8000/api/friends";

        const res = await fetch(`${API_URL1}/request/all/`, {
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
        const requests = Array.isArray(data) ? data : data.message || [];

        //   console.log(requests);

        const container = document.getElementById("requests");

        requests.forEach((request) => {
            const div = document.createElement("div");
            const acceptBtn = document.createElement("button");
            const rejectBtn = document.createElement("button");

            div.classList.add("request");

            div.textContent =
                request.senderId.firstName + " " + request.senderId.lastName;
            acceptBtn.textContent = "accept";
            rejectBtn.textContent = "reject";

            container.appendChild(div);
            container.appendChild(acceptBtn);
            container.appendChild(rejectBtn);

            acceptBtn.addEventListener("click", async () => {
                console.log(request._id);
                const res = await fetch(
                    `http://localhost:8000/api/friends/request/${request._id}/accept`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        credentials: "include",
                    }
                );

                if (!res.ok) {
                    throw new Error(`Http error! status: ${res.status}`);
                }

                if (res.ok) alert("friend request accepted succefully");
            });

            rejectBtn.addEventListener("click", async () => {
                console.log(request._id);
                const res = await fetch(
                    `http://localhost:8000/api/friends/request/${request._id}/reject`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        credentials: "include",
                    }
                );

                if (!res.ok) {
                    throw new Error(`Http error! status: ${res.status}`);
                }

                if (res.ok) alert("friend request rejected succefully");
            });
        });
    } catch (error) {
        console.error("Error loading requests:", error);
    }
}

async function getUsers() {
    try {
        const token = localStorage.getItem("accessToken");
        const API_URL = "http://localhost:8000/api/auth";

        const res = await fetch(`${API_URL}/recommended`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Http error! status: ${res.status}`);
        }

        const data = await res.json();

        const users = Array.isArray(data) ? data : data.message || [];

        const container = document.getElementById("users");

        users.forEach((user) => {
            const userContainer = document.createElement('div');
            const div = document.createElement("div");
            const sendBtn = document.createElement("button");

            div.classList.add("user");

            userContainer.id=`user-${user._id}`;

            div.textContent = user.firstName + " " + user.lastName;
            sendBtn.textContent = "send";

            userContainer.appendChild(div);
            userContainer.appendChild(sendBtn);

            container.appendChild(userContainer);

            sendBtn.addEventListener("click", async () => {
                const res = await fetch(
                    `http://localhost:8000/api/friends/request/${user._id}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        credentials: "include",
                    }
                );

                if (!res.ok) {
                    throw new Error(`Http error! status: ${res.status}`);
                }

                if (res.ok) alert("friend request sent succefully");

                const userC = document.getElementById(`user-${user._id}`);
                userC.innerHTML = '';

            });
        });
    } catch (error) {}
}


