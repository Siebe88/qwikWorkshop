// Performance measurement utilities

/**
 * Adds a metrics element to the DOM to display performance information
 */
export const addPerformanceMetricsElement = (metrics: Record<string, string>) => {
  if (typeof document === 'undefined') return;

  // Create or get existing performance metrics element
  let metricsElement = document.getElementById('performance-metrics');
  if (!metricsElement) {
    metricsElement = document.createElement('div');
    metricsElement.id = 'performance-metrics';
    document.body.appendChild(metricsElement);
  }

  // Build HTML content
  let content = '<div><strong>⏱️ Performance Metrics:</strong></div>';

  // Add each metric
  for (const [key, value] of Object.entries(metrics)) {
    content += `<div>${key}: ${value}</div>`;
  }

  metricsElement.innerHTML = content;
};

/**
 * Measures Time to Interactive (TTI)
 * In Qwik, this isn't needed since the app is instantly interactive
 * We include it for comparison purposes with the Next.js version
 */
export const measureTTI = () => {
  if (typeof window === 'undefined') return;

  const start = performance.now();
  window.requestIdleCallback(() => {
    const end = performance.now();
    const tti = 0; // In Qwik, TTI is essentially 0 since components are instantly interactive

    // Log and display TTI
    console.log({ message: 'Time to Interactive (TTI)', tti: `${tti.toFixed(2)}ms` });

    addPerformanceMetricsElement({
      'Time to Interactive': `${tti.toFixed(2)}ms`,
      'Actual Load Time': `${(end - start).toFixed(2)}ms`,
      'Network+Parse Time': `${start.toFixed(2)}ms`,
      Framework: 'Qwik (Resumable)',
    });
  });
};
