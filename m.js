// Ensure body doesn't scroll
document.body.style.overflow = 'hidden';

// Create overlay
const overlay = document.createElement('div');
overlay.id = 'white-overlay';
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100vw';
overlay.style.height = '100vh';
overlay.style.backgroundColor = 'white';
overlay.style.zIndex = '10000';
overlay.style.touchAction = 'none';

// Prevent default touch behavior
overlay.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

// Append to body
document.body.appendChild(overlay);

// Ensure meta viewport tag exists
const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
document.head.appendChild(meta);
