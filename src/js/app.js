var title = document.querySelector('.title');
var courseFeatureElements = document.querySelectorAll('.course-feature');
var button = document.querySelector('#start-again');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log("✅ Service Worker Registered"))
    .catch(err => console.error("❌ Service Worker failed", err));
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  console.log("📌 Install prompt event saved.");

  // Tampilkan notifikasi untuk user
  showInstallNotification();
});

// ⏰ Munculkan notifikasi install setelah 3 detik
function showInstallNotification() {
  setTimeout(() => {
    if (deferredPrompt) {
      alert("🚀 Tambahkan aplikasi ini ke layar utama!"); // Bisa diganti dengan toast UI
      deferredPrompt.prompt(); // 🟢 Otomatis menampilkan prompt install
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log("✅ User accepted the install prompt");
        } else {
          console.log("❌ User dismissed the install prompt");
        }
        deferredPrompt = null; // Reset setelah digunakan
      });
    }
  }, 3000); // ⏳ Tunggu 3 detik sebelum menampilkan notifikasi
}

function animate() {
  title.classList.remove('animate-in');
  for (var i = 0; i < courseFeatureElements.length; i++) {
    courseFeatureElements[i].classList.remove('animate-in');
  }
  button.classList.remove('animate-in');

  setTimeout(function () {
    title.classList.add('animate-in');
  }, 1000);

  setTimeout(function () {
    courseFeatureElements[0].classList.add('animate-in');
  }, 3000);

  setTimeout(function () {
    courseFeatureElements[1].classList.add('animate-in');
  }, 4500);

  setTimeout(function () {
    courseFeatureElements[2].classList.add('animate-in');
  }, 6000);

  setTimeout(function () {
    courseFeatureElements[3].classList.add('animate-in');
  }, 7500);

  setTimeout(function () {
    courseFeatureElements[4].classList.add('animate-in');
  }, 9000);

  setTimeout(function () {
    courseFeatureElements[5].classList.add('animate-in');
  }, 10500);

  setTimeout(function () {
    courseFeatureElements[6].classList.add('animate-in');
  }, 12000);

  setTimeout(function () {
    button.classList.add('animate-in');
  }, 13500);
}

animate();

button.addEventListener('click', function() {
  animate();
});
