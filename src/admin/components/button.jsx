import React from 'react';

class Button extends React.Component {

    // 按鈕類型
    btnType = ( type ) => {
        switch( true ) {
            case type === 'info':
                return 'bg-blue-500';

            case type === 'success':
                return 'bg-teal-500';

            case type === 'warning':
                return 'bg-yellow-500';

            case type === 'danger':
                return 'bg-red-500';

            default:
                return 'bg-slate-500';
        }
    }

    render() {
        return(
            <button
                className={
                    this.btnType( this.props.type ) +
                    ' m-1.5 py-1 px-4 whitespace-nowrap text-slate-50 rounded-md' +
                    ' opacity-90 hover:opacity-100 hover:scale-105 transition'
                }
                onClick={ this.props.function }
                >
                { this.props.content }
            </button>
        )
    }
}

export { Button }