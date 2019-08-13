// ===============================================定义全局变量 ======================================
DATA=null;//接收接口请求到的数据
START=null;//数组截取的开始索引值
END=null;//数组截取的最后索引值
DATAARR = null;// 定义一个数组,接收处理过后的数据 
FLAG = null;
// ===============================================请求接口数据 ======================================
// 1，请求对象
let obj ={
	method:"post",
	url:"http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1",
	data:{
		id:1
	},
	async:true
}
// 2，请求成功后调用的函数
let successFn = (res)=>{
    DATA = JSON.parse(res);
    DATA = DATA.result;
    dom(DATA);
}
// 3，请求失败后调用的函数
let errorFn = ()=>{
	console.log("请求失败");
}
// 4，调用http接口请求函数
httpRequest(obj,successFn,errorFn);
// ===============================================根据数据量渲染按钮数目以及绑定点击事件 =====================
let numberBtn = document.getElementById("numberBtn");
let dom = (DATA)=>{
    // 根据数据渲染按钮个数
    let len = DATA.length / 4; //每页显示的数目为4
    for(let i=0;i<len;i++){
        let li = document.createElement("li");
        li.innerHTML=i+1;
        li.setAttribute("index",i);
        numberBtn.appendChild(li);
    }
    // 给按钮绑定点击事件
    let liBtn = numberBtn.getElementsByTagName("li");
    liBtn = Array.from(liBtn);
    liBtn.forEach(element => {
        element.onclick=()=>{
            let index = parseInt(element.getAttribute("index"));
            START = index+3*index;
            END = (index+3*index) + 4;
            changeDataArr(START,END);
        }
    });
    if(DATAARR==null){
        liBtn[0].onclick(); //默认显示第一页的数据
    }
    // 给前后按钮绑定点击事件
    let button = document.getElementsByTagName("button");
    let pre = button[0];
    let next = button[1];
    pre.onclick=()=>{
        START -= 4;
        END -=  4;
        if(START < 0){
            START = 0;
            END = 4;
            alert("已经是最前的一页了！")
        }
        changeDataArr(START,END);
    }
    next.onclick=()=>{
        START += 4;
        END +=  4;
        if(END > DATA.length){
            START = DATA.length - 4;
            END = DATA.length;
            alert("已经是最后的一页了！")
        }
        changeDataArr(START,END);
    }
}
// ===========================================点击事件触发后，改变需要渲染的数组，然后渲染数据=====================
// 修改数据数组
let changeDataArr = (START,END)=>{
    DATAARR = DATA.slice(START,END);
    displayData(DATAARR);//调用函数渲染数据
}
// 渲染数据的函数
let displayData = (dataArr)=>{
    // 渲染之前要清楚掉原本的dom标签
    if(FLAG == 1){
        let husa = table.getElementsByTagName("tr");
        husa = Array.from(husa);
        husa = husa.slice(1,husa.length);
        for(let i in husa){
            if(typeof husa[i] !== "function" && typeof husa[i] !== "number"){
                table.removeChild(husa[i]);
            }
        }
    }
    // 渲染数据
    for(let i in dataArr){
        let tr = document.createElement("tr");
        for(let j=0;j<3;j++){
            let td = document.createElement("td");
            switch (j) {
                case 0:
                    td.innerHTML=dataArr[i].aid;
                    break;
                case 1:
                    td.innerHTML=dataArr[i].title;
                    break;
                case 2:
                    td.innerHTML=dataArr[i].dateline;
                    break;        
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    FLAG = 1;
}
