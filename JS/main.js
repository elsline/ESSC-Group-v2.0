// page Load Animation

// Wait for the page to load
window.addEventListener("load", function () {
  // Get the page loader and content elements
  const pageLoader = document.querySelector(".page-loader");
  const content = document.querySelector(".content");

  // Fade out the loader
  setTimeout(function () {
    pageLoader.style.opacity = "0";
  }, 1000); // Adjust the duration as needed

  // Hide the loader and fade in the content
  setTimeout(function () {
    pageLoader.style.display = "none";
    content.style.opacity = "1";
  }, 1000); // Adjust the duration as needed
});

// Handle fading out with background color when navigating away (e.g., clicking a link)
window.addEventListener("beforeunload", function () {
  const pageLoader = document.querySelector(".page-loader");
  pageLoader.style.display = "block"; // Show loader
  pageLoader.style.opacity = "1"; // Make it fully visible
});

// page Load Animation

// create a function that make All fade animation

// Fade Up
document.addEventListener("DOMContentLoaded", function () {
  const fadeUpElements = document.querySelectorAll(".fade-up");
});

// Fade Up

// Fade Down
document.addEventListener("DOMContentLoaded", function () {
  const fadeDownElements = document.querySelectorAll(".fade-down");
});

// Fade-Down

// fade left and right

document.addEventListener("DOMContentLoaded", function () {
  const fadeLeftElements = document.querySelectorAll(".fade-left");
  const fadeRightElements = document.querySelectorAll(".fade-right");
});

// Fade in

document.addEventListener("DOMContentLoaded", function () {
  const fadeInElements = document.querySelectorAll(".fade-in");
});

////////////

// scroll function

