$(function () {
  let pageLink = location.pathname.split("/").pop();
  if (pageLink.replace("_after_registration", ""));
  $('.nav a.nav-link[href$="' + pageLink + '"]').addClass("active");
});

// скрипты для открытия и закрытия меню на небольших экранах (клик по гамбургеру и значку закрытия или самому новому меню)
$("#gamburger_added, #closeicon_added").on("click", function (e) {
  $(".navbar-nav_added").toggleClass("displayok");
  $("body").toggleClass("modal-open");
  $("#closeicon_added").toggleClass("displayok");
});
$(".navbar-nav_added").on("click", function (e) {
  if ($(".navbar-nav_added").hasClass("displayok")) {
    $(".navbar-nav_added").toggleClass("displayok");
    $("body").toggleClass("modal-open");
    $("#closeicon_added").toggleClass("displayok");
  }
});
// код для отображения формы поиска при клике на иконку поиска на маленьких экранах
$("#searchhover_added").on("click", function (e) {
  $(".nav-header_added .form-inline").toggleClass("displayok");
});

let roleNavList = $("nav[data-selectrolecontent_added]");
let roleList = $("ul[data-selectrole_added='true'] li a");

// Смена стилей и панели навигации для активной роли и для активного пукта меню
roleList.on("click", function (e) {
  e.preventDefault();
  if ($(this).hasClass("active")) return;
  roleList.removeClass("active");
  $(this).addClass("active");
  roleNavList.removeClass("displayok");
  let indexOfRoleList = roleList.index($(this));
  console.log(indexOfRoleList);
  $(roleNavList.get(indexOfRoleList)).addClass("displayok");
  // roleNavList.find('.channels-link').get(indexOfRoleList).click(); // .nav-link ?
});

// right sidebar open\close and reload content
$("#closeicon2_added, #sidebar-overlay2").on("click", function () {
  sidebar.removeClass("show");
  $("body").removeClass("left-sidebar-open");
});
let searchResults = $(".search-object-results-block");
$(".search-object-input").on("input", function () {
  let s = $(this).val().toLowerCase();
  searchResults.removeClass("d-none");
  $(".search-object-result").removeClass("d-none");
  if (!s) {
    return;
  }
  searchResults.each(function (index, el) {
    let found = false;
    let searchResultsCur = $(this).find(".search-object-result");
    searchResultsCur.each(function (index2, el2) {
      if ($(this).text().toLowerCase().includes(s)) {
        found = true;
      } else {
        $(el2).addClass("d-none");
      }
    });
    if (!found) $(el).addClass("d-none");
  });
});
$(".search-object-result").on("click", function (e) {
  e.preventDefault();
  $(".place-value").text($(this).text());
  // reloadContent();
  $("#closeicon2_added").click();
});

$(".room-prices-table").on("click", ".remove-row", function (e) {
  $(this).closest(".room-prices-row").remove();
});
$("body").on("click", ".room-inventory-add", function (e) {
  $(this)
    .closest(".room-inventory-block")
    .append(
      `<div class="room-inventory-item" contenteditable="true">Введите элемент</div>`
    );
});
$("body").on("click", ".room-photos-add", function (e) {
  $(`<div class="room-photo" contenteditable="true">
  <img src="img/photo2.jpg" alt="Фото 2">
</div>`).insertBefore(
    $(this).closest(".room-photos-block").find(".room-photos-show_all")
  );
});

