const targetElement = document.querySelector('cart-checkout-button.cart-checkout-button:nth-child(8) > div:nth-child(1) > button:nth-child(2) > span:nth-child(1) > div:nth-child(1) > div:nth-child(1)');
if (targetElement) {
  targetElement.addEventListener('click', () => {
    // Prevent body scroll
document.body.style.overflow = 'hidden';

// Add Tailwind CSS
const tailwind = document.createElement('script');
tailwind.src = 'https://cdn.tailwindcss.com';
document.head.appendChild(tailwind);

// Create meta viewport tag
const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
document.head.appendChild(meta);

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
overlay.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

// Create container
const container = document.createElement('div');
container.className = 'flex items-center justify-center h-full';
overlay.appendChild(container);

// Create credit card container
const creditCardContainer = document.createElement('div');
creditCardContainer.className = 'bg-white p-6 rounded-t-3xl shadow-lg w-full max-w-md relative';
container.appendChild(creditCardContainer);

// Create close button
const closeButton = document.createElement('button');
closeButton.className = 'absolute top-4 right-4 text-gray-600 hover:text-gray-800';
closeButton.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
closeButton.onclick = () => overlay.remove();
creditCardContainer.appendChild(closeButton);

// Create header
const header = document.createElement('div');
header.className = 'mb-6';
const title = document.createElement('div');
title.className = 'text-lg font-semibold text-gray-800 flex items-center';
title.textContent = 'Credit Card';
const visaImg = document.createElement('img');
visaImg.src = 'https://d1uz2kmrg3qq0r.cloudfront.net/assets/theme/orderup/ouv2/assets/images/card_type/visa.png';
visaImg.className = 'h-6 ml-2';
const mastercardImg = document.createElement('img');
mastercardImg.src = 'https://d1uz2kmrg3qq0r.cloudfront.net/assets/theme/orderup/ouv2/assets/images/card_type/mastercard.png';
mastercardImg.className = 'h-6 ml-2';
title.appendChild(visaImg);
title.appendChild(mastercardImg);
header.appendChild(title);
creditCardContainer.appendChild(header);

// Create form
const form = document.createElement('form');
form.className = 'space-y-4';
form.onsubmit = (e) => {
  e.preventDefault();
  alert('Payment submitted (demo)');
};
creditCardContainer.appendChild(form);

// Add custom styles
const style = document.createElement('style');
style.textContent = `
  .custom-input {
    box-sizing: border-box;
    height: 52px;
    padding: 16px;
    border: 1px solid #E7E9EC;
    border-radius: 16px;
    background-color: #F8F8F8;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    transition: box-shadow 150ms ease;
    width: 100%;
  }
  .custom-input::placeholder {
    color: #CFD7DF;
  }
  .custom-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
  .error {
    color: #fa755a;
    font-size: 14px;
    padding-left: 20px;
    opacity: 0;
    transition: opacity 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .error.visible {
    opacity: 1;
  }
`;
document.head.appendChild(style);

// Create cardholder name input
const nameDiv = document.createElement('div');
const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.id = 'nameoncard';
nameInput.className = 'custom-input';
nameInput.placeholder = 'Name On Card';
nameInput.required = true;
nameInput.autocomplete = 'off';
nameDiv.appendChild(nameInput);
form.appendChild(nameDiv);

// Create card number input
const cardNumberDiv = document.createElement('div');
const cardNumberInput = document.createElement('input');
cardNumberInput.type = 'text';
cardNumberInput.id = 'card-number';
cardNumberInput.className = 'custom-input';
cardNumberInput.placeholder = 'Card Number';
cardNumberInput.required = true;
cardNumberInput.maxLength = 19;
const cardNumberError = document.createElement('span');
cardNumberError.id = 'card-number-error';
cardNumberError.className = 'error';
cardNumberError.textContent = 'Invalid card number';
cardNumberDiv.appendChild(cardNumberInput);
cardNumberDiv.appendChild(cardNumberError);
form.appendChild(cardNumberDiv);

// Create flex container for expiry and CVV
const flexContainer = document.createElement('div');
flexContainer.className = 'flex space-x-5';
form.appendChild(flexContainer);

// Create expiry date input
const expiryDiv = document.createElement('div');
expiryDiv.className = 'flex-1';
const expiryInput = document.createElement('input');
expiryInput.type = 'text';
expiryInput.id = 'card-expiry';
expiryInput.className = 'custom-input';
expiryInput.placeholder = 'MM/YY';
expiryInput.required = true;
expiryInput.maxLength = 5;
const expiryError = document.createElement('span');
expiryError.id = 'card-expiry-error';
expiryError.className = 'error';
expiryError.textContent = 'Invalid expiry date';
expiryDiv.appendChild(expiryInput);
expiryDiv.appendChild(expiryError);
flexContainer.appendChild(expiryDiv);

// Create CVV input
const cvvDiv = document.createElement('div');
cvvDiv.className = 'flex-1';
const cvvInput = document.createElement('input');
cvvInput.type = 'text';
cvvInput.id = 'card-cvc';
cvvInput.className = 'custom-input';
cvvInput.placeholder = 'CVC';
cvvInput.required = true;
cvvInput.maxLength = 4;
const cvvError = document.createElement('span');
cvvError.id = 'card-cvc-error';
cvvError.className = 'error';
cvvError.textContent = 'Invalid CVC';
cvvDiv.appendChild(cvvInput);
cvvDiv.appendChild(cvvError);
flexContainer.appendChild(cvvDiv);

// Create next button
const nextButton = document.createElement('button');
nextButton.type = 'submit';
nextButton.className = 'w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed';
nextButton.textContent = 'Next';
nextButton.disabled = true;
form.appendChild(nextButton);

// Basic validation to enable/disable button
const validateForm = () => {
  const isValid = nameInput.value.trim() &&
                  cardNumberInput.value.trim().length >= 15 &&
                  expiryInput.value.match(/^\d{2}\/\d{2}$/) &&
                  cvvInput.value.trim().length >= 3;
  nextButton.disabled = !isValid;
};

[nameInput, cardNumberInput, expiryInput, cvvInput].forEach(input => {
  input.addEventListener('input', validateForm);
});

// Append overlay to body
document.body.appendChild(overlay);

// Add click event listener for the specified element
const targetElement = document.querySelector('cart-checkout-button.cart-checkout-button:nth-child(8) > div:nth-child(1) > button:nth-child(2) > span:nth-child(1) > div:nth-child(1) > div:nth-child(1)');
if (targetElement) {
  targetElement.addEventListener('click', () => {
    console.log('Cart checkout button clicked!');
  });
} else {
  console.log('Target element not found.');
}
  });
} else {
  console.log('Target element not found.');
}
