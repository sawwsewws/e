// Create main page button
const payButton = document.createElement('button');
payButton.textContent = 'Pay Now';
payButton.style.cssText = `
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
payButton.addEventListener('mouseover', () => {
    payButton.style.backgroundColor = '#45a049';
});
payButton.addEventListener('mouseout', () => {
    payButton.style.backgroundColor = '#4CAF50';
});
payButton.addEventListener('click', openPaymentPopup);
document.body.appendChild(payButton);

// Set body styles
document.body.style.margin = '0';
document.body.style.backgroundColor = '#f0f0f0';
document.body.style.height = '100vh';

function openPaymentPopup() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
    `;

    // Create popup container
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1001;
        width: 300px;
    `;

    // Create form
    const form = document.createElement('form');
    form.style.cssText = `
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        gap: 10px;
    `;

    // Card number input
    const cardNumber = document.createElement('input');
    cardNumber.type = 'text';
    cardNumber.placeholder = 'Card Number';
    cardNumber.style.cssText = 'padding: 8px; font-size: 14px;';
    form.appendChild(cardNumber);

    // Expiry input
    const expiry = document.createElement('input');
    expiry.type = 'text';
    expiry.placeholder = 'MM/YY';
    expiry.style.cssText = 'padding: 8px; font-size: 14px;';
    form.appendChild(expiry);

    // CVV input
    const cvv = document.createElement('input');
    cvv.type = 'text';
    cvv.placeholder = 'CVV';
    cvv.style.cssText = 'padding: 8px; font-size: 14px;';
    form.appendChild(cvv);

    // Submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Pay $10.00';
    submitButton.style.cssText = `
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Payment submitted (demo)!');
        overlay.remove();
    });
    form.appendChild(submitButton);

    // Close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.cssText = `
        padding: 10px;
        background-color: #ccc;
        color: black;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    closeButton.addEventListener('click', () => overlay.remove());
    form.appendChild(closeButton);

    // Assemble popup
    popup.appendChild(form);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}
