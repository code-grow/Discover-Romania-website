document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            const spans = document.querySelectorAll('.nav-toggle span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with email: ${email}\nThis is a demo form - no data was actually submitted.`);
            this.reset();
        });
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                if (data[key]) {
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            });
            
            console.log('Form submitted with data:', data);
            alert('Thank you for your message! This is a demo form - no data was actually submitted.\n\nYour message has been logged to the console.');
            this.reset();
        });
    }
    
    const quizForm = document.getElementById('quizForm');
    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let score = 0;
            const totalQuestions = 10;
            
            const correctAnswers = {
                q1: 'bucharest',
                q2: 'carpathians',
                q3: 'bran',
                q4: 'danube',
                q5: 'leu',
                q6: 'romanian',
                q7: '19million',
                q8: 'blacksea',
                q9: 'vladtepes',
                q10: 'sarmale'
            };
            
            Object.keys(correctAnswers).forEach(question => {
                const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
                if (selectedAnswer && selectedAnswer.value === correctAnswers[question]) {
                    score++;
                }
            });
            
            const resultsDiv = document.getElementById('quizResults');
            const scoreSpan = document.getElementById('quizScore');
            const messageP = document.getElementById('quizMessage');
            
            if (resultsDiv && scoreSpan && messageP) {
                scoreSpan.textContent = `${score}/${totalQuestions}`;
                
                let message = '';
                if (score === totalQuestions) {
                    message = 'Perfect! You are a Romania expert!';
                } else if (score >= 7) {
                    message = 'Great job! You know Romania well!';
                } else if (score >= 5) {
                    message = 'Good effort! Keep learning about Romania!';
                } else {
                    message = 'Time to explore more about Romania!';
                }
                messageP.textContent = message;
                
                resultsDiv.style.display = 'block';
                this.style.display = 'none';
                
                resultsDiv.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };
    
    animateOnScroll();
    
    window.addEventListener('scroll', animateOnScroll);
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <img src="${img.src}" alt="${img.alt}">
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                
                const style = document.createElement('style');
                style.textContent = `
                    .lightbox {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0,0,0,0.9);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 2000;
                    }
                    .lightbox-content {
                        position: relative;
                        max-width: 90%;
                        max-height: 90%;
                    }
                    .lightbox-content img {
                        width: 100%;
                        height: auto;
                        object-fit: contain;
                    }
                    .lightbox-close {
                        position: absolute;
                        top: -40px;
                        right: 0;
                        color: white;
                        font-size: 2rem;
                        cursor: pointer;
                    }
                `;
                document.head.appendChild(style);
                
                lightbox.addEventListener('click', function() {
                    this.remove();
                });
            });
        });
    }
    
    const tripPlannerForm = document.getElementById('tripPlanner');
    if (tripPlannerForm) {
        tripPlannerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const duration = this.querySelector('select[name="duration"]').value;
            const interests = Array.from(this.querySelectorAll('input[type="checkbox"]:checked'))
                .map(cb => cb.value);
            
            let itinerary = `Your ${duration} Trip to Romania:\n\n`;
            
            if (duration === '3days') {
                itinerary += 'Day 1: Explore Bucharest - Palace of Parliament, Old Town\n';
                itinerary += 'Day 2: Day trip to Bran Castle and Brașov\n';
                itinerary += 'Day 3: Peleș Castle and return to Bucharest\n';
            } else if (duration === '7days') {
                itinerary += 'Day 1-2: Bucharest exploration\n';
                itinerary += 'Day 3-4: Transylvania - Brașov, Bran Castle, Sighișoara\n';
                itinerary += 'Day 5: Sibiu and surroundings\n';
                itinerary += 'Day 6: Cluj-Napoca\n';
                itinerary += 'Day 7: Return to Bucharest\n';
            } else {
                itinerary += 'Week 1: Bucharest, Transylvania tour\n';
                itinerary += 'Week 2: Maramureș, Painted Monasteries, Danube Delta\n';
            }
            
            if (interests.length > 0) {
                itinerary += '\nTailored for your interests: ' + interests.join(', ');
            }
            
            alert(itinerary);
        });
    }
    
    const yearSpans = document.querySelectorAll('.current-year');
    yearSpans.forEach(span => {
        span.textContent = new Date().getFullYear();
    });
    
    const scrollToTop = document.createElement('button');
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.innerHTML = '↑';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #e74c3c;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: opacity 0.3s;
    `;
    
    document.body.appendChild(scrollToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTop.style.display = 'block';
        } else {
            scrollToTop.style.display = 'none';
        }
    });
    
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

console.log('Page viewed:', window.location.pathname, 'at', new Date().toISOString());