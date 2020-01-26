window.onload = function () {
    var infoSections = document.querySelectorAll(".info-section");
    var descriptions = document.querySelectorAll(".description");
    var isLocked = false;
    infoSections.forEach(function (i) {
        i.addEventListener("mouseover", function () {
            var infoAttribute = i.getAttribute("data-type");
            descriptions.forEach(function (d) {
                var descriptionAttribute = d.getAttribute("data-name");
                if (!isLocked) {
                    if (descriptionAttribute === infoAttribute) {
                        d.classList.add("active");
                    }
                    else {
                        d.classList.remove("active");
                    }
                }
            });
        });
    });
    var scrollTopBtn = document.querySelector(".scroll-top");
    var scrollBtnShow = function () {
        if (scrollY >= 200) {
            scrollTopBtn.classList.add("scroll-top-btn-active");
        }
        else {
            scrollTopBtn.classList.remove("scroll-top-btn-active");
        }
    };
    scrollBtnShow();
    window.addEventListener("scroll", scrollBtnShow);
    scrollTopBtn.addEventListener("mouseover", function () {
        scrollTopBtn.classList.add("scroll-top-hover");
    });
    scrollTopBtn.addEventListener("mouseleave", function () {
        scrollTopBtn.classList.remove("scroll-top-hover");
    });
    scrollTopBtn.addEventListener("click", function () {
        scrollTopBtn.classList.remove("scroll-top-hover");
        scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    });
    var backToPreviousSection = document.querySelector(".back-to-previous-section");
    backToPreviousSection.addEventListener("click", function () {
        infoSections.forEach(function (s) {
            if (s.getAttribute("data-type") === lastSection[lastSection.length - 1]) {
                var sectionCords = s.offsetTop;
                scrollTo({
                    top: sectionCords,
                    left: 0,
                    behavior: "smooth"
                });
                lastSection.length = 0;
            }
        });
    });
    var lockSection = document.querySelectorAll(".lock-section");
    var lastElementClicked = [];
    lockSection.forEach(function (l) {
        l.addEventListener("click", function () {
            var unlockIcon = l.querySelector(".fa-lock-open");
            var lockIcon = l.querySelector(".fa-lock");
            var parentAttribute = l.parentElement.getAttribute("data-type");
            var unlockIcons = document.querySelectorAll(".fa-lock-open");
            var lockIcons = document.querySelectorAll(".fa-lock");
            unlockIcons.forEach(function (icon) {
                icon.classList.remove("locked");
            });
            lockIcons.forEach(function (icon) {
                icon.classList.remove("unlocked");
            });
            lastElementClicked.push(l);
            descriptions.forEach(function (d) {
                if (parentAttribute === d.getAttribute("data-name") &&
                    lastElementClicked[lastElementClicked.length - 1] !==
                        lastElementClicked[lastElementClicked.length - 2]) {
                    lockIcon.classList.add("unlocked");
                    unlockIcon.classList.add("locked");
                    descriptions.forEach(function (description) {
                        description.classList.remove("active");
                    });
                    d.classList.add("active");
                    isLocked = true;
                }
                else if (lastElementClicked[lastElementClicked.length - 1] ===
                    lastElementClicked[lastElementClicked.length - 2]) {
                    lockIcon.classList.remove("unlocked");
                    unlockIcon.classList.remove("locked");
                    lastElementClicked.length = 0;
                    isLocked = false;
                }
            });
        });
    });
    var toggleModeBtn = document.querySelector(".dark-mode-toggle");
    var lightModeOn = document.querySelector(".light-mode");
    var counter = 0;
    toggleModeBtn.addEventListener("click", function () {
        var darkModeOn = document.querySelector(".dark-mode");
        var modeOn = document.querySelector(".mode-on");
        toggleModeBtn.classList.toggle("dark-mode-background-btn");
        lightModeOn.classList.toggle("light-mode-off");
        darkModeOn.classList.toggle("dark-mode-on");
        document.body.classList.toggle("dark-mode-background");
        modeOn.classList.toggle("mode-dark-on");
        infoSections.forEach(function (i) {
            i.classList.toggle("dark-mode-shadow");
        });
        if (counter % 2 === 0) {
            modeOn.textContent = "Dark Mode";
        }
        else
            modeOn.textContent = "Light Mode";
        counter++;
        modeOn.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
            duration: 300,
            fill: "forwards"
        });
    });
    var showRecipeBtn = document.querySelectorAll(".show-recipe-btn");
    var lastSection = [];
    var isClicked = false;
    showRecipeBtn.forEach(function (s) {
        /*scroll up to recipe section*/
        s.addEventListener("click", function () {
            scrollTo({
                top: 100,
                left: 0,
                behavior: "smooth"
            });
            lastSection.push(s.parentElement.parentElement.parentElement.parentElement.getAttribute("data-type"));
            if (!isClicked) {
                backToPreviousSection.animate([
                    { transform: "scaleX(0) translateX(50%)", opacity: 0 },
                    { transform: "scaleX(1) translateX(-50%)", opacity: 1 }
                ], {
                    duration: 500,
                    fill: "forwards"
                });
                isClicked = true;
            }
        });
    });
    var onloadAnimations = function () {
        /* option section onload animate*/
        infoSections.forEach(function (s) {
            var randomNumber = Math.floor(Math.random() * 10);
            var randomNumber1 = Math.floor(Math.random() * 10);
            var randomNumber2 = Math.floor(Math.random() * 10);
            s.animate([
                { transform: "scale(0.6)" },
                {
                    transform: "scale(" + (randomNumber < 5 ? randomNumber / 10 + 0.4 : randomNumber / 10) + ")"
                },
                {
                    transform: "scale(" + (randomNumber1 < 5 ? randomNumber1 / 10 + 0.4 : randomNumber1 / 10) + ")"
                },
                {
                    transform: "scale(" + (randomNumber2 < 5 ? randomNumber2 / 10 + 0.4 : randomNumber2 / 10) + ")"
                },
                { transform: "scale(1)" }
            ], {
                duration: 800
            });
        });
        /*header animation*/
        var header = document.getElementById("header");
        header.animate([
            { transform: "translateX(-250px)", opacity: 0 },
            { transform: "translateX(0)", opacity: 1 }
        ], { duration: 500, fill: "forwards" });
        /*Tooggle btn mode animation*/
        toggleModeBtn.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { duration: 400, fill: "forwards" });
    };
    onloadAnimations();
};
