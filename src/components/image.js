// 預載入圖片
export function loadImage( array , key ) {
    array.forEach( element => {
        new Image().src = element[ key ]
    })
};