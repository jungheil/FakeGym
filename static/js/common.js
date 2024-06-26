/**
 * 全局项目路径
 */
var ctxpath = $('#contextPath').val();//getProjectName();
var localObj = window.location;
var contextPath = localObj.pathname.split("/")[1];

var ctrlSuffix = $('#ctrlSuffix').val();//'.html';
/**
 * 得到项目发布名称
 */
// 得到项目发布的名称
function getProjectName() {
	var pathName = window.document.location.pathname;
	var projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);
	return projectName;
}

/**
 * 强制保留两位小数，如：2，会在2后面补上00.即2.00   四舍五入
 * @param x
 * @returns
 */
function toDecimal2(x){
	x.toFixed(2);
//	Math.round(x * 100) / 100;
}
/**
 * 创建请求项目路径
 * 
 * @param url
 * @returns {String}
 */
function cu(url) {
	// return ctxpath + '/ht' + url + ctrlSuffix;
	return $('#contextPath').val() + url + $('#ctrlSuffix').val();
}
function webcu(url) {
	return $('#contextPath').val() + url + $('#ctrlSuffix').val();
}

function logout() {
	/******************************************************/
	/*-------------------start----------------------------*/
	/******************************************************/
	location.replace(cu('/logout'));
	//单点登录打开这行注释掉上一行
//	location.replace(cu('/logout/cas'));
	/******************************************************/
	/*---------------------end----------------------------*/
	/******************************************************/
}
function login() {
	location.replace(cu('/login/pre'));
}


function join(o,serviceid) {
	var param = {};
	if ($(o).find(".icon").hasClass("icon-heart-o")) {
		param.status = 1;
	} else {
		param.status = 0;
	}
	param.flag="0";
	param.serviceid = serviceid;
	AjaxPost('/custom/setcustom', param, function(r){
		if (r.result == "1") {
			if (r.object.status == 1){
//				info("关注成功！");
				$(o).find(".a").addClass("text-danger")
				$(o).find(".icon").removeClass("icon-heart-o").addClass("icon-heart");
			} else {
//				info("取消成功！");
				$(o).find(".a").removeClass("text-danger")
				$(o).find(".icon").removeClass("icon-heart").addClass("icon-heart-o");
			}
		} else if (r.result == "0") {
			info("关注失败,稍后请重试!");
		} else if(r.result=="2") {
			info("商户不能关注，请切换用户!");
		} else {
			info("已关注请勿重复关注!");
		}
	});
}


function getNowFormatDate(date) {
//  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
/**
 * 异步获取网页数据请求
 * 
 * @param url
 *            请求页面地址
 * @param postData
 *            请求页面参数
 * @param successFunc
 *            完成后回调函数
 * @param dataType
 *            请求返回类型 html
 * @param errorFunc
 *            失败后回调函数 默认可以不填
 */
function AjaxGet(url, postData, successFunc, dataType, errorFunc,async) {
	loadding();
	$.ajax({
		url : cu(url),
		data : postData,
		type : 'get',
		dataType : dataType,
		async : typeof(async)=='undefined'?false:async,
		success : function(data) {
			closeloading();
			if (data) {
				successFunc(data);
			}
		},
		error : function(xhr) {
			closeloading();
			if (xhr) {
				if (errorFunc)
					errorFunc(xhr);
				else
					info(xhr.status + ":" + xhr.statusText);
				;
			}
		}
	});
}
/**
 * 正在加载
 */
function loadding() {
	var loaddinghtml = '<div class="mask bg-white"></div><div class="ball-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
	$("body").append(loaddinghtml);
}
/**
 * 关闭正在加载
 */
function closeloading() {
	$('.bg-white, .ball-spin-fade-loader').remove();
}
/**
 * 异步请求
 * 
 * @param url
 *            请求的地址
 * @param postData
 *            请求的数据
 * @param successFunc
 *            完成请求后回调函数
 * @param errorFunc
 *            错误回调函数 默认可以不填
 */
function AjaxPost(url, postData, successFunc, errorFunc) {
	loadding();
	if (postData == null)
		postData = {
			json : true
		};
	else
		postData.json = true;
	$.ajax({
		url : cu(url),
		data : postData,
		type : 'post',
		dataType : 'json',
		success : function(data) {
			closeloading();
			if (data.message) {
				if (data.message.indexOf('REQUESTERROR') != -1) {
					// 出错页面
					$('body').html(msg);
				} else if (data.message.indexOf('USERNOTLOGINYET') != -1) {
					// session超时页面
					// window.open(ctxpath, "_self");
					
					/******************************************************/
					/*-------------------start----------------------------*/
					/******************************************************/
					
					//弹框登录时打开本行并注释下一行（单点登录时注释掉并打开下一行）
//					tominlogin(postData.logintype);
					window.location.href = cu('/login/pre')+'?continueurl='+data.object.continueurl;
					
					/******************************************************/
					/*---------------------end----------------------------*/
					/******************************************************/
//					showDialog(730, 344, 160, '登录', false, "");
				} else if(data.message.indexOf('NOTPRODUCT')!=-1){
					window.location.href=cu('/error/403');
				}else {
					if (typeof (successFunc) == "function") {
						successFunc(data);
					}
				}
			} else {
				if (typeof (successFunc) == "function") {
					successFunc(data);
				}
			}
		},
		error : function(xhr) {
			closeloading();
			if (xhr) {
				if (errorFunc) {
					errorFunc(xhr);
				} else {
					info(xhr.status + ":" + xhr.statusText);
				}
			}
		}
	});
}
function info(message) {
    swal({
      title: '提示信息',
      text: message,
      type: 'info',
      confirmButtonText: '确定'
    })
}

function waringM(yfun,param){
	
	swal({ 
		  title: '确定取消？', 
		  showCancelButton: true, 
		  confirmButtonText: "是", 
		  cancelButtonText: "否",
		  closeOnConfirm: true, 
		  closeOnCancel: true,
		  html: true
		},
		function(isConfirm){ 
		  if (isConfirm) {
			  clickFunName1(yfun,param);
		  }
	});
}


function findWeek(date){
	var weekDay = ["周天", "周一", "周二", "周三", "周四", "周五", "周六"];
	return weekDay[new Date(date.replace(/\-/g,"\/")).getDay()];
}




function initConfirmDialog(ids){
	$('.'+ids).each(function(i,k){
		var a = $(k).attr('onclick');
		$(k).attr('onclick',"confirmDialog(\""+a+"\")");
		
	})
}
function confirmDialog(yfun){
	swal({ 
		  title: $('#confirmBtHtml').html(), 
		  text: $('#confirmNrHtml').html(),
		  showCancelButton: true, 
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "同意", 
		  cancelButtonText: "不同意",
		  closeOnConfirm: true, 
		  closeOnCancel: true,
		  html: true
		},
		function(isConfirm){ 
		  $(".showSweetAlert p:eq(0)").removeClass('sweet-confirm');
		  $(".showSweetAlert").removeClass('sweet-showSweetAlert');
		  if (isConfirm) {
			  clickFunName(yfun);
		  }
	});
//	alert($(document.body).height());
//	alert($(document).height());
//	alert($(window).height());
//	alert($(".showSweetAlert p:eq(0)").html());
//	$(".showSweetAlert p:eq(0)").css('height','300px').css('overflow','auto');
	$(".showSweetAlert p:eq(0)").addClass('sweet-confirm');
	$(".showSweetAlert").addClass('sweet-showSweetAlert');
}













/**
 * 增加或者移除class属性的方法
 * @param idvalue
 */
function toggleClassTest(idvalue){  
	if($('#'+idvalue).length != 0){
		var obj = document.getElementById(idvalue);
		obj.style.display = "none";
		if(obj!=null){
			toggleClass(obj,"normal-button-mid button-info");  
		}
	}
}  
function toggleClass(obj,cls){  
    if(hasClass(obj,cls)){  
        removeClass(obj, cls); 
      
    }else{  
        addClass(obj, 'normal-button-mid button-disable');
        
    }  
} 
function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
}  
/**
 * 移除点击事件
 * @param idvalue
 */
