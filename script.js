/* ===== APP STATE ===== */
let used = false;
let loggedIn = false;
let role = "Guest";

/* ===== MAIN ACTION ===== */
async function openBox() {
  const ing = document.getElementById("ingredients").value;
  const btn = document.querySelector(".main-btn");

  if (btn) btn.style.animation = "none";

  // Guest limit
  if (used && !loggedIn) {
    document.getElementById("recipeText").innerText =
      "Limit reached. Please login to continue.";
    document.getElementById("box").style.display = "block";
    return;
  }

  document.getElementById("recipeText").innerText =
    "Creating your recipe…";
  document.getElementById("box").style.display = "block";

  // Fake AI (safe demo)
  setTimeout(() => {
    document.getElementById("recipeText").innerText =
      `Recipe using ${ing || "basic ingredients"}:\n\n` +
      `1. Heat oil in a pan\n` +
      `2. Add ingredients and sauté\n` +
      `3. Season and cook until done\n\nEnjoy 🍽️`;

    if (!loggedIn) used = true;
  }, 900);
}

/* ===== POPUP ===== */
function closeBox() {
  document.getElementById("box").style.display = "none";
}

/* ===== COOKBOOK ===== */
function addToCookbook() {
  if (!loggedIn) {
    document.getElementById("recipeText").innerText =
      "Please login to save recipes.";
    return;
  }

  localStorage.setItem(
    "cookbook",
    document.getElementById("recipeText").innerText
  );

  document.getElementById("recipeText").innerText =
    "Saved to Cookbook ✔";
}

function showCookbook() {
  const saved = localStorage.getItem("cookbook");

  if (!saved) {
    document.getElementById("recipeText").innerHTML = `
      <div style="text-align:center;opacity:0.85;">
        <svg class="icon big" viewBox="0 0 24 24" style="margin-bottom:12px;">
          <path d="M6 4h13v16H6c-1.7 0-3 1.3-3 3V7c0-1.7 1.3-3 3-3z"/>
        </svg>
        <p style="margin:0;font-size:16px;">Your cookbook is empty</p>
        <p style="margin-top:8px;font-size:13px;opacity:0.7;">
          Generate a recipe and save it here
        </p>
      </div>
    `;
  } else {
    document.getElementById("recipeText").innerText = saved;
  }

  document.getElementById("box").style.display = "block";
}

/* ===== LOGIN ===== */
function openLogin() {
  document.getElementById("loginBox").style.display = "block";
}

function closeLogin() {
  document.getElementById("loginBox").style.display = "none";
}

function toggleChef(isChef) {
  document.getElementById("chefFields").style.display =
    isChef ? "block" : "none";
  role = isChef ? "Chef" : "User";
}

function login() {
  loggedIn = true;
  document.getElementById("status").innerText = role;
  closeLogin();
}
