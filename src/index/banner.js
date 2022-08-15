'use strict';

import axios from 'axios';
import { loadImage } from '../components/image.js';
import { gradientAnimate , gradientSplit } from '../components/gradient.js';

!function() {

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

    // banner轉換
    const bannerChange = () => {
        let data = banner_data[ banner_target ];

        banner.classList.add( '--hide' ); // 先隱藏

        // 按鈕切換
        document.querySelector( '.bannerBtn.--click' ).classList.remove( '--click' );
        document.querySelectorAll( '.bannerBtn' )[ banner_target ].classList.add( '--click' );

        // 帶完資料再顯示
        clearTimeout( banner_duration );
        clearTimeout( banner_delay );
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

    // 時間到切換
    const bannerTimer = () => {
        clearTimeout( banner_duration );
        banner_duration = setTimeout( () => {
            banner_target + 1 < banner_len ? banner_target++ : banner_target = 0;
            bannerChange();
        } , 7000 );
    }

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

} ()