function removeClick(idvalue){
	if($('#'+idvalue).length != 0){
		var obj = document.getElementById(idvalue); 
		 if(obj!=null){
			 obj.removeAttribute('onclick');
		 }
	}
}
function showDialog(width, left, top, title, foot, data, fun,height) {
	var html = "<div id=\"dlg\" class=\"dialog fade\" style=\"width:" + width
			+ "px;margin-left:-" + left + "px;margin-top:-" + top + "px;\">";
	if (title) {
		html += "<div class=\"dialog-head\"><a class=\"close\" onclick=\"closeed();\"><i class=\"icon icon-del\"></i></a><span class=\"title\">"
				+ title + "</span></div>";
	}
	if(height)
		html+="<div class=\"dialog-content\" style=\"height:"+height+"px\">";
	else
		html += "<div class=\"dialog-content\">";
	html += data;
	html += "</div>";
	if (foot) {
		html += "<div class=\"dialog-foot\">";
		html += "<button class=\"normal-button-mid button-info\" onclick=\""
				+ fun + "();\">&nbsp;&nbsp;保存&nbsp;&nbsp;</button>";
		html += "<button class=\"normal-button-mid button-danger\" onclick=\"closeed();\">取消</button>";
		html += "</div>";
	}
	html += "</div>";
	$("body").append(html);
	$("body").append("<div class='bodymask fade' id='bodymask'></div>");
	$("#dlg").show().addClass("in");
	$("#bodymask").addClass("in");
}

/**
 * 首字母大写
 * @param str
 * @returns
 */
function firstUpperCase(str) {
	return str.toLowerCase().replace(/^\S/g,function(s){return s.toUpperCase();});
}
/**
 * 根据方法名调用
 * @param fn
 * @param args
 * @returns
 */
function clickFunName1(fn,args){ 
    try {
        fn = eval(fn+'('+args+')');
    } catch(e) {
        console.log(e);
        alert(fn+'方法不存在！');
    }
    if (typeof fn === 'function'){
        return fn; 
    }    
}

function clickFunName(fn,args){ 
    try {
        fn = eval(fn);
    } catch(e) {
        console.log(e);
        alert(fn+'方法不存在！');
    }
    if (typeof fn === 'function'){
        return fn; 
    }    
}



function getCookie(name) {
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	} else{
		return null;
	}
}
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
//使用示例
//如果需要设定自定义过期时间
//那么把上面的setCookie　函数换成下面两个函数就ok;
//程序代码
function setCookie(name,value,time) {
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec*1);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getsec(str) {
	var str1=str.substring(1,str.length)*1;
	var str2=str.substring(0,1);
	if (str2=="s") {
		return str1*1000;
	} else if (str2=="h") {
		return str1*60*60*1000;
	} else if (str2=="d") {
		return str1*24*60*60*1000;
	}
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
function checkPhone(t) {
	//验证电话号码手机号码，包含至今所有号段? ?
    var ab = /^[1][3,4,5,7,8][0-9]{9}$/;
    var cd=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    if (ab.test($(t).val()) == false&&cd.test($(t).val())==false) {
        info("请正确填写手机号码!");
        $(t).val("");
        $(t).focus()
        return false;
    }
}