document.addEventListener('DOMContentLoaded', () => {
    
    // --- Müzik Kontrolü ---
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play().catch(e => console.log("Otomatik oynatma engellendi", e));
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // --- Gatefold (Çift Kapak) Animasyonu ---
    const gateWrapper = document.getElementById('gate-wrapper');
    const leftGate = document.getElementById('left-gate');
    const rightGate = document.getElementById('right-gate');
    const gateContent = document.getElementById('gate-content');
    const seal = document.getElementById('seal');
    const mainContent = document.getElementById('main-content');

    const openGates = () => {
        // 1. Müzik Başlat
        if(!isPlaying) {
            bgMusic.play().catch(e => console.log(e));
            isPlaying = true;
            musicBtn.classList.add('playing');
        }

        // 2. Kapak üzerindeki isimler, mühür ve tarihi gizle (Fade out ve hafif büyüme efekti)
        gateContent.style.transform = 'scale(1.1)';
        gateContent.style.opacity = '0';

        setTimeout(() => {
            // 3. Kapakları Sağa ve Sola Kaydırarak Aç
            leftGate.classList.add('open');
            rightGate.classList.add('open');
            
            setTimeout(() => {
                // 4. Kapak wrapper'ını gizle ve ana içeriği göster
                gateWrapper.style.display = 'none';
                mainContent.classList.remove('hidden');
                
                // Ana içerik Fade-in
                setTimeout(() => {
                    mainContent.classList.add('visible');
                    revealElements(); // Scroll animasyonlarını tetikle
                }, 50);
                
            }, 1800); // Kapakların açılma süresini bekle
        }, 400); // Ortadaki mühür ve yazıların kaybolmasını bekle
    };

    seal.addEventListener('click', openGates);

    // --- Scroll Reveal (Aşağı Kaydırdıkça Çıkan Elemanlar) ---
    const revealElements = () => {
        const reveals = document.querySelectorAll('.reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.15 });

        reveals.forEach(reveal => {
            observer.observe(reveal);
        });
    };
});
