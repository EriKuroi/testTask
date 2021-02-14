window.onload = function () {
    const slider = document.querySelector('.categories-slider');
    const priceMin = document.querySelector('#min-price');
    const priceMax = document.querySelector('#max-price');
    const sortOptionsList = document.querySelector('.sort-by-wrapper')

    let isDown = false;
    let startX;
    let scrollLeft;

    const deleteSearchValue = () => {
        const searchForm = document.querySelector('#searchInput');
        searchForm.value = null;
    }

    const getVals = (e) => {
        const parent = e.target.parentNode;
        const slides = parent.getElementsByTagName('input');
        let slide1 = parseFloat(slides[0].value);
        let slide2 = parseFloat(slides[1].value);
        if (slide1 > slide2) { let tmp = slide2; slide2 = slide1; slide1 = tmp; }

        priceMin.value = slide1;
        priceMax.value = slide2;
    }

    const toggleSort = (e) => {
        if (e.target.tagName == 'SPAN') {
            if (!e.target.classList.contains('sort-by-selected')) {
                const allOptionsArray = [...sortOptionsList.querySelectorAll('span')];
                allOptionsArray.forEach(element => {
                    element.classList.remove('sort-by-selected');
                });
                e.target.classList.add('sort-by-selected');
            }


        }
    };


    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });

    document.querySelector('.search-wrapper-cross').addEventListener('click', deleteSearchValue);
    document.querySelector('#price-range-1').addEventListener('input', getVals);
    document.querySelector('#price-range-2').addEventListener('input', getVals);
    sortOptionsList.addEventListener('click', toggleSort);
}