$(".add-tarif-row").on("click", function (e) {
  $(this).closest(".room-prices-block").find(".room-prices-table").append(
    `<div class="room-prices-row">
    <div class="room-prices-cell">
      <input disabled="" class="client-property-input" type="text" value="от 1 до 6 суток" placeholder="от 1 до 6 суток">
    </div>
    <div class="room-prices-cell">
      <input disabled="" class="client-property-input" type="number" min="1" max="99999" value="283" placeholder="283">
    </div>
    <div class="room-prices-cell">
      <input disabled="" type="checkbox" class="isLimitedByDaysNumber" checked="">
    </div>
    <div class="room-prices-cell">
      <input disabled="" class="client-property-input" type="number" min="1" max="99" value="1">
    </div>
    <div class="room-prices-cell">
      <input disabled="" class="client-property-input" type="number" min="1" max="99" value="6">
    </div>
    <div class="room-prices-cell">
      <input disabled="" type="checkbox" class="isLimitedByDate">
    </div>
    <div class="room-prices-cell">
      <input disabled="" class="client-property-input" type="date">
    </div>
    <div class="room-prices-cell">
      <input disabled="" class="client-property-input" type="date">
    </div>
    <div class="room-prices-cell">
      <input disabled="" type="checkbox" class="isLimitedByMembersNumber">
    </div>
    <div class="room-prices-cell">
      <input disabled="" class="client-property-input" type="number" min="1" max="9999">
    </div>
    <div class="room-prices-cell">
      <input disabled="" class="client-property-input" type="number" min="1" max="9999">
    </div>
    <div class="room-prices-cell">
      <input disabled="" type="checkbox" class="isPromotion">
    </div>
    <button class="remove-row">+</button>
  </div>`
  );
});
$(".aside-turn").on("click", function () {
  $(this).toggleClass("active");
});

let sidebar = $("#rightaside");

function toggleSidebarClients(e) {
  e.preventDefault();
  sidebar.removeClass("place-changer-aside");
  sidebar.toggleClass("show");
  $("body").toggleClass("left-sidebar-open");
}

buttonsToSidebarClients = $("[data-widget='control-sidebar-client']");
buttonsToSidebarClients.on("click", toggleSidebarClients);
$(".add-client").on("click", function (e) {
  e.preventDefault();
  $(".client-edit").addClass("editing");
  $(".client-selected").addClass("editing");
  sidebar.removeClass("place-changer-aside");
  sidebar.toggleClass("show");
  $("body").toggleClass("left-sidebar-open");
});

$(".input-date input").on("focus", function (e) {
  $(this).parent().toggleClass("focused");
  $(this).get(0).type = "date";
});
$(".input-date input").on("blur", function (e) {
  $(this).parent().toggleClass("focused");
  $(this).get(0).type = "text";
});

$("th.sorting .table-sorter").on("click", function (e) {
  if ($(this).closest("thead").hasClass("exporting")) {
    return;
  }
  let th = $(this).closest("th.sorting");
  if (th.hasClass("sorting_asc")) {
    th.removeClass("sorting_asc");
    th.addClass("sorting_desc");
  } else if (th.hasClass("sorting_desc")) {
    th.removeClass("sorting_desc");
  } else {
    th.addClass("sorting_asc");
  }
});
$(".export").on("click", function (e) {
  alert("exported!");
});
$(".clients-table tbody input[type='checkbox']").on("change", function (e) {
  let checked_length = $(".clients-table tbody input[type='checkbox']:checked")
    .length;
  if ($(this).is(":checked")) {
    $(this).closest("tr").addClass("selected");
    $(".clients-table thead").addClass("exporting");
    if (
      checked_length == $(".clients-table tbody input[type='checkbox']").length
    ) {
      $("#checkbox_all").prop("checked", true);
    }
  } else {
    $(this).closest("tr").removeClass("selected");
    $("#checkbox_all").prop("checked", false);
    if (!checked_length) {
      $(".clients-table thead").removeClass("exporting");
    }
  }
});
$("#checkbox_all").on("change", function (e) {
  if ($(this).is(":checked")) {
    $(".clients-table thead").addClass("exporting");
    $(".clients-table tbody input[type='checkbox']:not(:checked)").trigger(
      "click"
    );
  }
  // else {
  //   $(".clients-table thead").removeClass("exporting");
  // }
});
$(".client-tabs .nav-tab").on("click", function (e) {
  if ($(this).hasClass("active")) return;
  $(".client-tabs .nav-tab").removeClass("active");
  $(".client-contents .nav-content").removeClass("active");
  $(this).addClass("active");
  $(".client-contents .nav-content")
    .eq($(".client-tabs .nav-tab").index($(this)))
    .addClass("active");
});
$(".client-info-button .btn").on("click", function (e) {
  $(this).toggleClass("active");
  $(".popup")
    .eq($(".client-info-button .btn").index($(this)))
    .toggleClass("active");
});
$(".close-popup").on("click", function (e) {
  $(".client-info-button .btn")
    .eq($(".popup .close-popup").index($(this)))
    .toggleClass("active");
  $(this).closest(".popup").toggleClass("active");
});
$(".client-edit").on("click", function (e) {
  $(this).toggleClass("editing");
  $(".client-selected").toggleClass("editing");
});

