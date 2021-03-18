export default function filterPortfolio() {
    const buttonPortfolio = document.querySelectorAll('.portfolio__button-select');
    const buttonLoad = document.querySelector('.portfolio__button');
    const gallery = [...document.querySelectorAll('.portfolio__gallery')];
    const portfolioContainer = document.querySelector('.portfolio__container')
    
    let arr = [];

    loadingVisibleElements();

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

    function loadingVisibleElements() {
        const container = portfolioContainer.getBoundingClientRect()
        gallery.filter(el => {
            const image = el.getBoundingClientRect()

            if(image.top !== container.top) {
                el.classList.remove('selected')
                arr.push(el)
                buttonLoad.classList.add('selected');
            } else {
                buttonLoad.classList.remove('selected');
            }
        })
    }

    function loadingInvisibleElements() {
        arr.forEach(a => a.classList.add('selected'))
        buttonLoad.classList.remove('selected');
    }

    buttonPortfolio.forEach(button => button.addEventListener('click', (e) => {
        arr.length = 0
        const target = e.target.textContent;
        selectElement(target);
        buttonPortfolio.forEach(el => el.classList.remove('selected'))
        e.target.classList.toggle('selected')
        loadingVisibleElements();
    }))

    buttonLoad.addEventListener('click', loadingInvisibleElements)
}