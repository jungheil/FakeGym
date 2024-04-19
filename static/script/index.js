$(document).ready(function () {
  let userName = sessionStorage.getItem("userName");
  $("#showUserName").text("欢迎，" + userName);
});
