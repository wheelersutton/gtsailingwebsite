if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw_cache.js?date=' + (new Date().getTime()))
      .then(reg => console.log('Service Worker: Registered'))
      .catch(err => console.log(`Service Worker Error: ${err}`));
  });
}