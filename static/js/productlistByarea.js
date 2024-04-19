
var proDataList = 'defaultProList';
var csstop = '322px';
$(function () {
	$('.maskbody').hide();

	//nav-list 点击事件
	// $('#productlist').load(cu('/product/showProductlistByarea'),{'csstop':csstop,areacode : $('#areacode').val(),remark :proDataList});   
	$('.nav-list').find('li').on('click', function () {
		if ($(this).hasClass('active') == false) {
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
			var id = $(this).attr('id');
			if (id == 'sales') {
				proDataList = 'salesProList';
			} else if (id == 'favorable') {
				proDataList = 'favorableProList';
			} else {
				proDataList = 'defaultProList';
			}
		} /*else {
	        	
	          $(this).removeClass('active');
	          proDataList ='defaultProList';
	        }*/
		// $('#productlist').load(cu('/product/showProductlistByarea'), { 'csstop': csstop, typeid: $('#servicetypeId').val(), remark: proDataList });
	})

	//点击mask，隐藏列表、maskbody
	$('.maskbody').on("click", function () {
		$('.nav-area').children().hide();
		$(this).hide();
	});

})



