document.addEventListener('DOMContentLoaded', () => {
    // Gallery Auto-Slide (Ping-Pong Effect)
    const track = document.querySelector('.gallery-track');
    
    // Safety check - if no track, exit
    if (!track) {
        console.warn('Gallery track not found for auto-slide');
        return;
    }

    let autoSlideInterval;
    let scrollDirection = 1; // 1 for forward (right), -1 for backward (left)

    const getScrollStep = () => {
        const item = track.firstElementChild;
        if (!item) return 300; // Fallback width
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 24; 
        return item.offsetWidth + gap;
    };

    const startAutoSlide = () => {
        stopAutoSlide(); 
        console.log('Starting Auto Slide'); // Debug log
        autoSlideInterval = setInterval(() => {
            const step = getScrollStep();
            
            // Recalculate dimensions on every tick to be responsive safe
            const maxScroll = track.scrollWidth - track.clientWidth;
            const currentScroll = track.scrollLeft;
            
            // If scrollWidth equals clientWidth, there's no overflow
            if (maxScroll <= 0) return;

            // Identify target scroll position
            let targetScroll;

            if (scrollDirection === 1) {
                // Moving Right
                if (currentScroll >= maxScroll - 10) { // 10px tolerance
                    scrollDirection = -1; // Switch direction
                    targetScroll = currentScroll - step;
                } else {
                    targetScroll = currentScroll + step;
                }
            } else {
                // Moving Left
                if (currentScroll <= 10) { // 10px tolerance
                    scrollDirection = 1; // Switch direction
                    targetScroll = currentScroll + step;
                } else {
                    targetScroll = currentScroll - step;
                }
            }

            // Clamp target
            if (targetScroll < 0) targetScroll = 0;
            if (targetScroll > maxScroll) targetScroll = maxScroll;

            track.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });

        }, 2500); 
    };

    const stopAutoSlide = () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
            console.log('Stopping Auto Slide'); // Debug log
        }
    };

    // Start
    setTimeout(startAutoSlide, 1000);

    // Interactions to Pause
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);
    track.addEventListener('touchstart', stopAutoSlide, {passive: true});
    track.addEventListener('touchend', () => {
        setTimeout(startAutoSlide, 2000);
    });
});
