import React from "react";
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

import '../main.css';
import Main from "../components/main.jsx";

document.title = '帳號管理';
const element = (
    <ul>
        <li>
            test
        </li>
        <li>
            test
        </li>
        <li>
            test
        </li>
        <li>
            test
        </li>
        <li>
            test
        </li>
    </ul>
);

ReactDOM.createRoot( document.getElementById( 'wrapper' ) ).render(
    <React.StrictMode>
        <Main code={ element }/>
    </React.StrictMode>
)