// audios
$(window).on("load", function () {
  $(".player").each(function (index) {
    let dur = $(this).find("audio").get(0).duration;
    let secs = Math.floor(dur % 60);
    $(this)
      .find(".player-time")
      .text(
        String(Math.floor(dur / 60)) +
          "." +
          String(secs < 10 ? "0" + secs : secs)
      );
  });
  $(".object-photos-block .client-block-docs-add_doc").height(
    $(".object-photo img").height()
  );

  let $table = $(".table-responsive");
  let $tableScroller = $(".table-scroller");
  let $tableEl = $table.find("table");
  if ($table.find("table").width() > $table.width()) {
    $tableScroller.addClass("table-scroller--right");

    let firstColumnTH = $tableEl.find("th:first-child");
    let firstColumnTD = $tableEl.find("td:first-child");
    let firstwidth = Math.max(
      firstColumnTH.outerWidth(),
      firstColumnTD.outerWidth()
    );
    let firstPaddingLeft = +firstColumnTH.css("padding-left").replace("px", "");

    firstColumnTH.addClass("main-column");
    firstColumnTD.addClass("main-column");
    
    let maxHeight = 0;
    $tableEl.find("th").each(function (index, element) {
      if (index < 1) return;
      if ($(element).outerHeight() > maxHeight) maxHeight = $(element).outerHeight();
    });
    firstColumnTH.css("height", maxHeight);

    firstColumnTD.each(function (index, element) {
      maxHeight = 0;
      $(element)
        .parent()
        .find("td")
        .each(function (index, element) {
          if (index < 1) return;
          if ($(element).outerHeight() > maxHeight) maxHeight = $(element).outerHeight();
        });
      $(element).css("height", maxHeight);
    });

    firstColumnTH.css("width", firstwidth);
    firstColumnTD.css("width", firstwidth);
    $tableEl
      .find("th:nth-child(2)")
      .css("padding-left", firstwidth + firstPaddingLeft);
    $tableEl
      .find("td:nth-child(2)")
      .css("padding-left", firstwidth + firstPaddingLeft);
  } else {
    $tableScroller.removeClass("table-scroller--right");
    $tableScroller.removeClass("table-scroller--left");

    let firstColumnTH = $tableEl.find("th:first-child");
    let firstColumnTD = $tableEl.find("td:first-child");
    let firstPaddingLeft = firstColumnTH.css("padding-left");
    // првоерить при resize
    firstColumnTH.css("width", "unset");
    firstColumnTD.css("width", "unset");
    firstColumnTH.removeClass("main-column");
    firstColumnTD.removeClass("main-column");
    $tableEl.find("th:nth-child(2)").css("padding-left", firstPaddingLeft);
    $tableEl.find("td:nth-child(2)").css("padding-left", firstPaddingLeft);
  }
});

$(window).on("resize", function () {
  let $table = $(".table-responsive");
  let $tableScroller = $(".table-scroller");
  if ($table.find("table").width() > $table.width()) {
    $tableScroller.addClass("table-scroller--right");
  } else {
    $tableScroller.removeClass("table-scroller--right");
    $tableScroller.removeClass("table-scroller--left");
  }
});

$(".player .far").on("click", function (e) {
  let curaudio = $(this).closest(".player").find("audio").get(0);
  if (curaudio.paused) {
    curaudio.play();
    $(this).removeClass("pause");
    $(this).addClass("play");
  } else {
    curaudio.pause();
    $(this).removeClass("play");
    $(this).addClass("pause");
  }
});
$("audio").on("timeupdate", function (e) {
  var duration = this.duration;
  var currentTime = this.currentTime;
  var percentage = (currentTime / duration) * 100;
  $(this)
    .closest(".player")
    .find(".player-timeline .player-head")
    .css("width", percentage * 3 + "px");
});
$(".player-timeline").on("click", function (e) {
  let posX = e.pageX - $(this).offset().left;
  let curaudio = $(this).closest(".player").find("audio").get(0);
  console.log((posX / 300) * curaudio.duration);
  curaudio.currentTime = parseFloat((posX / 300) * curaudio.duration);
  $(this)
    .closest(".player")
    .find(".player-timeline .player-head")
    .css("width", posX + "px");
});
// // audios

