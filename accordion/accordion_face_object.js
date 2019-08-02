function Accordion(box,titles,lists){
    this.box = box;
    this.titles = titles;
    this.lists = lists;
}
Accordion.prototype.titleClick=function(distance){
    for(let i in this.titles){
        this.titles[i].onclick=()=>{
            // 点击以后，先清空其他菜单的高度 
            for(let j in this.lists){
                this.animate(this.lists[j],{height:0});//调用动画函数
            }
            // 判断点击的哪一个元素的高度是不是为0
            if(parseFloat(getStyle(this.lists[i],"height"))==0){
                this.animate(this.lists[i],{height:distance})
            }else{
                this.animate(this.lists[i],{height:0})
            }
        }
    }
}
Accordion.prototype.animate=function(obj,json){
    // 为防止抖动，将定时器绑定到元素本身的身上
    //因为传递进来的dom元素都被绑定了一个定时器，
    // 在这里可以清楚掉其之前的那个定时器，然后进行重新绑定
    clearInterval(obj.timer);
    if(typeof obj == "object"){
        obj.timer = setInterval(()=>{
            // 定义一个开关
            let flag = true;
            for(let attr in json){
                // 计算步长 = 目标 - 当前
                let step = (json[attr] - parseInt(getStyle(obj,attr)))/5;
                // 对步长取整数 
                step>0 ? step = Math.ceil(step) : step = Math.floor(step);
                // 让标签盒子高度增加 = 当前 + 取整后的步长
                obj.style[attr] = parseInt(getStyle(obj,attr)) + step + "px"; 
                // 如果不满足条件就继续执行定时器
                if(parseInt(getStyle(obj,attr)) !== json[attr]){
                    flag = false;
                }
            }
            // 清楚定时器
            if(flag){
                clearInterval(obj.timer);
            }
        },20)
    }
}
const getStyle=(obj,attr)=>{
    console.log("husa")
     return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,null)[attr];
}
const g =(value)=>{
    return document.getElementById(value);
}
// 新建实例
let box = g("container");
let titles = box.getElementsByTagName("p");
let lists = box.getElementsByTagName("ul");
let acc = new Accordion(box,titles,lists);
console.log(acc,titles,lists)
acc.titleClick(60);//调用,传入距离