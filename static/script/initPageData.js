function getURLParameter(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        window.location.search
      ) || [null, ""])[1].replace(/\+/g, "%20")
    ) || ""
  );
}

var orderInfo = {
  orderId: "",
  vertifyCode: "",
  venueName: "",
  venueDate: "",
  venueTime: "",
  venueId: "",
  moneyAmount: "",
  orderDate: "",
  orderTime: "",
};

const venueTypes = {
  szswim: {
    venueName: "深圳校区游泳池",
    moneyAmount: "5.00",
    venueTimes: ["06:30-08:00", "16:30-18:00", "19:30-21:00"],
  },
  szgym: {
    venueName: "深圳校区健身房",
    moneyAmount: "5.00",
    venueTimes: [
      "10:00-12:00",
      "14:00-16:00",
      "16:01-18:00",
      "18:01-20:00",
      "20:01-22:00",
    ],
  },
  szvolley: {
    venueName: "深圳校区室内排球场",
    moneyAmount: "3.00",
    venueTimes: [
      "10:00-11:00",
      "11:01-12:00",
      "14:00-15:00",
      "15:01-16:00",
      "16:01-17:00",
      "17:01-18:00",
      "18:01-19:00",
      "19:01-20:00",
      "20:01-21:00",
      "21:01-22:00",
    ],
  },
  szbadminton: {
    venueName: "深圳校区羽毛球场",
    moneyAmount: "30.00",
    venueTimes: [
      "08:00-09:00",
      "09:01-10:00",
      "10:01-11:00",
      "11:01-12:00",
      "14:00-15:00",
      "15:01-16:00",
      "16:01-17:00",
      "17:01-18:00",
      "18:01-19:00",
      "19:01-20:00",
      "20:01-21:00",
      "21:01-22:00",
    ],
  },
};

