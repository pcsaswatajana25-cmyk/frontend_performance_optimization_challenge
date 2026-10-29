/**
 * ApexPulse Application Logic (Unminified & Non-Optimized)
 * Performs unthrottled DOM mutations and layout thrashing
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('[ApexPulse] Initializing application...');

  // Live Metrics Simulator
  var reqCountElem = document.getElementById('val-requests');
  var latElem = document.getElementById('val-latency');
  var nodeElem = document.getElementById('val-nodes');
  var errElem = document.getElementById('val-errors');

  var reqBase = 4.82;
  var latBase = 14.2;

  // Unthrottled interval
  setInterval(function() {
    if (reqCountElem) {
      reqBase += (Math.random() - 0.48) * 0.05;
      reqCountElem.textContent = reqBase.toFixed(2) + ' M req/s';
    }
    if (latElem) {
      latBase += (Math.random() - 0.5) * 0.4;
      latElem.textContent = latBase.toFixed(1) + ' ms';
    }
  }, 1000);

  // FAQ Accordion
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    var q = item.querySelector('.faq-question');
    if (q) {
      q.addEventListener('click', function() {
        item.classList.toggle('open');
      });
    }
  });

  // Non-passive scroll listener (penalizes scrolling performance)
  window.addEventListener('scroll', function(e) {
    var scrollPos = window.scrollY;
    var header = document.querySelector('header.site-header');
    if (header) {
      if (scrollPos > 40) {
        header.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.5)';
      } else {
        header.style.boxShadow = 'none';
      }
    }
  }, false);
});
