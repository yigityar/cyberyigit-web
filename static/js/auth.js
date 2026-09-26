const SUPABASE_URL = "https://snemhwusjsuphxetxnyj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_LfVBEDGqsBwlIVLOexP6lQ_Ty9DHRX1";
const supabase = (window.supabase && SUPABASE_URL.startsWith("http")) 
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

function showModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.style.display = "flex";
}

function hideModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.style.display = "none";
}

async function refreshAuthUI() {
  const authLinks = document.querySelectorAll('a[href*="#giris"]');
  const protectedContent = document.getElementById("protected-content");
  const guestWarning = document.getElementById("guest-warning");

  if (!supabase) return;

  const { data: { session } } = await supabase.auth.getSession();

  if (session && session.user) {
    authLinks.forEach(link => {
      link.innerHTML = `<span style="color:#22d3ee; margin-right:6px;">${session.user.email}</span><span style="color:#f87171; text-decoration:underline; cursor:pointer;" id="auth-logout-btn">[Çıkış]</span>`;
      link.removeAttribute("href");
      const logoutBtn = link.querySelector("#auth-logout-btn");
      if (logoutBtn) {
        logoutBtn.onclick = async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await supabase.auth.signOut();
          window.location.reload();
        };
      }
    });

    if (protectedContent) protectedContent.classList.remove("hidden");
    if (guestWarning) guestWarning.classList.add("hidden");
  } else {
    authLinks.forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        showModal();
      };
    });

    if (protectedContent) protectedContent.classList.add("hidden");
    if (guestWarning) guestWarning.classList.remove("hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Modal kapatma butonu
  const closeBtn = document.getElementById("btn-close-modal");
  if (closeBtn) closeBtn.onclick = hideModal;

  // Dışarı tıklayınca kapatma
  const modal = document.getElementById("auth-modal");
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) hideModal();
    };
  }

  // Giriş butonu
  const loginBtn = document.getElementById("btn-login");
  if (loginBtn) {
    loginBtn.onclick = async () => {
      const email = document.getElementById("auth-email").value;
      const password = document.getElementById("auth-password").value;
      const status = document.getElementById("auth-status");
      status.innerText = "Giriş yapılıyor...";
      status.style.color = "#22d3ee";

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        status.innerText = error.message;
        status.style.color = "#f87171";
      } else {
        status.innerText = "Giriş başarılı!";
        hideModal();
        window.location.reload();
      }
    };
  }

  // Kayıt butonu
  const registerBtn = document.getElementById("btn-register");
  if (registerBtn) {
    registerBtn.onclick = async () => {
      const email = document.getElementById("auth-email").value;
      const password = document.getElementById("auth-password").value;
      const status = document.getElementById("auth-status");
      status.innerText = "Hesap oluşturuluyor...";
      status.style.color = "#22d3ee";

      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        status.innerText = error.message;
        status.style.color = "#f87171";
      } else {
        status.innerText = "Onay linki e-postanıza iletildi.";
        status.style.color = "#4ade80";
      }
    };
  }

  refreshAuthUI();
});
