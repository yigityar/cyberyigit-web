const SUPABASE_URL = "https://snemhwusjsuphxetxnyj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_LfVBEDGqsBwlIVLOexP6lQ_Ty9DHRX1"; const supabase = (window.supabase && SUPABASE_URL.startsWith("http")) 
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

// Global Aç/Kapat Fonksiyonları
window.openAuthModal = function() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.style.display = "flex";
};

window.closeAuthModal = function() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.style.display = "none";
};

// Global Giriş Fonksiyonu
window.doLogin = async function() {
  if (!supabase) return alert("Supabase baglantisi yapilandirilmadi.");
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
    window.closeAuthModal();
    window.location.reload();
  }
};

// Global Kayıt Fonksiyonu
window.doRegister = async function() {
  if (!supabase) return alert("Supabase baglantisi yapilandirilmadi.");
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
    status.innerText = "Onay linki e-postanıza gönderildi.";
    status.style.color = "#4ade80";
  }
};

// Global Çıkış Fonksiyonu
window.doLogout = async function(e) {
  if (e) e.preventDefault();
  if (supabase) await supabase.auth.signOut();
  window.location.reload();
};

// Oturum Kontrolü
async function checkAuth() {
  if (!supabase) return;
  const { data: { session } } = await supabase.auth.getSession();
  
  const authLinks = document.querySelectorAll('a[href*="openAuthModal"]');
  const protectedContent = document.getElementById("protected-content");
  const guestWarning = document.getElementById("guest-warning");

  if (session && session.user) {
    authLinks.forEach(link => {
      link.innerHTML = `<span style="color:#22d3ee; margin-right:6px;">${session.user.email}</span><span style="color:#f87171; text-decoration:underline; cursor:pointer;" onclick="doLogout(event)">[Çıkış]</span>`;
      link.removeAttribute("href");
    });
    if (protectedContent) protectedContent.classList.remove("hidden");
    if (guestWarning) guestWarning.classList.add("hidden");
  } else {
    if (protectedContent) protectedContent.classList.add("hidden");
    if (guestWarning) guestWarning.classList.remove("hidden");
  }
}

// Modal dışına tıklandığında kapatma
window.addEventListener("click", (e) => {
  const modal = document.getElementById("auth-modal");
  if (e.target === modal) window.closeAuthModal();
});

window.addEventListener("load", checkAuth);
