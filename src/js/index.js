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

const hamburger = document.querySelector('.nav__hamburger');
const links = document.querySelector('.nav__links');

const handleClick = () => {
	const body = document.body;
	links.classList.toggle('nav__links--active');

	let flag = links.classList.contains('nav__links--active');
	hamburger.setAttribute('aria-expanded', flag);

	if ((flag) ? body.style.overflowY = 'hidden' : body.style.overflowY = 'scroll');
	
}

hamburger.addEventListener('click', handleClick);


const form = document.querySelector("form");
const search = form.querySelector("input[type=search]");
const icon = document.querySelector('.nav__icons-bag');

form.addEventListener("submit", function (e) {
  e.preventDefault();  
	if(search.value !== '') {
		window.open(`https://www.google.com/search?q=${search.value}`);
	} else {
		icon.animate([
			{transform: 'rotate(0deg)'},
			{transform: 'rotate(30deg)'},
			{transform: 'rotate(0deg)'}
		], {
			duration: 700,
			iterations: 2,
			easing: 'ease-in-out'
		});
	}
});

const buttonRealization = document.querySelector('.realization__button');
const images = document.querySelectorAll('.realization__image');

	let index = 0;
	const total = images.length;

buttonRealization.addEventListener('click', () => {
	images.forEach(image => image.classList.remove('realization__images--active'));
	images[index].classList.add('realization__images--active')
	index = (index + 1) % total;
})

const buttonPortfolio = document.querySelectorAll('.portfolio__button-select');
const buttonLoad = document.querySelector('.portfolio__button');

const gallery = [...document.querySelectorAll('.portfolio__gallery')];
const portfolioContainer = document.querySelector('.portfolio__container')


loadingElements();	
function selectElement(target) {
	gallery.forEach(function(el) {
		el = [...document.querySelectorAll('.portfolio__text p')];
		el.filter(function(p) {
			if((p.textContent.includes(target)) || (target.includes('All'))) {
				p.parentNode.parentNode.classList.add('selected');
			} else {
				p.parentNode.parentNode.classList.remove('selected');
			}
		})		
	})
}

buttonPortfolio.forEach(button => button.addEventListener('click', (e) => {
	const target = e.target.textContent;
	selectElement(target);
	buttonPortfolio.forEach(el => el.classList.remove('selected'))
	e.target.classList.toggle('selected')
	loadingElements();
}))

buttonLoad.addEventListener('click', () => {
	gallery.forEach(el => el.classList.add('selected'))
})

function loadingElements() {
	const con = portfolioContainer.getBoundingClientRect()

	gallery.forEach(el => {
		const pos = el.getBoundingClientRect()
		if(pos.top !== con.top) {
			el.classList.remove('selected')
			buttonLoad.classList.add('selected');
		} else {
			buttonLoad.classList.remove('selected');
		}
	})
}


