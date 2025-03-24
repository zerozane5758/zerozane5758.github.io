if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function () {
    console.log('Service Worker registered!');
  });
}

var sharedMomentsArea = document.querySelector('#shared-moments');
var deferredPrompt;
var installButton = document.querySelector('#install-button');

function createCard(post) {
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'card';

  var cardTitle = document.createElement('h2');
  cardTitle.textContent = post.title;
  cardWrapper.appendChild(cardTitle);

  var cardBody = document.createElement('p');
  cardBody.textContent = post.body;
  cardWrapper.appendChild(cardBody);

  var postId = document.createElement('p');
  postId.textContent = `Post ID: ${post.id}`;
  cardWrapper.appendChild(postId);

  sharedMomentsArea.appendChild(cardWrapper);
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  installButton.style.display = 'block'; // Show the install button
});

installButton.addEventListener('click', function() {
  installButton.style.display = 'none'; // Hide the install button
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(function(choiceResult) {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  });
});

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    data.forEach(createCard);
  })
  .catch(function (err) {
    console.log('Error fetching posts:', err);
  });