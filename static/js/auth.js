const SUPABASE_URL = "BURAYA_SUPABASE_PROJECT_URL_YAZIN";
const SUPABASE_ANON_KEY = "BURAYA_SUPABASE_ANON_KEY_YAZIN";

const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// Modal Aç/Kapat
function openAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.style.display = "flex";
}
function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.style.display = "none";
}

// Oturum Kontrolü
async function checkUserSession() {
  if (!supabase) return;
  const { data: { session } } = await supabase.auth.getSession();
  
  // Hugo menüsündeki Giriş Yap linkini bul (url = #giris)
  const authLinks = document.querySelectorAll('a[href*="#giris"]');
  const protectedContent = document.getElementById("protected-content");
  const guestWarning = document.getElementById("guest-warning");

  if (session && session.user) {
    authLinks.forEach(link => {
      link.innerHTML = `<span style="color:#22d3ee; margin-right:8px;">${session.user.email}</span><span style="color:#f87171; text-decoration:underline; cursor:pointer;" onclick="handleLogout(event)">[Çıkış]</span>`;
      link.removeAttribute("href");
    });

    if (protectedContent) protectedContent.classList.remove("hidden");
    if (guestWarning) guestWarning.classList.add("hidden");
  } else {
    authLinks.forEach(link => {
      link.innerText = "Giriş Yap";
      link.onclick = (e) => {
        e.preventDefault();
        openAuthModal();
      };
    });

    if (protectedContent) protectedContent.classList.add("hidden");
    if (guestWarning) guestWarning.classList.remove("hidden");
  }
}

// Giriş
async function handleLogin(email, password) {
  const statusEl = document.getElementById("auth-status");
  statusEl.innerText = "Giriş yapılıyor...";
  statusEl.style.color = "#22d3ee";

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    statusEl.innerText = "Hata: " + error.message;
    statusEl.style.color = "#f87171";
  } else {
    statusEl.innerText = "Başarılı!";
    closeAuthModal();
    window.location.reload();
  }
}

// Kayıt
async function handleRegister(email, password) {
  const statusEl = document.getElementById("auth-status");
  statusEl.innerText = "Kayıt oluşturuluyor...";
  statusEl.style.color = "#22d3ee";

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    statusEl.innerText = "Hata: " + error.message;
    statusEl.style.color = "#f87171";
  } else {
    statusEl.innerText = "Kayıt başarılı! E-postanızı kontrol edin.";
    statusEl.style.color = "#4ade80";
  }
}

// Çıkış
async function handleLogout(e) {
  if (e) e.preventDefault();
  await supabase.auth.signOut();
  window.location.reload();
}

// Sayfa yüklendiğinde çalıştır
window.addEventListener("load", checkUserSession);