$(".place-changer-button").on("click", function (e) {
  sidebar.addClass("place-changer-aside");
  sidebar.toggleClass("show");
  $("body").toggleClass("left-sidebar-open");
});

// gannt.html
$(function () {
  $(".gannt-client").each(function (index) {
    let left = $(this).attr("data-begin");
    let right = $(this).attr("data-end");
    $(this).css("left", "calc(188px + " + left + "*(100% - 188px)/17)");
    $(this).css("right", "calc((17 - " + right + ")*(100% - 188px)/17)");
  });
});
buttonsToSidebarGuests = $("[data-widget='control-sidebar-guest']");
buttonsToSidebarGuests.on("click", function (e) {
  e.preventDefault();
  sidebar.removeClass("place-changer-aside");
  sidebar.toggleClass("show");
  $("body").toggleClass("left-sidebar-open");
});
$(".add-guest").on("click", function (e) {
  e.preventDefault();
  $(".guest-edit").addClass("editing");
  $(".guest-selected").addClass("editing");
  sidebar.removeClass("place-changer-aside");
  sidebar.toggleClass("show");
  $("body").toggleClass("left-sidebar-open");
});
$(".guest-nav .guest-nav-item").on("click", function (e) {
  if ($(this).hasClass("active")) return;
  $(".guest-nav .guest-nav-item").removeClass("active");
  $(".guest-contents .guest-content").removeClass("active");
  $(this).addClass("active");
  $(".guest-contents .guest-content")
    .eq($(".guest-nav .guest-nav-item").index($(this)))
    .addClass("active");
});
$(".guest-edit").on("click", function (e) {
  $(".guest-selected").addClass("editing");
});
$(".guest-save").on("click", function (e) {
  $(".guest-selected").removeClass("editing");
  // sidebar.toggleClass('show');
  // $('body').toggleClass('left-sidebar-open');
});
$(".guest-reservation-history").on("click", function (e) {
  sidebar.removeClass("place-changer-aside");
  sidebar.toggleClass("show");
  $("body").toggleClass("left-sidebar-open");
});
// // gannt.html

// objects.html
$(".nav-tabs .nav-tab a").on("click", function (e) {
  e.preventDefault();
  if ($(this).hasClass("active")) return;
  $(".nav-tabs .nav-tab a").removeClass("active");
  $(".nav-contents .nav-content").removeClass("active");
  $(this).addClass("active");
  $(".nav-contents .nav-content")
    .eq($(".nav-tabs .nav-tab a").index($(this)))
    .addClass("active");
});

$(".nav-content-edit").on("click", function (e) {
  let isEditting = $(this).hasClass("editing");
  $(this).toggleClass("editing");
  $(this)
    .closest(".nav-part")
    .find("input, textarea, select")
    .prop("disabled", isEditting);
  if (isEditting) {
    console.log("save changes");
  }
});

$(".room-number-content-buttons .fa-pen").on("click", function (e) {
  let isEditting = $(this).hasClass("editing");
  $(this).toggleClass("editing");
  $(this)
    .closest(".room-number-content")
    .find("input, textarea")
    .prop("disabled", isEditting);
  if (isEditting) {
    console.log("save changes");
  }
});

$(".room-number-content-buttons .fa-trash").on("click", function (e) {
  $(this).closest(".room-number-content").remove();
});

$(".add-object-main-button").on("click", function (e) {
  e.preventDefault();
  $(this).addClass("d-none");
  $(".add-object-container").addClass("active");
});

$(".crm-add-object .add-object-button").on("click", function (e) {
  $("body").removeClass("sidebar-collapse");
  $("body").addClass("sidebar-mini");
  // $(".paddingmenu").removeClass("d-none");
  $(this).closest(".nav-content").append(`<div class="add-object-answer">
    Объект отправлен на модерацию
  </div>`);
});

