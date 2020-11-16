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

let roleNavList = $("nav[data-selectRoleContent_added]");
let roleList = $("ul[data-selectRole_added='true'] li a");

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

$(".clients-table thead th.sorting").on("click", function (e) {
  if ($(this).closest("thead").hasClass("exporting")) {
    return;
  }
  if ($(this).hasClass("sorting_asc")) {
    $(this).removeClass("sorting_asc");
    $(this).addClass("sorting_desc");
  } else if ($(this).hasClass("sorting_desc")) {
    $(this).removeClass("sorting_desc");
  } else {
    $(this).addClass("sorting_asc");
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
  $(".paddingmenu").removeClass("d-none");
});

$(".crm-login form").on("submit", function (e) {
  e.preventDefault();
  let path = window.location.pathname.split("/");
  path.pop();
  window.location.pathname = path.join("/") + "/lk_after_registration.html";
});

function addNewObject() {
  $(".nav-tabs .nav-tab a").removeClass("active");
  $(".nav-contents .nav-content").removeClass("active");
  $(".all-objects-container").removeClass("active");
  $(".add-object-container").addClass("active");
  $("body").addClass("editing");
  $(".nav-tabs .nav-tab a").eq(3).addClass("active");
  $(".nav-contents .nav-content").eq(3).addClass("active");
}

$(".add-new-object").on("click", function (e) {
  addNewObject();
  $(".place-changer").val("+ Добавить новый объект");
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

// lk.html
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

// objects-base.html
$(".add-object-to-base").on("click", function (e) {
  $(".objects-base-table tbody").prepend(`
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
$(".objects-base-table .dropdown-item button").on("click", function (e) {
  let index = $(".objects-base-table .dropdown-item button").index($(this));
  while (index > 2) {
    index -= 3;
  }
  if (index == 1) {
    let el = $(this).closest("tr").find("td");
    el.attr("contenteditable", "true");
    el[0].focus();
  } else if (index == 0) $(this).closest("tr").remove();
  else toggleSidebarClients(e);
});
// // objects-base.html

$(".select-room-places").on("click", function (e) {
  e.preventDefault();
  select-room-places--wrapper
});
