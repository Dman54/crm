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


$(function () {

  function nameFormatter(value) {
    return 'Formatted ' + value
  }
  var data = [
    {
      "nroom": 1,
      "n": 1,
      "fio": "свободно"
    },
    {
      "nroom": 1,
      "n": 2,
      "fio": "свободно"
    },
    {
      "nroom": 1,
      "n": 3,
      "fio": "РУДВАР АБАКАР АЛЗАКИ АБДАЛРАХ",
      "born_date": 35065,
      "gragdanstvo": "СУД",
      "in_date": 44071,
      "out_date": 44074,
      "pay_date": 44073,
      "pay": 750,
      "pay_kind": "безн",
      "zakazchik": "Ч.Л."
    },
    {
      "nroom": 1,
      "n": 4,
      "fio": "КУЗИНСКИЙ ДМИТРИЙ ЮРЬЕВИЧ",
      "born_date": 28059,
      "gragdanstvo": "РФ",
      "in_date": 44008,
      "out_date": 44098,
      "pay_date": 44069,
      "pay": 6500,
      "pay_kind": "безн",
      "zakazchik": "Ч.Л."
    },
    {
      "nroom": 1,
      "n": 5,
      "fio": "ЮЖАНИНОВ ГРИГОРИЙ ЕВГЕНЬЕВИЧ",
      "born_date": 30796,
      "gragdanstvo": "РФ",
      "in_date": 44064,
      "out_date": 44094,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ"
    },
    {
      "nroom": 1,
      "n": 6,
      "fio": "свободно"
    },
    {
      "nroom": 1,
      "n": 7,
      "fio": "свободно"
    },
    {
      "nroom": 1,
      "n": 8,
      "fio": "свободно",
      "pay": " "
    },
    {
      "nroom": 2,
      "n": 1,
      "fio": "ХАЧАТУРЯН АРУТЮН РАФАЭЛОВИЧ",
      "born_date": 24596,
      "gragdanstvo": "РФ",
      "in_date": 44063,
      "out_date": 44074,
      "pay_date": 44063,
      "pay": 2750,
      "pay_kind": "нал",
      "zakazchik": "Ч.Л"
    },
    {
      "nroom": 2,
      "n": 2,
      "fio": "ШАЛАТОНИН ИГОРЬ СЕРГЕЕВИЧ",
      "born_date": 29776,
      "gragdanstvo": "УКР",
      "in_date": 44063,
      "out_date": 44074,
      "pay_date": 44073,
      "pay": 380,
      "pay_kind": "безн",
      "zakazchik": "Ч.Л"
    },
    {
      "nroom": 2,
      "n": 3,
      "fio": "КАЛИНИН СЕРГЕЙ ЯКОВЛЕВИЧ",
      "born_date": 31111,
      "gragdanstvo": "РФ",
      "in_date": 44062,
      "out_date": 44071,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ОТЛИЧИЕ"
    },
    {
      "nroom": 2,
      "n": 4,
      "fio": "АСТАФЬЕВ РОМАН ВЛАДИМИРОВИЧ",
      "born_date": 29911,
      "gragdanstvo": "РФ",
      "in_date": 44070,
      "zakazchik": "ОТЛИЧИЕ"
    },
    {
      "nroom": 2,
      "n": 5,
      "fio": "свободно"
    },
    {
      "nroom": 2,
      "n": 6,
      "fio": "свободно"
    },
    {
      "nroom": 2,
      "n": 7,
      "fio": "КРАСНОКУЦКИЙ НИКОЛАЙ НИКОЛАЕВИЧ",
      "born_date": 30555,
      "gragdanstvo": "РФ",
      "in_date": 44064,
      "out_date": 44074,
      "pay_date": 44071,
      "pay": 1000,
      "pay_kind": "безн",
      "zakazchik": "Ч.Л"
    },
    {
      "nroom": 2,
      "n": 8,
      "fio": "свободно",
      "pay": " "
    },
    {
      "nroom": 3,
      "n": 1,
      "fio": "ИСЛАМОВ КЮРА ЛЕМАЕВИЧ",
      "born_date": 25266,
      "gragdanstvo": "РФ",
      "in_date": 44039,
      "out_date": 44071,
      "pay_date": 44067,
      "pay_kind": "нал",
      "zakazchik": "ОТЛИЧИЕ"
    },
    {
      "nroom": 3,
      "n": 2,
      "fio": "ЮНУСОВ АСЛАМБЕК САМХАДОВИЧ",
      "born_date": 25237,
      "gragdanstvo": "РФ",
      "in_date": 44039,
      "out_date": 44071,
      "pay_date": 44067,
      "pay_kind": "нал",
      "zakazchik": "ОТЛИЧИЕ"
    },
    {
      "nroom": 3,
      "n": 3,
      "fio": "ШАНБИЕВ ЧОРШАНБЕ ДАВЛАТОВИЧ",
      "born_date": 26590,
      "gragdanstvo": "ТДЖ",
      "in_date": 44069,
      "out_date": 44099,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ"
    },
    {
      "nroom": 3,
      "n": 4,
      "fio": "ДАВЛЯТОВ ДОДЖИДДИН АНВАРОДОВИЧ",
      "born_date": 29230,
      "gragdanstvo": "РФ",
      "in_date": 44069,
      "out_date": 44099,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ"
    },
    {
      "nroom": 3,
      "n": 5,
      "fio": "ХАЙДАРОВ ИЛХОМ МАСТИБЕКОВИЧ",
      "born_date": 27678,
      "gragdanstvo": "РФ",
      "in_date": 44069,
      "out_date": 44099,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ"
    },
    {
      "nroom": 3,
      "n": 6,
      "fio": "ШАНБИЕВ ДАВЛАТХАМБАТ ДАВЛАТОВИЧ",
      "born_date": 28407,
      "gragdanstvo": "РФ",
      "in_date": 44069,
      "out_date": 44099,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ"
    },
    {
      "nroom": 3,
      "n": 7,
      "fio": "свободно"
    },
    {
      "nroom": 3,
      "n": 8,
      "fio": "АРМИХУДОЕВ БОБИЗАРЧИ ШУКРИХУДОЕВИЧ",
      "born_date": 23482,
      "gragdanstvo": "ТДЖ",
      "in_date": 44069,
      "out_date": 44099,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ"
    },
    {
      "nroom": 4,
      "n": 1,
      "fio": "РАЧАБОВ БУРИБОЙ ФАРХОДОВИЧ",
      "born_date": 36767,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "pay_kind": "безн",
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 4,
      "n": 2,
      "fio": "КАРАЕВ БЕКНАЗАР ОЧИЛДИЕВИЧ",
      "born_date": 34588,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "pay_kind": "безн",
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 4,
      "n": 3,
      "fio": "МУРОДОВ ХАБИБУЛЛО ХУШНАЗАРОВИЧ",
      "born_date": 36571,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "pay_kind": "безн",
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 4,
      "n": 4,
      "fio": "ШЕРХОНОВ ЭЛЁР ИХТИЁРОВИЧ",
      "born_date": 37415,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "pay_kind": "безн",
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 4,
      "n": 5,
      "fio": "КОРОМАТОВ УМЕД БОЗОРОВИЧ",
      "born_date": 31186,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "pay_kind": "безн",
      "zakazchik": "ФЛАГМАН",
      "__EMPTY_2": " "
    },
    {
      "nroom": 4,
      "n": 6,
      "fio": "НАМОЗОВ САФАРАЛИ ХУРАМОВИЧ",
      "born_date": 31700,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "pay_kind": "безн",
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 4,
      "n": 7,
      "fio": "НАМОЗОВ УМЕД УКТАМОВИЧ",
      "born_date": 36657,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "pay_kind": "безн",
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 4,
      "n": 8,
      "fio": "СУЛТОНОВ АНОРБОЙ ШАВКАТЖОНОВИЧ",
      "born_date": 33868,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "pay_kind": "безн",
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 5,
      "n": 1,
      "fio": "ВЕРБЕЦКИЙ БОРИС АНАТОЛЬЕВИЧ",
      "born_date": 31534,
      "gragdanstvo": "РФ",
      "in_date": 44055,
      "out_date": 44085,
      "pay_date": 44048,
      "pay_kind": "безн",
      "zakazchik": "ДИМАКС"
    },
    {
      "nroom": 5,
      "n": 2,
      "fio": "ЧУПРОВ ЕВГЕНИЙ ДМИТРИЕВИЧ",
      "born_date": 36026,
      "gragdanstvo": "РФ",
      "in_date": 44071,
      "zakazchik": "ДИМАКС"
    },
    {
      "nroom": 5,
      "n": 3,
      "fio": "САРСЕНБАЕВ КАХРАМАН СУЛТАНБЕКОВИЧ",
      "born_date": 25826,
      "gragdanstvo": "УЗБ",
      "in_date": 44045,
      "out_date": 44078,
      "pay_date": 44048,
      "pay_kind": "безн",
      "zakazchik": "ДИМАКС"
    },
    {
      "nroom": 5,
      "n": 4,
      "fio": "свободно",
      "comment": "8 999 233 84 11"
    },
    {
      "nroom": 5,
      "n": 5,
      "fio": "САРСЕНБАЕВ АЛИШЕР СУЛТАНБЕКОВИЧ",
      "born_date": 25096,
      "gragdanstvo": "УЗБ",
      "in_date": 44045,
      "out_date": 44078,
      "pay_date": 44048,
      "pay_kind": "безн",
      "zakazchik": "ДИМАКС",
      "comment": "АНТОН"
    },
    {
      "nroom": 5,
      "n": 6,
      "fio": "САРСЕНБАЕВ ОЙБЕК СУЛТАНБЕКОВИЧ",
      "born_date": 23938,
      "gragdanstvo": "УЗБ",
      "in_date": 44045,
      "out_date": 44078,
      "pay_date": 44048,
      "pay_kind": "безн",
      "zakazchik": "ДИМАКС",
      "comment": 45000
    },
    {
      "nroom": 5,
      "n": 7,
      "fio": "свободно"
    },
    {
      "nroom": 5,
      "n": 8,
      "fio": "свободно",
      "zakazchik": " "
    },
    {
      "nroom": 5,
      "nroom": 6,
      "n": 1,
      "fio": "ремонт"
    },
    {
      "nroom": 5,
      "n": 2,
      "fio": "ремонт"
    },
    {
      "nroom": 5,
      "n": 3,
      "fio": "ремонт"
    },
    {
      "nroom": 5,
      "n": 4,
      "fio": "ремонт"
    },
    {
      "nroom": 5,
      "n": 5,
      "fio": "ремонт"
    },
    {
      "nroom": 5,
      "n": 6,
      "fio": "ремонт"
    },
    {
      "nroom": 5,
      "n": 7,
      "fio": "ремонт"
    },
    {
      "nroom": 5,
      "n": 8,
      "fio": "ремонт"
    },
    {
      "nroom": 7,
      "n": 1,
      "fio": "ИВАНОВ ГЕНАДИЙ АНАТОЛЬЕВИЧ",
      "born_date": 30750,
      "gragdanstvo": "РФ",
      "in_date": 44073,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 7,
      "n": 2,
      "fio": "ПОПОВ АНДРЕЙ ВИКТОРОВИЧ",
      "born_date": 31704,
      "gragdanstvo": "РФ",
      "in_date": 44073,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 7,
      "n": 3,
      "fio": "ШВЕЦ ПЕТР НИКОЛАЕВИЧ",
      "born_date": 27284,
      "gragdanstvo": "РФ",
      "in_date": 44073,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 7,
      "n": 4,
      "fio": "ВДОВКИН АЛЕКСЕЙ ПЕТРОВИЧ",
      "born_date": 29640,
      "gragdanstvo": "РФ",
      "in_date": 44073,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 7,
      "n": 5,
      "fio": "КУЗЬМЕНКО ДМИТРИЙ ЕВГЕНЬЕВИЧ",
      "born_date": 36306,
      "gragdanstvo": "РФ",
      "in_date": 44073,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 7,
      "n": 6,
      "fio": "ГАНДАЛИПОВ РУСЛАН ИЛЬДУСОВИЧ",
      "born_date": 30244,
      "gragdanstvo": "РФ",
      "in_date": 44073,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 7,
      "n": 7,
      "fio": "ДОРОНИН ИЛЬЯ ВАСИЛЬЕВИЧ",
      "born_date": 36523,
      "gragdanstvo": "РФ",
      "in_date": 44073,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 7,
      "n": 8,
      "fio": "КЕРИН СЕРГЕЙ АЛЕКСАНДРОВИЧ",
      "born_date": 31887,
      "gragdanstvo": "РФ",
      "in_date": 44073,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 7,
      "n": 9,
      "fio": "ЛАПИН ЕВГЕНИЙ ПЕТРОВИЧ",
      "born_date": 30231,
      "gragdanstvo": "РФ",
      "in_date": 44073,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 7,
      "n": 10,
      "fio": "КОНЬКОВ РОМАН ВЯЧЕСЛАВОВИЧ",
      "born_date": 31376,
      "gragdanstvo": "РФ",
      "in_date": 44073,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 7,
      "n": 11,
      "fio": "БЕРТРАМ ПАВЕЛ РУДОЛЬФОВИЧ",
      "born_date": 28385,
      "gragdanstvo": "РФ",
      "in_date": 44073,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 7,
      "n": 12,
      "fio": "БОНДАРЕНКО АЛЕКСЕЙ СПАРТАКОВИЧ",
      "born_date": 34873,
      "gragdanstvo": "РФ",
      "in_date": 44073,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 8,
      "n": 1,
      "fio": "БРОНЬ",
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ"
    },
    {
      "nroom": 8,
      "n": 2,
      "fio": "МИРАЛИЕВ БЕГМАХМАД ЗЕРМАХМАДОВИЧ",
      "born_date": 35765,
      "gragdanstvo": "ТДЖ",
      "in_date": 44071,
      "out_date": 44101,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ"
    },
    {
      "nroom": 8,
      "n": 3,
      "fio": "ОЛИМОВ МУРОД ШАМШЕРБЕКОВИЧ",
      "born_date": 32682,
      "gragdanstvo": "ТДЖ",
      "in_date": 44069,
      "out_date": 44099,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ"
    },
    {
      "nroom": 8,
      "n": 4,
      "fio": "НАЗАРОВ ФАРШОД МУРОДОВИЧ",
      "born_date": 37307,
      "gragdanstvo": "ТДЖ",
      "in_date": 44069,
      "out_date": 44099,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ"
    },
    {
      "nroom": 8,
      "n": 5,
      "fio": "НАЗАРОВ ХУШМАХАД МУРОДОВИЧ",
      "born_date": 35307,
      "gragdanstvo": "ТДЖ",
      "in_date": 44069,
      "out_date": 44099,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ"
    },
    {
      "nroom": 8,
      "n": 6,
      "fio": "ЗОИРОВ САЙХОН ЧАМШЕДОВИЧ",
      "born_date": 36884,
      "gragdanstvo": "ТДЖ",
      "in_date": 44064,
      "out_date": 44094,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ"
    },
    {
      "nroom": 8,
      "n": 7,
      "fio": "МИРЗОЕВ МАРЬУФ АХТАМОВИЧ",
      "born_date": 36465,
      "gragdanstvo": "ТДЖ",
      "in_date": 44064,
      "out_date": 44094,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ",
      "comment": "16ЧЕЛ"
    },
    {
      "nroom": 8,
      "n": 8,
      "fio": "КАМБАРОВ ФАРРУХЖОН",
      "born_date": 34287,
      "gragdanstvo": "ТДЖ",
      "in_date": 44067,
      "out_date": 44097,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ",
      "comment": 120000
    },
    {
      "nroom": 8,
      "n": 9,
      "fio": "ГУЛОБШОЕВ ХУРШЕД ДИЛБАРОВИЧ",
      "born_date": 28307,
      "gragdanstvo": "ТДЖ",
      "in_date": 44068,
      "out_date": 44098,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ"
    },
    {
      "nroom": 8,
      "n": 10,
      "fio": "ДАВЛАТОВ КАБИР ДУШАНБАЕВИЧ",
      "born_date": 33792,
      "gragdanstvo": "ТДЖ",
      "in_date": 44070,
      "out_date": 44100,
      "pay_date": 44064,
      "pay_kind": "безн",
      "zakazchik": "ТЕХНОЛОГИИ"
    },
    {
      "nroom": 9,
      "n": 1,
      "fio": "ХАТАЕВ ЮРИЙ АНДРЕЕВИЧ",
      "born_date": 33125,
      "gragdanstvo": "РФ",
      "in_date": 44063,
      "out_date": 44072,
      "pay_date": 44070,
      "pay_kind": "нал",
      "zakazchik": "Ч.Л"
    },
    {
      "nroom": 9,
      "n": 2,
      "fio": "ГУЕНКО АЛЕКСАНДР АЛЕКСАНДРОВИЧ",
      "born_date": 34863,
      "gragdanstvo": "РФ",
      "in_date": 44063,
      "out_date": 44072,
      "pay_date": 44070,
      "pay_kind": "нал",
      "zakazchik": "Ч.Л"
    },
    {
      "nroom": 9,
      "n": 3,
      "fio": "ЧЕРНИКОВ МИХАИЛ ЕВГЕНЬЕВИЧ",
      "born_date": 31155,
      "gragdanstvo": "РФ",
      "in_date": 44011,
      "out_date": 44072,
      "pay_date": 44072,
      "pay": 1120,
      "pay_kind": "безн",
      "zakazchik": "Ч.Л"
    },
    {
      "nroom": 9,
      "n": 4,
      "fio": "свободно"
    },
    {
      "nroom": 10,
      "n": 1,
      "fio": "ремонт"
    },
    {
      "nroom": 10,
      "n": 2,
      "fio": "ремонт"
    },
    {
      "nroom": 10,
      "n": 3,
      "fio": "ремонт"
    },
    {
      "nroom": 10,
      "n": 4,
      "fio": "ремонт"
    },
    {
      "nroom": 10,
      "n": 5,
      "fio": "ремонт"
    },
    {
      "nroom": 10,
      "n": 6,
      "fio": "ремонт"
    },
    {
      "nroom": 11,
      "n": 1,
      "fio": "уборщица"
    },
    {
      "nroom": 11,
      "n": 2,
      "fio": "свободно"
    },
    {
      "nroom": 12,
      "n": 1,
      "fio": "ИРДАНАЕВ АНВАР АВАЗОРОВИЧ",
      "born_date": 34018,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 12,
      "n": 2,
      "fio": "ИРДОНАЕВ НАВРУЗБЕК АВАЗОВИЧ",
      "born_date": 34732,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 12,
      "n": 3,
      "fio": "МАМАРАИМОВ СОБИР СУЛАЙМОНОВИЧ",
      "born_date": 36892,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 12,
      "n": 4,
      "fio": "МАМАТОВ РУСТАМ ХОЛБОЙЕВИЧ",
      "born_date": 32525,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 12,
      "n": 5,
      "fio": "НАЗАРДОЗА САФАР АШУР",
      "born_date": 35271,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 12,
      "n": 6,
      "fio": "ШЕРМАТОВ АБДУСАТТОР АВАЛОВИЧ",
      "born_date": 31913,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 12,
      "n": 7,
      "fio": "ШЕХОВ САИДАХРОР",
      "born_date": 34700,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 12,
      "n": 8,
      "fio": "РАДЖАБОВ БАХТИЁР",
      "born_date": 35099,
      "gragdanstvo": "ТДЖ",
      "in_date": 44072,
      "zakazchik": "ФЛАГМАН"
    },
    {
      "nroom": 13,
      "n": 1,
      "fio": "СВАНУХАЕВ ВАХА ЛЕМАЕВИЧ",
      "born_date": 34658,
      "gragdanstvo": "РФ",
      "in_date": 44069,
      "zakazchik": "ОТЛИЧИЕ"
    },
    {
      "nroom": 13,
      "n": 2,
      "fio": "ЭЛЬМУРОДОВ ТУЛКИНЖОН БАТИРОВИЧ",
      "born_date": 31495,
      "gragdanstvo": "УЗБ",
      "in_date": 44016,
      "out_date": 44071,
      "pay_date": 44064,
      "pay_kind": "нал",
      "zakazchik": "ОТЛИЧИЕ",
      "comment": 89159948465
    },
    {
      "nroom": 13,
      "n": 3,
      "fio": "АБДУЛЛАЕВ МАМУР МАКСУДОВИЧ",
      "born_date": 34998,
      "gragdanstvo": "УЗБ",
      "in_date": 44048,
      "out_date": 44071,
      "pay_date": 44064,
      "pay_kind": "нал",
      "zakazchik": "ОТЛИЧИЕ",
      "comment": 16000
    },
    {
      "nroom": 13,
      "n": 4,
      "fio": "ЗАЙДОРОВ СИРОЖИДДИН УГЛИ",
      "born_date": 34093,
      "gragdanstvo": "УЗБ",
      "in_date": 44016,
      "out_date": 44071,
      "pay_date": 44064,
      "pay_kind": "нал",
      "zakazchik": "ОТЛИЧИЕ",
      "comment": "АНДРЕЙ"
    },
    {
      "nroom": 13,
      "n": 5,
      "fio": "МАНСУРОВ ДИЛХУШ УГЛИ",
      "born_date": 34365,
      "gragdanstvo": "УЗБ",
      "in_date": 44016,
      "out_date": 44071,
      "pay_date": 44064,
      "pay_kind": "нал",
      "zakazchik": "ОТЛИЧИЕ"
    },
    {
      "nroom": 13,
      "n": 6,
      "fio": "МАНСУРОВ ХУРШИД МУХАМАД  УГЛИ",
      "born_date": 35121,
      "gragdanstvo": "УЗБ",
      "in_date": 44016,
      "out_date": 44071,
      "pay_date": 44064,
      "pay_kind": "нал",
      "zakazchik": "ОТЛИЧИЕ"
    }
  ]

  // $('#example1').bootstrapTable();
  // $('#table').bootstrapTable(({
  //   resizable: true,
  //   headerOnly: true,
  //   data: data,
  //   locale: 'ru-RU'
  // }));
  // ('refresh', {
  // url: 'https://raw.githubusercontent.com/wenzhixin/bootstrap-table-examples/master/json/data1.json'
  // url: 'https://examples.bootstrap-table.com/json/data1.json'
  // });
})