$(".crm-objects-base .add-object-button, .crm-objects .add-object-button").on(
  "click",
  function (e) {
    $(this).closest(".nav-content").append(`<div class="add-object-answer">
    Объект отправлен на модерацию
  </div>`);
  }
);

$(".crm-login form").on("submit", function (e) {
  e.preventDefault();
  let path = window.location.pathname.split("/");
  path.pop();
  window.location.pathname = path.join("/") + "/lk_after_registration.html";
});

function addNewObject(main = true) {
  $(".nav-tabs .nav-tab a").removeClass("active");
  $(".nav-contents .nav-content").removeClass("active");
  let allContainer = $(
    [".objects-base-content__all", ".all-objects-container"][+main]
  );
  let addContainer = $(
    [".objects-base-content__add-object", ".add-object-container"][+main]
  );
  allContainer.removeClass("active");
  addContainer.addClass("active");
  $("body").addClass("editing");
  addContainer.find(".nav-tabs .nav-tab a").eq(0).addClass("active");
  addContainer.find(".nav-contents .nav-content").eq(0).addClass("active");
}

$(".add-new-object").on("click", function (e) {
  addNewObject();
  // $(".place-changer").val("+ Добавить новый объект");
});

$(".add-new-object-to-base").on("click", function (e) {
  addNewObject(false);
  // $(".place-changer").val("+ Добавить новый объект");
});

$(".place-changer").on("change", function (e) {
  if ($(this).val() == "+ Добавить новый объект") {
    addNewObject();
  } else {
    // reload content for selected object
    $(".nav-tabs .nav-tab a").removeClass("active");
    $(".nav-contents .nav-content").removeClass("active");
    $(".all-objects-container").addClass("active");
    $(".add-object-container").removeClass("active");
    $("body").removeClass("editing");
    $(".nav-tabs .nav-tab a").eq(0).addClass("active");
    $(".nav-contents .nav-content").eq(0).addClass("active");
  }
});
// // objects.html

// finances.html
$(".add-operation").on("click", function (e) {
  $(".finances-table tbody").prepend(`
  <tr class="editing">
    <td tabindex="0">
      <input type="date" class="client-property-input" name="finance-date" id="finance-date">
    </td>
    <td tabindex="0">
      <input type="text" class="client-property-input" name="finance-client" id="finance-client"
        placeholder="Плательщик">
    </td>
    <td tabindex="0" class="price-reservation-cell">
      <input type="number" min="1" max="99999" class="client-property-input" name="finance-sum"
        id="finance-sum" placeholder="Введите сумму">
    </td>
    <td tabindex="0">
      <input type="text" class="client-property-input" name="finance-client" id="finance-client"
        placeholder="Вид платежа">
    </td>
    <td tabindex="0">
      <input type="text" class="client-property-input" name="finance-client" id="finance-client"
        placeholder="Цель платежа">
    </td>
    <td tabindex="0">
      <input type="text" class="client-property-input" name="finance-client" id="finance-client"
        placeholder="Адрес">
    </td>
    <td tabindex="0">
      <input type="text" class="client-property-input" name="finance-client" id="finance-client"
        placeholder="Добавить комментарий">
      <div class="finances-editing-buttons">
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-times"></i>
      </div>
    </td>
  </tr>`);
});
$(".finance-filter").on("click", function (e) {
  $(".finance-filter").removeClass("active");
  $(this).addClass("active");
  $(".finances-table tr").removeClass("d-none");
  if ($(this).hasClass("finance-filter--consumption")) {
    $(".finances-table tr.selled").addClass("d-none");
  } else if ($(this).hasClass("finance-filter--coming")) {
    $(".finances-table tr.buyed").addClass("d-none");
  }
});
// // finances.html

// docs.html
$(".file-upload input").on("change", function (e) {
  $(
    "<p class='file-name'><span>Имя файла: </span>" +
      $(".file-upload input")[0].files[0].name +
      "</p>"
  ).insertAfter($(this).parent());
});
$(".crm-docs-result .dropdown-item button").on("click", function (e) {
  let index = $(".crm-docs-result .dropdown-item button").index($(this));
  while (index > 1) {
    index -= 2;
  }
  if (index == 0) {
    let el = $(this).closest(".crm-docs-result").find(".crm-docs-name");
    el.attr("contenteditable", "true");
    el.focus();
  } else {
    $(this).closest(".crm-docs-result").remove();
  }
});
$.fn.shuffle = function () {
  var j;
  for (var i = 0; i < this.length; i++) {
    j = Math.floor(Math.random() * this.length);
    $(this[i]).before($(this[j]));
  }
  return this;
};
$(".crm-docs-result").on("click", function (e) {
  $(".crm-docs-result").removeClass("active");
  $(this).addClass("active");
  $(".crm-docs-info >*").shuffle();
});
// // docs.html

