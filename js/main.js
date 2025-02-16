(function ($) {
  "use strict";

  /*-------------------------------------
    Sidebar
    -------------------------------------*/
  if ($(window).width() > 991) {
    $(".btn-toggle").on("click", function () {
      if ($("body").hasClass("open-sidebar")) {
        $(".fxt-page-content")
          .find(".active-animation")
          .each(function () {
            $(this).removeClass("active-animation");
          });
      } else {
        runObserver();
      }
      $("body").toggleClass("open-sidebar");
    });
  }

  /*-------------------------------------
    On Load
    -------------------------------------*/
  $(window).on("load resize", function () {
    $("body")
      .imagesLoaded()
      .done(function (instance) {
        $("body").addClass("loaded");
      });

    $('[data-type="section-switch"], #triger-page-content').on(
      "click",
      function () {
        if (
          location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
          location.hostname == this.hostname
        ) {
          var target = $(this.hash);
          if (target.length > 0) {
            target = target.length
              ? target
              : $("[name=" + this.hash.slice(1) + "]");
            $("html,body").animate(
              {
                scrollTop: target.offset().top,
              },
              1000
            );
            return false;
          }
        }
      }
    );
  });

  /*-------------------------------------
    Intersection Observer
    -------------------------------------*/
  function runObserver() {
    if (!!window.IntersectionObserver) {
      let observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active-animation");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "0px 0px -150px 0px",
        }
      );
      document.querySelectorAll(".has-animation").forEach((block) => {
        observer.observe(block);
      });
    } else {
      document.querySelectorAll(".has-animation").forEach((block) => {
        block.classList.remove("has-animation");
      });
    }
  }

  runObserver();

  /*-------------------------------------
	Section background image
	-------------------------------------*/
  $("[data-bg-image]").each(function () {
    var img = $(this).data("bg-image");
    $(this).css({
      backgroundImage: "url(" + img + ")",
    });
  });

  /*-------------------------------------
    Subscribe Form Activation
    -------------------------------------*/
  $("[data-pixsaas]").each(function () {
    var $this = $(this);
    $(".form-result", $this).css("display", "none");

    $this.submit(function () {
      $('button[type="submit"]', $this).addClass("clicked");

      // Create a object and assign all fields name and value.
      var values = {};

      $("[name]", $this).each(function () {
        var $this = $(this),
          $name = $this.attr("name"),
          $value = $this.val();
        values[$name] = $value;
      });

      // Make Request
      $.ajax({
        url: $this.attr("action"),
        type: "POST",
        data: values,
        success: function success(data) {
          if (data.error == true) {
            $(".form-result", $this)
              .addClass("alert-warning")
              .removeClass("alert-success alert-danger")
              .fadeIn(300)
              .show()
              .delay(4800)
              .fadeOut(300);
          } else {
            $(".form-result", $this)
              .addClass("alert-success")
              .removeClass("alert-warning alert-danger")
              .fadeIn(300)
              .show()
              .delay(4500)
              .fadeOut(300);
          }
          $(".form-result > .content", $this).html(data.message);
          $('button[type="submit"]', $this).removeClass("clicked");
          $this.trigger("reset");
        },
        error: function error() {
          $(".form-result", $this)
            .addClass("alert-danger")
            .removeClass("alert-warning alert-success")
            .css("display", "block");
          $(".form-result > .content", $this).html("Sorry, an error occurred.");
          $('button[type="submit"]', $this).removeClass("clicked");
        },
      });
      return false;
    });
  });

  $("#subscribe-button").on("click", function () {
    $("#subscribe-input-group").addClass("group-hidden");
    setTimeout(RemoveClass, 6000);
  });
  function RemoveClass() {
    $("#subscribe-input-group").removeClass("group-hidden");
  }

  /*-------------------------------------
    Contact Form initiating
    -------------------------------------*/
  var contactForm = $("#contact-form");
  if (contactForm.length) {
    contactForm.validator().on("submit", function (e) {
      var $this = $(this),
        $target = contactForm.find(".form-response");
      if (e.isDefaultPrevented()) {
        $target.html(
          "<div class='alert alert-success'><p>Please select all required field.</p></div>"
        );
      } else {
        $.ajax({
          url: "php/mailer.php",
          type: "POST",
          data: contactForm.serialize(),
          beforeSend: function () {
            $target.html(
              "<div class='alert alert-info'><p>Loading ...</p></div>"
            );
          },
          success: function (text) {
            if (text === "success") {
              $this[0].reset();
              $target.html(
                "<div class='alert alert-success'><p>Email Sent. We Will Contact You Soon. Thank You.</p></div>"
              );
            } else {
              $target.html(
                "<div class='alert alert-success'><p>" + text + "</p></div>"
              );
            }
          },
        });
        return false;
      }
    });
  }

  /*-------------------------------------
    Countdown activation code
    -------------------------------------*/
  $(function () {
    var eventCounter = $(".countdown");
    if (eventCounter.length) {
      eventCounter.countdown("2024/01/23", function (e) {
        $(this).html(
          e.strftime(
            "<div class='countdown-section'><div><div class='countdown-number'>%D</div> <div class='countdown-unit'>Day%!D</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%H</div> <div class='countdown-unit'>Hour%!H</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%M</div> <div class='countdown-unit'>Minutes</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%S</div> <div class='countdown-unit'>Second</div> </div></div>"
          )
        );
      });
    }
  });
})(jQuery);
