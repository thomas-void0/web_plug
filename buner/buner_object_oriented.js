
/** 
 * 参数：
 * container:代表轮播的容器盒子
 * img_arr:代表的是图片的地址数组
 *          例如img_arr=["imgage/1.jpg","image/2.jpg"];
 * img_width:代表的是轮播图片的宽度 
 * img_height:代表的是轮播图片的高度 
 * api：
 * play(time):time表示的是轮播播放的间隔时间，单位为ms
 *          例如play(1000)
*/
// 新建一个构造函数
function Buner(container,img_arr,img_width,img_height){
    this.container = container;//指定轮播的容器
    this.container.style.height = img_height+"px";
    this.container.style.width = img_width +"px";
    this.img_arr = img_arr; //传入图片的数据，以数组的方式传入
    this.img_width = img_width || 600; //指定图片的宽度
    this.img_height = img_height || 400;//指定图片的高度
    this.create_dom(); //创建页面dom元素
    this.child = this.container.childNodes;
    this.click();//绑定左右箭头的点击事件
    this.mouse();//绑定鼠标移动事件，以显示左右箭头
    this.timer = null;
    this.INDEX = 1;
    this.click_point();//调用小圆点点击函数
}
//创建页面的元素
Buner.prototype.create_dom=function(){
    //appendChild（）每次都是在移动div，所以要创建多个新的div进行添加
    // 创建div 
    let i = 0;
    while (i<4) {
        if(i<2){
            let div_box = document.createElement("div");
            this.container.appendChild(div_box); //将创建的div加入到容器盒子中
        }else{
            let arrow_box = document.createElement("a");
            this.container.appendChild(arrow_box); //将创建的a加入到容器盒子中
        }
        i++;
    }
    // 给创建出来的元素分配属性
    let len = this.img_arr.length + 2;
    let child = this.container.childNodes;
    child.forEach((element,index) => {
        switch(index){
            case 0:
                element.className = "img_box";
                element.style.left = -this.img_width + "px";
                element.style.width = len * this.img_width + "px";
                element.style.height = this.img_height + "px";
                break;
            case 1:
                element.className = "button";
                break;
            default:
                if(index == 2){
                    let left_logo = document.createTextNode("<");
                    element.appendChild(left_logo);
                    element.id="prev";
                }else{
                    let right_logo = document.createTextNode(">");
                    element.appendChild(right_logo);
                    element.id="next";
                }
                element.className = "arrow";
                element.href = "javascript:;"
                break;
        }
    });
    // 将子元素加入到对应的盒子中
    for(let k=0;k<len;k++){ //添加图片
        let img = document.createElement("img");
        img.style.width = this.img_width + "px";
        img.style.height = this.img_height + "px";
        img.alt = k+1;
        if(k==0){ //第一次的时候取的是最后一张图片
            img.src = this.img_arr[len-3];
        }else if(k==(len - 1)){ //最后一次循环的时候，取的是第一张图片
            img.src = this.img_arr[0]
        }
        else{
            img.src = this.img_arr[k-1]
        }
        // 将处理号的img标签添加到img_box中
       child[0].appendChild(img);
        // 添加小圆点
        if(k>1){
            let span = document.createElement("span");
            span.setAttribute("index",(k-1));
            if(k==2){
                span.className="active";
            }
            child[1].appendChild(span);
        }
    }
}
// 创建一个移动方法
Buner.prototype.move_img_box=function(distance){
    let dis_left = parseInt(this.child[0].style.left) + distance;
    let img_box_width = (this.img_arr.length + 1)*this.img_width;
    this.child[0].style.left = dis_left + "px";
    if(dis_left < -(img_box_width - this.img_width)){
        this.child[0].style.left = -this.img_width + "px";
    }
    if(dis_left > -this.img_width){
        this.child[0].style.left = -(img_box_width - this.img_width) + "px";
    }
}
// 创建左右两个箭头按钮
Buner.prototype.click=function(){
    this.child[2].onclick=()=>{
        this.INDEX--;
        if(this.INDEX<1){
            this.INDEX = this.img_arr.length;
        }
        //点击图片，图片位置向正移动 
        this.move_ponit();
        this.move_img_box(this.img_width);
    }
    this.child[3].onclick=()=>{
        this.INDEX++;
        if(this.INDEX>this.img_arr.length){
            this.INDEX = 1;
        }
        //点击图片，图片位置向负移动 
        this.move_ponit();
        this.move_img_box(-this.img_width);
    }
}
// 创建移动函数，进入到监听函数中 
Buner.prototype.mouse=function(){
    this.container.onmouseover=()=>{
        this.child[2].style.display = "inherit";
        this.child[3].style.display = "inherit";
        clearInterval(this.timer);
    }
    this.container.onmouseout=()=>{
        this.child[2].style.display = "none";
        this.child[3].style.display = "none";      
        this.play(this.get_time);
    }
}
//创建自动播放函数
Buner.prototype.play=function(get_time){
    let time;
    this.get_time = get_time;
    this.get_time ? (time = this.get_time) : 1000;
    this.timer = setInterval(()=>{
        this.child[3].onclick();
    },time)
}
// 使小圆点根据图片移动
// 给一个全局的变量，左右箭头点击的时候就取改变这个全局的值，根据全局的索引添加对应的active
Buner.prototype.move_ponit=function(){
    let spans = this.child[1].childNodes;
    // 清楚掉active样式
    spans.forEach(item=>{
        if(item.className == "active"){
            item.className = " ";
        }
        spans[this.INDEX - 1].className = "active";
    })
}
// 实现点击小圆点跳转到对应的图片
Buner.prototype.click_point=function(){
    let spans = this.child[1].childNodes;
    spans.forEach(item =>{
        item.onclick=()=>{
            // 获取到点击的圆点的index的值
            let click_index = parseInt(item.getAttribute("index"));
            let distance = this.img_width * (this.INDEX - click_index);
            this.move_img_box(distance);
            this.INDEX = click_index;
            this.move_ponit();
        }
    })
}
// 新建实例
let container = document.getElementsByClassName("container")[0];
let img_arr = ["./img/1.jpg","./img/2.jpg","./img/3.jpg"];
let husa = new Buner(container,img_arr,1200,500);
husa.play(1000);//调用自动播放函数,传入时间
