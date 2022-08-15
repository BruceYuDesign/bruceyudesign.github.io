import AOS from 'aos/dist/aos.js';
import 'aos/dist/aos.css';
import 'microtip/microtip.css';

'use strict';

!function() {

    const load        = document.getElementById( 'load' );
    const loadControl = document.getElementById( 'loadControl' );
    let load_animate , load_resource;

    // 資源與動畫跑完，隱藏load
    const loadHide = () => {
        if( load_animate && load_resource ) {
            setTimeout( () => {
                document.body.style.overflow = 'auto';
                load.classList.add( '--hide' );
            } , 300 );
        }
    };

    // 動畫跑完
    loadControl.addEventListener( 'animationend' , () => {
        load_animate = true;
        loadHide();
    });

    // 資源跑完
    window.addEventListener( 'load' , () => {
        load_resource = true;
        loadHide();
    });

    const header = document.getElementById( 'header' );

    // 漢堡選單
    document.body.addEventListener( 'click' , function( e ) {
        if( e.target.getAttribute( 'id' ) === 'headerBurger' ) {
            header.classList.toggle( '--open' );
        } else {
            header.classList.remove( '--open' );
        }
    });

    // AOS動畫參數
    AOS.init({

        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
        
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 300, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 500, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });

} ()