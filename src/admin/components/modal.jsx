import React from 'react';

class Modal extends React.Component{
    render() {
        return(
            <div className={
                'fixed top-0 left-0 h-screen w-screen flex items-center justify-center ' +
                'bg-black bg-opacity-50 z-20 transition pointer-events-none opacity-0 '
                }
                id={ this.props.id }>
                <div className='w-11/12 max-w-screen-sm p-8 flex flex-col gap-6 custom-block transition translate-y-8'>
                    <h4 className='font-semibold text-2xl text-blue-500 text-left'>
                        { this.props.title }
                    </h4>
                    <div className='text-left text-slate-500 leading-loose'>
                        { this.props.content }
                    </div>
                    <div className='flex flex-row gap-4 justify-end'>
                        { this.props.btns }
                    </div>
                </div>
            </div>
        )
    }
}

// 開啟modal
function openModal( id ) {
    document.getElementById( id )
        .classList.remove( 'pointer-events-none' , 'opacity-0' );
    document.querySelector( `#${ id } > div` )
        .classList.remove( 'translate-y-8' );
    document.body
        .classList.add( 'overflow-hidden' );
}

// 關閉modal
function closeModal( id ) {
    document.getElementById( id )
        .classList.add( 'pointer-events-none' , 'opacity-0' );
    document.querySelector( `#${ id } > div` )
        .classList.add( 'translate-y-8' );
    document.body
        .classList.remove( 'overflow-hidden' );
}

export { Modal , openModal , closeModal }