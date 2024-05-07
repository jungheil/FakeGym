const venueTypes = {
  "szswim": "深圳校区游泳池",
  "szgym": "深圳校区健身房",
  "szvolley": "深圳校区室内排球场",
  "szbadminton": "深圳校区羽毛球场",
}
const base_url = window.location.href.split("/").slice(0, -1).join("/");

function updateUrl() {
  const url = new URL(base_url);

  var params = {}
  params["venueType"] = $("#venueType").val();
  params["userName"] = $("#userName").val();
  params["userId"] = $("#userId").val();
  params["orderId"] = $("#orderId").val();
  params["vertifyCode"] = $("#vertifyCode").val();
  params["venueName"] = $("#venueName").val();
  params["venueId"] = $("#venueId").val();
  params["venueDate"] = $("#venueDate").val();
  params["venueTime"] = $("#venueTime").val();
  params["moneyAmount"] = $("#moneyAmount").val();

  if (params["userName"] != "" && params["userId"] != "") {
    for (let key in params) {
      console.log(params[key]);
      if (params[key] != "") {
        url.searchParams.append(key, params[key]);
      }
    }
    $("#showUrl").text(url.href);
  } else {
    $("#showUrl").text("");
  }
}

function initPage() {
  $("#venueType").empty();
  for (let venueType in venueTypes) {
    $("#venueType").append(
      "<option value='" + venueType + "'>" + venueTypes[venueType] + "</option>"
    );
  }
}

$(document).ready(function () {
  initPage();
  $(".input-info").on('input', function () {
    if ($("#checkAgreement").prop("checked")) {
      updateUrl();
    }
  });
  $("#venueType").on('change', function () {
    if ($("#checkAgreement").prop("checked")) {
      updateUrl();
    }
  });
  $("#copyUrl").on('click', function () {
    var url = document.getElementById("showUrl");
    url.select();
    document.execCommand("copy");
  });
  $("#openUrl").on('click', function () {
    if ($("#checkAgreement").prop("checked")) {
      window.open($("#showUrl").text());
    }
  });
  $("#checkAgreement").on('change', function () {
    if ($("#checkAgreement").prop("checked")) {
      updateUrl();
    } else {
      $("#showUrl").text("");
    }
  });
});

