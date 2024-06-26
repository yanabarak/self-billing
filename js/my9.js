jQuery(document).ready(function ($) {
  // initial for swaping menu
  var myCarousel = document.querySelector('#carouselMenu');
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: false,
    touch: false,
    wrap: false,
  });

  // add vh for mobile (needs for responsive, when bar with url hidding)
  if ($(window).width() < 768) {
    (function init100vh() {
      function setHeight() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
      setHeight();
      window.addEventListener('resize', setHeight);
    })();
  }

  //switch off preloader
  function spinerOff() {
    $('#spinerWrap').addClass('d-none').removeClass('d-flex');
    $(document.body).removeClass('overflow-hidden');
  }

  // initial for toggle menu
  function drawStuff() {
    const cookieName = 'MenuStyle';
    var cookieValue = '';
    const daysToExpire = new Date(2147483647 * 1000).toUTCString();
    !getCookie(cookieName)
      ? (cookieValue = getCookie(cookieName))
      : (cookieValue = getCookie(cookieName));
    if ($(window).width() < 768) {
      $('.asidebar').addClass('collapse').removeClass('fliph left sidebar');
      $('.asidebar').attr('id', 'navigation');
      $('.animated-hamburger').removeClass('open');
    } else if ($(window).width() >= 768) {
      $('.asidebar').addClass('no-anim');
      $('.asidebar').removeClass('collapse');
      if (cookieValue == 'off') {
        $('.asidebar').addClass('fliph');
        $('.animated-hamburger').removeClass('open');
      } else {
        $('.asidebar').removeClass('fliph');
        $('.animated-hamburger').addClass('open');
      }
      $('.asidebar').addClass('sidebar left');
      $('.asidebar').attr('id', '');
      setTimeout(() => $('.asidebar').removeClass('no-anim'), 500);
    }
    $('.navbar-toggler-button').on('click', function () {
      if ($(window).width() >= 768) {
        $('.asidebar.fliph').length ? (cookieValue = 'on') : (cookieValue = 'off');
        document.cookie =
          cookieName + '=' + cookieValue + ';samesite=strict; expires=' + daysToExpire;
        $('.asidebar').toggleClass('fliph');
      }
      $('.animated-hamburger').toggleClass('open');

      if ($('#map').length) {
        setTimeout(function () {
          $('.form-applied').attr('style', `width: ${$('.listWrap').innerWidth()}px`);
        }, 500);
      }
    });
  }

  function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  function mobileAccordion() {
    if ($(window).width() < 768) {
      $('#headingOne').attr('data-bs-toggle', 'collapse');
    }
  }

  //changing date on modal window
  function formatDate(date) {
    if (date != '') {
      return date.replace(new RegExp('-', 'g'), '.');
      // let d = new Date(date),
      //     month = '' + (d.getMonth() + 1),
      //     day = '' + d.getDate(),
      //     year = d.getFullYear();
      // if (month.length < 2)
      //     month = '0' + month;
      // if (day.length < 2)
      //     day = '0' + day;

      // return [day, month, year].join('.');
    } else {
      return date;
    }
  }

  $(function () {
    if ($('.selectpicker').length) {
      $('.selectpicker').selectpicker({
        selectedTextFormat: 'count > 3',
        actionsBox: true,
      });
    }
  });
  $('aside .fa-bell')
    .parent()
    .click(function () {
      $('#shopper-message-modal').modal('show');
    });

  // init popover
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  function notificationPopover() {
    var popoverTriggerList = [].slice.call(
      document.querySelectorAll("a.notif-link[data-bs-toggle='popover']")
    );
    let notif = $('#notif').html();
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl, {
        html: true,
        sanitize: false,
        content: notif,
        container: 'body',
        trigger: 'manual',
        placement: 'bottom',
        customClass: 'notifications-popover',
      });
    });

    $('body').on('click', function (e) {
      $('[data-bs-toggle="popover"]').each(function () {
        if (
          !$(this).is(e.target) &&
          $(this).has(e.target).length === 0 &&
          $('.popover').has(e.target).length === 0
        ) {
          $(this).popover('hide');
        }
      });
    });
  }

  if ($('.datepicker_inline').length) {
    let DateSet = window.SETTINGS
      ? window.SETTINGS
      : { formatSubmit: 'yyyy-mm-dd', editable: true };
    DateSet['editable'] = true;
    DateSet['closeOnSelect'] = false;
    DateSet['closeOnClear'] = false;
    DateSet['selectYears'] = true;
    DateSet['today'] = '';
    DateSet['clear'] = '';
    DateSet['close'] = '';

    var $input = $('.datepicker_inline').pickadate(DateSet);
    var picker = $input.pickadate('picker');
    picker.close = function () {
      return true;
    };
    picker.$node.addClass('picker__input--active picker__input--target');
    picker.$node.attr('aria-expanded', 'true');
    picker.$root.addClass('picker--focused picker--opened');
    picker.$root.attr('aria-hidden', 'false');

    var $input2 = $('.timepicker').pickatime({
      editable: true,
      format: 'HH:i',
      clear: '',
      interval: 15,
    });

    var picker2 = $input2.pickatime('picker');

    $('#setTime button').each(function (index) {
      $(this).on('click', function () {
        let currentDate = new Date();
        picker.set('select', currentDate);
        let min = $(this).attr('data-time');
        let newDate = dateAdd(new Date(), 'minute', min);
        $('#time-inline').val(
          `${newDate.getHours()}:${(newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes()}`
        );
        $(this)
          .closest('#setTime')
          .find('.active')
          .each(function () {
            $(this).removeClass('active');
          });
        $(this).addClass('active');
        if ($('#datetime').length) {
          $('#datetime').trigger('click');
        }
        $('#modalDateTime').modal('hide');
      });
    });
    $('#datetime').click(function () {
      let newDateTime = `${$('#date-inline').val()} ${$('#time-inline').val()}`;
      $('#hidden-input-date').val(newDateTime);
      if ($('.open-datetime').length) {
        $('.open-datetime').html(newDateTime);
        $('.open-datetime').addClass('sec-color');
      }
    });
  }
  $('#floatingSelect').on(
    'changed.bs.select',
    function (e, clickedIndex, isSelected, previousValue) {
      let newLabel = $(e.target[clickedIndex]).attr('aria-label');
      $('label[for="floatingSelect"]').html(newLabel);
    }
  );

  function dateAdd(date, interval, units) {
    if (!(date instanceof Date)) return undefined;
    var ret = new Date(date); //don't change original date
    var checkRollover = function () {
      if (ret.getDate() != date.getDate()) ret.setDate(0);
    };
    switch (String(interval).toLowerCase()) {
      case 'year':
        ret.setFullYear(ret.getFullYear() + units);
        checkRollover();
        break;
      case 'quarter':
        ret.setMonth(ret.getMonth() + 3 * units);
        checkRollover();
        break;
      case 'month':
        ret.setMonth(ret.getMonth() + units);
        checkRollover();
        break;
      case 'week':
        ret.setDate(ret.getDate() + 7 * units);
        break;
      case 'day':
        ret.setDate(ret.getDate() + units);
        break;
      case 'hour':
        ret.setTime(ret.getTime() + units * 3600000);
        break;
      case 'minute':
        ret.setTime(ret.getTime() + units * 60000);
        break;
      case 'second':
        ret.setTime(ret.getTime() + units * 1000);
        break;
      default:
        ret = undefined;
        break;
    }
    return ret;
  }

  var myModalEl = document.querySelectorAll('.modal');
  for (var i = 0; i < myModalEl.length; i++) {
    var self = myModalEl[i];
    self.addEventListener('shown.bs.modal', function (event) {
      $('body').addClass('overflow-hidden');
    });
    self.addEventListener('hide.bs.modal', function (event) {
      $('body').removeClass('overflow-hidden');
    });
  }
  // open on full screen support for all browsers

  (function () {
    var fullScreenApi = {
        supportsFullScreen: false,
        isFullScreen: function () {
          return false;
        },
        requestFullScreen: function () {},
        cancelFullScreen: function () {},
        fullScreenEventName: '',
        prefix: '',
      },
      browserPrefixes = 'webkit moz o ms khtml'.split(' ');
    // check for native support
    if (typeof document.cancelFullScreen != 'undefined') {
      fullScreenApi.supportsFullScreen = true;
    } else {
      // check for fullscreen support by vendor prefix
      for (var i = 0, il = browserPrefixes.length; i < il; i++) {
        fullScreenApi.prefix = browserPrefixes[i];
        if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] != 'undefined') {
          fullScreenApi.supportsFullScreen = true;
          break;
        }
      }
    }
    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
      fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
      fullScreenApi.isFullScreen = function () {
        switch (this.prefix) {
          case '':
            return document.fullScreen;
          case 'webkit':
            return document.webkitIsFullScreen;
          default:
            return document[this.prefix + 'FullScreen'];
        }
      };
      fullScreenApi.requestFullScreen = function (el) {
        return this.prefix === ''
          ? el.requestFullScreen()
          : el[this.prefix + 'RequestFullScreen']();
      };
      fullScreenApi.cancelFullScreen = function (el) {
        return this.prefix === ''
          ? document.cancelFullScreen()
          : document[this.prefix + 'CancelFullScreen']();
      };
    }
    // jQuery plugin
    if (typeof jQuery != 'undefined') {
      jQuery.fn.requestFullScreen = function () {
        return this.each(function () {
          if (fullScreenApi.supportsFullScreen) {
            fullScreenApi.requestFullScreen(this);
          }
        });
      };
    }
    // export api
    window.fullScreenApi = fullScreenApi;
  })();

  function setTab() {
    var triggerTabList = [].slice.call(document.querySelectorAll('a.tab'));

    triggerTabList.forEach(function (triggerEl) {
      var tabTrigger = new bootstrap.Tab(triggerEl);

      triggerEl.addEventListener('click', function (event) {
        event.preventDefault();
        var tab = $(this).data('next');

        fsElement = document.getElementById(tab);
        $(`#${tab}`).addClass('full-screen');
        fullScreenApi.requestFullScreen(fsElement);
        fsElement.addEventListener(
          fullScreenApi.fullScreenEventName,
          function () {
            if (fullScreenApi.isFullScreen()) {
              console.log('Whoa, you went fullscreen');
            } else {
              $(`#${tab}`).removeClass('full-screen');
            }
          },
          true
        );
      });
    });

    var triggerTabListBack = [].slice.call(document.querySelectorAll('.backtotab'));

    triggerTabListBack.forEach(function (triggerEl) {
      var tabTriggerBack = new bootstrap.Tab(triggerEl);

      triggerEl.addEventListener('click', function (event) {
        var tab = $(this).data('next');
        fsElement = document.getElementById(tab);

        fullScreenApi.cancelFullScreen(fsElement);
        $(`#${tab}`).removeClass('full-screen');
      });
    });
  }

  // editDate in pickdate input

  function pickDate2() {
    var target;
    $('.pick-date-modal').on('click', function (e) {
      target = $(this);
      let newDate = $(this).html();
      $('.showdatefrom').html(newDate);
      let order_id = target.closest('form').find('input[name="order_id"]').val();
      $('input[name="change_date_order_id"]').val(order_id);
      $.ajax({
        url: '?Controller=Jobs&Action=ajaxGetAvailableDays',
        method: 'POST',
        data: { order_id: order_id },
        success: function (response) {
          let data = JSON.parse(response);
          if (typeof data.errors !== 'undefined' && data.errors.length == 0) {
            let DateSet = window.SETTINGS ? window.SETTINGS : {};
            data.dates.unshift(true);
            DateSet.disable = data.dates;
            $('.pick-date-disabled').pickadate(DateSet);
            $('#pick-date-modal').modal('show');
          }
        },
      });
    });
  }
  function editDate(dateFormat) {
    let divider = dateFormat.includes('-') ? '-' : '.';
    var triggerTabList = [].slice.call(document.querySelectorAll('.pick-date'));

    triggerTabList.forEach(function (element) {
      var dateMask = IMask(element, {
        mask: dateFormat, // enable date mask

        // other options are optional
        pattern: dateFormat, // Pattern mask with defined blocks, default is 'd{.}`m{.}`Y'
        // you can provide your own blocks definitions, default blocks for date mask are:
        blocks: {
          dd: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2,
          },
          mm: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2,
          },
          yyyy: {
            mask: IMask.MaskedRange,
            from: 1900,
            to: 9999,
          },
        },
        // define date -> str convertion
        format: function (date) {
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();

          if (day < 10) day = '0' + day;
          if (month < 10) month = '0' + month;

          return [year, month, day].join('.');
        },
        // define str -> date convertion
        parse: function (str) {
          var yearMonthDay = str.split(divider);
          return new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2]);
        },

        // optional interval options
        min: new Date(2000, 0, 1), // defaults to `1900-01-01`
        max: new Date(2050, 0, 1), // defaults to `9999-01-01`

        autofix: true, // defaults to `false`

        // also Pattern options can be set
        //lazy: false,

        // and other common options
        overwrite: true, // defaults to `false`
      });

      dateMask.on('complete', function () {
        let date = dateMask.value;
        let elem = $(dateMask.el)[0]['input'];

        $(elem).pickadate('picker').set('select', date, { format: dateFormat });
        dateMask.updateValue(date);
      });
    });
  }
  // show info in popup
  function showInfo() {
    $('.show-info').click(function (e) {
      $('.toast').find('.toast-body').attr('style', ``);
      e.preventDefault();
      let toast = $(e.target).closest('tr').find('.toast');
      $('.toast').each(function (index) {
        if (!(JSON.stringify($(this).html()) == JSON.stringify(toast.html()))) {
          $(this).addClass('hide');
        }
      });

      let left =
        e.target.getBoundingClientRect().left -
        $(e.target).closest('body')[0].getBoundingClientRect().left;
      let bottom =
        $(e.target).closest('tr')[0].getBoundingClientRect().bottom -
        e.target.getBoundingClientRect().bottom;
      if (
        bottom > 20 &&
        $(e.target).closest('tr')[0].getBoundingClientRect().top -
          $(e.target).closest('table')[0].getBoundingClientRect().top >
          200
      ) {
        $(toast).attr('style', `bottom:${bottom}px !important;`);
        console.log(
          $(e.target).closest('tr')[0].getBoundingClientRect().top,
          $(e.target).closest('table')[0].getBoundingClientRect().top
        );
      } else {
        $(toast).addClass('top-0');
        $(toast).removeClass('bottom-0');
        $(toast).attr(
          'style',
          `top:${$(e.target).closest('td')[0].clientHeight / 2 - 40}px !important;`
        );
      }
      if (
        $(e.target).closest('tr')[0].getBoundingClientRect().right -
          e.target.getBoundingClientRect().left <=
        360
      ) {
        let right =
          $(e.target).closest('tr')[0].getBoundingClientRect().right -
          e.target.getBoundingClientRect().left;
        $(toast).css('right', `${right - 25}px`);
        $(toast).addClass('right-0');
      } else {
        $(toast).css('left', `${left}px`);
      }
      $(toast).removeClass('start-0');

      $(toast).toast('show');
    });
  }

  document.querySelectorAll('.drop-zone__input').forEach(inputElement => {
    const dropZoneElement = inputElement.closest('.drop-zone');

    dropZoneElement.addEventListener('click', e => {
      inputElement.click();
    });

    inputElement.addEventListener('change', e => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });

    dropZoneElement.addEventListener('dragover', e => {
      e.preventDefault();
      dropZoneElement.classList.add('drop-zone--over');
    });

    ['dragleave', 'dragend'].forEach(type => {
      dropZoneElement.addEventListener(type, e => {
        dropZoneElement.classList.remove('drop-zone--over');
      });
    });

    dropZoneElement.addEventListener('drop', e => {
      e.preventDefault();

      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }

      dropZoneElement.classList.remove('drop-zone--over');
    });
  });

  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector('.drop-zone__thumb');

    // First time - remove the prompt
    if (dropZoneElement.querySelector('.drop-zone__prompt')) {
      dropZoneElement.querySelector('.drop-zone__prompt').remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement('div');
      thumbnailElement.classList.add('drop-zone__thumb');
      dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }

  //initial all function on load page
  $(window).resize(function () {
    drawStuff();
    if ($('#accordionFormJob').length) {
      mobileAccordion();
    }
  });

  $(document).ready(function () {
    $('.accordion-button a').click(function () {
      if (!$(this).prop('disabled')) {
        window.location.href = $(this).attr('href');
      }
    });

    spinerOff();

    drawStuff();
    if ($('.input-number-buttons').length) {
      $('.input-number-buttons').inputSpinner();
    }

    if ($('tbody.blue-grey-scroll>tr').length) {
      // $("tbody.blue-grey-scroll>tr").closest('table').find("thead>tr").attr("style",`width:${$("tbody.blue-grey-scroll>tr").innerWidth()}px`)
    }
    if ($('a.notif-link').length) {
      notificationPopover();
    }

    if ($('a.show-info').length) {
      showInfo();
    }
    if ($('input[type="radio"][name="payment"]').length) {
      if ($('input[type="radio"][name="payment"]:checked').length) {
        $($('input[type="radio"][name="payment"]').closest('.secure-elem')).removeClass('active');
        $($('input[type="radio"][name="payment"]:checked').closest('.secure-elem')).addClass(
          'active'
        );
        if ($('input[type="radio"][name="payment"]:checked').val() == 'B') {
          $('#collapsePayment').collapse('show');
        } else $('#collapsePayment').collapse('hide');
        $('#proceed').attr('disabled', false);
      } else {
        $('#proceed').attr('disabled', true);
      }
      $('input[type="radio"][name="payment"]').on('change', function (e) {
        if ($(e.target).val() == 'B') {
          $('#collapsePayment').collapse('show');
        } else $('#collapsePayment').collapse('hide');

        $($('input[type="radio"][name="payment"]').closest('.secure-elem')).removeClass('active');
        $($('input[type="radio"][name="payment"]:checked').closest('.secure-elem')).addClass(
          'active'
        );

        $('#proceed').attr('disabled', false);
      });
    }

    if ($('.pick-date').length) {
      let DateSet = window.SETTINGS
        ? window.SETTINGS
        : { formatSubmit: 'yyyy-mm-dd', editable: true };
      DateSet['editable'] = true;
      DateSet['today'] = '';
      DateSet['selectYears'] = true;
      DateSet.format = typeof dateFormat == 'undefined' ? 'dd-mm-yyyy' : dateFormat.toLowerCase();
      $('.pick-date').pickadate(DateSet);
      editDate(DateSet.format);
      pickDate2();
      // pickBranch();
    }

    // $('#collapsePayment').collapse('show');
  });
});
