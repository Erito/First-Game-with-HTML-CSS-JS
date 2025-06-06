// RESPAWN
var character = document.querySelector(".character");
var map = document.querySelector(".map");
var x = 10;
var y = 180;
var held_directions = [];
var speed = 1;
// Jalannya
let canWalk = localStorage.getItem("canWalk") === "true";
const placeCharacter = () => {
    if (!canWalk) return;
    var pixelSize = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--pixel-size")
    );
    const held_direction = held_directions[0];
    if (held_direction) {
        if (held_direction === directions.right) {
            x += speed;
        }
        if (held_direction === directions.left) {
            x -= speed;
        }
        if (held_direction === directions.down) {
            y += speed;
        }
        if (held_direction === directions.up) {
            y -= speed;
        }
        character.setAttribute("facing", held_direction);
    }
    character.setAttribute("walking", held_direction ? "true" : "false");
    // WALL
    var leftLimit = -5;
    var rightLimit = 960;
    var topLimit = 130;
    var bottomLimit = 225;
    if (x < leftLimit) {
        x = leftLimit;
    }
    if (x > rightLimit) {
        x = rightLimit;
    }
    if (y < topLimit) {
        y = topLimit;
    }
    if (y > bottomLimit) {
        y = bottomLimit;
    }
    var camera_left = pixelSize * 66;
    var camera_top = pixelSize * 42;
    map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top
        }px, 0 )`;
    character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize
        }px, 0 )`;
};
const step = () => {
    placeCharacter();
    window.requestAnimationFrame(() => {
        step();
    });
};
step();

//TOMBOL MAP
document.addEventListener("DOMContentLoaded", function () {
    const character = document.querySelector(".button-map");
    const button = document.createElement("button");
    button.textContent = "Open Map";
    button.className = "map-button ";
    character.appendChild(button);
    function checkPosition() {
        // Koordinat tombol MAP
        const mapX = 970;
        const mapY = 195;
        const range = 40;
        if (Math.abs(x - mapX) < range && Math.abs(y - mapY) < range) {
            button.classList.remove("hidden");
        } else {
            button.classList.add("hidden");
        }
    }
    setInterval(checkPosition, 200);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !button.classList.contains("hidden")) {
            button.click();
        }
    });
    button.addEventListener("click", function () {
        localStorage.setItem("canWalk", "false");
        window.location.href = "./asset/maps/map.html";
    });
});

//TOMBOL BUAT JALAN
document.addEventListener("DOMContentLoaded", function () {
    let button_container = document.querySelector(".button-jalan");
    let button = document.createElement("button");
    button.className = "jalan-button";
    button.textContent = "Jalan";
    button_container.appendChild(button);
    if (canWalk) {
        button.classList.add("hidden");
        button.disabled = true;
    }
    function spawnButtonJalan() {
        const jalanX = 10;
        const jalanY = 180;
        const range = 15;
        if (!canWalk && Math.abs(x - jalanX) < range && Math.abs(y - jalanY) < range) {
            button.classList.remove("hidden");
        } else {
            button.classList.add("hidden");
        }
    }
    setInterval(spawnButtonJalan, 200);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !button.classList.contains("hidden")) {
            button.click();
        }
    });
    button.addEventListener("click", function () {
        alert("-$15");
        decrementUang(15);
        incrementhappyBar(30);
        canWalk = true;
        localStorage.setItem("canWalk", "true");
        button.classList.add("hidden");
        button.disabled = true;
        location.reload();
    });
});

//TOMBOL BUAT FOTO
document.addEventListener("DOMContentLoaded", function () {
    let button_container = document.querySelector(".button-foto");
    let button = document.createElement("button");
    button.className = "foto-button";
    button.textContent = "Patung Liberty";
    button_container.appendChild(button);
    function spawnButtonFoto() {
        const fotoX = 920;
        const fotoY = 110;
        const range = 35;
        if (Math.abs(x - fotoX) < range && Math.abs(y - fotoY) < range) {
            button.classList.remove("hidden");
        } else {
            button.classList.add("hidden");
        }
    }
    setInterval(spawnButtonFoto, 200);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !button.classList.contains("hidden")) {
            button.click();
        }
    });
    button.addEventListener("click", function () {
        blackScreen.style.opacity = "1"; // Fade in
        blackScreen.style.pointerEvents = "auto";
        setTimeout(() => {
            alert("Kamu sedang foto foto didepan Patung Liberty");
            checkQuestCompletion("fotoUSA");
            blackScreen.style.opacity = "0"; // Fade out
            blackScreen.style.pointerEvents = "none";
        }, 1500);
    });
});

