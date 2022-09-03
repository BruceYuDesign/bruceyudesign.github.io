// React
import React from "react";

// Css
import '../main.css';

// Assets
import Logo from '../../assets/img/logo.svg';
import Favicon from '../../assets/img/favicon.svg';

// Favicon
document.querySelector( 'head' ).insertAdjacentHTML( 'beforeend' ,
    `<link rel="shortcut icon" href=${ Favicon } type="image/x-icon"></link>`
)

/** 
 * ----------------------------------------------------------------------
 * React Component
 * ----------------------------------------------------------------------
 */

class Header extends React.Component{
    render() {
        return(
            <header className='sticky top-0 w-full flex flex-row justify-between py-2 px-8 shadow-md'>
                <img className="h-12" src={ Logo }></img>
                <button type="button">登出</button>
            </header>
        )
    }
}

class SideBar extends React.Component{
    render() {
        return(
            <nav className="w-1/5 flex flex-col shadow-md">
                <ul>
                    <li>帳號管理</li>
                    <li>廣告管理</li>
                    <li>作品管理</li>
                </ul>
            </nav>
        )
    }
}

class Main extends React.Component{
    render() {
        return(
            <div>
                <Header/>
                <div className="w-full pt-4 flex flex-row">
                    <SideBar/>
                    <div className="w-4/5">
                        { this.props.code }
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;