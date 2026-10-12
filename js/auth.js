(() => {
  "use strict";

  const SESSION_KEY = "scholarhub_demo_logged_in";
  const USER_KEY = "scholarhub_demo_user";
  const REGISTERED_EMAIL_KEY = "scholarhub_demo_registered_email";

  const getSafeReturnTo = () => {
    const params = new URLSearchParams(window.location.search);
    const candidate = params.get("returnTo") || sessionStorage.getItem("scholarhub_return_to") || "index.html";
    // Only allow a local HTML path, not an external URL or script URL.
    if (!/^[a-zA-Z0-9_-]+\.html$/.test(candidate)) return "index.html";
    return candidate;
  };

  const setError = (id, message) => {
    const node = document.getElementById(id);
    if (node) node.textContent = message || "";
  };

  const setInvalid = (inputId, invalid) => {
    const node = document.getElementById(inputId);
    if (node) {
      if (invalid) node.setAttribute("aria-invalid", "true");
      else node.removeAttribute("aria-invalid");
    }
  };

  const showMessage = (id, message, type) => {
    const node = document.getElementById(id);
    if (!node) return;
    node.textContent = message;
    node.className = "form-message" + (type ? " " + type : "");
  };

  const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  document.querySelectorAll("[data-toggle-password]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.togglePassword);
      if (!input) return;
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      button.textContent = show ? "Sembunyikan" : "Lihat";
      button.setAttribute("aria-label", show ? "Sembunyikan password" : "Tampilkan password");
    });
  });

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = true;
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      setError("loginEmailError", "");
      setError("loginPasswordError", "");
      setInvalid("loginEmail", false);
      setInvalid("loginPassword", false);
      showMessage("loginMessage", "", "");

      if (!email) {
        setError("loginEmailError", "Email wajib diisi.");
        setInvalid("loginEmail", true);
        valid = false;
      } else if (!validEmail(email)) {
        setError("loginEmailError", "Masukkan format email yang valid.");
        setInvalid("loginEmail", true);
        valid = false;
      }

      if (!password) {
        setError("loginPasswordError", "Password wajib diisi.");
        setInvalid("loginPassword", true);
        valid = false;
      }

      if (!valid) return;

      // Demo only: no server checks credentials and no password is stored.
      const registeredEmail = sessionStorage.getItem(REGISTERED_EMAIL_KEY);
      if (registeredEmail && registeredEmail.toLowerCase() !== email.toLowerCase()) {
        showMessage("loginMessage", "Gunakan email yang didaftarkan pada sesi demo ini, atau daftar ulang.", "error");
        return;
      }

      const name = sessionStorage.getItem("scholarhub_demo_registered_name") || email.split("@")[0];
      sessionStorage.setItem(SESSION_KEY, "true");
      sessionStorage.setItem(USER_KEY, JSON.stringify({ name, email }));
      sessionStorage.removeItem("scholarhub_return_to");

      showMessage("loginMessage", "Login demo berhasil. Mengalihkan halaman...", "success");
      window.setTimeout(() => {
        window.location.href = getSafeReturnTo();
      }, 350);
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    const nameInput = document.getElementById("registerName");
    const emailInput = document.getElementById("registerEmail");
    const passwordInput = document.getElementById("registerPassword");
    const confirmInput = document.getElementById("confirmPassword");
    const termsInput = document.getElementById("terms");

    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = true;
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirm = confirmInput.value;

      [
        "registerNameError", "registerEmailError", "registerPasswordError",
        "confirmPasswordError", "termsError"
      ].forEach((id) => setError(id, ""));
      ["registerName", "registerEmail", "registerPassword", "confirmPassword"].forEach((id) => setInvalid(id, false));
      showMessage("registerMessage", "", "");

      if (!name) {
        setError("registerNameError", "Nama lengkap wajib diisi.");
        setInvalid("registerName", true);
        valid = false;
      }
      if (!email) {
        setError("registerEmailError", "Email wajib diisi.");
        setInvalid("registerEmail", true);
        valid = false;
      } else if (!validEmail(email)) {
        setError("registerEmailError", "Masukkan format email yang valid.");
        setInvalid("registerEmail", true);
        valid = false;
      }
      if (!password) {
        setError("registerPasswordError", "Password wajib diisi.");
        setInvalid("registerPassword", true);
        valid = false;
      } else if (password.length < 8) {
        setError("registerPasswordError", "Password minimal 8 karakter.");
        setInvalid("registerPassword", true);
        valid = false;
      }
      if (!confirm) {
        setError("confirmPasswordError", "Konfirmasi password wajib diisi.");
        setInvalid("confirmPassword", true);
        valid = false;
      } else if (password !== confirm) {
        setError("confirmPasswordError", "Konfirmasi password belum sama.");
        setInvalid("confirmPassword", true);
        valid = false;
      }
      if (!termsInput.checked) {
        setError("termsError", "Centang persetujuan untuk melanjutkan.");
        valid = false;
      }

      if (!valid) return;

      // Store only demo identity for this browser tab/session, never the password.
      sessionStorage.setItem(REGISTERED_EMAIL_KEY, email);
      sessionStorage.setItem("scholarhub_demo_registered_name", name);
      showMessage("registerMessage", "Registrasi demo berhasil. Silakan masuk menggunakan email yang baru didaftarkan.", "success");

      window.setTimeout(() => {
        window.location.href = "login.html";
      }, 700);
    });
  }

  // Optional utility for navigation/logout buttons.
  window.ScholarHubAuth = {
    isLoggedIn() {
      return sessionStorage.getItem(SESSION_KEY) === "true";
    },
    getUser() {
      try { return JSON.parse(sessionStorage.getItem(USER_KEY) || "null"); }
      catch (_) { return null; }
    },
    logout() {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(USER_KEY);
      sessionStorage.removeItem("scholarhub_return_to");
      window.location.href = "index.html";
    },
    requireLogin() {
      if (this.isLoggedIn()) return true;
      const page = window.location.pathname.split("/").pop() || "index.html";
      sessionStorage.setItem("scholarhub_return_to", /^[a-zA-Z0-9_-]+\.html$/.test(page) ? page : "index.html");
      window.location.href = "login.html?returnTo=" + encodeURIComponent(page);
      return false;
    }
  };
})();