var ScrollOut = (function () {
  "use strict";

  function clamp(v, min, max) {
    return min > v ? min : max < v ? max : v;
  }
  function sign(x) {
    return +(x > 0) - +(x < 0);
  }
  function round(n) {
    return Math.round(n * 10000) / 10000;
  }

  var cache = {};
  function replacer(match) {
    return "-" + match[0].toLowerCase();
  }
  function hyphenate(value) {
    return cache[value] || (cache[value] = value.replace(/([A-Z])/g, replacer));
  }

  /** find elements */
  function $(e, parent) {
    return !e || e.length === 0
      ? // null or empty string returns empty array
        []
      : e.nodeName
      ? // a single element is wrapped in an array
        [e]
      : // selector and NodeList are converted to Element[]
        [].slice.call(
          e[0].nodeName
            ? e
            : (parent || document.documentElement).querySelectorAll(e)
        );
  }
  function setAttrs(el, attrs) {
    // tslint:disable-next-line:forin
    for (var key in attrs) {
      if (key.indexOf("_")) {
        el.setAttribute("data-" + hyphenate(key), attrs[key]);
      }
    }
  }
  function setProps(cssProps) {
    return function (el, props) {
      for (var key in props) {
        if (key.indexOf("_") && (cssProps === true || cssProps[key])) {
          el.style.setProperty("--" + hyphenate(key), round(props[key]));
        }
      }
    };
  }

  var clearTask;
  var subscribers = [];
  function loop() {
    clearTask = 0;
    subscribers.slice().forEach(function (s2) {
      return s2();
    });
    enqueue();
  }
  function enqueue() {
    if (!clearTask && subscribers.length) {
      clearTask = requestAnimationFrame(loop);
    }
  }
  function subscribe(fn) {
    subscribers.push(fn);
    enqueue();
    return function () {
      subscribers = subscribers.filter(function (s) {
        return s !== fn;
      });
      if (!subscribers.length && clearTask) {
        cancelAnimationFrame(clearTask);
        clearTask = 0;
      }
    };
  }

  function unwrap(value, el, ctx, doc) {
    return typeof value === "function" ? value(el, ctx, doc) : value;
  }
  function noop() {}

  /**
   * Creates a new instance of ScrollOut that marks elements in the viewport with
   * an "in" class and marks elements outside of the viewport with an "out"
   */
  // tslint:disable-next-line:no-default-export
  function main(opts) {
    // Apply default options.
    opts = opts || {};
    // Debounce onChange/onHidden/onShown.
    var onChange = opts.onChange || noop;
    var onHidden = opts.onHidden || noop;
    var onShown = opts.onShown || noop;
    var onScroll = opts.onScroll || noop;
    var props = opts.cssProps ? setProps(opts.cssProps) : noop;
    var se = opts.scrollingElement;
    var container = se ? $(se)[0] : window;
    var doc = se ? $(se)[0] : document.documentElement;
    var rootChanged = false;
    var scrollingElementContext = {};
    var elementContextList = [];
    var clientOffsetX, clientOffsety;
    var sub;
    function index() {
      elementContextList = $(
        opts.targets || "[data-scroll]",
        $(opts.scope || doc)[0]
      ).map(function (el) {
        return { element: el };
      });
    }
    function update() {
      // Calculate position, direction and ratio.
      var clientWidth = doc.clientWidth;
      var clientHeight = doc.clientHeight;
      var scrollDirX = sign(
        -clientOffsetX + (clientOffsetX = doc.scrollLeft || window.pageXOffset)
      );
      var scrollDirY = sign(
        -clientOffsety + (clientOffsety = doc.scrollTop || window.pageYOffset)
      );
      var scrollPercentX =
        doc.scrollLeft / (doc.scrollWidth - clientWidth || 1);
      var scrollPercentY =
        doc.scrollTop / (doc.scrollHeight - clientHeight || 1);
      // Detect if the root context has changed.
      rootChanged =
        rootChanged ||
        scrollingElementContext.scrollDirX !== scrollDirX ||
        scrollingElementContext.scrollDirY !== scrollDirY ||
        scrollingElementContext.scrollPercentX !== scrollPercentX ||
        scrollingElementContext.scrollPercentY !== scrollPercentY;
      scrollingElementContext.scrollDirX = scrollDirX;
      scrollingElementContext.scrollDirY = scrollDirY;
      scrollingElementContext.scrollPercentX = scrollPercentX;
      scrollingElementContext.scrollPercentY = scrollPercentY;
      var childChanged = false;
      for (var index_1 = 0; index_1 < elementContextList.length; index_1++) {
        var ctx = elementContextList[index_1];
        var element = ctx.element;
        // find the distance from the element to the scrolling container
        var target = element;
        var offsetX = 0;
        var offsetY = 0;
        do {
          offsetX += target.offsetLeft;
          offsetY += target.offsetTop;
          target = target.offsetParent;
        } while (target && target !== container);
        // Get element dimensions.
        var elementHeight = element.clientHeight || element.offsetHeight || 0;
        var elementWidth = element.clientWidth || element.offsetWidth || 0;
        // Find visible ratios for each element.
        var visibleX =
          (clamp(
            offsetX + elementWidth,
            clientOffsetX,
            clientOffsetX + clientWidth
          ) -
            clamp(offsetX, clientOffsetX, clientOffsetX + clientWidth)) /
          elementWidth;
        var visibleY =
          (clamp(
            offsetY + elementHeight,
            clientOffsety,
            clientOffsety + clientHeight
          ) -
            clamp(offsetY, clientOffsety, clientOffsety + clientHeight)) /
          elementHeight;
        var intersectX = visibleX === 1 ? 0 : sign(offsetX - clientOffsetX);
        var intersectY = visibleY === 1 ? 0 : sign(offsetY - clientOffsety);
        var viewportX = clamp(
          (clientOffsetX - (elementWidth / 2 + offsetX - clientWidth / 2)) /
            (clientWidth / 2),
          -1,
          1
        );
        var viewportY = clamp(
          (clientOffsety - (elementHeight / 2 + offsetY - clientHeight / 2)) /
            (clientHeight / 2),
          -1,
          1
        );
        var visible = void 0;
        if (opts.offset) {
          visible =
            unwrap(opts.offset, element, ctx, doc) <= clientOffsety ? 1 : 0;
        } else if (
          (unwrap(opts.threshold, element, ctx, doc) || 0) <
          visibleX * visibleY
        ) {
          visible = 1;
        } else {
          visible = 0;
        }
        var changedVisible = ctx.visible !== visible;
        var changed =
          ctx._changed ||
          changedVisible ||
          ctx.visibleX !== visibleX ||
          ctx.visibleY !== visibleY ||
          ctx.index !== index_1 ||
          ctx.elementHeight !== elementHeight ||
          ctx.elementWidth !== elementWidth ||
          ctx.offsetX !== offsetX ||
          ctx.offsetY !== offsetY ||
          ctx.intersectX !== ctx.intersectX ||
          ctx.intersectY !== ctx.intersectY ||
          ctx.viewportX !== viewportX ||
          ctx.viewportY !== viewportY;
        if (changed) {
          childChanged = true;
          ctx._changed = true;
          ctx._visibleChanged = changedVisible;
          ctx.visible = visible;
          ctx.elementHeight = elementHeight;
          ctx.elementWidth = elementWidth;
          ctx.index = index_1;
          ctx.offsetX = offsetX;
          ctx.offsetY = offsetY;
          ctx.visibleX = visibleX;
          ctx.visibleY = visibleY;
          ctx.intersectX = intersectX;
          ctx.intersectY = intersectY;
          ctx.viewportX = viewportX;
          ctx.viewportY = viewportY;
          ctx.visible = visible;
        }
      }
      if (!sub && (rootChanged || childChanged)) {
        sub = subscribe(render);
      }
    }
    function render() {
      maybeUnsubscribe();
      // Update root attributes if they have changed.
      if (rootChanged) {
        rootChanged = false;
        setAttrs(doc, {
          scrollDirX: scrollingElementContext.scrollDirX,
          scrollDirY: scrollingElementContext.scrollDirY,
        });
        props(doc, scrollingElementContext);
        onScroll(doc, scrollingElementContext, elementContextList);
      }
      var len = elementContextList.length;
      for (var x = len - 1; x > -1; x--) {
        var ctx = elementContextList[x];
        var el = ctx.element;
        var visible = ctx.visible;
        var justOnce = el.hasAttribute("scrollout-once") || false; // Once
        if (ctx._changed) {
          ctx._changed = false;
          props(el, ctx);
        }
        if (ctx._visibleChanged) {
          setAttrs(el, { scroll: visible ? "in" : "out" });
          onChange(el, ctx, doc);
          (visible ? onShown : onHidden)(el, ctx, doc);
        }
        // if this is shown multiple times, keep it in the list
        if (visible && (opts.once || justOnce)) {
          // or if this element just display it once
          elementContextList.splice(x, 1);
        }
      }
    }
    function maybeUnsubscribe() {
      if (sub) {
        sub();
        sub = undefined;
      }
    }
    // Run initialize index.
    index();
    update();
    render();
    // Collapses sequential updates into a single update.
    var updateTaskId = 0;
    var onUpdate = function () {
      updateTaskId =
        updateTaskId ||
        setTimeout(function () {
          updateTaskId = 0;
          update();
        }, 0);
    };
    // Hook up document listeners to automatically detect changes.
    window.addEventListener("resize", onUpdate);
    container.addEventListener("scroll", onUpdate);
    return {
      index: index,
      update: update,
      teardown: function () {
        maybeUnsubscribe();
        window.removeEventListener("resize", onUpdate);
        container.removeEventListener("scroll", onUpdate);
      },
    };
  }

  return main;
})();

