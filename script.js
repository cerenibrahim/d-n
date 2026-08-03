document.addEventListener('DOMContentLoaded', () => {
    
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    // --- Kapak (Gatefold) Animasyonu ---
    const gateWrapper = document.getElementById('gate-wrapper');
    const leftGate = document.getElementById('left-gate');
    const rightGate = document.getElementById('right-gate');
    const gateContent = document.getElementById('gate-content');
    const seal = document.getElementById('seal');
    const mainContent = document.getElementById('main-content');

    const openGates = () => {
        // Müzik Başlat
        if(!isPlaying) {
            bgMusic.play().catch(e => console.log("Otomatik oynatma kısıtlaması", e));
            isPlaying = true;
        }

        // Yazılar yumuşakça kaybolur
        gateContent.style.opacity = '0';

        setTimeout(() => {
            // Kapaklar sağa ve sola kayar
            leftGate.classList.add('open');
            rightGate.classList.add('open');
            
            setTimeout(() => {
                gateWrapper.style.display = 'none';
                mainContent.classList.remove('hidden');
                
                // Ana içerik yavaşça belirir (Fade-in)
                setTimeout(() => {
                    mainContent.classList.add('visible');
                    revealElements();
                }, 100);
                
            }, 1800); // Kapakların açılma süresi
        }, 500); // Yazıların kaybolma süresi
    };

    seal.addEventListener('click', openGates);

    // --- Aşağı Kaydırdıkça Çıkan Elemanlar (Scroll Reveal) ---
    const revealElements = () => {
        const reveals = document.querySelectorAll('.reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(reveal => {
            observer.observe(reveal);
        });
    };
});
