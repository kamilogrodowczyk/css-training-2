export default function observerCounter() {
    const circle = document.querySelectorAll('.numbers__result');
    const circleOptions = {
            root: null,
            threshhold: 0.5,
            rootMargin: '0px 0px -9% 0px'
        };

    const observerCircle = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) {
                return;
            }
            up()
            observer.unobserve(entry.target)
        })
    }, circleOptions)

    circle.forEach(element => observerCircle.observe(element))
}

const counter = document.querySelectorAll('.numbers__result');
// const first = document.querySelectorAll('.numbers__result');
const speed = 500;

function up() {

    counter.forEach(counter => {
        function updateCount() {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText
            const inc = target / speed;
            
            if(count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1)
            } else {
                counter.innerText = target;
            }
        }
        updateCount();
    })
}