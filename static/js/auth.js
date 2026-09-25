// Supabase Yapılandırması
const SUPABASE_URL = "https://snemhwusjsuphxetxnyj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_LfVBEDGqsBwlIVLOexP6lQ_Ty9DHRX1"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Kullanıcı Oturum Kontrolü
async function checkUserSession() {
  const { data: { session } } = await supabase.auth.getSession();
  const authNav = document.getElementById("auth-nav-container");
  const protectedContent = document.getElementById("protected-content");
  const guestWarning = document.getElementById("guest-warning");

  if (session && session.user) {
    if (authNav) {
      authNav.innerHTML = `
        <span class="text-xs font-mono text-cyan-400 mr-2">${session.user.email}</span>
        <button onclick="handleLogout()" class="text-xs font-mono px-2 py-1 rounded border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white transition">Çıkış</button>
      `;
    }
    if (protectedContent) protectedContent.classList.remove("hidden");
    if (guestWarning) guestWarning.classList.add("hidden");
  } else {
    if (authNav) {
      authNav.innerHTML = `
        <button onclick="openAuthModal()" class="text-xs font-mono px-3 py-1 rounded border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black transition">Giriş Yap</button>
      `;
    }
    if (protectedContent) protectedContent.classList.add("hidden");
    if (guestWarning) guestWarning.classList.remove("hidden");
  }
}

// Giriş Yapma
async function handleLogin(email, password) {
  const statusEl = document.getElementById("auth-status");
  statusEl.innerText = "Giriş yapılıyor...";
  statusEl.className = "text-xs font-mono text-cyan-400 mb-2";

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    statusEl.innerText = "Hata: " + error.message;
    statusEl.className = "text-xs font-mono text-red-400 mb-2";
  } else {
    statusEl.innerText = "Başarılı!";
    closeAuthModal();
    window.location.reload();
  }
}

// Kayıt Olma
async function handleRegister(email, password) {
  const statusEl = document.getElementById("auth-status");
  statusEl.innerText = "Kayıt oluşturuluyor...";
  statusEl.className = "text-xs font-mono text-cyan-400 mb-2";

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    statusEl.innerText = "Hata: " + error.message;
    statusEl.className = "text-xs font-mono text-red-400 mb-2";
  } else {
    statusEl.innerText = "Kayıt başarılı! E-posta onay linki gönderildi.";
    statusEl.className = "text-xs font-mono text-green-400 mb-2";
  }
}

// Çıkış
async function handleLogout() {
  await supabase.auth.signOut();
  window.location.reload();
}

// Modal Yönetimi
function openAuthModal() {
  document.getElementById("auth-modal").classList.remove("hidden");
}
function closeAuthModal() {
  document.getElementById("auth-modal").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  checkUserSession();
});

// Nav çubuğuna otomatik buton enjekte et
document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.querySelector("#menu");
  if (navMenu && !document.getElementById("auth-nav-container")) {
    const li = document.createElement("li");
    li.id = "auth-nav-container";
    li.className = "flex items-center ml-4";
    navMenu.appendChild(li);
    checkUserSession();
  }
});
