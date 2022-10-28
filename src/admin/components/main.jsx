// React
import React , { useState } from 'react';
import ReactDOM from 'react-dom/client';

// Plugin
import axios from 'axios';
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBriefcase, faImages, faUsers } from '@fortawesome/free-solid-svg-icons'

// Css
import '../main.css';

// Assets
import logo from '../../assets/img/logo.svg';
import favicon from '../../assets/img/favicon.svg';

// Favicon
document.querySelector( 'head' ).insertAdjacentHTML( 'beforeend' ,
    `<link rel='shortcut icon' href=${ favicon } type='image/x-icon'></link>`
)

/** 
 * ----------------------------------------------------------------------
 * Header
 * ----------------------------------------------------------------------
 */

class Header extends React.Component{
    constructor( props ) {
        super( props );
        this.state = {
            userName: '訪客',
            userProfile: ''
        }
    }

    // 取得用戶資料
    componentDidMount() {
        axios.get( '../../json/user.json' + '?identity=87875487' )
            .then( response => {
                this.setState({
                    userName:    response.data.name,
                    userProfile: response.data.profile
                })
            })
            .catch( error => {
                console.error( error )
            })
    }

    // 漢堡選單點選
    buggerBtn = () => {
        const nav  = document.querySelector( 'nav' ).classList;
        const body = document.body.classList;

        if( nav.contains( '-translate-x-full' ) ) {
            nav .remove( '-translate-x-full' );
            body.add( 'overflow-hidden' , 'sm:overflow-auto' );

        } else {
            nav .add( '-translate-x-full' );
            body.remove( 'overflow-hidden' , 'sm:overflow-auto' );
        }
    }

    render() {
        return(
            <header className='sticky top-0 w-full py-2 flex items-center justify-center bg-slate-50 z-10 shadow-sm'>
                <div className='w-11/12 max-w-custom-1400px flex flex-row justify-between items-center'>
                    <button className='block sm:hidden text-slate-600 h-fit text-2xl'
                        type='button'
                        onClick={ this.buggerBtn }
                        >
                        <FontAwesomeIcon icon={ faBars } />
                    </button>
                    <a href='../index.html'>
                        <img className='h-10 sm:h-12'
                            src={ logo }
                            />
                    </a>
                    <a className='h-10 p-1 flex flex-row justify-center items-center gap-2 bg-slate-100 rounded-full shadow-inner'
                        href='../setting.html'
                        >
                        <img className='h-full aspect-1 bg-slate-50 rounded-full'
                            src={ this.state.userProfile }
                            alt='profile'
                            />
                        <span className='hidden sm:block mr-2 font-semibold text-slate-500'>
                            { this.state.userName }
                        </span>
                    </a>
                </div>
            </header>
        )
    }
}

/** 
 * ----------------------------------------------------------------------
 * SideBar
 * ----------------------------------------------------------------------
 */

class SideBar extends React.Component{
    constructor( props ) {
        super( props );
        this.state = {
            pages: [
                {
                    name: '帳號管理',
                    domain: 'account',
                    icon: faUsers
                },
                {
                    name: '廣告管理',
                    domain: 'banner',
                    icon: faImages
                },
                {
                    name: '作品管理',
                    domain: 'project',
                    icon: faBriefcase
                }
            ]
        }
    }

    // 左側選單項目
    sideBarList() {
        const btnLink  = window.location.href;
        const btnStyle = 'flex gap-2 items-center w-full py-2 px-4 rounded-md ';

        return this.state.pages.map( ( page , key ) =>
            <li key={ key }>
                <a className={
                    btnLink.match( page.domain ) ?
                        btnStyle + 'text-slate-50 bg-blue-400' :
                        btnStyle + 'hover:text-slate-50 hover:bg-blue-400'
                    }
                    href={ '../' + page.domain + '/index.html' }
                    >
                    <FontAwesomeIcon icon={ page.icon } />
                    { page.name }
                </a>
            </li>
        )
    }

    render() {
        return(
            <nav className={
                'fixed top-14 left-0 -translate-x-full sm:sticky sm:top-20 sm:translate-x-0 ' +
                'w-full sm:w-1/5 min-w-fit h-screen sm:h-fit flex flex-col items-center p-4 z-10 ' +
                'bg-slate-50 rounded-none sm:rounded-md shadow-sm transition'
                }>
                <ul className='w-full flex flex-col gap-2 text-slate-400 font-medium'>
                    { this.sideBarList() }
                </ul>
                <span className='mt-8 text-xs font-medium text-slate-300'>
                    &copy;
                    <a className='underline hover:text-blue-400'
                        href='../../index.html'
                        target='_blank'
                        >
                        BRUCE YU DESIGN
                    </a>
                </span>
            </nav>
        )
    }
}

/** 
 * ----------------------------------------------------------------------
 * Main
 * ----------------------------------------------------------------------
 */

class Main extends React.Component{
    render() {
        return(
            <React.StrictMode>
                <Header/>
                <div className='w-11/12 max-w-custom-1400px py-4 flex flex-row gap-4'>
                    <SideBar/>
                    <div className='h-fit w-full sm:w-4/5 p-4 custom-block'>
                        { this.props.content }
                    </div>
                </div>
                { this.props.modal }
            </React.StrictMode>
        )
    }
}

export { Header , SideBar , Main };