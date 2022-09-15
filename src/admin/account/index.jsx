// React
import React , { useState } from "react";
import ReactDOM from 'react-dom/client';

// Css
import '../main.css';

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

const element = (
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
        <table>
            <thead>
                <tr>
                    <th>北七</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>超級大北七</td>
                </tr>
            </tbody>
        </table>
    </React.StrictMode>
);

ReactDOM.createRoot( document.getElementById( 'wrapper' ) ).render(
    <React.StrictMode>
        <Main
            content={
                element
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
    </React.StrictMode>
)