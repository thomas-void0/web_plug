let container = document.getElementById("container");
let but = container.getElementsByTagName("p");
let list = container.getElementsByTagName("ul");
buts = Array.from(but);
lists = Array.from(list);
// 遍历绑定点击事件
for(let i = 0;i<buts.length;i++){
    buts[i].onclick = ()=>{//点击标题后
        // 将所有的子菜单收起来
        lists.forEach(element=>{
            animate(element,{height:0});
        });
        // 将对应的子菜单显示出来,如果点击的那个等于0，阻止多次执行
        if(parseInt(getStyle(lists[i],"height")) == 0){
            animate(lists[i],{height:60});
        }else{
            animate(lists[i],{height:0});
        }
    }
}
// 动画效果
const animate = (obj,json)=>{
    // 清楚上一次定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(()=>{
        // 记录一个状态值
        let flag = true;
        for(let arrt in json){
            // 计算步长 步长 = 目标位置 - 当前的位置----不断的取获取
            let step = (json[arrt] - parseInt(getStyle(obj,arrt))) / 5;
            // 对步长进行取整
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            // 盒子移动：盒子现在的位置 + 步长取整
            obj.style[arrt] = parseInt(getStyle(obj,arrt)) + step + "px";
            // 不满足条件
            if(parseInt(getStyle(obj,arrt)) != json[arrt]){ //如果现在的位置还不等于目标位置，那么就继续执行下去
                flag = false;
            }
        }
        if(flag){ //清楚定时器
            clearInterval(obj.timer);
        }
    },20)
}
// 获取css样式
const getStyle = (obj,arrt)=>{
    //兼容ie浏览器
    return obj.currentStyle ? obj.currentStyle[arrt] : getComputedStyle(obj,null)[arrt];
}