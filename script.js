const form = document.getElementById("authForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const toggleBtn = document.getElementById("toggleBtn");
const title = document.getElementById("title");
const button = form.querySelector("button");
const togglePassword = document.getElementById("togglePassword");

let isLogin = true;

/* Redirect if already logged in */
if (localStorage.getItem("loggedInUser")) {
  window.location.href = "dashboard.html";
}

/* Show / Hide Password */
togglePassword.addEventListener("click", () => {
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
});

/* Toggle Login / Signup */
toggleBtn.addEventListener("click", () => {
  isLogin = !isLogin;
  title.innerText = isLogin ? "Login" : "Sign Up";
  button.innerText = isLogin ? "Login" : "Sign Up";
  toggleBtn.innerText = isLogin ? "Sign Up" : "Login";
  message.innerText = "";
});

/* Form Submit */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (password.length < 6) {
    message.style.color = "red";
    message.innerText = "Password must be at least 6 characters";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (isLogin) {
    if (users[email] === password) {
      localStorage.setItem("loggedInUser", email);
      window.location.href = "dashboard.html";
    } else {
      message.style.color = "red";
      message.innerText = "Invalid credentials";
    }
  } else {
    if (users[email]) {
      message.style.color = "red";
      message.innerText = "User already exists";
    } else {
      users[email] = password;
      localStorage.setItem("users", JSON.stringify(users));
      message.style.color = "green";
      message.innerText = "Signup successful! Login now.";
    }
  }

  form.reset();
});
