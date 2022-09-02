// css
import './index.css';

// plugin
import axios from 'axios';
import 'aos/dist/aos.css';
import AOS from 'aos/dist/aos.js';
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
     * GLOBAL
     * ------------------------------------------------------------------------------------------ 
     */

    // load --------------------------------------------------

    const load        = document.getElementById( 'load' );
    const loadControl = document.getElementById( 'loadControl' );
    let load_animate, load_resource;

    // 資源與動畫跑完，隱藏load
    const loadHide = () => {
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
        loadHide();
    });

    // 資源跑完
    window.addEventListener( 'load' , () => {
        load_resource = true;
        loadHide();
    });

    // header --------------------------------------------------

    const header = document.getElementById( 'header' );

    // 漢堡選單
    document.body.addEventListener( 'click' , function ( e ) {
        if ( e.target.getAttribute( 'id' ) === 'headerBurger' ) {
            header.classList.toggle( '--open' );
        } else {
            header.classList.remove( '--open' );
        }
    });

    // AOS --------------------------------------------------

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
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });

    /** 
     * ------------------------------------------------------------------------------------------
     * BANNER
     * ------------------------------------------------------------------------------------------ 
     */

    const banner      = document.getElementById( 'banner' );
    const bannerTool  = document.getElementById( 'bannerTool' );
    const bannerUse   = document.getElementById( 'bannerUse' );
    const bannerImg   = document.getElementById( 'bannerImg' );
    const bannerBtnLs = document.getElementById( 'bannerBtnLs' );
    let banner_data = [];
    let banner_len;
    let banner_target = 0;
    let banner_duration;
    let banner_delay;

    // banner帶資料
    const bannerWrite = ( data ) => {
        bannerTool.innerHTML = data.tool;
        bannerUse .innerHTML = data.use;
        bannerImg.style.backgroundImage = `url(${ data.img })`;
        banner.classList.remove( '--hide' );
    };

    // 時間到切換
    const bannerTimer = () => {
        banner_duration = setTimeout( () => {
            banner_target + 1 < banner_len ? banner_target++ : banner_target = 0;
            bannerChange();
        } , 7000 );
    };

    // banner轉換
    const bannerChange = () => {
        let data = banner_data[ banner_target ];

        banner.classList.add( '--hide' ); // 先隱藏

        // 按鈕切換
        document.querySelector( '.bannerBtn.--click' ).classList.remove( '--click' );
        document.querySelectorAll( '.bannerBtn' )[ banner_target ].classList.add( '--click' );

        // 清除定時器
        clearTimeout( banner_duration );
        clearTimeout( banner_delay );

        // 帶完資料再顯示
        banner_delay = setTimeout( () => {
            bannerWrite( data );
            bannerTimer();
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
    const bannerBtn = () => {
        let html = '';
        banner_data.forEach( ( element , index ) => {
            html += `<button class="bannerBtn" banner_target="${ index }"></button>`;
        });
        bannerBtnLs.innerHTML = html;
        document.querySelector( '.bannerBtn' ).classList.add( '--click' ); // 第一筆
    };

    // bannerBtn點選
    bannerBtnLs.addEventListener( 'click' , ( e ) => {
        if( e.target.nodeName === 'BUTTON' ) {
            banner_target = e.target.getAttribute( 'banner_target' );
            bannerChange();
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
            banner.style.backgroundImage = `linear-gradient(to right top,${ banner_data[ 0 ].gradient.start },${ banner_data[ 0 ].gradient.end })`;
            bannerWrite( banner_data[ 0 ] );

            // 超過1筆執行
            if( banner_len > 1 ) {
                bannerTimer();
                bannerBtn();
            };
        })
        .catch( error => {
            // popup
            popup({
                text: `資料請求失敗，錯誤碼：${ error.response.status }`,
                status: 'danger'
            });
        });

    /** 
     * ------------------------------------------------------------------------------------------
     * PROJECT
     * ------------------------------------------------------------------------------------------ 
     */

    const projectKindLs         = document.getElementById( 'projectKindLs' );
    const projectBlogLs         = document.getElementById( 'projectBlogLs' );
    const projectNext           = document.getElementById( 'projectNext' );
    const projectPrev           = document.getElementById( 'projectPrev' );
    const projectPage           = document.getElementById( 'projectPage' );
    const modalProject          = document.getElementById( 'modalProject' );
    const modalProjectImg       = document.getElementById( 'modalProjectImg' );
    const modalProjectImgPrev   = document.getElementById( 'modalProjectImgPrev' );
    const modalProjectImgNext   = document.getElementById( 'modalProjectImgNext' );
    const modalProjectImgPageLs = document.getElementById( 'modalProjectImgPageLs' );
    const modalProjectInfo      = document.getElementById( 'modalProjectInfo' );
    const modalProjectTitle     = document.getElementById( 'modalProjectTitle' );
    const modalProjectSubtitle  = document.getElementById( 'modalProjectSubtitle' );
    const modalProjectDate      = document.getElementById( 'modalProjectDate' );
    const modalProjectLink      = document.getElementById( 'modalProjectLink' );
    const modalProjectDesc      = document.getElementById( 'modalProjectDesc' );
    const modalProjectClose     = document.getElementById( 'modalProjectClose' );

    // projectKind --------------------------------------------------

    let kind_data = [];

    // 產生projectKindBtn
    const projectKindBtn = () => {
        let html = '';
        kind_data.forEach( element => {
            html += `<button class="projectKindBtn" project_kind_id=${ element.kind_id }>`;
            html +=     `${ element.name }`;
            html += `</button>`;
        });
        projectKindLs.innerHTML = html;
        document.querySelector( '.projectKindBtn' ).classList.add( '--click' ); // 第一筆
    };

    // 請求kind資料
    // TODO : get real API
    axios.get( '../json/project_kind.json' )
        .then( response => {
            kind_data = response.data;
            projectKindBtn();
            getProjectData( kind_data[ 0 ].kind_id );
        })
        .catch( error => {
            // popup
            popup({
                text: `資料請求失敗，錯誤碼：${ error.response.status }`,
                status: 'danger'
            });
        });

    // projectKindBtn點選
    projectKindLs.addEventListener( 'click' , ( e ) => {
        if( e.target.nodeName === 'BUTTON' ) {

            // 請求資料
            getProjectData( e.target.getAttribute( 'project_kind_id' ) );

            // 切換按鈕
            document.querySelector( '.projectKindBtn.--click' ).classList.remove( '--click' );
            e.target.classList.add( '--click' );
        };
    });

    // project --------------------------------------------------

    let project_data = [];
    let project_len      = 0;
    let project_page     = 0;
    let project_page_len = 0;

    // 產生projectBlog
    const projectBlog = () => {
        let html  = '';
        let limit = 6;
        let datas = ( project_page - 1 ) * 6;

        // 判斷剩餘多少資料
        if( project_page === project_page_len ) {
            limit = project_len - datas
        };

        // 產生資料
        for( let i = 0 ; i < limit ; i++ ) {
            let target = i + datas;
            let data = project_data[ target ];
            html += `<li class="projectBlog">`;
            html +=     `<div data-aos="zoom-in" data-aos-once="true" data-aos-offset="100">`;
            html +=         `<div style="background-image: url(${ data.cover });"></div>`;
            html +=         `<button project_target="${ target }">`;
            html +=             `<p>${ data.title }</p>`;
            html +=             `<span>${ data.subtitle }</span>`;
            html +=         `</button>`;
            html +=     `</div>`;
            html += `</li>`;
        };
        projectBlogLs.innerHTML = html;

        // 設定頁碼
        projectPage.innerHTML = `${ project_page } / ${ project_page_len }`;
    };

    // 請求project資料
    const getProjectData = ( requestId ) => {
        // TODO : get real API && format: url + `?kind_id=${ requestId }`
        axios.get( '../json/project.json' )
            .then( response => {

                // 按日期排序
                project_data = response.data.sort( ( a , b ) => {
                    return Date( a.date.update ) < Date( b.date.update ) ? -1 : 1;
                });

                // 預載入圖片
                loadImage( project_data , 'cover' );

                // 設定參數
                project_len  = project_data.length;
                project_page = 1;
                project_page_len = Math.ceil( project_len / 6 );
                projectBlog();
            })
            .catch( error => {
                // popup
                popup({
                    text: `資料請求失敗，錯誤碼：${ error.response.status }`,
                    status: 'danger'
                });
            });
    };

    // 點選projectBlog
    projectBlogLs.addEventListener( 'click' , ( e ) => {
        if( e.target.nodeName === 'BUTTON' ) {

            // 帶入資料
            modalProjectWrite( project_data[ e.target.getAttribute( 'project_target' ) ] );

            // 開啟modal
            modalProject.classList.add( '--show' );
            document.body.style.overflow = 'hidden';
        }
    });

    // 點選上一頁
    projectPrev.addEventListener( 'click' , () => {
        if( project_page - 1 >= 1 ) {
            project_page--;
            projectBlog();
        };
    });

    // 點選下一頁
    projectNext.addEventListener( 'click' , () => {
        if( project_page + 1 <= project_page_len ) {
            project_page++;
            projectBlog();
        };
    });

    // modalProject --------------------------------------------------

    let detail_data = [];
    let detail_len  = 0;
    let detail_page = 0;

    // 更換圖片
    const modalProjectImgChange = () => {
        let target = detail_page - 1;

        // 帶圖片連結
        modalProjectImg.style.backgroundImage = `url(${ detail_data[ target ].img })`;

        // 切換按鈕
        document.querySelector( '.modalProjectImgPage.--click' ).classList.remove( '--click' );
        document.querySelectorAll( '.modalProjectImgPage' )[ target ].classList.add( '--click' );
    };

    // 產生頁碼清單
    const modalProjectImgPage = () => {
        let html = '';
        detail_data.forEach( element => {
            html += `<button detail_page="${ element.page }" class="modalProjectImgPage"></button>`;
        });
        modalProjectImgPageLs.innerHTML = html;
        document.querySelector( '.modalProjectImgPage' ).classList.add( '--click' );
    };

    // modalProject帶入資料
    const modalProjectWrite = ( data ) => {

        // scrollbar置頂
        modalProjectInfo.scroll( 0 , 0 );

        // 頁碼排序
        detail_data = data.detail.sort( ( a , b ) => a.page > b.page ? 1 : -1 );

        // 預載入圖片
        loadImage( detail_data , 'img' );

        // 設定參數
        detail_len  = detail_data.length;
        detail_page = 1;
        modalProjectImgPage();
        modalProjectImgChange();

        // 文字
        modalProjectTitle   .innerHTML = data.title;
        modalProjectSubtitle.innerHTML = data.subtitle;
        modalProjectDate    .innerHTML = dateTransform( data.date.update );
        modalProjectDesc    .innerHTML = data.desc;

        // 連結
        if( data.link.src !== '' && data.link.src !== null ) {
            modalProjectLink.innerHTML = `<i class="fa-solid fa-link"></i> ${ data.link.name }`;
            modalProjectLink.setAttribute( 'href' , data.link.src );
            modalProjectLink.classList.remove( '--hide' );
        } else {
            modalProjectLink.classList.add( '--hide' );
        }
    };

    // 點選上一頁
    modalProjectImgPrev.addEventListener( 'click' , () => {
        if( detail_page - 1 >= 1 ) {
            detail_page--;
            modalProjectImgChange();
        };
    });

    // 點選下一頁
    modalProjectImgNext.addEventListener( 'click' , () => {
        if( detail_page + 1 <= detail_len ) {
            detail_page++;
            modalProjectImgChange();
        };
    });

    // 點選頁碼清單
    modalProjectImgPageLs.addEventListener( 'click' , ( e ) => {
        if( e.target.nodeName === 'BUTTON' ) {
            detail_page = parseInt( e.target.getAttribute( 'detail_page' ) );
            modalProjectImgChange();
        };
    });

    // 關閉modal
    modalProjectClose.addEventListener( 'click' , () => {
        modalProject.classList.remove( '--show' );
        document.body.style.overflow = 'auto';
        detail_data = null;
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
                    // popup
                    popup({
                        text: `信件發送失敗，錯誤碼：${ error.status }`,
                        status: 'danger'
                    });
                    contactSubmit.classList.remove( '--load' );
                });
        };
    });

}()