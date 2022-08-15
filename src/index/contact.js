import emailjs from '@emailjs/browser';
import { popup } from '../components/popup.js';

!function() {
    const contactSubmit = document.getElementById( 'contactSubmit' );

    // 點選送出信件
    contactSubmit.addEventListener( 'click' , () => {
        let detail = {};
        let element = document.querySelectorAll( '.contactForm' );
        let index = 0;
        let judge = true;

        // 取得所有表單
        while( element[ index ] ) {
            
            // 都有資料
            if( element[ index ].value !== '' ) {
                detail[ element[ index ].getAttribute( 'name' ) ] = element[ index ].value;
                index++;
                
            // 缺資料
            } else {
                // popup
                popup({
                    text: `「${ element[ index ].getAttribute( 'data-label' ) }」未填`,
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
                    element.forEach( element => element.value = '' );
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