import React from "react";
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

import '../main.css';
import { Header , Nav , Form } from "../components/main.jsx";

document.title = '帳號管理';

ReactDOM.createRoot( document.getElementById( 'wrapper' ) ).render(
    <React.StrictMode>
        <Header/>
        <div className="w-full h-screen flex flex-row">
            <Nav/>
            <div className="w-4/5">
                <Form/>
                <div>
                    <table>
                        <thead></thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </React.StrictMode>
)