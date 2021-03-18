import playVideo from '../modules/playVideo.js';
import hamburgerMenu from '../modules/hamburgerMenu.js';
import searchBox from '../modules/searchBox.js';
import zoomImage from '../modules/zoomImage.js';
import filterPortfolio from '../modules/filterPortfolio.js';
import observerAnimation from '../modules/observerAnimation.js';
import observerCounter from '../modules/observerCounter.js';

playVideo();
hamburgerMenu();
searchBox();
zoomImage();
filterPortfolio();
observerAnimation();
observerCounter();

window.addEventListener('scroll', () => {
    if(window.scrollY != 0) {
        document.querySelector('.header__container').style.backgroundColor = '#222';
    } else {
        document.querySelector('.header__container').style.backgroundColor = 'transparent';
    }
})


