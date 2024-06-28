


var video = document.querySelector('#video');
    video.addEventListener('play', function() {
    setTimeout(() => {
        const preloader = document.querySelector(".preloader");
        preloader.style.display = "none";
        document.body.classList.remove("scroll-block");
    }, 300)
})

function setVideoSource() {
    
    if (window.innerWidth > 767.98) {
        video.src = 'img/trailer/Trailer_1.9_720.mp4';
    } else {
        video.src = 'img/trailer/Trailer_1.9_vertical_720.mp4';
    }
    video.load();
}


setVideoSource();



document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".menu__link");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const href = link.getAttribute("href");
            const section = document.querySelector(`${href}`);
            const header = document.querySelector(".header");
            if(header.classList.contains("_active")) {
                header.classList.remove("_active");
                document.body.style.overflow = "";
            }
            modalNews.classList.remove("active");
            buttonNews.classList.add("active");
            window.scrollTo({
                top: section.offsetTop,
                behavior:"smooth"
            })
            
        })
    })

    window.addEventListener("scroll", function() {
        let currentSection = "";

        links.forEach(link => {
            const href = link.getAttribute("href");
            if (href !== '#' && href.startsWith('#')) {
                const section = document.querySelector(`${href}`);
                if (section && section.offsetTop <= window.scrollY + 200 && section.offsetTop + section.offsetHeight > window.scrollY + 200) {
                    currentSection = href;
                }
            }
        });

        links.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === currentSection) {
                link.classList.add("active");
            }
        });
    });

    const thumbSlider = new Swiper(".main-slider-thumb__swiper", {
        slidesPerView:2.5,
        spaceBetween:12,
        slideToClickedSlide: true,
        slidesPerGroup: 1,
        loop:true,
        breakpoints: {
            487: {
                slidesPerView: 3,
                spaceBetween:20,
                slidesPerGroup: 1,
            },
        },
    })

    
    const swiper = new Swiper(".main-slider__swiper", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween:30,
        speed: 500,
        loop:true,
        thumbs: {
            swiper: thumbSlider
        },
        navigation: {
            nextEl: '.swiper-button__next',
            prevEl: '.swiper-button__prev'
        },
        on: {
            
            slideChangeTransitionStart: function() {
                var activeSlide = swiper.slides[swiper.activeIndex]; 
                var video = activeSlide.querySelector('video'); 
                if (video) {
                    video.loop = true;
                    video.muted = true; 
                    video.play(); 
                }
            },
        }
    })
    
        


    const buttonNews = document.querySelector(".button-news");
    const modalNews = document.querySelector(".modal-news");
    const modalNewsClose = document.querySelector(".modal-news__close");
    modalNewsClose.addEventListener("click", () => {
        modalNews.classList.remove("active");
        buttonNews.classList.add("active");
    })
    buttonNews.addEventListener("click", () => {
        modalNews.classList.add("active");
        buttonNews.classList.remove("active");
    })
    const dataModalButton = document.querySelectorAll("[data-modal]");
    const modalWrapper = document.querySelector(".modal__wrapper");
    const modalClose = document.querySelector(".modal__close");
    
    
    dataModalButton.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            modalWrapper.classList.add("_active")
        })
    })
    modalClose.addEventListener("click", (e) => {
        e.preventDefault();
        modalWrapper.classList.remove("_active");
    })
    
    modalWrapper.addEventListener("click", (e) => {
        
        if(e.target.classList.contains("modal__wrapper")) {
            modalWrapper.classList.remove("_active");
        }
    })

    function burgerMenu(){
        const header = document.querySelector(".header");
        const buttonBurger = document.querySelector(".icon-menu");
        
        buttonBurger.addEventListener("click", ()=> {
            if(header.classList.contains("_active")) {
                buttonNews.style.display = "block";
                modalNews.style.display = "block";
                header.classList.remove("_active");
                document.body.style.overflow = "";
            } else {
                header.classList.add("_active");
                modalNews.style.display = "none";
                buttonNews.style.display = "none";
                document.body.style.overflow = "hidden";
            }
        });
    }
    burgerMenu();

    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            // масив об'єктів
            this.оbjects = []
            this.daClassname = '_dynamic_adapt_';
            // масив DOM-елементів
            this.nodes = [...document.querySelectorAll('[data-da]')];
    
            // наповнення оbjects об'єктами
            this.nodes.forEach((node) => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(',');
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
                оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            });
    
            this.arraySort(this.оbjects);
    
            // масив унікальних медіа-запитів
            this.mediaQueries = this.оbjects
                .map(({ breakpoint }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
                .filter((item, index, self) => self.indexOf(item) === index);
    
            // навішування слухача на медіа-запит
            // та виклик оброблювача при першому запуску
            this.mediaQueries.forEach((media) => {
                const mediaSplit = media.split(',');
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
    
                // масив об'єктів з відповідним брейкпоінтом
                const оbjectsFilter = this.оbjects.filter(({ breakpoint }) => breakpoint === mediaBreakpoint);
                matchMedia.addEventListener('change', () => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                });
                this.mediaHandler(matchMedia, оbjectsFilter);
            });
        }
        // Основна функція
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) {
                оbjects.forEach((оbject) => {
                    // оbject.index = this.indexInParent(оbject.parent, оbject.element);
                    this.moveTo(оbject.place, оbject.element, оbject.destination);
                });
            } else {
                оbjects.forEach(({ parent, element, index }) => {
                    if (element.classList.contains(this.daClassname)) {
                        this.moveBack(parent, element, index);
                    }
                });
            }
        }
        // Функція переміщення
        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === 'last' || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if (place === 'first') {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        // Функція повернення
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== undefined) {
                parent.children[index].before(element);
            } else {
                parent.append(element);
            }
        }
        // Функція отримання індексу всередині батьківського єлементу
        indexInParent(parent, element) {
            return [...parent.children].indexOf(element);
        }
        // Функція сортування масиву по breakpoint та place
        // за зростанням для this.type = min
        // за спаданням для this.type = max
        arraySort(arr) {
            if (this.type === 'min') {
                arr.sort((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
                        if (a.place === 'first' || b.place === 'last') {
                            return -1;
                        }
                        if (a.place === 'last' || b.place === 'first') {
                            return 1;
                        }
                        return 0;
                    }
                    return a.breakpoint - b.breakpoint;
                });
            } else {
                arr.sort((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
                        if (a.place === 'first' || b.place === 'last') {
                            return 1;
                        }
                        if (a.place === 'last' || b.place === 'first') {
                            return -1;
                        }
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                });
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();

    const footerButton = document.querySelector(".footer__button");
    footerButton.addEventListener("click", () => {
        footerButton.classList.add("clicked");
        setTimeout(() => {
            footerButton.classList.remove("clicked");
        }, 300)
    })
    
    window.addEventListener("scroll", () => {
        let offsetTop = window.pageYOffset || document.documentElement.scrollTop;
        if(offsetTop > 50) {
            buttonBottom.style.display = "none";
        } else {
            buttonBottom.style.display = "block";
        }
        const buttonJoin = document.querySelector(".main-block-button");

        if(offsetTop > 10) {
            buttonJoin.classList.remove("active")
        } else {
            buttonJoin.classList.add("active")
        }
    })

    const buttonBottom = document.querySelector(".button-bottom");
    buttonBottom.addEventListener("click", () => {
        const section = document.querySelector(`#start`);
        window.scrollTo({
            top: section.offsetTop,
            behavior:"smooth"
        })
    })



  
  
    

    



});



