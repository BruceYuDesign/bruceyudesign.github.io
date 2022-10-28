// React
import React , { useState } from "react";
import ReactDOM from 'react-dom/client';

// Css
import '../main.css';

// Plugin
import Table from 'rc-table';

// Components
import { Main } from "../components/main.jsx";
import { Modal , openModal , closeModal } from "../components/modal.jsx";
import { Button } from "../components/button.jsx";

/** 
 * ----------------------------------------------------------------------
 * Page Content
 * ----------------------------------------------------------------------
 */

document.title = '帳號管理';

ReactDOM.createRoot( document.getElementById( 'wrapper' ) ).render(
    <Main
        content={
            <React.StrictMode>
                <Button
                    type='info'
                    content='開啟modal'
                    function={ () => openModal( 'addData' ) }
                />
                <Button
                    type='danger'
                    content='連結'
                    function={ () => location.href = '../../index.html' }
                />
            </React.StrictMode>
        }
        modal={
            <Modal
                id='addData'
                title='eat my shit'
                content='kiss my ass'
                btns={
                    <Button
                        type='success'
                        content='關閉modal'
                        function={ () => closeModal( 'addData' ) }
                    />
                }
            />
        }
    />
)