function randOrderId(min = 1713400000000000, max = 1713499999999999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randVertifyCode(min = 1000000000000000, max = 9999999999999999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function getHistoryOrderBadminton() {
  var horder = { ...orderInfo };
  horder.venueName = "深圳校区羽毛球场";
  horder.venueId = "场地11";
  horder.moneyAmount = "30.00";
  let venueTimes = ["18:01-19:00", "19:01-20:00", "20:01-21:00", "21:01-22:00"];
  horder.venueTime = venueTimes[Math.floor(Math.random() * venueTimes.length)];
  return horder;
}
function getHistoryOrderTennis() {
  var horder = { ...orderInfo };
  horder.venueName = "深圳校区室内网球场";
  horder.venueId = "场地2";
  horder.moneyAmount = "30.00";
  let venueTimes = ["18:01-19:00", "19:01-20:00", "20:01-21:00", "21:01-22:00"];
  horder.venueTime = venueTimes[Math.floor(Math.random() * venueTimes.length)];
  return horder;
}

var historyOrderFactory = [getHistoryOrderBadminton, getHistoryOrderTennis];

function getRandHistoryOrder(num) {
  randOrderIds = [];
  for (var i = 0; i < num; i++) {
    randOrderIds.push(randOrderId());
  }
  randOrderIds.sort();

  randDate = [];
  var date = new Date();
  for (var i = 0; i < num; i++) {
    randDate.push(
      randomDate(
        new Date(date.getTime() - 1000 * 60 * 60 * 24 * (num * 2 + 2)),
        new Date(date.getTime() - 1000 * 60 * 60 * 24 * 2)
      )
    );
  }
  randDate.sort((a, b) => b - a);

  var horders = [];
  for (var i = 0; i < num; i++) {
    let horder =
      historyOrderFactory[
        Math.floor(Math.random() * historyOrderFactory.length)
      ]();
    horder.orderId = randOrderIds[i];
    horder.vertifyCode = randVertifyCode();
    horder.orderDate = randDate[i]
      .toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
    horder.orderTime = randDate[i].toLocaleTimeString("zh-CN", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    horder.venueDate = new Date(randDate[i].getTime() + 1000 * 60 * 60 * 24)
      .toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
    horders.push(horder);
  }
  return horders;
}

function getVenueTime(venueTimes) {
  var date = new Date();

  var beginTims = venueTimes.map((time) => {
    return new Date(
      date
        .toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-") +
        "T" +
        time.split("-")[0] +
        ":00"
    );
  });

  var endTimes = venueTimes.map(function (time) {
    return new Date(
      date
        .toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-") +
        "T" +
        time.split("-")[1] +
        ":00"
    );
  });

  if (date < beginTims[0]) {
    return venueTimes[0];
  }
  for (var i = 1; i < venueTimes.length; i++) {
    if (
      date < endTimes[i - 1] &&
      date < new Date(beginTims[i].getTime() - 1000 * 60 * 15)
    ) {
      return venueTimes[i - 1];
    }
  }
  return venueTimes[venueTimes.length - 1];
}

function initPageData(
  venueType,
  userName,
  userId,
  orderId,
  vertifyCode,
  venueName,
  venueId,
  venueDate,
  venueTime,
  moneyAmount
) {
  if (venueType == "" || !(venueType in venueTypes)) {
    venueType = "szswim";
  }
  if (userName == "") {
    userName = "麦扩";
  }
  if (userId == "") {
    userId = "22210086";
  }

  var historyOrder = getRandHistoryOrder(7);
  let mainOrder = { ...orderInfo };

  if (orderId != "") {
    mainOrder.orderId = orderId;
  } else {
    mainOrder.orderId = randOrderId(
      (min = historyOrder[historyOrder.length - 1].orderId + 1)
    );
  }
  if (vertifyCode != "") {
    mainOrder.vertifyCode = vertifyCode;
  } else {
    mainOrder.vertifyCode = randVertifyCode();
  }
  if (venueName != "") {
    mainOrder.venueName = venueName;
  } else {
    mainOrder.venueName = venueTypes[venueType].venueName;
  }
  if (venueId != "") {
    mainOrder.venueId = venueId;
  }
  if (venueDate != "") {
    mainOrder.venueDate = venueDate;
  } else {
    mainOrder.venueDate = new Date()
      .toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
  }
  if (venueTime != "") {
    mainOrder.venueTime = venueTime;
  } else {
    mainOrder.venueTime = getVenueTime(venueTypes[venueType].venueTimes);
  }
  if (moneyAmount != "") {
    mainOrder.moneyAmount = moneyAmount;
  } else {
    mainOrder.moneyAmount = venueTypes[venueType].moneyAmount;
  }

  date = new Date();

  randOrderTime = randomDate(
    new Date(date.getTime() - 1000 * 60 * 60 * 24),
    date
  );
  mainOrder.orderDate = randOrderTime
    .toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");
  mainOrder.orderTime = randOrderTime.toLocaleTimeString("zh-CN", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  sessionStorage.setItem("venueType", venueType);
  sessionStorage.setItem("userName", userName);
  sessionStorage.setItem("userId", userId);
  sessionStorage.setItem("mainOrder", JSON.stringify(mainOrder));
  sessionStorage.setItem("historyOrder", JSON.stringify(historyOrder));
}

var venueType = getURLParameter("venueType");
var userName = getURLParameter("userName");
var userId = getURLParameter("userId");
var orderId = getURLParameter("orderId");
var vertifyCode = getURLParameter("vertifyCode");
var venueName = getURLParameter("venueName");
var venueId = getURLParameter("venueId");
var venueDate = getURLParameter("venueDate");
var venueTime = getURLParameter("venueTime");
var moneyAmount = getURLParameter("moneyAmount");

if (sessionStorage.getItem("flag") != "1") {
  initPageData(
    venueType,
    userName,
    userId,
    orderId,
    vertifyCode,
    venueName,
    venueId,
    venueDate,
    venueTime,
    moneyAmount
  );
  sessionStorage.setItem("flag", "1");
} else if (
  venueType != "" ||
  userName != "" ||
  userId != "" ||
  orderId != "" ||
  vertifyCode != "" ||
  venueName != "" ||
  venueId != "" ||
  venueDate != "" ||
  venueTime != "" ||
  moneyAmount != ""
) {
  initPageData(
    venueType,
    userName,
    userId,
    orderId,
    vertifyCode,
    venueName,
    venueId,
    venueDate,
    venueTime,
    moneyAmount
  );
}
