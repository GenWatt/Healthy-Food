document.body.style.overflow = "hidden";

window.onload = () => {
  /*simulation preloader */
  setTimeout(() => {
    const preloader: Element = document.querySelector(".preloader");
    preloader.classList.add("disappear");
    document.body.style.overflow = "visible";
  }, 300);
  const infoSections: NodeListOf<Element> = document.querySelectorAll(
    ".info-section"
  );
  const descriptions: NodeListOf<Element> = document.querySelectorAll(
    ".description"
  );
  let isLocked: boolean = false;

  infoSections.forEach((i: Element) => {
    i.addEventListener("mouseover", () => {
      const infoAttribute: any = i.getAttribute("data-type");
      descriptions.forEach((d: Element) => {
        const descriptionAttribute: any = d.getAttribute("data-name");

        if (!isLocked) {
          if (descriptionAttribute === infoAttribute) {
            d.classList.add("active");
          } else {
            d.classList.remove("active");
          }
        }
      });
    });
  });
  const scrollTopBtn: Element = document.querySelector(".scroll-top");

  const scrollBtnShow = () => {
    if (scrollY >= 200) {
      scrollTopBtn.classList.add("scroll-top-btn-active");
    } else {
      scrollTopBtn.classList.remove("scroll-top-btn-active");
    }
  };

  scrollBtnShow();
  window.addEventListener("scroll", scrollBtnShow);

  scrollTopBtn.addEventListener("mouseover", () => {
    scrollTopBtn.classList.add("scroll-top-hover");
  });

  scrollTopBtn.addEventListener("mouseleave", () => {
    scrollTopBtn.classList.remove("scroll-top-hover");
  });

  scrollTopBtn.addEventListener("click", () => {
    scrollTopBtn.classList.remove("scroll-top-hover");
    scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });

  const backToPreviousSection: Element = document.querySelector(
    ".back-to-previous-section"
  );

  backToPreviousSection.addEventListener("click", () => {
    infoSections.forEach((s: Element) => {
      if (s.getAttribute("data-type") === lastSection[lastSection.length - 1]) {
        const sectionCords: any = s.offsetTop;

        scrollTo({
          top: sectionCords,
          left: 0,
          behavior: "smooth"
        });
        lastSection.length = 0;
      }
    });
  });

  const lockSection: NodeListOf<Element> = document.querySelectorAll(
    ".lock-section"
  );
  let lastElementClicked: Element[] = [];

  lockSection.forEach((l: Element) => {
    l.addEventListener("click", () => {
      const unlockIcon: Element = l.querySelector(".fa-lock-open");
      const lockIcon: Element = l.querySelector(".fa-lock");
      const parentAttribute: String = l.parentElement.getAttribute("data-type");
      const unlockIcons: NodeListOf<Element> = document.querySelectorAll(
        ".fa-lock-open"
      );
      const lockIcons: NodeListOf<Element> = document.querySelectorAll(
        ".fa-lock"
      );
      unlockIcons.forEach((icon: Element) => {
        icon.classList.remove("locked");
      });

      lockIcons.forEach((icon: Element) => {
        icon.classList.remove("unlocked");
      });
      lastElementClicked.push(l);
      descriptions.forEach((d: Element) => {
        if (
          parentAttribute === d.getAttribute("data-name") &&
          lastElementClicked[lastElementClicked.length - 1] !==
            lastElementClicked[lastElementClicked.length - 2]
        ) {
          lockIcon.classList.add("unlocked");
          unlockIcon.classList.add("locked");
          descriptions.forEach((description: Element) => {
            description.classList.remove("active");
          });
          d.classList.add("active");
          isLocked = true;
        } else if (
          lastElementClicked[lastElementClicked.length - 1] ===
          lastElementClicked[lastElementClicked.length - 2]
        ) {
          lockIcon.classList.remove("unlocked");
          unlockIcon.classList.remove("locked");
          lastElementClicked.length = 0;
          isLocked = false;
        }
      });
    });
  });

  const toggleModeBtn: Element = document.querySelector(".dark-mode-toggle");
  const lightModeOn: Element = document.querySelector(".light-mode");
  let counter: Number | any = 0;

  toggleModeBtn.addEventListener("click", () => {
    const darkModeOn: Element = document.querySelector(".dark-mode");
    const modeOn: Element = document.querySelector(".mode-on");

    toggleModeBtn.classList.toggle("dark-mode-background-btn");
    lightModeOn.classList.toggle("light-mode-off");
    darkModeOn.classList.toggle("dark-mode-on");
    document.body.classList.toggle("dark-mode-background");
    modeOn.classList.toggle("mode-dark-on");
    infoSections.forEach((i: Element) => {
      i.classList.toggle("dark-mode-shadow");
    });
    if (counter % 2 === 0) {
      modeOn.textContent = "Dark Mode";
    } else modeOn.textContent = "Light Mode";
    counter++;
    modeOn.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
      duration: 300,
      fill: "forwards"
    });
  });

  const showRecipeBtn: NodeListOf<Element> = document.querySelectorAll(
    ".show-recipe-btn"
  );
  const lastSection: String[] = [];
  let isClicked: boolean = false;

  showRecipeBtn.forEach(s => {
    /*scroll up to recipe section*/

    s.addEventListener("click", () => {
      scrollTo({
        top: 100,
        left: 0,
        behavior: "smooth"
      });
      lastSection.push(
        s.parentElement.parentElement.parentElement.parentElement.getAttribute(
          "data-type"
        )
      );
      if (!isClicked) {
        backToPreviousSection.animate(
          [
            { transform: "scaleX(0) translateX(50%)", opacity: 0 },
            { transform: "scaleX(1) translateX(-50%)", opacity: 1 }
          ],
          {
            duration: 500,
            fill: "forwards"
          }
        );
        isClicked = true;
      }
    });
  });
  const onloadAnimations = () => {
    /* option section onload animate*/

    infoSections.forEach((s: Element) => {
      const randomNumber: any | Number = Math.floor(Math.random() * 10);
      const randomNumber1: any | Number = Math.floor(Math.random() * 10);
      const randomNumber2: any | Number = Math.floor(Math.random() * 10);
      s.animate(
        [
          { transform: "scale(0.6)" },
          {
            transform: `scale(${
              randomNumber < 5 ? randomNumber / 10 + 0.4 : randomNumber / 10
            })`
          },
          {
            transform: `scale(${
              randomNumber1 < 5 ? randomNumber1 / 10 + 0.4 : randomNumber1 / 10
            })`
          },
          {
            transform: `scale(${
              randomNumber2 < 5 ? randomNumber2 / 10 + 0.4 : randomNumber2 / 10
            })`
          },
          { transform: "scale(1)" }
        ],
        {
          duration: 800
        }
      );
    });
    /*header animation*/
    const header: Element = document.getElementById("header");
    header.animate(
      [
        { transform: "translateX(-250px)", opacity: 0 },
        { transform: "translateX(0)", opacity: 1 }
      ],
      { duration: 500, fill: "forwards" }
    );
    /*Tooggle btn mode animation*/
    toggleModeBtn.animate(
      [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
      { duration: 400, fill: "forwards" }
    );
  };

  onloadAnimations();
};
