export default function searchBox() {
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
}