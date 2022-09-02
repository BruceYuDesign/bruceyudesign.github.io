import React from "react";

import '../main.css';

import Logo from '../../assets/img/logo.svg';
import Favicon from '../../assets/img/favicon.svg';

document.querySelector( 'head' ).insertAdjacentHTML( 'beforeend' ,
    `<link rel="shortcut icon" href=${ Favicon } type="image/x-icon"></link>`
)

export class Header extends React.Component{
    render() {
        return(
            <header className='w-full flex flex-row justify-between py-2 px-8 shadow-md'>
                <img className="h-12" src={ Logo }></img>
                <button type="button">登出</button>
            </header>
        )
    }
}

export class Nav extends React.Component{
    render() {
        return(
            <nav className="w-1/5 flex flex-col">
                <ul>
                    <li>帳號管理</li>
                    <li>廣告管理</li>
                    <li>作品管理</li>
                </ul>
            </nav>
        )
    }
}

export class Form extends React.Component{
    render() {
        return(
            <div>
                <form>
                    <label for="">test</label>
                    <input type="text" name="" value=""/>
                </form>
            </div>
        )
    }
}