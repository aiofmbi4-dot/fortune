/**
 * Wheel of Fortune - Marketing Funnel Logic
 * Rigged spin, Confetti, Lead Capture Modal, Phone Mask, Success Modal, and Privacy Policy
 */

let hasSpun = false;

document.addEventListener('DOMContentLoaded', () => {
    const wheelSpinner = document.getElementById('wheel-spinner');
    const spinButton = document.getElementById('spinButton');
    const modalOverlay = document.getElementById('lead-modal-overlay');
    const modalClose = document.getElementById('close-modal');
    const leadForm = document.getElementById('lead-form');
    
    // Privacy Modal Elements
    const privacyOverlay = document.getElementById('privacy-modal-overlay');
    const closePrivacy = document.getElementById('close-privacy');
    const openPrivacyLinks = document.querySelectorAll('.open-privacy-link');

    // Success Modal Elements
    const submitBtn = document.getElementById('submit-lead');
    const successModal = document.getElementById('success-modal-overlay');
    const closeSuccess = document.getElementById('close-success');

    // 1. Initialize Phone Mask
    const phoneInput = document.getElementById('phone-input');
    if (phoneInput && typeof IMask === 'function') {
        IMask(phoneInput, { mask: '+{7} (000) 000-00-00' });
    }

    // 2. Privacy Modal Logic
    const openPrivacy = (e) => {
        if (e) e.preventDefault();
        document.body.classList.add('no-scroll');
        privacyOverlay.style.display = 'block';
        setTimeout(() => {
            privacyOverlay.style.opacity = '1';
        }, 10);
    };

    const hidePrivacy = () => {
        privacyOverlay.style.opacity = '0';
        setTimeout(() => {
            privacyOverlay.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }, 300);
    };

    openPrivacyLinks.forEach(link => link.addEventListener('click', openPrivacy));
    closePrivacy.addEventListener('click', hidePrivacy);

    // 3. Spin Logic
    spinButton.addEventListener('click', function() {
        if (hasSpun) return;

        hasSpun = true;
        
        // Visually disable the button
        this.style.opacity = '0.5';
        this.style.cursor = 'not-allowed';

        // Rotate the wheel (2120deg to perfectly center on the target sector)
        wheelSpinner.style.transform = 'rotate(2120deg)';

        // After 5s (spin duration)
        setTimeout(() => {
            // Trigger Confetti
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#4C6788', '#473529', '#FFFFFF', '#E3000F']
                });
            }

            // Show Lead Modal using Flexbox
            document.body.classList.add('no-scroll');
            modalOverlay.style.display = 'flex';
        }, 5000);
    });

    // 4. Lead Modal Logic
    const closeModal = () => {
        modalOverlay.style.display = 'none';
        document.body.classList.remove('no-scroll');
    };

    modalClose.addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            // Check form validity before proceeding
            if (leadForm && !leadForm.checkValidity()) {
                leadForm.reportValidity();
                return;
            }
            
            // Custom validation for the phone mask length
            const currentPhoneVal = document.getElementById('phone-input').value;
            if (currentPhoneVal.length < 18) {
                e.preventDefault();
                alert('Пожалуйста, введите номер телефона полностью.');
                return;
            }
            
            e.preventDefault(); 
            
            // Hide the lead form and show the success message
            modalOverlay.style.display = 'none';
            // Note: successModal is also a modal, so we keep no-scroll active
            successModal.style.display = 'flex';
        });
    }

    // 5. Success Modal Logic
    if (closeSuccess) {
        closeSuccess.addEventListener('click', () => {
            successModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        });
    }
    
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    });
});
