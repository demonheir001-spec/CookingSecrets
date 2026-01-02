let used = false;
let loggedIn = false;
let role = "Guest";

const OPENAI_KEY = "";

async function openBox() {
  let ing = document.getElementById("ingredients").value;

  if (used && !loggedIn) {
    document.getElementById("recipeText").innerText =
      "Limit reached. Please login.";
    document.getElementById("box").style.display = "block";
    return;
  }

  document.getElementById("recipeText").innerText = "Thinking...";
  document.getElementById("box").style.display = "block";

  try {
    let res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENAI_KEY
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful cooking assistant."
          },
          {
            role: "user",
            content: "Create a simple recipe using: " + (ing || "basic ingredients")
          }
        ]
      })
    });

    let data = await res.json();
    let text = data.choices[0].message.content;

    document.getElementById("recipeText").innerText = text;

    if (!loggedIn) used = true;

  } catch (e) {
    document.getElementById("recipeText").innerText =
      "AI error. Check API key.";
  }
}

function closeBox() {
  document.getElementById("box").style.display = "none";
}

function addToCookbook() {
  if (!loggedIn) {
    document.getElementById("recipeText").innerText =
      "Login required to save";
    return;
  }
  localStorage.setItem("cookbook", document.getElementById("recipeText").innerText);
  document.getElementById("recipeText").innerText = "Saved ✔";
}

function showCookbook() {
  let saved = localStorage.getItem("cookbook");
  document.getElementById("recipeText").innerText =
    saved ? saved : "Cookbook empty";
  document.getElementById("box").style.display = "block";
}

/* LOGIN */

function openLogin() {
  document.getElementById("loginBox").style.display = "block";
}

function closeLogin() {
  document.getElementById("loginBox").style.display = "none";
}

function toggleChef(isChef) {
  document.getElementById("chefFields").style.display = isChef ? "block" : "none";
  role = isChef ? "Chef" : "User";
}

function login() {
  loggedIn = true;
  document.getElementById("status").innerText = role;
  closeLogin();
}
