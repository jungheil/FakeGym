var csstop = '105px';
$(function(){

	$('.switch-tab').each(function(i, k){
		$(k).find("li").on('click', function() {
			$(k).find("li").removeClass('active');
		    $(this).addClass('active');
		    loadding();
		    var param = {};
		    param.status = $(this).data('status');
		    if($(this).attr('id').split('_')[1] == '3'){
				param.iscomment = '1';
			}
		    param.csstop = csstop;
		  //   $('#orderlist').load(cu('/order/showOrderlist'),param,function(response,status,xhr){
			// 	closeloading();
			// })
		});
	});
	
	$('#'+$('#statusstr').val()).click();
	
//	$('#orderlist').load(cu('/order/showOrderlist'),{'csstop':csstop});
	
})



