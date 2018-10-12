(() => {

    const create = (root) => {

        const fragment = document.createDocumentFragment();
        [...root.childNodes].forEach(child => {
            fragment.appendChild(child);
        });
        
        const content = document.createElement('div');
        content.className = 'scrollscreen-content';
        content.appendChild(fragment);
        root.appendChild(content);
        
        const track = document.createElement('div');
        track.className = 'scrollscreen-track';
        root.appendChild(track);
        
        const slider = document.createElement('div');
        slider.className = 'scrollscreen-slider';
        track.appendChild(slider);
        
        let pendingFrame = null;
        
        const redraw = () => {
            
            cancelAnimationFrame(pendingFrame);
            
            pendingFrame = requestAnimationFrame(() => {
            
                const contentHeight = content.scrollHeight;
                const containerHeight = root.offsetHeight;
                const percentageVisible = containerHeight / contentHeight;
                const sliderHeight = percentageVisible * containerHeight;
                const percentageOffset = content.scrollTop / (contentHeight - containerHeight);
                const sliderOffset = percentageOffset * (containerHeight - sliderHeight);
                
                track.style.opacity = percentageVisible === 1 ? 0 : 1;
                
                slider.style.cssText = `
                    height: ${sliderHeight}px;
                    transform: translateY(${sliderOffset}px);
                `;
            });
            
        }
        
        // need to update if window is resized or if container is scrolled
        content.addEventListener('scroll', redraw);
        window.addEventListener('resize', redraw);
        
        // first redraw
        redraw();
    }

    // create scrollies
    [...document.querySelectorAll('.scrollscreen')].forEach(create);

})();