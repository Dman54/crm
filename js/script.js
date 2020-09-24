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
$("#closeicon2_added, #sidebar-overlay2").on('click', function () {
  sidebar.removeClass('show');
  $('body').removeClass('left-sidebar-open');
});

let sidebar = $("#rightaside");

buttonsToSidebarClients = $("[data-widget='control-sidebar-client']");
buttonsToSidebarClients.on('click', function (e) {
  e.preventDefault();
  sidebar.toggleClass('show');
  $('body').toggleClass('left-sidebar-open');
});
$(".add-client").on('click', function (e) {
  e.preventDefault();
  $(".client-edit").addClass("editing");
  $(".client-selected").addClass("editing");
  sidebar.toggleClass('show');
  $('body').toggleClass('left-sidebar-open');
});

$(".input-date input").on('focus', function (e) {
  $(this).parent().toggleClass('focused');
  $(this).get(0).type = 'date';
});
$(".input-date input").on('blur', function (e) {
  $(this).parent().toggleClass('focused');
  $(this).get(0).type = 'text';
});

$(".clients-table thead th.sorting").on('click', function (e) {
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
$(".export").on('click', function (e) {
  alert("exported!");
});
$(".clients-table tbody input[type='checkbox']").on('change', function (e) {
  let checked_length = $(".clients-table tbody input[type='checkbox']:checked").length;
  if ($(this).is(':checked')) {
    $(this).closest("tr").addClass("selected");
    $(".clients-table thead").addClass("exporting");
    if (checked_length == $(".clients-table tbody input[type='checkbox']").length) {
      $("#checkbox_all").prop('checked', true);
    }
  } else {
    $(this).closest("tr").removeClass("selected");
    $("#checkbox_all").prop('checked', false);
    if (!checked_length) {
      $(".clients-table thead").removeClass("exporting");
    }
  }
});
$("#checkbox_all").on('change', function (e) {
  if ($(this).is(':checked')) {
    $(".clients-table thead").addClass("exporting");
    $(".clients-table tbody input[type='checkbox']:not(:checked)").trigger('click');
  }
  // else {
  //   $(".clients-table thead").removeClass("exporting");
  // }
});
$(".client-tabs .nav-tab").on('click', function (e) {
  if ($(this).hasClass("active")) return;
  $(".client-tabs .nav-tab").removeClass('active');
  $(".client-contents .nav-content").removeClass('active');
  $(this).addClass('active');
  $(".client-contents .nav-content").eq($(".client-tabs .nav-tab").index($(this))).addClass('active');
});
$(".client-info-button .btn").on('click', function (e) {
  $(this).toggleClass("active");
  $(".popup").eq($(".client-info-button .btn").index($(this))).toggleClass('active');
});
$(".close-popup").on('click', function (e) {
  $(".client-info-button .btn").eq($(".popup .close-popup").index($(this))).toggleClass('active');
  $(this).closest(".popup").toggleClass("active");
});
$(".client-edit").on('click', function (e) {
  $(this).toggleClass("editing");
  $(".client-selected").toggleClass("editing");
});

// audios
$(window).on("load", function () {
  $(".player").each(function (index) {
    let dur = $(this).find("audio").get(0).duration;
    let secs = Math.floor(dur % 60);
    $(this).find(".player-time").text(String(Math.floor(dur / 60)) + "." + String((secs < 10) ? '0' + secs : secs));
  });
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
  $(this).closest(".player").find(".player-timeline .player-head").css("width", percentage * 3 + 'px');
});
$(".player-timeline").on("click", function (e) {
  let posX = e.pageX - $(this).offset().left;
  let curaudio = $(this).closest(".player").find("audio").get(0);
  console.log(posX / 300 * curaudio.duration);
  curaudio.currentTime = parseFloat(posX / 300 * curaudio.duration);
  $(this).closest(".player").find(".player-timeline .player-head").css("width", posX + 'px');
});
// // audios

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
buttonsToSidebarGuests.on('click', function (e) {
  e.preventDefault();
  sidebar.toggleClass('show');
  $('body').toggleClass('left-sidebar-open');
});
$(".add-guest").on('click', function (e) {
  e.preventDefault();
  $(".guest-edit").addClass("editing");
  $(".guest-selected").addClass("editing");
  sidebar.toggleClass('show');
  $('body').toggleClass('left-sidebar-open');
});
$(".guest-nav .guest-nav-item").on('click', function (e) {
  if ($(this).hasClass("active")) return;
  $(".guest-nav .guest-nav-item").removeClass('active');
  $(".guest-contents .guest-content").removeClass('active');
  $(this).addClass('active');
  $(".guest-contents .guest-content").eq($(".guest-nav .guest-nav-item").index($(this))).addClass('active');
});
$(".guest-edit").on('click', function (e) {
  $(".guest-selected").addClass("editing");
});
$(".guest-save").on('click', function (e) {
  $(".guest-selected").removeClass("editing");
  // sidebar.toggleClass('show');
  // $('body').toggleClass('left-sidebar-open');
});
$(".guest-reservation-history").on('click', function (e) {
  sidebar.toggleClass('show');
  $('body').toggleClass('left-sidebar-open');
});
// // gannt.html