ScrollOut({
  targets: "header,div,img,section,h1,nav,a,span,li",
});

// scroll function

// create function to open mega menu by click

let megaIcon = document.querySelector(".cont-megaIcon");
let megaMenu = document.querySelector(".mega-menu");
let closeIcon = document.querySelector(".close-icon");
const content = document.querySelector(".content");

megaIcon.addEventListener("click", function (e) {
  e.stopPropagation();
  megaMenu.classList.toggle("active");
});

content.addEventListener("click", function () {
  megaMenu.classList.remove("active");
});
closeIcon.addEventListener("click", function () {
  megaMenu.classList.remove("active");
});
//

//make function to counter the progress

let nums = document.querySelectorAll(".prog .num");
let section = document.querySelector(".prog-section");
let started = false;

window.onscroll = function () {
  if (window.scrollY >= section.offsetLeft) {
    if (!started) {
      nums.forEach((num) => starCount(num));
    }
    started = true;
  }
};

function starCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
    if (goal !== "1996") {
      el.textContent = "+" + el.textContent; // Add a plus sign before the number
    }
  }, 5000 / goal);
}

// Swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    0: { slidesPerView: 1 },
    990: {
      slidesPerView: 3,
    },
  },
});
var swiper = new Swiper(".mySwiperr", {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true, // Enable infinite loop
  autoplay: {
    delay: 2000, // Set the delay between slides (in milliseconds)
    disableOnInteraction: false, // Continue autoplay even when user interacts with the slider
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    0: { slidesPerView: 1 },
    540: {
      slidesPerView: 2,
    },
    990: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 3,
    },
    1300: {
      slidesPerView: 3,
    },
  },
});

