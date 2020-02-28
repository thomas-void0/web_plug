"use strict";
class Move {
    constructor(moveBox) {
        this.moveBox = moveBox;
        this.mouseX = 0;
        this.mouseY = 0;
        this.domX = 0;
        this.domY = 0;
    }
    //css样式检测
    checkTransform() {
        const divStyle = document.createElement("div").style;
        const transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'];
        const result = transformArr.find((item) => (item in divStyle));
        return result ? result : "";
    }
    //获取对应css属性的属性值
    getStyle(element, property) {
        const windowObj = document.defaultView;
        if (windowObj) {
            const getComStyle = windowObj.getComputedStyle;
            return getComStyle(element, false)[property];
        }
        else {
            return "";
        }
    }
    //得到元素初始化的位置
    getTargetPos(element) {
        let pos = { x: 0, y: 0 };
        // 判断元素支持的css属性
        const transform = this.checkTransform();
        if (transform) {
            //获取transform属性的值
            const transformValue = this.getStyle(element, transform);
            if (transformValue === "none") {
                element.style[transform] = 'translate(0,0)';
                return pos;
            }
            else {
                const temp = transformValue.match(/-?\d+/g);
                return pos = {
                    x: parseInt(temp[4].trim()),
                    y: parseInt(temp[5].trim())
                };
            }
        }
        else {
            // 检测其是否存在position属性
            const position = this.getStyle(element, 'position');
            if (position === "static") {
                element.style.position = "relative";
                return pos;
            }
            else {
                const left = this.getStyle(element, 'left');
                const top = this.getStyle(element, 'top');
                const x = parseInt(left ? left : "0");
                const y = parseInt(top ? top : "0");
                return pos = { x, y };
            }
        }
    }
    //设置元素位置
    setTargetPos(element, pos) {
        //检测支持的css写法
        const transform = this.checkTransform();
        if (transform) {
            element.style[transform] = `translate(${pos.x}px,${pos.y}px)`;
        }
        else {
            element.style.left = pos.x + "px";
            element.style.top = pos.y + "px";
        }
    }
    //设置事件
    setDrag() {
        const _that = this;
        _that.moveBox.addEventListener("mousedown", start, false);
        //鼠标按下事件
        function start(event) {
            //获取当前鼠标的初始化位置
            _that.mouseX = event.pageX;
            _that.mouseY = event.pageY;
            //获取当前元素的初始化位置
            const pos = _that.getTargetPos(_that.moveBox);
            _that.domX = pos.x;
            _that.domY = pos.y;
            // 绑定监听事件
            document.addEventListener('mousemove', move, false);
            document.addEventListener('mouseup', end, false);
        }
        //鼠标移动事件
        function move(event) {
            //计算步长 = 当前位置 - 初始位置
            const distanceX = event.pageX - _that.mouseX;
            const distanceY = event.pageY - _that.mouseY;
            //设置移动位置
            _that.setTargetPos(_that.moveBox, {
                x: parseInt((distanceX + _that.domX).toFixed()),
                y: parseInt((distanceY + _that.domY).toFixed())
            });
        }
        //鼠标抬起
        function end() {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", end);
        }
    }
    // 初始化
    init() {
        this.setDrag();
    }
}
const box = document.getElementById("target");
const oMove = new Move(box);
oMove.init();
