var title = document.querySelector('.title');
var courseFeatureElements = document.querySelectorAll('.course-feature');
var button = document.querySelector('button');

var deferredPrompt;
navigator.serviceWorker.register('/sw.js');

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

// Tangkap event "beforeinstallprompt" dan simpan untuk digunakan nanti
window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;

  // Tampilkan notifikasi setelah 4 detik
  setTimeout(function() {
    showInstallNotification();
  }, 4000);
});

// Fungsi untuk menampilkan notifikasi install
function showInstallNotification() {
  if (!("Notification" in window)) {
    console.warn("Browser tidak mendukung notifikasi.");
    return;
  }

  // Minta izin notifikasi jika belum diberikan
  Notification.requestPermission().then(function(permission) {
    if (permission === "granted") {
      var notification = new Notification("Pasang Aplikasi", {
        body: "Klik untuk menambahkan aplikasi ke layar utama.",
        icon: "/src/images/icons/icon-192x192.png"
      });

      // Ketika notifikasi diklik, munculkan prompt install
      notification.onclick = function() {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then(function(choiceResult) {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
          });
        }
      };
    }
  });
}

button.addEventListener('click', function() {
  animate();
});
