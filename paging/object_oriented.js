function Page(data_arr,table,pre,next,page_num){
    this.data_arr = data_arr;//传入数据数组
    this.len = data_arr.length;
    this.table = table;//显示数据的表格
    this.page_num = page_num;
    this.btnBox = document.getElementById("numberBtn");//数字页码的盒子
    this.new_data_arr = this.data_arr.slice(0,this.page_num+1)//每一页显示的数据的数组
    this.pre=pre;//上一步按钮
    this.next=next;//下一步按钮
    this.number_btn=[];//数字按钮
    // 初始化状态值，数组的开始和结束索引值
    this.flag = null;
    this.start = 0;
    this.end = this.page_num+1;
    this.renderNumBtn();//渲染页码按钮
    this.click();//绑定点击事件
    this.changeDataArr();//默认执行一次渲染
}
// 渲染按钮
Page.prototype.renderNumBtn=function(){
    let num = parseInt(this.len/this.page_num);
    for(let i=0;i<num;i++){
        let li = document.createElement("li");
        li.setAttribute("index",i);
        li.innerHTML = i+1;
        this.number_btn.push(li);//加入到按钮数组中
        this.btnBox.appendChild(li);
    }
}
// 绑定点击事件
Page.prototype.click=function(){
    this.pre.onclick = ()=>{//上一页
        this.start -= this.page_num;
        this.end -= this.page_num;
        if(this.start < 0){
            this.start = 0;
            this.end = this.page_num;
            alert("已经是第一页了!");
        }
        this.changeDataArr();
    }
    this.next.onclick = ()=>{//下一页
        this.start += this.page_num;
        this.end += this.page_num;
        if(this.end>this.len){
            this.start = this.len - this.page_num;
            this.end = this.len;
            alert("已经是最后一页!")
        }
        this.changeDataArr();
    }
    for(let i in this.number_btn){//数字按钮
        this.number_btn[i].onclick=()=>{
            let index = parseInt(this.number_btn[i].getAttribute("index"));
            this.start = index + index*(this.page_num-1);
            this.end = index + index*(this.page_num-1) + this.page_num;
            this.changeDataArr();
        }
    }
}
// 每一页需要渲染的数据
Page.prototype.changeDataArr = function(){
    this.new_data_arr = this.data_arr.slice(this.start,this.end);
    this.renderTable();
}
// 渲染数据表格
Page.prototype.renderTable=function(){
    if(this.flag == 1){
        let tr_arr = this.table.getElementsByTagName("tr");
        tr_arr = Array.from(tr_arr);
        tr_arr = tr_arr.slice(1,tr_arr.length);
        for(let index in tr_arr){
            if(typeof tr_arr[index]!=="number" && tr_arr[index]!=="function"){
                this.table.removeChild(tr_arr[index]);
            }
        }
    }
    for(let i in this.new_data_arr){
        let tr = document.createElement("tr");
        for(let j=0;j<3;j++){
            let td = document.createElement("td");
            switch (j) {
                case 0:
                    td.innerHTML = this.new_data_arr[i].aid;
                    break;
                case 1:
                    td.innerHTML = this.new_data_arr[i].title;
                    break;            
                default:
                    td.innerHTML = this.new_data_arr[i].dateline;
                    break;
            }
            tr.appendChild(td);
        }
        this.table.appendChild(tr);
        this.flag = 1;
    }
}
// 获取数据并且新建实例
const func = ()=>{
    return new Promise((resolve,rej)=>{
        // 请求数据
        let obj ={
            method:"post",
            url:"http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1",
            data:{
                id:2
            },
            async:true
        }
        // 请求成功后调用函数
        let data=[];
        let successFn = (res) =>{
            data = JSON.parse(res);
            data = data.result;
            resolve(data);
        }
        let errorFn=()=>{
            console.log("数据请求失败");
        }
        httpRequest(obj,successFn,errorFn);
    })
}
func().then((data)=>{
        // 新建实例
        let table = document.getElementById("table");
        let buttons = document.getElementsByTagName("button");
        new Page(data,table,buttons[0],buttons[1],5);
    })

