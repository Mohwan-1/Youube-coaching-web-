// Smooth scroll to form function
function scrollToForm() {
    document.getElementById('signup-form').scrollIntoView({
        behavior: 'smooth'
    });
}

// Countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const tomorrow = new Date();
    tomorrow.setHours(23, 59, 59, 999);
    const distance = tomorrow.getTime() - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    if (distance < 0) {
        countdownElement.innerHTML = "마감되었습니다";
    }
}

// Update current count
function updateCurrentCount() {
    const countElement = document.getElementById('currentCount');
    if (countElement) {
        const baseCount = 73;
        const randomIncrease = Math.floor(Math.random() * 15) + 1;
        countElement.textContent = Math.min(baseCount + randomIncrease, 97);
    }
}

// Spotlight effect for hero section
function initSpotlightEffect() {
    const heroContainer = document.querySelector('.spline-hero-container');
    const spotlight = document.querySelector('.spotlight');

    if (heroContainer && spotlight) {
        heroContainer.addEventListener('mousemove', function(e) {
            const rect = heroContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            spotlight.style.left = (x - 100) + 'px';
            spotlight.style.top = (y - 100) + 'px';
            spotlight.style.opacity = '1';
        });

        heroContainer.addEventListener('mouseleave', function() {
            spotlight.style.opacity = '0';
        });
    }
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    // Initialize spotlight effect
    initSpotlightEffect();

    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Update current count periodically
    updateCurrentCount();
    setInterval(updateCurrentCount, 30000); // Update every 30 seconds

    // Form submission handler
    const form = document.getElementById('leadForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> 신청 중...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success state
                submitBtn.innerHTML = '✅ 신청 완료!';
                submitBtn.style.background = '#10B981';

                // Show success message
                alert('🎉 무료 비밀특강 신청이 완료되었습니다!\n\n등록하신 이메일로 특강 안내를 보내드렸습니다.\n카카오톡 채널도 추가해 주세요!');

                // Reset form
                form.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);

            }, 2000);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Hero section should be visible immediately
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }

    // CTA button click tracking
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track CTA clicks (replace with your analytics code)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'event_category': 'engagement',
                    'event_label': this.textContent.trim()
                });
            }
        });
    });

    // Kakao channel button
    const kakaoBtn = document.querySelector('.btn-kakao');
    if (kakaoBtn) {
        kakaoBtn.addEventListener('click', function() {
            // Replace with actual Kakao channel URL
            window.open('https://pf.kakao.com/_your_channel_id', '_blank');

            // Track Kakao channel clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'kakao_channel_click', {
                    'event_category': 'engagement'
                });
            }
        });
    }

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const speed = scrolled * 0.5;
            heroSection.style.transform = `translateY(${speed}px)`;
        }
    });

    // Mobile menu handling (if needed)
    const handleResize = () => {
        // Adjust layout for mobile if needed
        if (window.innerWidth < 768) {
            // Mobile-specific adjustments
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    // Preload critical images
    const criticalImages = ['white@2x.png'];
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Error handling for form
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.style.borderColor = '#DC2626';

            // Remove error styling after user starts typing
            this.addEventListener('input', function() {
                this.style.borderColor = '';
            }, { once: true });
        });
    });
});

// Utility function for smooth animations
function animateValue(element, start, end, duration) {
    const startTimestamp = performance.now();

    const step = (timestamp) => {
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
}

// Export functions for potential external use
window.scrollToForm = scrollToForm;
window.updateCountdown = updateCountdown;
window.updateCurrentCount = updateCurrentCount;