export default function playVideo() {
    const video = document.querySelector('.video');
    const player = video.querySelector('.video__container');
    const button = video.querySelector('.video__button');
    const progress = video.querySelector('.video__progress');

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    let timer;
    let isDown = false;

    function mouse(e) {
        const styledButton = button.style;
        [styledButton.top, styledButton.left] = [`${e.offsetY}px`, `${e.offsetX}px`];

        styledButton.display = 'block';
        clearTimeout(timer);

        timer = setTimeout(() => {
            styledButton.display = 'none';
        }, 2000);
    }

    function handleButton() {
        const status = this.paused ? 'play' : 'pause';
        button.style.backgroundImage = `url(../../src/assets/${status}.png)`;
    }

    function togglePlay() {
        const method = this.paused ? 'play' : 'pause';
        player[method]();
    }

    function handleProgress() {
        const result = (this.currentTime / this.duration) * 100;
        progress.style.width = `${result}%`;
    }

    player.addEventListener('mousemove', debounce(mouse));
    player.addEventListener('touchstart', (e) => {
        isDown = true;
        console.log(e)
    });
    player.addEventListener('touchmove', (e) => {
        if(isDown) {
            debounce(mouse);
        } else return;
        console.log(e)
    });
    player.addEventListener('click', togglePlay);
    player.addEventListener('play', handleButton);
    player.addEventListener('pause', handleButton);
    player.addEventListener('timeupdate', handleProgress)
}