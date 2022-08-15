// todo 待優化，製作成套件
let duration , delay;

export function popup({
    text:    text,
    status:  status,
    time:    time = 5000
}){
    const popup      = document.getElementById( 'popup' );
    const popupText  = document.getElementById( 'popupText' );
    const popupClose = document.getElementById( 'popupClose' );
    const color = {
        success: '#10b981',
        info:    '#0ea5e9',
        warn:    '#f59e0b',
        danger:  '#f43f5e'
    };

    // 隱藏
    const hidden = () => {
        popup.classList.remove( '--show' );
    };

    // 顯示 帶資料
    const show = () => {
        duration = setTimeout( hidden , time );
        popup.classList.add( '--show' );
        popup.style.backgroundColor = color[ status ];
        popupText.innerHTML = text;
        popupClose.addEventListener( 'click' , hidden );
    };

    // 清除定時器
    clearTimeout( duration );
    clearTimeout( delay );

    // 預防重複執行
    if( popup.classList.contains( '--show' ) ) {
        hidden();
        delay = setTimeout( show , 300 );
    } else {
        show();
    };
};