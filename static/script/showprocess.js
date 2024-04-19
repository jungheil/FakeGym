function getURLParameter(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        window.location.search
      ) || [null, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
}

function renderPage(orderId, orderDate, orderTime) {
  $("#showOrderId").text("订单号: " + orderId);
  $(".order-time").each(function () {
    $(this).text(orderDate + " " + orderTime);
  })
}

$(document).ready(function () {
  var historyOrderIdx = parseInt(getURLParameter("historyOrderIdx"), 10);
  var historyOrder = JSON.parse(sessionStorage.getItem("historyOrder"));
  if (historyOrderIdx >= 0 && historyOrderIdx < historyOrder.length) {
    var orderInfo = historyOrder[historyOrderIdx];
  } else {
    var orderInfo = JSON.parse(sessionStorage.getItem("mainOrder"));
  }
  renderPage(orderInfo.orderId, orderInfo.orderDate, orderInfo.orderTime);
});
