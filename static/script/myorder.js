function getURLParameter(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        window.location.search
      ) || [null, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
}

function renderPage(orderInfo, userName, userId) {
  $("#showOrderId").text("订单" + orderInfo.orderId);
  $("#showOrderTime").text(orderInfo.orderDate + " " + orderInfo.orderTime);
  $("#showVenueName").text(orderInfo.venueName);
  if (orderInfo.venueId == null) {
    $("#showVenueDetail").text(
      orderInfo.venueDate + "  " + orderInfo.venueTime
    );
  } else {
    $("#showVenueDetail").text(
      orderInfo.venueDate +
      "  " +
      orderInfo.venueTime +
      "  " +
      orderInfo.venueId
    );
  }
  $("#showMoneyAmount").text("￥" + orderInfo.moneyAmount);
  $("#yzm_xxx > h4").text(orderInfo.venueName);
  $("#yzm_xxx > div > dl > dt > h4").text(
    "预定日期:" + orderInfo.venueDate + "  " + orderInfo.venueTime
  );
  $("#yzm_xxx").attr("id", "yzm_" + orderInfo.vertifyCode);
  $("#showEWM").attr("onclick", "showEWM('" + orderInfo.vertifyCode + "')");
  $("#showvertifyCode").text("验证码 " + orderInfo.vertifyCode);
  $("#showUserName").text(userName);
  $("#showUserId").text(userId);
}

$(document).ready(function () {
  var historyOrderIdx = parseInt(getURLParameter("historyOrderIdx"), 10);
  var historyOrder = JSON.parse(sessionStorage.getItem("historyOrder"));
  if (historyOrderIdx >= 0 && historyOrderIdx < historyOrder.length) {
    var orderInfo = historyOrder[historyOrderIdx];
  } else {
    var orderInfo = JSON.parse(sessionStorage.getItem("mainOrder"));
  }
  var userName = sessionStorage.getItem("userName");
  var userId = sessionStorage.getItem("userId");
  renderPage(orderInfo, userName, userId);
});
