// RESPAWN
var character = document.querySelector(".character");
var map = document.querySelector(".map");
var x = 565;
var y = 125;
var held_directions = [];
var speed = 1;

// Jalannya
const placeCharacter = () => {
    var pixelSize = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );
    const held_direction = held_directions[0];
    if (held_direction) {
        if (held_direction === directions.right) { x += speed; }
        if (held_direction === directions.left) { x -= speed; }
        if (held_direction === directions.down) { y += speed; }
        if (held_direction === directions.up) { y -= speed; }
        character.setAttribute("facing", held_direction);
    }
    character.setAttribute("walking", held_direction ? "true" : "false");
    // WALL
    var leftLimit = 15;
    var rightLimit = 590;
    var topLimit = 100;
    var bottomLimit = 180;
    if (x < leftLimit) { x = leftLimit; }
    if (x > rightLimit) { x = rightLimit; }
    if (y < topLimit) { y = topLimit; }
    if (y > bottomLimit) { y = bottomLimit; }
    var camera_left = pixelSize * 66;
    var camera_top = pixelSize * 42;
    map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top}px, 0 )`;
    character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0 )`;
}
const step = () => {
    placeCharacter();
    window.requestAnimationFrame(() => {
        step();
    })
}
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
        const mapX = 565;
        const mapY = 100;
        const range = 15;
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
        window.location.href = "./asset/maps/map.html";
    });
});

//TOMBOL TIDUR
document.addEventListener("DOMContentLoaded", function () {
    let button_container = document.querySelector(".button-sleep");
    let button = document.createElement("button");
    button.className = "sleep-button";
    button.textContent = "Sleep";
    button_container.appendChild(button);
    function checkPosition() {
        // Koordinat tombol TIDUR
        const tidurX = 290;
        const tidurY = 100;
        const range = 17;
        if (Math.abs(x - tidurX) < range && Math.abs(y - tidurY) < range) {
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
        if(hours < 19 && hours > 4){
            alert("Kamu hanya bisa tidur ketika pukul 19:00 !!!");
        } else{
            blackScreen.style.opacity = "1"; // Fade in
            blackScreen.style.pointerEvents = "auto";
            setTimeout(() => {
                if (hours <= 4) {
                    hours = 6;
                    minutes = 0;
                    localStorage.setItem("hours", hours);
                    localStorage.setItem("minutes", minutes);
                    localStorage.setItem("day", day);
                    localStorage.setItem("weekDay", daysOfWeek[weekDayIndex]);
                    incrementSleepsBar(100);
                    updateTimeDisplay();
                    updateSleepsBar();
                    alert("Kamu sedang tidur");
                } else {
                    hours = 6;
                    minutes = 0;
                    day += 1;
                    weekDayIndex = (weekDayIndex + 1) % 7;
                    localStorage.setItem("hours", hours);
                    localStorage.setItem("minutes", minutes);
                    localStorage.setItem("day", day);
                    localStorage.setItem("weekDay", daysOfWeek[weekDayIndex]);
                    incrementSleepsBar(100);
                    updateTimeDisplay();
                    updateSleepsBar();
                    alert("Kamu sedang tidur");
                }
                blackScreen.style.opacity = "0"; // Fade out
                blackScreen.style.pointerEvents = "none";
            }, 1500);
        }    
    });
});

//TOMBOL BUAT FOTO
document.addEventListener("DOMContentLoaded", function () {
    let button_container = document.querySelector(".button-foto");
    let button = document.createElement("button");
    button.className = "foto-button";
    button.textContent = "Monas";
    button_container.appendChild(button);
    function spawnButtonFoto() {
        const fotoX = 167;
        const fotoY = 80;
        const range = 30;
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
            alert("Kamu sedang foto foto di Monas");
            checkQuestCompletion("fotoIndo");
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
        const mandiX = 246;
        const mandiY = 100;
        const range = 25;
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
        { name: "Popmie", cost: "$2", harga: 2, addBar: 20 },
        { name: "Nasi Padang", cost: "$4", harga: 4, addBar: 40 },
        { name: "Eskrim", cost: "$1", harga: 1, addBar: 10 }
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
                checkQuestCompletion("makanIndo");
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
        const makanX = 327;
        const makanY = 100;
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



//TOMBOL BUAT TENDA
document.addEventListener("DOMContentLoaded", function () {
    let button_container = document.querySelector(".button-tenda");
    let button = document.createElement("button");
    button.className = "tenda-button";
    button.textContent = "Tenda";
    button_container.appendChild(button);
    function spawnButtonMakan() {
        const tendaX = 413;
        const tendaY = 100;
        const range = 15;
        if (Math.abs(x - tendaX) < range && Math.abs(y - tendaY) < range) {
            button.classList.remove("hidden");
        } else {
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
        blackScreen.style.opacity = "1"; // Fade in
        blackScreen.style.pointerEvents = "auto";
        setTimeout(() => {
            alert("Kamu sedang mengunjungi Paman yang sedang berkemah");
            checkQuestCompletion("tendaIndo");
            blackScreen.style.opacity = "0"; // Fade out
            blackScreen.style.pointerEvents = "none";
        }, 1500);
    });
});

//TOMBOL BUAT GUILD
document.addEventListener("DOMContentLoaded", function () {
    let button_container = document.querySelector(".button-guild");
    let button = document.createElement("button");
    button.className = "guild-button";
    button.textContent = "Guild";
    button_container.appendChild(button);


    function spawnButtonGuild() {
        const guildX = 65;
        const guildY = 100;
        const range = 15;
        if (Math.abs(x - guildX) < range && Math.abs(y - guildY) < range) {
            button.classList.remove("hidden");
        } else {
            button.classList.add("hidden");
        }
    }

    setInterval(spawnButtonGuild, 200);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !button.classList.contains("hidden")) {
            button.click();
        }
    });
    button.addEventListener("click", function () {
        if (currentQuest.length === 0) {
            startQuests();
        } else {
            alert("Selesaikan semua quest terlebih dahulu!");
        }
    });
});
