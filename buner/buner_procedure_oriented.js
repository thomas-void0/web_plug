// 面向过程的写法
window.onload=()=>{
    play()
}
// 1，实现点击左右两个箭头图片滑动
// 获取元素
let but_left = document.getElementById("prev");
let but_right = document.getElementById("next");
let list_box = document.getElementsByClassName("img_box")[0];
let container = document.getElementsByClassName("container")[0];
//给元素绑定点击事件，点击执行移动图片盒子位置的的函数 =====bug
const move_box = (distance)=>{
    // 获取当前图片盒子距离左边的距离
    let dis_left = parseInt(list_box.style.left)+ distance;
    list_box.style.left = dis_left + "px";
    // 当距离小于-4800的时候，后面就只有一张辅助图片了，这个时候就要使图片从-600的位置再次启动，
    if(dis_left<-4800){
        list_box.style.left = -600 + "px";
    }
    //当距离大于-600的时候,后面就只有一张辅助图片了，所以要使图片反过来,方法是使这个时候的图片成为最后一张图片的位置
    if(dis_left>-600){
        list_box.style.left = -4800 + "px";
    }
}
/** 
 * 左边的按钮 
 * 点击左边的按钮实际图片盒子应该是朝右边移动，所以应该是让left-distance 
 * 所以我们应该传入的是负值
*/
var index = 1 //初始化一个全局默认值
but_left.onclick=()=>{
    index-=1
    if(index<1){
        index=8
    }
    btn_move()
    move_box(600)
}
/** 
 * 右边的按钮 
 * 点击右边的按钮实际图片盒子应该是朝右边移动，所以应该是让left+distance 
 * 所以我们应该传入的是正值
*/
but_right.onclick=()=>{ 
    index+=1 //因为我们的定时器在不断的模拟左边按钮的点击，所以index会一直递增下去，我们只有8个小圆点，所以需要做出判断
    if(index>8){
        index=1;
    }
    btn_move() //调用函数
    move_box(-600)
}
/** 
 * 让轮播自动执行
 * 设置一个定时器，定时模拟按钮的点击事件
*/
let timer;
let play = ()=>{
    timer = setInterval(()=>{
        but_right.onclick()  //模拟按钮的点击事件
    },1000)
}
/** 
 * 当用户鼠标进入到容器盒子中的时候，清楚掉定时器
 * 当用户鼠标移出容器盒子的时候，启动定时器
 * 1,给容器盒子绑定鼠标移入事件
 * 2,给容器盒子绑定鼠标移出事件
*/
container.onmouseover=()=>{
    clearInterval(timer)
    but_left.style.display="inherit";
    but_right.style.display="inherit";
}
container.onmouseout=()=>{
    but_left.style.display="none";
    but_right.style.display="none";
    play()
}
/** 
 * 实现对应菜单的按钮跟随图片的移动而移动
 * 1,获取到小圆点按钮
 * 2,清楚小圆点原本的选中样式
 * 3,根据索引值给新的小圆点赋值上样式
 * 4,这个时候回到之前所写的按钮点击函数中
 * 根据点击改变index的值，实现小圆点的动态改变
 * */ 
let buttons = document.getElementsByClassName("button")[0].getElementsByTagName("span");
let btn_move=()=>{
    for(let i in buttons){
        if(buttons[i].className == "active"){
            buttons[i].className = " ";
        }
        buttons[index-1].className="active";
    }
}
/** 
 * 实现点击对应的菜单按钮跳转到对应的图片
 * */ 
for(let i in buttons){
    buttons[i].onclick=()=>{ //实现了点击哪一个就出现哪一个的索引值
        // 获取到点击元素的index的值
        let click_index  = parseInt(buttons[i].getAttribute("index"));
        let distance = 600*(index - click_index)
        move_box(distance)
        index = click_index
        btn_move()
    }
}
