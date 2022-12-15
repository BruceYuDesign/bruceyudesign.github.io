// css
import './index.css';

// plugin
import axios from 'axios';
// import 'aos/dist/aos.css';
// import AOS from 'aos/dist/aos.js';
import 'microtip/microtip.css';
import emailjs from '@emailjs/browser';

// components
import { gradientAnimate , gradientSplit } from './components/gradient.js';
import { loadImage } from './components/image.js';
import { dateTransform } from './components/date.js';
import { popup } from './components/popup.js';

!function() {
    'use strict';

    /**
     * ------------------------------------------------------------------------------------------
     * LOAD
     * ------------------------------------------------------------------------------------------ 
     */
    const load        = document.getElementById( 'load' );
    const loadControl = document.getElementById( 'loadControl' );
    let load_animate, load_resource;

    // 資源與動畫跑完，隱藏load
    const hideLoad = () => {
        if ( load_animate && load_resource ) {
            setTimeout( () => {
                document.body.style.overflow = 'auto';
                load.classList.add( '--hide' );
            }, 300 );
        }
    };

    // 動畫跑完
    loadControl.addEventListener( 'animationend' , () => {
        load_animate = true;
        hideLoad();
    });

    // 資源跑完
    const loadResource = () => {
        load_resource = true;
        hideLoad();
    };

    window.addEventListener( 'load' , loadResource );
    setTimeout( loadResource , 5000 );

    /**
     * ------------------------------------------------------------------------------------------
     * HEADER
     * ------------------------------------------------------------------------------------------ 
     */
    const header = document.getElementById( 'header' );

    // 漢堡選單
    document.body.addEventListener( 'click' , e => {
        if ( e.target.getAttribute( 'id' ) === 'headerBurger' ) {
            header.classList.toggle( '--open' );
        } else {
            header.classList.remove( '--open' );
        }
    });

    // // AOS --------------------------------------------------

    // AOS.init({

    //     // Global settings:
    //     disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    //     startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    //     initClassName: 'aos-init', // class applied after initialization
    //     animatedClassName: 'aos-animate', // class applied on animation
    //     useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    //     disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    //     debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    //     throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    //     // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    //     offset: 300, // offset (in px) from the original trigger point
    //     delay: 0, // values from 0 to 3000, with step 50ms
    //     duration: 500, // values from 0 to 3000, with step 50ms
    //     easing: 'ease', // default easing for AOS animations
    //     once: true, // whether animation should happen only once - while scrolling down
    //     mirror: false, // whether elements should animate out while scrolling past them
    //     anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    // });

    /** 
     * ------------------------------------------------------------------------------------------
     * BANNER
     * ------------------------------------------------------------------------------------------ 
     */

    const banner     = document.getElementById( 'banner' );
    const bannerTool = document.getElementById( 'bannerTool' );
    const bannerUse  = document.getElementById( 'bannerUse' );
    const bannerImg  = document.getElementById( 'bannerImg' );
    const bannerBtn  = document.getElementById( 'bannerBtn' );
    let banner_data = [];
    let banner_len;
    let banner_target = 0;
    let banner_duration;
    let banner_delay;

    // banner更換文字
    const writeBanner = ( data ) => {
        bannerTool.innerHTML = data.tool;
        bannerUse .innerHTML = data.use;
        bannerImg.style.backgroundImage = `url(${ data.img })`;
        banner.classList.remove( '--hide' );
    };

    // 時間到切換
    const timingBanner = () => {
        banner_duration = setTimeout( () => {
            banner_target + 1 < banner_len ? banner_target++ : banner_target = 0;
            changeBanner();
        } , 5000 );
    };

    // banner轉換
    const changeBanner = () => {
        let data = banner_data[ banner_target ];
        banner.classList.add( '--hide' ); // 先隱藏
        // 按鈕切換
        document.querySelector( '.com-banner-btn.--click' ).classList.remove( '--click' );
        document.querySelectorAll( '.com-banner-btn' )[ banner_target ].classList.add( '--click' );
        // 清除定時器
        clearTimeout( banner_duration );
        clearTimeout( banner_delay );
        // 帶完資料再顯示
        banner_delay = setTimeout( () => {
            writeBanner( data );
            timingBanner();
        } , 1500 );
        // 漸層動畫module
        gradientAnimate({
            element:  banner,
            duration: 2000,
            start: {
                startColor1: gradientSplit( banner )[ 0 ],
                startColor2: gradientSplit( banner )[ 1 ]
            },
            end: {
                endColor1: data.gradient.start,
                endColor2: data.gradient.end
            }
        });
    };

    // 產生bannerBtn
    const renderBannerBtn = () => {
        let html = '';
        banner_data.forEach( ( element , index ) => {
            html += `<button class="com-banner-btn" banner_target="${ index }"></button>`;
        });
        bannerBtn.innerHTML = html;
        document.querySelector( '.com-banner-btn' ).classList.add( '--click' ); // 第一筆
    };

    // bannerBtn點選
    bannerBtn.addEventListener( 'click' , ( e ) => {
        if( e.target.nodeName === 'BUTTON' ) {
            banner_target = e.target.getAttribute( 'banner_target' );
            changeBanner();
        };
    });

    // 請求banner資料
    // TODO : get real API
    axios.get( '../json/banner.json' )
        .then( response => {
            banner_data = response.data.sort( ( a , b ) => {
                return a.sort > b.sort ? 1 : -1;
            });
            banner_len  = banner_data.length;
            // 預載入圖片
            loadImage( banner_data , 'img' );
            // 帶入首筆資料
            banner.style.backgroundImage = 
                `linear-gradient(to right top,
                ${ banner_data[ 0 ].gradient.start },
                ${ banner_data[ 0 ].gradient.end })`;
            writeBanner( banner_data[ 0 ] );
            // 超過1筆執行
            if( banner_len > 1 ) {
                timingBanner();
                renderBannerBtn();
            };
        })
        .catch( error => console.error( error ) );

    /** 
     * ------------------------------------------------------------------------------------------
     * PROJECT
     * ------------------------------------------------------------------------------------------ 
     */

    const projectKind          = document.getElementById( 'projectKind' );
    const projectBlog          = document.getElementById( 'projectBlog' );
    const projectNext          = document.getElementById( 'projectNext' );
    const projectPrev          = document.getElementById( 'projectPrev' );
    const projectPage          = document.getElementById( 'projectPage' );
    const projectModal         = document.getElementById( 'projectModal' );
    const projectModalImg      = document.getElementById( 'projectModalImg' );
    const projectModalImgPrev  = document.getElementById( 'projectModalImgPrev' );
    const projectModalImgNext  = document.getElementById( 'projectModalImgNext' );
    const projectModalImgPage  = document.getElementById( 'projectModalImgPage' );
    const projectModalInfo     = document.getElementById( 'projectModalInfo' );
    const projectModalTitle    = document.getElementById( 'projectModalTitle' );
    const projectModalSubtitle = document.getElementById( 'projectModalSubtitle' );
    const projectModalDate     = document.getElementById( 'projectModalDate' );
    const projectModalLink     = document.getElementById( 'projectModalLink' );
    const projectModalDesc     = document.getElementById( 'projectModalDesc' );
    const projectModalClose    = document.getElementById( 'projectModalClose' );

    // projectKind --------------------------------------------------

    let project_kind_data = [];

    // 產生projectKindBtn
    const renderProjectKind = () => {
        let html = '';
        project_kind_data.forEach( element => {
            html += 
                `<button class="com-btn-pill com-project-kind"
                    project_kind_id=${ element.kind_id }>
                    ${ element.name }
                </button>`;
        });
        projectKind.innerHTML = html;
        document.querySelector( '.com-project-kind' ).classList.add( '--click' ); // 第一筆
    };

    // 請求kind資料
    // TODO : get real API
    axios.get( '../json/project_kind.json' )
        .then( response => {
            project_kind_data = response.data;
            renderProjectKind();
            getProjectBlog( project_kind_data[ 0 ].kind_id );
        })
        .catch( error => console.error( error ) );

    // projectKindBtn點選
    projectKind.addEventListener( 'click' , e => {
        if( e.target.nodeName === 'BUTTON' ) {
            // 請求資料
            getProjectBlog( e.target.getAttribute( 'project_kind_id' ) );
            // 切換按鈕
            document.querySelector( '.com-project-kind.--click' ).classList.remove( '--click' );
            e.target.classList.add( '--click' );
        };
    });

    // projectBlog --------------------------------------------------

    let project_blog_data = [];
    let project_blog_len      = 0;
    let project_blog_page     = 0;
    let project_blog_page_len = 0;

    // 產生renderProjectBlog
    const renderProjectBlog = () => {
        let html  = '';
        let limit = 6;
        let datas = ( project_blog_page - 1 ) * limit;
        // 判斷剩餘多少資料
        if( project_blog_page === project_blog_page_len ) {
            limit = project_blog_len - datas
        };
        // 產生資料
        for( let i = 0 ; i < limit ; i++ ) {
            let target = i + datas;
            let data = project_blog_data[ target ];
            html +=
                `<li class="com-block com-project-blog"
                    style="background-image: url( ${ data.cover } )">
                    <button project_target="${ target }"
                        type="button">
                        <h4>${ data.title }</h4>
                        <p>${ data.subtitle }</p>
                    </button>
                </li>`
        };
        projectBlog.innerHTML = html;
        // 設定頁碼
        projectPage.innerHTML = `${ project_blog_page } / ${ project_blog_page_len }`;
    };

    // 請求project資料
    const getProjectBlog = requestId => {
        // TODO : get real API && format: url + `?kind_id=${ requestId }`
        axios.get( '../json/project.json' )
            .then( response => {
                // 按日期排序
                project_blog_data = response.data.sort( ( a , b ) => {
                    return Date( a.date.update ) < Date( b.date.update ) ? -1 : 1;
                });
                // 預載入圖片
                loadImage( project_blog_data , 'cover' );
                // 設定參數
                project_blog_len      = project_blog_data.length;
                project_blog_page     = 1;
                project_blog_page_len = Math.ceil( project_blog_len / 6 );
                renderProjectBlog();
            })
            .catch( error => console.error( error ) );
    };

    // 點選projectBlog
    projectBlog.addEventListener( 'click' , ( e ) => {
        if( e.target.nodeName === 'BUTTON' ) {
            // 帶入資料
            writeProjectModal( project_blog_data[ e.target.getAttribute( 'project_target' ) ] );
            // 開啟modal
            projectModal.classList.add( '--show' );
            document.body.style.overflow = 'hidden';
        }
    });

    // 點選上一頁
    projectPrev.addEventListener( 'click' , () => {
        if( project_blog_page - 1 >= 1 ) {
            project_blog_page--;
            renderProjectBlog();
        };
    });

    // 點選下一頁
    projectNext.addEventListener( 'click' , () => {
        if( project_blog_page + 1 <= project_blog_page_len ) {
            project_blog_page++;
            renderProjectBlog();
        };
    });

    // projectModal --------------------------------------------------

    let project_detail_data = [];
    let project_detail_len  = 0;
    let project_detail_page = 0;

    // 更換圖片
    const changeProjectModalImg = () => {
        let target = project_detail_page - 1;
        // 帶圖片連結
        projectModalImg.style.backgroundImage = `url(${ project_detail_data[ target ].img })`;
        // 切換按鈕
        document.querySelector( '.com-project-modal-img-page.--click' ).classList.remove( '--click' );
        document.querySelectorAll( '.com-project-modal-img-page' )[ target ].classList.add( '--click' );
    };

    // 產生頁碼清單
    const renderProjectModalImgPage = () => {
        let html = '';
        project_detail_data.forEach( element => {
            html += `<button project_detail_page="${ element.page }" class="com-project-modal-img-page"></button>`;
        });
        projectModalImgPage.innerHTML = html;
        document.querySelector( '.com-project-modal-img-page' ).classList.add( '--click' );
    };

    // projectModal帶入資料
    const writeProjectModal = data => {
        // scrollbar置頂
        projectModalInfo.scroll( 0 , 0 );
        // 頁碼排序
        project_detail_data = data.detail.sort( ( a , b ) => a.page > b.page ? 1 : -1 );
        // 預載入圖片
        loadImage( project_detail_data , 'img' );
        // 設定參數
        project_detail_len  = project_detail_data.length;
        project_detail_page = 1;
        renderProjectModalImgPage();
        changeProjectModalImg();
        // 文字
        projectModalTitle   .innerHTML = data.title;
        projectModalSubtitle.innerHTML = data.subtitle;
        projectModalDate    .innerHTML = dateTransform( data.date.update );
        projectModalDesc    .innerHTML = data.desc;
        // 連結
        if( data.link.src !== '' && data.link.src !== null ) {
            projectModalLink.innerHTML = `<i class="fa-solid fa-link"></i> ${ data.link.name }`;
            projectModalLink.setAttribute( 'href' , data.link.src );
            projectModalLink.classList.remove( '--hide' );
        } else {
            projectModalLink.classList.add( '--hide' );
        }
    };

    // 點選上一頁
    projectModalImgPrev.addEventListener( 'click' , () => {
        if( project_detail_page - 1 >= 1 ) {
            project_detail_page--;
            changeProjectModalImg();
        };
    });

    // 點選下一頁
    projectModalImgNext.addEventListener( 'click' , () => {
        if( project_detail_page + 1 <= project_detail_len ) {
            project_detail_page++;
            changeProjectModalImg();
        };
    });

    // 點選頁碼清單
    projectModalImgPage.addEventListener( 'click' , e => {
        if( e.target.nodeName === 'BUTTON' ) {
            project_detail_page = parseInt( e.target.getAttribute( 'project_detail_page' ) );
            changeProjectModalImg();
        };
    });

    // 關閉modal
    projectModalClose.addEventListener( 'click' , () => {
        projectModal.classList.remove( '--show' );
        document.body.style.overflow = 'auto';
        project_detail_data = null;
    });

    /** 
     * ------------------------------------------------------------------------------------------
     * CONTACT
     * ------------------------------------------------------------------------------------------ 
     */

    const contactSubmit  = document.getElementById( 'contactSubmit' );
    const contactElement = document.querySelectorAll( '.contactForm' );

    // 點選送出信件
    contactSubmit.addEventListener( 'click' , () => {
        let detail = {};
        let index  = 0;
        let judge  = true;

        // 取得所有表單
        while( contactElement[ index ] ) {
            
            // 都有資料
            if( contactElement[ index ].value !== '' ) {
                detail[ contactElement[ index ].getAttribute( 'name' ) ] = contactElement[ index ].value;
                index++;
                
            // 缺資料
            } else {
                // popup
                popup({
                    text: `「${ contactElement[ index ].getAttribute( 'data-label' ) }」未填`,
                    status: 'danger'
                });
                judge = false;
                break;
            }
        };

        // 發送email
        if( judge ) {

            // popup
            popup({
                text: '信件發送中',
                status: 'info'
            });
            contactSubmit.classList.add( '--load' );

            // emailjs
            emailjs.send( 'service_j5bpzhy' , 'template_ks9uql4' , detail , 'c_TpduG57-KFzdssj' )
                .then( response => {
                    // 清空表單
                    contactElement.forEach( element => element.value = '' );
                    // popup
                    popup({
                        text: '已成功送出',
                        status: 'success'
                    });
                    contactSubmit.classList.remove( '--load' );
                })
                .catch( error => {
                    console.error( error )
                    contactSubmit.classList.remove( '--load' );
                });
        };
    });

}()