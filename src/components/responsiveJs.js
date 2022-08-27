/**
 * Copyright 2022 BRUCE YU DESIGN
 */

'use strict';

/**
 * @param { Node } element
 * @param { Function } defaultFunction
 * @param { Array } breakPoint
 * @param { Number } width
 * @param { Function } breakPointFunction
 */

export default class responsiveJs {

    constructor({
        element: element,
        defaultFunction: defaultFunction,
        breakPoint: breakPoint = [
            {
                width: width,
                breakPointFunction: breakPointFunction
            }
        ]
    }) {
        this.element = element;
        this.defaultFunction = defaultFunction;
        this.breakPoint = breakPoint;

        this.len = breakPoint.length;
        this.memory; // 記憶目前斷點

        // 由小到大
        this.breakPoint.sort((a, b) => a.width < b.width ? -1 : 1);

        window.addEventListener('load', () => this.getBreakPoint(this.element.offsetWidth));
        window.addEventListener('resize', () => this.getBreakPoint(this.element.offsetWidth));
    }

    // 判斷斷點
    getBreakPoint(elementWidth) {
        let target = 0;

        // 取得斷點
        while (target < this.len) {
            if (elementWidth >= this.breakPoint[target].width) {
                target++;
            } else {
                break;
            }
        };

        // 避免重複執行
        if (this.memory !== target) {
            this.memory = target;
            this.doResponsive(target);
        };
    };

    // 執行切版
    doResponsive(target) {
        if (target > 0) {
            this.breakPoint[target - 1].breakPointFunction();
        } else {
            this.defaultFunction();
        };
    };
};