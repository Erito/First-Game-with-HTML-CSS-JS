// RESPAWN
var character = document.querySelector(".character");
var map = document.querySelector(".map");
var x = 305;
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
    var leftLimit = 0;
    var rightLimit = 505;
    var topLimit = 100;
    var bottomLimit = 220;
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
        const mapX = 305;
        const mapY = 220;
        const range = 25;
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


//TOMBOL BUAT FOTO
document.addEventListener("DOMContentLoaded", function () {
    let button_container = document.querySelector(".button-foto");
    let button = document.createElement("button");
    button.className = "foto-button";
    button.textContent = "Piramida";
    button_container.appendChild(button);
    function spawnButtonFoto() {
        const fotoX = 305;
        const fotoY = 110;
        const range = 15;
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
            alert("Kamu sedang foto Piramida");
            checkQuestCompletion("fotoMesir");
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
    button.textContent = "Sungai Nil";
    button_container.appendChild(button);
    function spawnButtonMandi() {
        // console.log(`Character Position: x=${x}, y=${y}`);
        const fotoX = 500;
        const fotoY = 150;
        const range = 15;
        if (Math.abs(x - fotoX) < range && Math.abs(y - fotoY) < range) {
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
            alert("Kamu sedang mandi di Sungai Nil");
            checkQuestCompletion("mandiMesir");
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
    let makanOptions = document.createElement("div")
    makanOptions.className = "makan-options hidden";
    button_container.appendChild(makanOptions);

    const foods = [
        {nama:"Mulukhiyah", cost:"$2", harga: 2, addBar:20},
        {nama:"Kofta", cost:"$3", harga:3 , addBar:30},
        {nama:"Fatteh", cost:"$5", harga:5, addBar:50}
    ]

    foods.forEach(food => {
        let foodButton = document.createElement("button");
        foodButton.textContent = food.nama;
        let infoIcon = document.createElement("span");
        infoIcon.textContent = " (i) ";
        infoIcon.className = "info-icon";
        infoIcon.setAttribute("data-cost", `Harga: ${food.cost}`);
        foodButton.appendChild(infoIcon);
        makanOptions.appendChild(foodButton);
        foodButton.addEventListener("click", function () {
            blackScreen.style.opacity = "1"; 
            blackScreen.style.pointerEvents = "auto";
            setTimeout(() => {
                alert(`Kamu sedang makan ${food.nama}`);
                checkQuestCompletion("makanMesir");
                incrementHungerBar(food.addBar);
                updateHungerBar();
                decrementUang(food.harga);
                displayUang();
                blackScreen.style.opacity = "0"; 
                blackScreen.style.pointerEvents = "none";
            }, 1500);
        });
    });

    function spawnButtonMakan() {
        const makanX = 463;
        const makanY = 100;
        const range = 25;
        if (Math.abs(x - makanX) < range && Math.abs(y - makanY) < range) {
            button.classList.remove("hidden");
            
        } else {
            makanOptions.classList.add("hidden");
            button.classList.add("hidden");
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
        const jalanX = 305;
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
        alert("-$20");
        decrementUang(20);
        incrementhappyBar(40);
        canWalk = true;
        localStorage.setItem("canWalk", "true");
        location.reload();
    });
});
