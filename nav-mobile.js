document.addEventListener("DOMContentLoaded", function () {
    var sequence = ["1", "9", "6", "0"];
    var typed = [];
    var wauTimer;

    function triggerWauMode() {
        var wauMessage = document.getElementById("wau-message");
        if (!wauMessage) {
            wauMessage = document.createElement("div");
            wauMessage.id = "wau-message";
            wauMessage.textContent = "WAU";
            var hero = document.querySelector(".hero");
            if (hero) {
                hero.insertAdjacentElement("afterend", wauMessage);
            } else {
                document.body.appendChild(wauMessage);
            }
        }

        document.body.classList.add("wau-mode");
        clearTimeout(wauTimer);
        wauTimer = setTimeout(function () {
            document.body.classList.remove("wau-mode");
        }, 3000);
    }

    document.addEventListener("keydown", function (event) {
        if (!/^\d$/.test(event.key)) {
            typed = [];
            return;
        }

        typed.push(event.key);
        if (typed.length > sequence.length) {
            typed.shift();
        }

        if (typed.join("") === sequence.join("")) {
            typed = [];
            triggerWauMode();
        }
    });

    var coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    var containers = document.querySelectorAll(".nav-box-container");

    function closeAllMenus() {
        containers.forEach(function (container) {
            container.classList.remove("open");
        });
    }

    if (coarsePointer) {
        containers.forEach(function (container) {
            var trigger = container.querySelector(".nav-trigger");
            if (!trigger) {
                return;
            }

            trigger.addEventListener("click", function (event) {
                var isOpen = container.classList.contains("open");
                if (!isOpen) {
                    event.preventDefault();
                    closeAllMenus();
                    container.classList.add("open");
                }
            });
        });

        function closeAllSourceNotes() {
            document.querySelectorAll(".image-source-note.show-source").forEach(function (note) {
                note.classList.remove("show-source");
            });
        }

        document.querySelectorAll("img.right-image, img.left-image, img.content-img").forEach(function (img) {
            var note = img.nextElementSibling;
            if (!note || !note.classList.contains("image-source-note")) {
                return;
            }

            img.addEventListener("click", function (event) {
                event.stopPropagation();
                var willOpen = !note.classList.contains("show-source");
                closeAllSourceNotes();
                if (willOpen) {
                    note.classList.add("show-source");
                }
            });

            note.addEventListener("click", function (event) {
                event.stopPropagation();
            });
        });

        document.addEventListener("click", function (event) {
            var clickedInsideMenu = event.target.closest(".nav-box-container");
            if (!clickedInsideMenu) {
                closeAllMenus();
            }
            if (!event.target.closest(".image-source-note") && !event.target.closest("img.right-image, img.left-image, img.content-img")) {
                closeAllSourceNotes();
            }
        });
    }
});
