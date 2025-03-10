'use client';

// This file contains utilities for measuring and displaying performance metrics

export const measureTTI = () => {
  if (typeof window === 'undefined') return;

  // Start measuring right when the client component mounts
  const start = performance.now();

  // Get a more reliable page load metric
  let networkParseTime = 0;

  // Try to use Navigation Timing API if available
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    // Use responseEnd - navigationStart as network+parse time
    // This represents the time it took to fetch and parse the page
    networkParseTime = timing.responseEnd - timing.navigationStart;

    // Ensure we don't have negative values (can happen with timing issues)
    if (networkParseTime < 0 || !isFinite(networkParseTime)) {
      networkParseTime = 0;
    }
  } else if (window.performance && window.performance.getEntriesByType) {
    // Try to use newer Performance API
    const navEntries = window.performance.getEntriesByType('navigation');
    if (navEntries && navEntries.length > 0) {
      // Cast to PerformanceNavigationTiming which has responseEnd property
      const navEntry = navEntries[0] as PerformanceNavigationTiming;
      networkParseTime = navEntry.responseEnd;

      // Ensure we don't have negative values
      if (networkParseTime < 0 || !isFinite(networkParseTime)) {
        networkParseTime = 0;
      }
    }
  }

  // Function to add to the DOM when fully interactive
  return () => {
    const end = performance.now();
    const timeToInteractive = end - start;
    const actualLoadTime = end - start;

    console.log({
      message: 'Time to Interactive (TTI)',
      timeToInteractive: `${timeToInteractive.toFixed(2)}ms`,
      actualLoadTime: `${actualLoadTime.toFixed(2)}ms`,
      networkParseTime: `${networkParseTime.toFixed(2)}ms`,
    });

    // Create element to display metrics on screen
    const metricsElement = document.createElement('div');
    metricsElement.id = 'performance-metrics';
    metricsElement.style.position = 'fixed';
    metricsElement.style.bottom = '10px';
    metricsElement.style.right = '10px';
    metricsElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    metricsElement.style.color = 'white';
    metricsElement.style.padding = '10px';
    metricsElement.style.borderRadius = '5px';
    metricsElement.style.zIndex = '9999';
    metricsElement.style.fontSize = '14px';
    metricsElement.style.fontFamily = 'monospace';

    metricsElement.innerHTML = `
      <div><strong>⏱️ Performance Metrics:</strong></div>
      <div>Time to Interactive: ${timeToInteractive.toFixed(2)}ms</div>
      <div>Actual Load Time: ${actualLoadTime.toFixed(2)}ms</div>
      <div>Network+Parse Time: ${networkParseTime.toFixed(2)}ms</div>
      <div>Framework: Next.js (React)</div>
    `;

    // Add metrics to the DOM
    document.body.appendChild(metricsElement);

    return timeToInteractive;
  };
};

// Function to measure component render times
export const measureRenderTime = (componentName: string) => {
  if (typeof window === 'undefined') return { start: () => {}, end: () => {} };

  let startTime = 0;

  return {
    start: () => {
      startTime = performance.now();
    },
    end: () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      console.log({ message: `Render time for ${componentName}`, time: `${renderTime.toFixed(2)}ms` });
      return renderTime;
    },
  };
};
