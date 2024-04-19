function getOrderHTML(orderInfo, urlParam = "", isCancel = false) {
  if (urlParam != "" && urlParam[0] != "?") urlParam = "?" + urlParam;
  var ret = document.createElement("dl");
  var cancelHTML = isCancel
    ? `<a class="button button-plain">取消订单</a>`
    : "";
  ret.innerHTML = `<dt class="title">
  <div class="status-text">预订成功</div>
  <span id="showOrderId">订单 ${orderInfo.orderId}</span>
</dt>
<dd>
  <a href="./myorder.html${urlParam}" class="blockA">
    <div class="detailContent">
      <span>${orderInfo.venueName}</span>
    </div>
    <div class="detailContent">预订日期:${orderInfo.venueDate}</div>
    <div class="detailContent">
      下单日期:${orderInfo.orderDate} ${orderInfo.orderTime}
    </div>
  </a>
</dd>
<dt class="order-item-action">
  <div class="bt">
    <a href="javascript:void(0);" class="button button-plain">再来一单</a>
    ${cancelHTML}
  </div>
  <div class="mount">
    金额:
    <span class="text-danger">¥${orderInfo.moneyAmount.slice(
    0,
    -3
  )}</span>&nbsp;&nbsp;数量: 1
  </div>
</dt>`;
  return ret;
}

$(document).ready(function () {
  $(".username").text(sessionStorage.getItem("userName"));
  let mainOrderHTML = getOrderHTML(
    JSON.parse(sessionStorage.getItem("mainOrder")),
    "",
    true
  );
  $("#dataList").append(mainOrderHTML);

  let historyOrder = JSON.parse(sessionStorage.getItem("historyOrder"));
  historyOrder.forEach((element, index) => {
    let orderHTML = getOrderHTML(element, `historyOrderIdx=${index}`);
    $("#dataList").append(orderHTML);
  });
});
