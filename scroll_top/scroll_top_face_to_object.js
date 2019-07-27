window.onload=()=>{//页面加载的时候执行
    let box_div = g("box");
    // 新建实例
    let top_button =  new Scroll_top(box_div);
    // 调用函数
    top_button.start_scroll();
}
function Scroll_top(box){ //不能使用箭头函数
    this.box=box;
    this.timer=null;
}
Scroll_top.prototype.start_scroll=()=>{
     //监听滚动条
    document.addEventListener("scroll",()=>{
        let scrollDistance = document.documentElement.scrollTop;// 获取滚动条移动的距离 
        if(scrollDistance>=200){
            this.box.style.display="inherit"; //将滚动条显示出来
        }else{
            this.box.style.display="none";
        }
        if(scrollDistance<=10){
            clearInterval(this.timer);
        }
    });
    // 绑定点击事件----点击之后就返回顶部
    this.box.onclick=()=>{
        this.timer = setInterval(()=>{
            document.documentElement.scrollTop-=100;
        },50)
    }
};
let g = id =>{
    return document.getElementById(id);
}

