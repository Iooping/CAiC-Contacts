document.addEventListener('DOMContentLoaded', () => {
    // Add a fade-in animation to the main container when the page loads
    const contactContainer = document.getElementById('contact-form-container');
    contactContainer.style.opacity = '1';
    contactContainer.style.transform = 'translateY(0)';
    
    // --- Form Submission Logic ---
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const formMessage = document.getElementById('form-message');

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Show a loading state
        submitButton.disabled = true;
        buttonText.textContent = "Sending...";
        formMessage.classList.add('hidden');

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                form.reset();
                formMessage.textContent = "✅ Message sent successfully! We'll review it and get back to you shortly.";
                formMessage.classList.remove('hidden');
                formMessage.classList.remove('bg-red-500');
                formMessage.classList.add('bg-green-500');
                
                // Trigger a confetti effect for celebration
                createConfetti();

                // Hide the message after a few seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);

            } else {
                // Handle formspree errors
                const data = await response.json();
                const errorMessage = data.errors ? data.errors.map(err => err.message).join(", ") : "Oops! Something went wrong.";
                formMessage.textContent = `❌ ${errorMessage}`;
                formMessage.classList.remove('hidden');
                formMessage.classList.remove('bg-green-500');
                formMessage.classList.add('bg-red-500');
            }
        } catch (error) {
            console.error("Submission Error:", error);
            formMessage.textContent = "❌ Network error. Please try again.";
            formMessage.classList.remove('hidden');
            formMessage.classList.remove('bg-green-500');
            formMessage.classList.add('bg-red-500');
        } finally {
            // Re-enable the button and reset text
            submitButton.disabled = false;
            buttonText.textContent = "Send Message";
        }
    });

    // --- Accordion Logic ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling;
            
            // Close all other open accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle the clicked accordion item
            accordionItem.classList.toggle('active');
            if (accordionItem.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            } else {
                accordionContent.style.maxHeight = null;
            }
        });
    });

    // --- Confetti Effect ---
    function createConfetti() {
        const confettiCount = 50;
        const colors = ['#f59e0b', '#fcd34d', '#fff']; // Yellows and white for a celebratory look

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            // Randomize starting position and size
            const size = Math.random() * 10 + 5;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight - window.innerHeight;

            // Randomize color
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            // Randomize the fall path for a scattered look
            confetti.style.setProperty('--confetti-x', `${(Math.random() - 0.5) * 500}px`);
            confetti.style.setProperty('--confetti-y', `${window.innerHeight + 100}px`);

            document.body.appendChild(confetti);

            // Remove the confetti element after the animation finishes
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }
});
