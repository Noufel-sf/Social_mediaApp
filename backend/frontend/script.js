const API_URL = `${process.env.API_URL}/api/auth`;


// Handle Signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
        
      alert("Signup successful! Please login.");
      window.location.href = "index.html";
    } else {
      alert(data.message || "Signup failed");
    }
  });
}

// Handle Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include" // so cookies (refreshToken) are stored
      ,
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      
        localStorage.setItem("accessToken", data.token); // save token
      alert("Login successful!");
      window.location.href = 'home.html';
      // later redirect to chat.html or dashboard.html
    } else {
      alert(data.message || "Login failed");
    }
  });
};






