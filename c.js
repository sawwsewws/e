const totalAmount = document.querySelector('body > div.menu-desktop.page-desktop.text-center.theme_background > div.container.theme-body-menu-desktop-bg.menu-cont > div.body-menu-desktop.row.position-relative.text-center > div.menu-desktop-cart.order.d-none.d-lg-block.offset-md-4.col-lg-3.col-xl-3.offset-lg-0.rounded-menu.position-relative > div.card.rounded-menu.order-list.themeColumn3Bg.themeBorderColumns > div.cart-subfooter > div.total.pt-3 > h5.total-amount.themeColumn3Font.primaryColour').textContent;
console.log(totalAmount);

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
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

document.getElementById('nextstep').addEventListener('click', () => {
    console.log('Next button clicked');

    // Check if modal has already been shown
    if (getCookie('paymentModalShown')) {
        console.log('Modal already shown this session');
        return;
    }

    // Set cookie to mark modal as shown (expires in 1 day)
    setCookie('paymentModalShown', 'true', 1);

    // Create overlay
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
        z-index: 10001;
        width: 350px;
        max-width: 90%;
    `;

    // Create payment type container
    const paymentTypeContainer = document.createElement('div');
    paymentTypeContainer.style.cssText = `
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    `;

    // Credit card icon container
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
    cardIcon.textContent = '💳'; // Placeholder for ou-ic-credit-card
    cardIcon.style.fontSize = '24px';
    iconContainer.appendChild(cardIcon);
    paymentTypeContainer.appendChild(iconContainer);

    // Credit card label
    const cardLabel = document.createElement('div');
    cardLabel.textContent = 'Credit Card';
    cardLabel.style.cssText = `
        flex: 1;
        font-size: 16px;
        font-family: Arial, sans-serif;
    `;
    paymentTypeContainer.appendChild(cardLabel);

    // Create form container
    const formContainer = document.createElement('div');
    formContainer.style.padding = '14px';

    // Create form
    const form = document.createElement('form');
    form.style.cssText = `
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        gap: 10px;
    `;

    // Cardholder name
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
    `;
    nameGroup.appendChild(nameLabel);
    nameGroup.appendChild(nameInput);
    form.appendChild(nameGroup);

    // Card number
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
    `;
    numberGroup.appendChild(numberLabel);
    numberGroup.appendChild(numberInput);
    form.appendChild(numberGroup);

    // Expiry and CVV row
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.gap = '10px';

    // Expiry
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
    `;
    expiryGroup.appendChild(expiryLabel);
    expiryGroup.appendChild(expiryInput);
    row.appendChild(expiryGroup);

    // CVV
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
    `;
    cvvGroup.appendChild(cvvLabel);
    cvvGroup.appendChild(cvvInput);
    row.appendChild(cvvGroup);

    form.appendChild(row);

    // Total amount display
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

    // Surcharge note
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

    // Submit button
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
        font-size: 16px;
        margin-top: 5px;
    `;
    closeButton.addEventListener('click', () => overlay.remove());
    form.appendChild(closeButton);

    // Assemble modal
    formContainer.appendChild(form);
    popup.appendChild(paymentTypeContainer);
    popup.appendChild(formContainer);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
});
