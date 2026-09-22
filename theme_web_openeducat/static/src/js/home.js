function onReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

onReady(() => {

// ---------------------------

    document.querySelectorAll('.counter-number').forEach(counter => {
        const target = parseFloat(counter.textContent) || 0;
        const duration = 3000;
        const start = performance.now();
        const swing = p => 0.5 - Math.cos(p * Math.PI) / 2;

        counter.textContent = 0;
        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            counter.textContent = Math.ceil(swing(progress) * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    });

// ---------------------------

    const hamburger = document.querySelector('#hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('show');
            document.querySelector('#overlay')?.classList.toggle('show');
            document.querySelectorAll('.nav1').forEach(el => el.classList.toggle('show'));
        });
    }

// ---------------------------

    const imgs = document.querySelectorAll('.change-img');
    const imgsrc = document.querySelector('.set-img');

    imgs.forEach(img => {
        img.addEventListener('click', () => {
            const image = img.querySelector('img');
            const imgname = image.getAttribute('name');

            imgs.forEach(el => el.classList.remove('img-overlay'));
            img.classList.add('img-overlay');

            document.querySelectorAll('.atd').forEach(el => el.classList.add('d-none'));
            document.querySelector(`.atd[name="${imgname}"]`)?.classList.remove('d-none');

            imgsrc?.setAttribute('src', image.getAttribute('src'));
        });
    });

// ---------------------------

});
