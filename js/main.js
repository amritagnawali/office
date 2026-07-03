// ============================================
// INCEPT EDUCATION CONSULTANCY - MAIN JS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // LOAD CONFIG & UPDATE EDITABLE CONTENT
    // ==========================================
    function loadConfig() {
        if (typeof siteConfig === 'undefined') return;
        
        document.querySelectorAll('.editable').forEach(el => {
            const key = el.getAttribute('data-key');
            if (key && siteConfig[key] !== undefined) {
                // Handle HTML content for multiline text
                if (siteConfig[key].includes('\n')) {
                    el.innerHTML = siteConfig[key].replace(/\n/g, '<br>');
                } else {
                    el.textContent = siteConfig[key];
                }
            }
        });
    }
    loadConfig();
    
    // ==========================================
    // NAVIGATION
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.06)';
        }
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // ==========================================
    // TESTIMONIALS SLIDER
    // ==========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            dots[i].classList.remove('active');
        });
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto slide testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    const fadeElements = document.querySelectorAll('.service-card, .country-card, .about-content, .why-feature, .contact-card, .contact-form-wrapper');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add fadeInUp keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // ==========================================
    // CONTACT FORM
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#27ae60';
        btn.style.borderColor = '#27ae60';
        
        // Log form data (in production, send to server)
        console.log('Form submitted:', data);
        
        setTimeout(() => {
            contactForm.reset();
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
        }, 3000);
    });
    
    // ==========================================
    // AI CHATBOT
    // ==========================================
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const quickReplies = document.querySelectorAll('.quick-reply');
    
    // Chatbot Knowledge Base
    const chatbotKnowledge = {
        greeting: [
            "Hello! Welcome to Incept Education Consultancy. I'm your AI assistant. How can I help you with your study abroad queries today?",
            "Hi there! I'm here to help you with all your abroad study questions. What would you like to know?"
        ],
        countries: {
            keywords: ['country', 'countries', 'uk', 'australia', 'usa', 'germany', 'new zealand', 'study where', 'destination'],
            response: "We help students study in **UK, Australia, USA, Germany, and New Zealand**. Each country offers unique benefits:\n\n🇬🇧 **UK** - 2-year post-study work visa, top universities like Oxford & Cambridge\n\n🇦🇺 **Australia** - 2-4 years work rights, pathway to PR, Group of 8 universities\n\n🇺🇸 **USA** - OPT opportunities, Ivy League, cutting-edge research\n\n🇩🇪 **Germany** - Tuition-free public universities, strong engineering programs\n\n🇳🇿 **New Zealand** - 3-year PSW, safe environment, quality life\n\nWould you like specific details about any of these countries?"
        },
        visa: {
            keywords: ['visa', 'requirement', 'documents', 'application', 'passport', 'embassy', 'interview'],
            response: "Our visa application services include:\n\n✅ Complete document checklist and compilation\n✅ Form filling assistance\n✅ Visa interview preparation\n✅ Financial documentation guidance\n✅ SOP (Statement of Purpose) writing\n✅ Application tracking and follow-up\n\nWe have a **98% visa success rate**! The required documents typically include passport, academic certificates, financial proof, IELTS/TOEFL scores, and university admission letter.\n\nWould you like to book a free consultation to discuss your specific case?"
        },
        counseling: {
            keywords: ['counseling', 'consultation', 'free', 'book', 'appointment', 'session', 'meeting', 'advice', 'guide'],
            response: "Yes! We offer **FREE counseling sessions** for all students! 🎓\n\nDuring your session, our expert counselors will:\n\n• Assess your academic profile\n• Recommend suitable universities and courses\n• Discuss scholarship opportunities\n• Plan your career pathway\n• Answer all your questions\n\nYou can book by:\n\n📞 Calling: 01-4547405\n\n💬 WhatsApp: +977 9841844139\n\n📧 Email: inceptedu@gmail.com\n\nOr fill out the contact form on our website!"
        },
        contact: {
            keywords: ['contact', 'phone', 'email', 'address', 'location', 'office', 'where', 'reach', 'call', 'whatsapp'],
            response: "You can reach us at:\n\n📍 **Address:** Putalisadak-30, Bhaskar Marg, Kathmandu, Nepal\n\n📞 **Phone:** 01-4547405\n\n💬 **WhatsApp:** +977 9841844139\n\n📧 **Email:** inceptedu@gmail.com\n\n🕐 **Hours:** Sunday to Saturday, 9:00 AM - 6:00 PM\n\n🌐 **Facebook:** facebook.com/incepteducationconsultancy\n\n📸 **Instagram:** @incepteducationconsultancy\n\n💼 **LinkedIn:** Incept Education Consultancy Pvt Ltd"
        },
        services: {
            keywords: ['service', 'services', 'help', 'what do you', 'offer', 'provide', 'documentation', 'career', 'pre-departure', 'post-arrival'],
            response: "We offer comprehensive study abroad services:\n\n📚 **Abroad Study Counseling** - University & course selection\n\n📄 **Documentation Support** - Document preparation & attestation\n\n🛂 **Visa Application** - End-to-end visa processing\n\n🎯 **Career Counseling** - Career pathway planning\n\n✈️ **Pre-Departure Briefing** - Travel & accommodation guidance\n\n🤝 **Post-Arrival Support** - Enrollment & settling-in help\n\nWhich service would you like to know more about?"
        },
        fees: {
            keywords: ['fee', 'cost', 'price', 'charge', 'money', 'expensive', 'cheap', 'affordable', 'payment'],
            response: "Our **initial counseling session is completely FREE**! 🎉\n\nFor our comprehensive services, we offer competitive and transparent pricing. The costs vary depending on:\n\n• Destination country\n• Service package selected\n• University application fees\n\nWe believe quality education guidance should be accessible. Contact us for a personalized quote based on your specific needs.\n\n📞 Call: 01-4547405 or 💬 WhatsApp: +977 9841844139"
        },
        ielts: {
            keywords: ['ielts', 'toefl', 'pte', 'english', 'language', 'test', 'score', 'band', 'requirement'],
            response: "Most universities require English proficiency tests:\n\n📝 **IELTS** - Most common (usually 6.0-6.5 for undergrad, 6.5-7.0 for masters)\n\n📝 **TOEFL iBT** - Alternative (80-100+ usually required)\n\n📝 **PTE Academic** - Accepted by many universities\n\nRequirements vary by country and university. Some universities may accept your previous education in English as proof, or offer foundation programs.\n\nWe can help you understand specific requirements for your chosen university!"
        },
        scholarship: {
            keywords: ['scholarship', 'financial aid', 'fund', 'money', 'grant', 'tuition', 'fee waiver', 'discount'],
            response: "Yes! There are many scholarship opportunities available:\n\n🎓 **University Scholarships** - Merit-based, offered by universities directly\n\n🌍 **Government Scholarships** - Chevening (UK), Fulbright (USA), DAAD (Germany)\n\n💰 **Country-Specific** - Australia Awards, NZ Scholarships\n\n📚 **Course-Specific** - STEM, MBA, and research scholarships\n\nEligibility depends on your academic performance, chosen course, and country. During our free counseling, we'll identify all scholarships you may qualify for!"
        },
        default: [
            "Thank you for your question! For detailed assistance, I'd recommend booking a free counseling session with our experts.\n\n📞 Call: 01-4547405\n💬 WhatsApp: +977 9841844139\n📧 Email: inceptedu@gmail.com",
            "That's a great question! Our counselors can give you detailed information about this. Would you like to schedule a free consultation?\n\nYou can also call us directly at 01-4547405 or WhatsApp +977 9841844139."
        ]
    };
    
    function getBotResponse(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        
        // Check each knowledge category
        for (const category in chatbotKnowledge) {
            if (category === 'greeting' || category === 'default') continue;
            
            const keywords = chatbotKnowledge[category].keywords;
            if (keywords.some(kw => lowerMsg.includes(kw))) {
                return chatbotKnowledge[category].response;
            }
        }
        
        // Return random default response
        const defaults = chatbotKnowledge.default;
        return defaults[Math.floor(Math.random() * defaults.length)];
    }
    
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        // Convert markdown-like formatting to HTML
        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        
        bubble.innerHTML = formattedText;
        messageDiv.appendChild(bubble);
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot typing-indicator';
        typingDiv.innerHTML = '<div class="message-bubble"><span style="display:flex;gap:4px;align-items:center;padding:4px 0;"><span style="width:8px;height:8px;background:#999;border-radius:50%;animation:typing1 1s infinite;"></span><span style="width:8px;height:8px;background:#999;border-radius:50%;animation:typing2 1s infinite;"></span><span style="width:8px;height:8px;background:#999;border-radius:50%;animation:typing3 1s infinite;"></span></span></div>';
        
        const typingStyle = document.createElement('style');
        typingStyle.textContent = `
            @keyframes typing1 { 0%,100% { opacity:0.3; } 50% { opacity:1; } }
            @keyframes typing2 { 0%,100% { opacity:0.3; } 50% { opacity:1; } 0% { animation-delay:0.2s } }
            @keyframes typing3 { 0%,100% { opacity:0.3; } 50% { opacity:1; } 0% { animation-delay:0.4s } }
        `;
        document.head.appendChild(typingStyle);
        
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return typingDiv;
    }
    
    function sendMessage() {
        const text = chatbotInput.value.trim();
        if (!text) return;
        
        addMessage(text, true);
        chatbotInput.value = '';
        
        const typing = showTypingIndicator();
        
        setTimeout(() => {
            typing.remove();
            const response = getBotResponse(text);
            addMessage(response);
        }, 1000 + Math.random() * 1000);
    }
    
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
        chatbotToggle.classList.toggle('hidden', chatbotContainer.classList.contains('active'));
    });
    
    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
        chatbotToggle.classList.remove('hidden');
    });
    
    chatbotSend.addEventListener('click', sendMessage);
    
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    quickReplies.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            addMessage(query, true);
            
            const typing = showTypingIndicator();
            setTimeout(() => {
                typing.remove();
                const response = getBotResponse(query);
                addMessage(response);
            }, 800);
        });
    });
    
    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
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
    
    // ==========================================
    // COUNTER ANIMATION FOR STATS
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
                    const suffix = stat.textContent.replace(/[0-9]/g, '');
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target + suffix;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + suffix;
                        }
                    }, 30);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) counterObserver.observe(heroStats);
    
    // ==========================================
    // LAZY LOAD IMAGES
    // ==========================================
    const lazyImages = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ==========================================
    // ADD CSS FOR ANIMATED ELEMENTS
    // ==========================================
    const animStyle = document.createElement('style');
    animStyle.textContent = `
        .service-card, .country-card, .contact-card, .why-feature, .contact-form-wrapper {
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `;
    document.head.appendChild(animStyle);
    
    console.log('✅ Incept Education Consultancy website loaded successfully!');
});
