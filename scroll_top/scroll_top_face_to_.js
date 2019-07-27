// ==================面向过程 =====================
let box_div = document.getElementById("box");
let timer;
box_div.onclick=()=>{
    timer = setInterval(()=>{
        console.log("111");
        document.documentElement.scrollTop -= 100;
    },50);
}
document.addEventListener("scroll",()=>{
    let scroll_distace = document.documentElement.scrollTop;
    if(scroll_distace > 200){
        box_div.style.display="inherit";
    }
    else{
        box_div.style.display="none";
    }
    if(scroll_distace <= 10){
        clearInterval(timer);
    }
});