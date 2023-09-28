let secTions = document.querySelectorAll("section");
let scrollEfs = document.querySelectorAll(".scrollEffect .ef");

window.onscroll = () => {
  secTions.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 300;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      scrollEfs.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector(".scrollEffect .ef[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

