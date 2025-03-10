'use client';

// This file contains utilities for measuring and displaying performance metrics

export const measureTTI = () => {
  if (typeof window === 'undefined') return;

  // Start measuring right when the client component mounts
  const start = performance.now();

  // Function to add to the DOM when fully interactive
  return () => {
    const end = performance.now();
    const timeToInteractive = end - start;

    console.log({ message: 'Time to Interactive (TTI)', timeToInteractive: `${timeToInteractive.toFixed(2)}ms` });

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
    `;

    // Add metrics to the DOM
    document.body.appendChild(metricsElement);

    return timeToInteractive;
  };
};

// Add artificial rendering delay (now disabled for fair comparison)
export const artificialDelay = (ms = 300) => {
  // No-op for fair comparison
  return;

  // Original implementation:
  // if (typeof window === 'undefined') return;
  // const start = performance.now();
  // while (performance.now() - start < ms) {
  //   // Busy wait to block the main thread
  // }
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
