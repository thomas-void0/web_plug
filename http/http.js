// 原生js请求数据
function httpRequest(obj,successFn,errorFn){
	// 新建请求实例
	let xmlHttp = null;
	if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest;
	}else if(window.ActiveXObject){
		// 为了兼容ie5和ie6
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// 判断浏览器是否支持请求
	if(xmlHttp == null){
		alert("您的浏览器不支持xmlHttp请求");
		return;
	}
	// 将输入的请求方式转换为大写
	let httpMethod = (obj.method || "GET").toUpperCase();
	// 请求的地址
	let httpUrl = obj.url || "";
	// 请求的方式是同步还是异步
	let async = obj.async || true;
	// post请求传递过来的参数
	let requestData = null;
	if(httpMethod == "POST"){
		// data是传递的参数
		let data = obj.data || {};
		for(let key in data){
			requestData = requestData + key + "=" +data[key] + "&";
		}
		if(requestData == ""){
			requestData = ""
		}else{
			requestData = requestData.substring(0,requestData.length - 1);
		}
	}
	// 请求 
	if(httpMethod == "GET"){
		xmlHttp.open("GET",httpUrl,async);
		xmlHttp.send(null)
	}else if(httpMethod == "POST"){
		xmlHttp.open("POST",httpUrl,async);
		xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlHttp.send(requestData);
	}
	// 进行数据请求，判断是否请求成功
    xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState == 4){
            if(xmlHttp.status == 200){
                // 请求成功
                successFn(xmlHttp.responseText);
            }else{
                // 请求失败
                errorFn();
            }
        }
    }
}
// 请求对象
let obj ={
	method:"post",
	url:"http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1",
	data:{
		id:1
	},
	async:true
}
// 成功的函数
let successFn = (res)=>{
	let data = JSON.parse(res);
	// console.log(data);
	for(let i in data.result){
		document.write(data.result[i].title);
	}
}
// 失败的函数
let errorFn = ()=>{
	console.log("请求失败");
}
httpRequest(obj,successFn,errorFn);