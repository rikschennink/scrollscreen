(() => {
    
    // should we register the wakey wakey fix 
    const wakeyFixRequired = 'CSS' in window && typeof CSS.supports === 'function' && !CSS.supports('-webkit-appearance', 'none');
    
    const ROOT_CLASS = 'scrollscreen';

    const createElement = (tag, name) => {
        const el = document.createElement(tag);
        el.className = `${ROOT_CLASS}--${name}`;
        return el;
    }

    const createScrollscreen = (root) => {

        const fragment = document.createDocumentFragment();
        [...root.childNodes].forEach(child => {
            fragment.appendChild(child);
        });
        
        const content = createElement('div', 'content');
        content.appendChild(fragment);
        root.appendChild(content);
        
        const track = createElement('div', 'track');
        root.appendChild(track);
        
        const slider = createElement('div', 'slider');
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

        // if we don't need to do the wakey wakey fix we done
        if (!wakeyFixRequired) {
            return;
        }

        // the wakey wakey function quickly scrolls the contents so Firefox enables the scrollbar and the user can drag it
        const wakey = () => {
            requestAnimationFrame(() => {
                const offset = content.scrollTop;
                content.scrollTop = offset + 1;
                content.scrollTop = offset; 
            });
        }

        // wake up scrollbars on MacOS Firefox
        root.addEventListener('mouseenter', wakey);

        // trigger so it's drawn correctly for the first time
        wakey();
    }

    // create scrollies
    [...document.querySelectorAll(`.${ROOT_CLASS}`)].forEach(createScrollscreen);

})();