//TOMBOL BUAT MANDI
document.addEventListener("DOMContentLoaded", function () {
    let button_container = document.querySelector(".button-mandi");
    let button = document.createElement("button");
    button.className = "mandi-button";
    button.textContent = "Mandi";
    button_container.appendChild(button);
    function spawnButtonMandi() {
        const mandiX = 400;
        const mandiY = 135;
        const range = 15;
        if (Math.abs(x - mandiX) < range && Math.abs(y - mandiY) < range) {
            button.classList.remove("hidden");
        } else {
            button.classList.add("hidden");
        }
    }
    setInterval(spawnButtonMandi, 200);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !button.classList.contains("hidden")) {
            button.click();
        }
    });
    button.addEventListener("click", function () {
        blackScreen.style.opacity = "1"; // Fade in
        blackScreen.style.pointerEvents = "auto";
        setTimeout(() => {
            incrementShowerBar(100);
            updateShowerBar();
            alert("Kamu sedang mandi");
            blackScreen.style.opacity = "0"; // Fade out
            blackScreen.style.pointerEvents = "none";
        }, 1500);
    });
});

//TOMBOL BUAT MAKAN
document.addEventListener("DOMContentLoaded", function () {
    let button_container = document.querySelector(".button-makan");
    let button = document.createElement("button");
    button.className = "makan-button";
    button.textContent = "Makan";
    button_container.appendChild(button);
    let makanOptions = document.createElement("div");
    makanOptions.className = "makan-options hidden";
    button_container.appendChild(makanOptions);

    // Add makan options
    const foods = [
        { name: "Mac & Cheese", cost: "$2", harga: 2, addBar: 20 },
        { name: "Fish & Chip", cost: "$4", harga: 4, addBar: 40 },
        { name: "Steak", cost: "$5", harga: 1, addBar: 50 }
    ];
    foods.forEach(food => {
        let foodButton = document.createElement("button");
        foodButton.textContent = food.name;
        let infoIcon = document.createElement("span");
        infoIcon.textContent = " (i) ";
        infoIcon.className = "info-icon";
        infoIcon.setAttribute("data-cost", `Harga: ${food.cost}`);
        foodButton.appendChild(infoIcon);
        makanOptions.appendChild(foodButton);
        foodButton.addEventListener("click", function () {
            blackScreen.style.opacity = "1"; // Fade in
            blackScreen.style.pointerEvents = "auto";
            setTimeout(() => {
                alert(`Kamu sedang makan ${food.name}`);
                checkQuestCompletion("makanUSA");
                incrementHungerBar(food.addBar);
                updateHungerBar();
                decrementUang(food.harga);
                displayUang();
                blackScreen.style.opacity = "0"; // Fade out
                blackScreen.style.pointerEvents = "none";
            }, 1500);
        });
    });

    function spawnButtonMakan() {
        const makanX = 175;
        const makanY = 135;
        const range = 10;
        if (Math.abs(x - makanX) < range && Math.abs(y - makanY) < range) {
            button.classList.remove("hidden");
        } else {
            button.classList.add("hidden");
            makanOptions.classList.add("hidden");
        }
    }
    setInterval(spawnButtonMakan, 200);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !button.classList.contains("hidden")) {
            button.click();
        }
    });
    button.addEventListener("click", function () {
        makanOptions.classList.toggle("hidden");
    });
});

//TOMBOL BUAT DRIVER
document.addEventListener("DOMContentLoaded", function () {
    let button_container = document.querySelector(".button-driver");
    let button = document.createElement("button");
    button.className = "driver-button";
    button.textContent = "Driver";
    button_container.appendChild(button);
    function spawnButtonDriver() {
        const driverX = 230;
        const driverY = 135;
        const range = 25;
        if (Math.abs(x - driverX) < range && Math.abs(y - driverY) < range) {
            button.classList.remove("hidden");
        } else {
            button.classList.add("hidden");
        }
    }
    setInterval(spawnButtonDriver, 200);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !button.classList.contains("hidden")) {
            button.click();
        }
    });
    button.addEventListener("click", function () {
        blackScreen.style.opacity = "1"; // Fade in
        blackScreen.style.pointerEvents = "auto";
        setTimeout(() => {
            alert("Kamu sedang mengemudi di U.S. Route 66");
            checkQuestCompletion("driverUSA");
            blackScreen.style.opacity = "0"; // Fade out
            blackScreen.style.pointerEvents = "none";
        }, 1500);
    });
});
