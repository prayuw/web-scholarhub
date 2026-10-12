/* ScholarHub: tombol Login / akun / Logout di navbar.
   Muat js/auth.js terlebih dahulu, lalu file ini pada setiap halaman yang memiliki navbar. */
(() => {
  "use strict";

  function addAuthControl() {
    if (document.getElementById("scholarhubAuthNav")) return;

    // Coba temukan navigasi umum yang sering dipakai pada project HTML.
    const nav = document.querySelector("header nav, nav.navbar, .navbar nav, nav");
    const header = document.querySelector("header");

    // Jika tidak ada elemen nav, letakkan di header; jika keduanya tidak ada,
    // tambahkan di awal body agar tombol tetap terlihat.
    const host = nav || header || document.body;
    const wrap = document.createElement("div");
    wrap.id = "scholarhubAuthNav";
    wrap.className = "sch-auth-nav";

    const loggedIn = window.ScholarHubAuth &&
      typeof window.ScholarHubAuth.isLoggedIn === "function" &&
      window.ScholarHubAuth.isLoggedIn();

    if (loggedIn) {
      const user = window.ScholarHubAuth.getUser();
      const label = document.createElement("span");
      label.className = "sch-auth-user";
      label.textContent = user && user.name ? `Halo, ${user.name}` : "Akun saya";

      const logout = document.createElement("button");
      logout.type = "button";
      logout.className = "sch-auth-button sch-auth-logout";
      logout.textContent = "Logout";
      logout.addEventListener("click", () => window.ScholarHubAuth.logout());

      wrap.append(label, logout);
    } else {
      const login = document.createElement("a");
      login.className = "sch-auth-button sch-auth-login";
      login.href = "login.html";
      login.textContent = "Login";
      wrap.append(login);
    }

    // Place control in navbar without replacing existing navigation content.
    if (nav) {
      nav.appendChild(wrap);
    } else {
      host.appendChild(wrap);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addAuthControl);
  } else {
    addAuthControl();
  }
})();
