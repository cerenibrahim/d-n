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
            bgMusic.play().catch(error => console.log("Otomatik oynatma engellendi", error));
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // --- Açılış ve Zarf ---
    const introNames = document.getElementById('intro-names');
    const envelopeContainer = document.getElementById('envelope-container');
    const openBtn = document.getElementById('open-btn');
    const seal = document.getElementById('seal');
    const flap = document.getElementById('flap');
    const openingScreen = document.getElementById('opening-screen');
    const mainContent = document.getElementById('main-content');

    // 1. Siyah ekranda isimlerin belirmesi
    setTimeout(() => {
        introNames.classList.add('show');
    }, 500);

    // 2. İsimler kaybolur, zarf gelir
    setTimeout(() => {
        introNames.classList.remove('show');
        setTimeout(() => {
            introNames.style.display = 'none';
            envelopeContainer.classList.remove('hidden');
            setTimeout(() => {
                envelopeContainer.classList.add('show');
            }, 50);
        }, 1000);
    }, 3000);

    // 3. Zarf Açılış Fonksiyonu
    const openEnvelope = () => {
        // Mühür kırılır
        seal.classList.add('broken');
        openBtn.style.opacity = '0';
        
        // Müzik başlatılır
        if(!isPlaying) {
            bgMusic.play().catch(e => console.log(e));
            isPlaying = true;
            musicBtn.classList.add('playing');
        }

        setTimeout(() => {
            // Kapak açılır
            flap.classList.add('open');
            
            setTimeout(() => {
                // Kamera zoom yapar ve ışık efekti (arkaplan rengi değişir)
                envelopeContainer.classList.add('open-zoom');
                openingScreen.style.backgroundColor = "var(--ivory)"; 
                
                setTimeout(() => {
                    // Ana içeriğe geçiş
                    openingScreen.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    
                    // Küçük bir gecikmeyle fade-in
                    setTimeout(() => {
                        mainContent.classList.add('visible');
                        revealElements(); // Scroll animasyonlarını tetikle
                    }, 50);
                    
                }, 1000); // Zoom süresi
            }, 800); // Kapağın açılma süresi
        }, 300);
    };

    openBtn.addEventListener('click', openEnvelope);
    seal.addEventListener('click', openEnvelope);

    // --- Geri Sayım ---
    const countDownDate = new Date("Aug 8, 2026 19:00:00").getTime();

    const updateTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(updateTimer);
            document.getElementById('countdown').innerHTML = "<h3>Mutluluklar!</h3>";
            return;
        }

        document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById('minutes').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById('seconds').innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }, 1000);

    // --- Scroll Reveal Animasyonları ---
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