// objects-base.html
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  if ($(element).prop("nodeName") == "input")
    $temp.val($(element).text().replace(/\s\s+/g, " ")).select();
  else $temp.val($(element).val().replace(/\s\s+/g, " ")).select();
  document.execCommand("copy");
  $temp.remove();
}
$(".objects-base-table .dropdown-item button").on("click", function (e) {
  let index = $(".objects-base-table .dropdown-item button").index($(this));
  while (index > 2) {
    index -= 3;
  }
  if (index == 1) {
    copyToClipboard($(this).closest("tr"));
  } else if (index == 0) $(this).closest("tr").remove();
  else {
    let el = $(this).closest("tr").find("td");
    el.attr("contenteditable", "true");
    el[0].focus();
  }
});
$(document).ready(function ($) {
  $(".clickable-row").click(function () {
    window.location = $(this).data("href");
  });
});
// // objects-base.html

// lk.html
$(".copy-user-refcode").on("click", function (e) {
  copyToClipboard($(this).parent().find("input"));
});
$(".balance-block--pay-link, .givemethemoney__cancel").on(
  "click",
  function (e) {
    e.preventDefault();
    $(".crm-lk-content .container-fluid").toggleClass("active");
  }
);

$(".givemethemoney__choice-item").on("click", function (e) {
  // e.preventDefault();
  $(".givemethemoney__choice-container li").removeClass("active");
  $(this).closest("li").addClass("active");
});

// $(".navbar-tabs a").on("click", function (e) {
//   e.preventDefault();
//   $(".navbar-tabs a").removeClass("active");
//   $(this).addClass("active");
//   $(".navbar-block").removeClass("active");
//   $(".navbar-block")
//     .eq($(".navbar-tabs a").index($(this)))
//     .addClass("active");
// });

// // lk.html

$(".select-room-places--wrapper").on("click", function (e) {
  e.preventDefault();
  // select-room-places
});

$(".add-objects input").on("change", function (e) {
  console.log($(".add-objects input:checked").length);
  if ($(".add-objects input:checked").length == 1)
    $(".add-objects input:checked").prop("disabled", true);
  else $(".add-objects input:checked").prop("disabled", false);
});

$(".btn-setup-table .dropdown-menu").on("click.bs.dropdown", function (e) {
  e.stopPropagation();
  // if ($(e.target).is($(".btn-setup-table .dropdown-menu"))) {
  //   e.preventDefault();
  // }
});

$(".table-scroller").on("click", function (e) {
  let $table = $(this).parent().find(".table-responsive");
  if ($(this).hasClass("table-scroller--right")) {
    $table.scrollLeft($table.find("table").width() - $table.width());
    // calculate left position of this button from first column
    $(this).css("left", 24 + $table.find("thead th:first-child").outerWidth());
  } else {
    $table.scrollLeft(0);
  }
  for (i of ["table-scroller--right", "table-scroller--left"]) {
    $(this).toggleClass(i);
  }
});
$(".table-responsive").on("scroll", function (e) {
  let $table = $(this);
  let $tableScroller = $(".table-scroller");
  if ($tableScroller.hasClass("table-scroller--right")) {
    if ($table.scrollLeft() >= $table.find("table").width() - $table.width()) {
      $tableScroller.css(
        "left",
        24 + $table.find("thead th:first-child").outerWidth()
      );
      for (i of ["table-scroller--right", "table-scroller--left"]) {
        $tableScroller.toggleClass(i);
      }
    }
  } else if ($table.scrollLeft() <= 0) {
    for (i of ["table-scroller--right", "table-scroller--left"]) {
      $tableScroller.toggleClass(i);
    }
  }
});
