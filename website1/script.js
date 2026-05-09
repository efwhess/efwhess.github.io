document.addEventListener('DOMContentLoaded', () => {
    // Typewriter Effect
    const words = ["Unutulmaz bir deneyim..."];
    let i = 0;
    let timer;
    const typewriterElement = document.getElementById("typewriter");
    
    function typingEffect() {
        if (!typewriterElement) return;
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                typewriterElement.innerHTML += word.shift();
            } else {
                setTimeout(deletingEffect, 2000);
                return false;
            }
            timer = setTimeout(loopTyping, 100);
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                typewriterElement.innerHTML = word.join("");
            } else {
                if (words.length > (i + 1)) {
                    i++;
                } else {
                    i = 0;
                }
                setTimeout(typingEffect, 500);
                return false;
            }
            timer = setTimeout(loopDeleting, 50);
        };
        loopDeleting();
    }

    if(typewriterElement) typingEffect();

    // Initialize Swiper
    const swiper = new Swiper('.mySwiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });

    // Modal Logic
    const modal = document.getElementById('appointmentModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const form = document.getElementById('appointmentForm');

    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Form Submission
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop default form submission
        
        // Get user inputs
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const age = document.getElementById('age').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const note = document.getElementById('note').value;

        // Construct email body exactly how the user wants (only values)
        let emailBody = `${fname} ${lname}\n${age}\n${date}\n${time}`;
        if (note.trim() !== '') {
            emailBody += `\n\nNot:\n${note}`;
        }
        
        // Construct mailto link properly encoded for Turkish characters
        const subject = encodeURIComponent('Yeni Randevu Talebi');
        const body = encodeURIComponent(emailBody);
        window.location.href = `mailto:efeyavuz7321@gmail.com?subject=${subject}&body=${body}`;
        
        // Small delay to let mail client open
        setTimeout(() => {
            // Hide form, show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset modal after 4 seconds
            setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    successMessage.style.display = 'none';
                }, 300); // Wait for modal to fade out
            }, 4000);
        }, 100);
    });
});
