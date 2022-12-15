let timer;

// 拆解漸層色
export function gradientSplit( element ) {
    return getComputedStyle( element ).backgroundImage.match( /rgb\([^\)]+\)/g );
};

// 漸層色動畫
export function gradientAnimate({
    element:  element,
    duration: duration,
    start: {
        startColor1,
        startColor2
    },
    end: {
        endColor1,
        endColor2
    }
}) {
    let counter = 1;
    let limit = duration / 25;

    // 色階
    const step = ( start , end ) => {
        return parseInt( start + ( end - start ) / limit * counter );
    };

    // 拆解RGB
    const rgbSplit = ( color ) => {
        color = color.match( /\d+/g );
        return {
            red:   parseInt( color[ 0 ] ),
            green: parseInt( color[ 1 ] ),
            blue:  parseInt( color[ 2 ] ),
        };
    };

    // 組合為RGB
    const color = ( start , end ) => {
        let red   = step( rgbSplit( start ).red,   rgbSplit( end ).red   );
        let green = step( rgbSplit( start ).green, rgbSplit( end ).green );
        let blue  = step( rgbSplit( start ).blue,  rgbSplit( end ).blue  );
        return `rgb(${ red },${ green },${ blue })`;
    };

    // 變換顏色
    const translate = () => {
        if ( counter <= limit ) {
            element.style.backgroundImage =
                `linear-gradient(to right top,
                ${ color( startColor1 , endColor1 ) },
                ${ color( startColor2 , endColor2 ) })`;
            counter++;
        } else {
            clearInterval( timer );
        }
    }

    // 計時
    clearInterval( timer );
    timer = setInterval( translate , 25 );
};