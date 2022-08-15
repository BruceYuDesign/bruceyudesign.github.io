export function dateTransform( inputDate ) {
    const date = new Date( inputDate );

    let Y = ( date.getFullYear()  ).toString();
    let M = ( date.getMonth() + 1 ).toString();
    let D = ( date.getDate()      ).toString();

    M.length < 2 ? M = '0' + M : null;
    D.length < 2 ? D = '0' + D : null;
    
    return `${ Y }-${ M }-${ D }`;
};