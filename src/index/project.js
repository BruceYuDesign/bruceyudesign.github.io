'use strict';

import axios from 'axios';
import { loadImage } from '../components/image.js';
import { dateTransform } from '../components/date.js';
import { popup } from '../components/popup.js';

!function() {

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
        modalProjectImg.style.backgroundImage =
            `url(${ detail_data[ target ].img })`;

        // 切換按鈕
        document.querySelector( '.modalProjectImgPage.--click' )
            .classList.remove( '--click' );

        document.querySelectorAll( '.modalProjectImgPage' )[ target ]
            .classList.add( '--click' );
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

        modalProjectInfo.scroll( 0 , 0 );

        // 頁碼排序
        detail_data = data.detail.sort( ( a , b ) => {
            return a.page > b.page ? 1 : -1;
        });

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

} ()