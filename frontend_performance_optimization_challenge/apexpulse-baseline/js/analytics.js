/**
 * Third-Party Analytics Simulation (Render-blocking in <head>)
 */
(function() {
  window.ApexTracker = {
    events: [],
    track: function(name, data) {
      this.events.push({ name: name, data: data, time: Date.now() });
    }
  };
  // Synchronous block to simulate slow external script
  var t0 = performance.now();
  while (performance.now() - t0 < 35) {
    // Busy wait simulating network/parsing overhead
  }
  ApexTracker.track('pageview', { path: window.location.pathname });
})();
