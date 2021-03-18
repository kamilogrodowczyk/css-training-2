export default function zoomImage() {
    const buttonRealization = document.querySelector('.realization__button');
    const images = document.querySelectorAll('.realization__image');

        let index = 0;
        const total = images.length;

    buttonRealization.addEventListener('click', () => {
        images.forEach(image => image.classList.remove('realization__images--active'));
        images[index].classList.add('realization__images--active')
        index = (index + 1) % total;
    })
}