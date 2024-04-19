var label;
function collectThis(k) {
	label = $(k);
}


$(function () {
	$('.mescroll').css('top', $('#csstop').val());
	var vm = new Vue({
		el: "#proDataList",
		data: {
			mescroll: null,
			productionDataList: [],
		},
		mounted: function () {
			//创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
			//解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
			var self = this;
			//			alert(JSON.stringify(self));
			self.mescroll = new MeScroll("mescroll", {
				up: {
					callback: self.upCallback, //上拉回调
					//以下参数可删除,不配置
					page: { size: 8 }, //可配置每页8条数据,默认10
					toTop: { //配置回到顶部按钮
						src: ctxpath + "/themes/mobile/mescroll-master/demo/res/img/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
						offset: 500
					},
					empty: { //配置列表无任何数据的提示
						warpId: "proDataList",
						icon: ctxpath + "/themes/mobile/mescroll-master/demo/res/img/mescroll-empty.png",
					}
				}
			});

			//初始化vue后,显示vue模板布局
			$("#proDataList").css('display', 'block');
			//			document.getElementById("venueDataList").style.display="block";
		},
		methods: {
			//上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
			upCallback: function (page) {
				//联网加载数据
				var self = this;
				getListDataFromNet(page.num, page.size, function (data) {
					//如果是第一页需手动制空列表
					if (page.num == 1) self.productionDataList = [];
					//更新列表数据
					self.productionDataList = self.productionDataList.concat(data);
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//传参:数据的总数; mescroll会自动判断列表是否有无下一页数据,如果数据不满一页则提示无更多数据;
					self.mescroll.endSuccess(data.length);
				}, function () {
					//联网失败的回调,隐藏下拉刷新和上拉加载的状态;
					self.mescroll.endErr();
				});
			},
			getHref: function (url, par, val) {//获取跳转地址
				return cu(url) + '?' + par + '=' + val;
			},
			getPic: function (val) {//获取图片
				return ctxpath + '/upload/image/' + (val != null ? val.substring(0, 22) : 'default.jpg');
			},
			toHref: function (url, par, val) {//点击跳转
				window.location.href = cu(url) + '?' + par + '=' + val;
				/*var data={};
				data.serviceid=val;
				AjaxGet('/mercacc/checkPermission',data,function(r){
					if(r.result=="1"){
						window.location.href = cu(url)+'?'+par+'='+val;
					}else{
						info(r.message);
						return false;
					}
				},'json');*/
			},
			formatPar: function (val) {//数据处理
				if (val != null) {
					return val;
				}
			},
			formatOpar: function (val) {//数据处理
				if (val != null) {
					return 5 - val;
				}
			},
			getCustomer: function (val) {//关注的状态
				val = val + '=1';
				var customermap = [];
				customermap = (customerservice_map.substring(1, customerservice_map.length - 1)).split(",");
				//				alert(JSON.stringify(customermap));
				for (var i = 0; i < customermap.length; i++) {
					var customer = customermap[i].split("=")[0];
					customer = customermap[i].replace(/^\s+|\s+$/g, "")
					val = val.replace(/^\s+|\s+$/g, "")
					//					alert(customer+"--"+val);
					if (customer == val) {
						return 1;
						//						break;
					}
				}
			},
			customerJoin: function (val) {//关注商品
				//				console.log(label);
				var event = window.event || event;
				if (document.all) {
					//支持IE
					event.returnValue = false;
				} else {
					//IE不支持
					event.preventDefault();
				}
				var param = {};
				if (label.find(".icon").hasClass("icon-heart-o")) {
					param.status = 1;
				} else if (label.find(".icon").hasClass("icon-heart")) {
					param.status = 0;
				}
				param.flag = "0";
				param.serviceid = val;
				AjaxPost('/custom/setcustom', param, function (r) {
					if (r.result == "1") {

						if (r.object.status == 1) {
							//							info("关注成功！");
							label.find(".a").addClass("text-danger")
							label.find(".icon").removeClass("icon-heart-o").addClass("icon-heart");
						} else {
							//							info("取消成功！");
							label.find(".a").removeClass("text-danger")
							label.find(".icon").removeClass("icon-heart").addClass("icon-heart-o");
						}
					} else if (r.result == "0") {
						info("关注失败,稍后请重试!");
					} else if (r.result == "2") {
						info("商户不能关注，请切换用户!");
					} else {
						info("已关注请勿重复关注!");
					}
				});
			}
		}
	});


})


/*加载列表数据*/
function getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
	loadding();
	// 延时一秒,模拟联网
	// setTimeout(function () {
	// 	axios.get(cu('/product/productDataByarea'), {
	// 		params: {
	// 			page: pageNum, //页码
	// 			rows: pageSize, //每页长度
	// 			areacode: $('#areacode').val(),
	// 			remark: $('#remark').val()
	// 		}
	// 	})
	// 		.then(function (response) {
	// 			closeloading();
	// 			var listData = response.data;//分页数据
	// 			//        	alert(JSON.stringify(listData));
	// 			successCallback && successCallback(listData);//成功回调
	// 			$('#proDataList').show();
	// 		})
	// }
	// 	, 200)
}



