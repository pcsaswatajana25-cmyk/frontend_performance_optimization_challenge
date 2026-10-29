/**
 * Vendor Bloat Simulation Bundle (Unminified, 95KB)
 * Simulates heavy monolithic utility libraries (e.g. lodash, moment, mathjs)
 * that execute expensive loops during parse/compilation.
 */
(function() {
  window.__APEX_VENDOR = {
    version: '4.17.21',
    loadedAt: Date.now(),
    utils: {}
  };
  
  // Synthetic CPU-intensive startup work simulating complex library initialization
  var start = performance.now();
  var arr = [];
  for (var i = 0; i < 45000; i++) {
    arr.push({
      id: i,
      hash: Math.sin(i) * Math.cos(i),
      timestamp: new Date().toISOString()
    });
  }
  
  // Synchronous sorting & heavy reduction (causes Long Task > 120ms)
  arr.sort(function(a, b) { return a.hash - b.hash; });
  var total = arr.reduce(function(acc, item) { return acc + item.hash; }, 0);
  
  window.__APEX_VENDOR.telemetrySum = total;
  console.log('[Vendor] Initialized with ' + arr.length + ' telemetry entities in ' + (performance.now() - start).toFixed(2) + 'ms');
})();
