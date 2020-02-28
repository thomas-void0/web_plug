"use strict";
//1，判断浏览器是否支持transform
const checkTransform = () => {
    //创建一个div元素,并且获取其style属性
    const divStyle = document.createElement("div").style;
    //几种transform的兼容性的写法
    const transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'];
    //遍历查找,并且返回符合的css写法
    const result = transformArr.find((item) => (item in divStyle));
    return result ? result : "";
};
//2, 获取元素对应的css属性
const getStyle = (element, property) => {
    const windowObj = document.defaultView;
    if (windowObj) {
        const getComputedStyle = windowObj.getComputedStyle;
        return getComputedStyle(element, false)[property];
    }
    else {
        return "";
    }
};
//3, 知道元素当前的初始化位置
const getTargetPos = (element) => {
    let pos = { x: 0, y: 0 };
    //判断当前浏览器是否支持transform
    const transform = checkTransform();
    if (transform) {
        //获取transform样式，返回一个2D变化矩阵
        const transformValue = getStyle(element, transform);
        if (transformValue === "none") {
            element.style[transform] = 'translate(0,0)';
            return pos;
        }
        else {
            const temp = transformValue.match(/-?\d+/g);
            return pos = {
                x: parseInt(temp[4].trim()),
                y: parseInt(temp[5].trim()),
            };
        }
    }
    else {
        //获取定位样式
        const position = getStyle(element, 'position');
        if (position === "static") {
            element.style.position = "relative";
            return pos;
        }
        else {
            const x = parseInt(getStyle(element, 'left') ? getStyle(element, 'left') : "0");
            const y = parseInt(getStyle(element, 'top') ? getStyle(element, 'top') : "0");
            return pos = { x, y };
        }
    }
};
//4，设置新的css样式达到移动的效果
const setTargetPos = (element, pos) => {
    //获取支持情况
    const transform = checkTransform();
    if (transform) {
        element.style[transform] = `translate(${pos.x}px,${pos.y}px)`;
    }
    else {
        element.style.left = pos.x + "px";
        element.style.top = pos.y + "px";
    }
};
//获取目标元素
const moveBox = document.getElementById("target");
// 设置鼠标的初始位置
let mouseX = 0;
let mouseY = 0;
//设置元素的初始位置
let domX = 0;
let domY = 0;
// 鼠标移动事件,改变元素位置
const move = (event) => {
    //获取鼠标当前的位置，减去鼠标初始化的位置，得出步长
    const distanceX = event.pageX - mouseX;
    const distanceY = event.pageY - mouseY;
    setTargetPos(moveBox, {
        x: Number((domX + distanceX).toFixed()),
        y: Number((domY + distanceY).toFixed())
    });
};
// 鼠标抬起事件
const end = (event) => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", end);
};
//鼠标点击的时候，做的工作
const start = (event) => {
    //获取鼠标的初始位置
    mouseX = event.pageX;
    mouseY = event.pageY;
    //获取元素的初始位置
    const pos = getTargetPos(moveBox);
    domX = pos.x;
    domY = pos.y;
    //绑定监听事件
    document.addEventListener('mousemove', move, false);
    document.addEventListener("mouseup", end, false);
};
moveBox.onmousedown = start;