// Function make animation for the section
let getStartedLink = document.querySelector(".mini-section");
let getStartedSpan = document.querySelector(".getStarted span");
let getStartedP = document.querySelector(".getStarted .fast");
getStartedLink.addEventListener("mouseover", function () {
  getStartedP.classList.add("active");
});
getStartedLink.addEventListener("mouseout", function () {
  getStartedP.classList.remove("active");
});

let lastScrollPosition = window.scrollY;

//////////////////

// function Call me

function makeCall() {
  // Specify the phone number you want to call
  var phoneNumber = "+201001303001"; // Replace with the actual phone number

  // Use the "tel" URI scheme to open the call app
  window.location.href = "tel:" + phoneNumber;
}
function makeCall1() {
  // Specify the phone number you want to call
  var phoneNumber = "+201001303001"; // Replace with the actual phone number

  // Use the "tel" URI scheme to open the call app
  window.location.href = "tel:" + phoneNumber;
}
function makeCall2() {
  // Specify the phone number you want to call
  var phoneNumber = "+201111101331"; // Replace with the actual phone number

  // Use the "tel" URI scheme to open the call app
  window.location.href = "tel:" + phoneNumber;
}

// function Mail me

function sendEmail() {
  // Specify the email address you want to send an email to
  var emailAddress = "Hesham.mamesh@esccgroup.com"; // Replace with the actual email address

  // Use the "mailto" URI scheme to open the default email client
  window.location.href = "mailto:" + emailAddress;
}
function sendEmail1() {
  // Specify the email address you want to send an email to
  var emailAddress = "Hesham.mamesh@esccgroup.com"; // Replace with the actual email address

  // Use the "mailto" URI scheme to open the default email client
  window.location.href = "mailto:" + emailAddress;
}
function sendEmail2() {
  // Specify the email address you want to send an email to
  var emailAddress = "Karim.mamesh@esccgroup.com"; // Replace with the actual email address

  // Use the "mailto" URI scheme to open the default email client
  window.location.href = "mailto:" + emailAddress;
}

