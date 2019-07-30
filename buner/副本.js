// 获取元素
let g = (value)=>{
    let obj;
    let str;
    if(value.indexOf("#")!=-1){
        str = value.substring(1,value.length);
        obj = document.getElementById(str);
    }else if(value.indexOf(".")!=-1){
        str = value.substring(1,value.length);
        obj = document.getElementsByClassName(str);
    }else{
        obj = document.getElementsByTagName(value);
    }
    return obj;
}
let container = g(".container")[0];
let img_box = g(".img_box")[0];
let left_arrow = g("#prev");
let right_arrow = g("#next");
let buttons = g("span");
// 定义一个盒子移动函数
let move_box=(distance)=>{
    // 获取盒子定位左边的距离
    let dis_left = parseInt(img_box.style.left);
    let new_distance = dis_left + distance;
    // 设置新的left距离
    img_box.style.left = new_distance + "px";
    // 进行距离检测
    if(new_distance<-4800){
        img_box.style.left = -600 + "px";
    }
    if(new_distance>-600){
        img_box.style.left = -4800 + "px";
    }
}
var INDEX = 1; //定义一个全局的变量
// 点击左右按钮移动图片 
left_arrow.onclick=()=>{
    INDEX--;
    if(INDEX<1){
        INDEX = 8;
    }
    point_move() //调用移动函数
    move_box(600)
}
right_arrow.onclick=()=>{
    INDEX++;
    if(INDEX>8){
        INDEX = 1;
    }
    point_move()
    move_box(-600)
}
// 实现图片的自动移动 
let timer;
const auto_move=()=>{
    timer=setInterval(()=>{
        right_arrow.onclick(); //模拟点击右边的箭头
    },1000)
}
auto_move();
//实现滑入盒子显示左右的点击按钮
container.onmouseover=()=>{
    left_arrow.style.display="inherit";
    right_arrow.style.display="inherit";
    clearInterval(timer);//清楚定时器
}
container.onmouseout=()=>{
    left_arrow.style.display="none";
    right_arrow.style.display="none";
    auto_move();
}
// 实现小圆点跟随图片移动
const point_move = ()=>{
    //遍历清楚小圆点被选中的样式
    for(let i in buttons){
        if (buttons[i].className == "active"){
            buttons[i].className = " ";
        }
        // 给当前的小圆点加上样式
        buttons[INDEX - 1].className = "active";
    }
}
// 实现点击小圆点就跳转到对应的图片
for(let i in buttons){
    buttons[i].onclick=()=>{
        //点击的是哪一个小圆点，
        let click_index = parseInt(buttons[i].getAttribute("index"));
        let distance = 600*(INDEX - click_index);
        move_box(distance);
        INDEX = click_index;//让小圆点样式改变到这个点击的小圆点
        point_move();
    }
}