function sendEmaill() {
  let emailAddress = "Hesham.mamesh@esccgroup.com";
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let phone = document.querySelector(".phone").value;
  let message = document.querySelector(".message").value;

  var emailSubject = "i'm looking to work with you";
  var emailBody =
    "Name: " +
    name +
    "\n" +
    "Email: " +
    email +
    "\n" +
    "Phone: " +
    phone +
    "\n" +
    "Message: " +
    message +
    "\n\n" +
    "";

  var mailtoUrl =
    "mailto:" +
    emailAddress +
    "?subject=" +
    encodeURIComponent(emailSubject) +
    "&body=" +
    encodeURIComponent(emailBody);

  // Attempt to open the default email application
  var emailWindow = window.open(mailtoUrl, "_blank");
}

function scrollDownSwitch() {
  var scrollDown = document.querySelector(".scrollDown");
  var scrollUp = document.querySelector(".scrollUp");
  var howSection = document.querySelector(".howWeWork");
  var footerSection = document.querySelector("footer");
  var sectionRect = footerSection.getBoundingClientRect();
  if (sectionRect.top <= window.innerHeight && sectionRect.bottom >= 0) {
    scrollDown.classList.add("hidden");
    scrollUp.classList.remove("hidden");
  } else {
    scrollDown.classList.remove("hidden");
    scrollUp.classList.add("hidden");
  }
}
window.addEventListener("scroll", scrollDownSwitch);

function fadeInElement() {
  var element = document.querySelector(".scrollDown");
  var startSection = document.querySelector(".about-landing-text");

  var sectionRect = startSection.getBoundingClientRect();

  if (sectionRect.top <= window.innerHeight && sectionRect.bottom >= 0) {
    element.classList.add("hidden");
  } else {
  }
}

window.addEventListener("scroll", fadeInElement);

/////

function fadeInElement2() {
  var startSection = document.querySelector("footer p");
  var element = document.querySelector(".scrollEffect .ef4");

  var sectionRect = startSection.getBoundingClientRect();

  if (sectionRect.top <= window.innerHeight && sectionRect.bottom >= 0) {
    element.classList.remove("active");
  } else {
    element.style.opacity = 1;
  }
}

window.addEventListener("scroll", fadeInElement2);

//

function validatePhoneNumber(event) {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode !== 43 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
  }
}

// ///
// function that Pause the animation for 5 seconds
document.addEventListener("DOMContentLoaded", function () {
  const element = document.querySelector(".mouse .dott");

  function toggleAnimation() {
    element.style.animationPlayState = "paused";
    setTimeout(function () {
      element.style.animationPlayState = "running";
      setTimeout(toggleAnimation, 5000);
    }, 5000); // Pause for 5 seconds
  }

  setTimeout(toggleAnimation, 5000); // Start after 5 seconds
});

let = getStartedLink = document.querySelector(".getStarted");

document.querySelector(".swiper-slide1").addEventListener("click", function () {
  window.location.href = "proj01.html";
});
document.querySelector(".swiper-slide2").addEventListener("click", function () {
  window.location.href = "proj02.html";
});
document.querySelector(".swiper-slide3").addEventListener("click", function () {
  window.location.href = "proj03.html";
});
document.querySelector(".swiper-slide4").addEventListener("click", function () {
  window.location.href = "proj04.html";
});
document.querySelector(".swiper-slide5").addEventListener("click", function () {
  window.location.href = "proj05.html";
});
document.querySelector(".swiper-slide6").addEventListener("click", function () {
  window.location.href = "proj06.html";
});
document.querySelector(".swiper-slide7").addEventListener("click", function () {
  window.location.href = "proj07.html";
});
document.querySelector(".swiper-slide8").addEventListener("click", function () {
  window.location.href = "proj08.html";
});
document.querySelector(".swiper-slide9").addEventListener("click", function () {
  window.location.href = "proj09.html";
});
document
  .querySelector(".swiper-slide10")
  .addEventListener("click", function () {
    window.location.href = "proj10.html";
  });
document
  .querySelector(".swiper-slide11")
  .addEventListener("click", function () {
    window.location.href = "proj11.html";
  });
document
  .querySelector(".swiper-slide12")
  .addEventListener("click", function () {
    window.location.href = "proj12.html";
  });

