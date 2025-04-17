// CHARACTER & NAMA yang dipake
let selectedCharacter = localStorage.getItem("selectedCharacter");
let playerName = localStorage.getItem("playerName"); 
if (selectedCharacter) {
    document.querySelector(".character_spritesheet").style.backgroundImage = `url('${selectedCharacter}')`;
}

//UANG
let money = localStorage.getItem("money");
function displayUang(){
    let display = document.querySelector(".money-displayed");
    if (money < 0) { 
        health = 0;
        localStorage.setItem("health", health);
        updateHealthBar();
    } 
    if(display){
        display.textContent = money;
    }
}
//PEMASUKAN & PENGELUARAN
function incrementUang(jml){
    let uangBefore = parseInt(localStorage.getItem("money"));
    let uangAfter = uangBefore + jml
    localStorage.setItem("money", uangAfter);
    money = uangAfter;
    displayUang()
}
function decrementUang(jml){
    let uangBefore = parseInt(localStorage.getItem("money"));
    let uangAfter = uangBefore - jml
    localStorage.setItem("money", uangAfter);
    money = uangAfter;
    displayUang()
}
document.querySelector(".money-displayed").textContent = `${money}`;


// QUEST
let currentQuest = JSON.parse(localStorage.getItem("currentQuest")) || [];
const locationQuests = {
    indonesia: [
        { name: "*Foto di Monas - Indonesia", action: "fotoIndo", gaji: 25 },
        { name: "*Makan di Rumah - Indonesia", action: "makanIndo", gaji: 15 },
        { name: "*Pergi ke tenda paman - Indonesia", action: "tendaIndo", gaji: 20 },
    ],
    japan: [
        { name: "*Foto rumah tua kakek - Jepang", action: "fotoJepang", gaji: 20 },
        { name: "*Makan enak di Jepang - Jepang", action: "makanJepang", gaji: 10 },
        { name: "*Bantu kakek menanam tanaman - Jepang", action: "kebunJepang", gaji: 35 },
        { name: "*mandi di pemandian air panas - Jepang", action: "mandiJepang", gaji: 25 }
    ],
    france: [
        { name: "*Foto fasilitas di Université de Strasbourg - Prancis", action: "fotoFrance", gaji: 45 },
        { name: "*Makan mewah di Prancis - Prancis", action: "makanFrance", gaji: 35 }
    ],
    mesir: [
        { name: "*Foto di Piramida - Mesir", action: "fotoMesir", gaji: 25 },
        { name: "*Makan makanan Mesir - Mesir", action: "makanMesir", gaji: 15 },
        { name: "*Mandi di sungai Nil - Mesir", action: "mandiMesir", gaji: 30 }
    ],
    usa: [
        { name: "*Foto di Patung Liberty - USA", action: "fotoUSA", gaji: 30 },
        { name: "*Makan Mahal di USA - USA", action: "makanUSA", gaji: 10 },
        { name: "*Mengemudi di U.S. Route 66 - USA", action: "driverUSA", gaji: 20 }
    ]
};
// Fungsi untuk memulai quest
function startQuests() {
    if (currentQuest.length === 0) {
        const randomLocation = Object.keys(locationQuests);
        randomLocation.forEach(location => {
            const quests = locationQuests[location];
            const randomQuest = quests[Math.floor(Math.random() * quests.length)];
            currentQuest.push(randomQuest);
        });
        localStorage.setItem("currentQuest", JSON.stringify(currentQuest)); // simpen ke local storage
        updateQuestDisplay();
        alert("Quest baru telah dimulai!");
    } else {
        alert("Selesaikan quest yang ada terlebih dahulu!");
    }
}
// Fungsi untuk memperbarui tampilan quest
function updateQuestDisplay() {
    const questList = document.getElementById("quest-list");
    questList.innerHTML = "";
    if (currentQuest.length === 0) {
        questList.innerHTML = "<li>Tidak ada quest aktif.</li>";
    } else {
        currentQuest.forEach(quest => {
            const questItem = document.createElement("li");
            questItem.textContent = quest.name;
            const infoIcon = document.createElement("span");
            infoIcon.textContent = " (i)";
            infoIcon.className = "info-quest";
            infoIcon.setAttribute("data-info", `Kamu akan mendapatkan $${quest.gaji}`);
            questItem.appendChild(infoIcon);
            questList.appendChild(questItem);
        });
    }
}
// Fungsi untuk menyelesaikan quest
function checkQuestCompletion(action) {
    const questIndex = currentQuest.findIndex(quest => quest.action === action);
    const quest = currentQuest[questIndex];
    if (questIndex !== -1) {
        incrementUang(quest.gaji);
        alert(`Quest "${currentQuest[questIndex].name}" berhasil diselesaikan!`);
        currentQuest.splice(questIndex, 1);
        localStorage.setItem("currentQuest", JSON.stringify(currentQuest));
        updateQuestDisplay();
    } else {
        alert("Aksi ini tidak terkait dengan quest.");
    }
}
// Muat quest saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
    updateQuestDisplay();
});





// TIME & DATE
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let hours = parseInt(localStorage.getItem("hours"));
let minutes = parseInt(localStorage.getItem("minutes"));
let day = parseInt(localStorage.getItem("day"));
let weekDayIndex = daysOfWeek.indexOf(localStorage.getItem("weekDay"));
function getGreeting(hours) {
    if (hours >= 3 && hours < 11) {
        return "Good Morning";
    } else if (hours >= 11 && hours < 15) {
        return "Good Afternoon";
    } else if (hours >= 15 && hours < 19) {
        return "Good Evening";
    } else {
        return "Good Night";
    }
}
function incrementTime() {
    minutes += 1;
    if (minutes >= 60) {
        minutes = 0;
        hours += 1;
    }
    if (hours >= 24) {
        hours = 0;
        day += 1;
        weekDayIndex = (weekDayIndex + 1) % 7;
    }
    localStorage.setItem("hours", hours);
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("day", day);
    localStorage.setItem("weekDay", daysOfWeek[weekDayIndex]);
    updateTimeDisplay();
}
function updateTimeDisplay() {
    const formatTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    const weekDay = daysOfWeek[weekDayIndex];
    document.getElementById('game-day').innerText = `Day ${day} - ${weekDay} | ${formatTime}`;
    const greeting = getGreeting(hours);
    document.querySelector(".character-name").textContent = `${greeting}, ${playerName}!`;
}
setInterval(incrementTime, 300);
updateTimeDisplay();



//=======================================BAR==================================//
//SHOWER BAR
let bath = parseInt(localStorage.getItem("bath")); 
const showerBar = document.getElementById("bath");
function updateShowerBar() {
    showerBar.value = bath;
}
function decrementShowerBar() {
    bath -= 1;
    if(bath < 0){
        bath = 0;
        setInterval(decrementhappyBar, 500);
        updatehappyBar();
    }
    localStorage.setItem("bath", bath);
    updateShowerBar();
}
function incrementShowerBar(mandi) {
    bath += mandi;
    if(bath > 100) bath = 100;
    localStorage.setItem("bath", bath);
    updateShowerBar();
}
setInterval(decrementShowerBar, 2000);
updateShowerBar();


//HUNGER BAR
let hunger = parseInt(localStorage.getItem("hunger"));
const hungerBar = document.getElementById("hunger");
function updateHungerBar(){
    hungerBar.value = hunger;
}
function decrementHungerBar(){
    hunger -= 1;
    if(hunger < 0){
        hunger = 0;
        decrementHealthBar();
        decrementHealthBar();
        decrementHealthBar();
        updateHealthBar();
    }
    localStorage.setItem("hunger", hunger);
    updateHungerBar();
}
function incrementHungerBar(amount){    
    hunger += amount;
    if(hunger > 100) hunger = 100;
    localStorage.setItem("hunger", hunger);
    updateHungerBar();
}
setInterval(decrementHungerBar, 1500);
updateHungerBar();



//SLEEPS BAR
let sleeps = parseInt(localStorage.getItem("sleeps"));
const sleepsBar = document.getElementById("sleeps");
function updateSleepsBar(){
    sleepsBar.value = sleeps;
}
function decrementSleepsBar(){
    sleeps -= 1; 
    if(sleeps < 0){
        sleeps = 0;
        setInterval(decrementhappyBar, 500);
        updatehappyBar();
    }
    localStorage.setItem("sleeps", sleeps);
    updateSleepsBar();
}
function incrementSleepsBar(tidur){
    sleeps += tidur;
    if(sleeps > 100) sleeps = 100;
    localStorage.setItem("sleeps", sleeps);
    updateSleepsBar();
}
setInterval(decrementSleepsBar, 4000);
updateSleepsBar();



//HAPPINESS BAR
let happy = parseInt(localStorage.getItem("happy"));
const happyBar = document.getElementById("happy");
function updatehappyBar(){
    happyBar.value = happy;
}
function decrementhappyBar(){
    happy -= 1;
    if(happy < 0){
        happy = 0;
        decrementHealthBar();
        
    }
    localStorage.setItem("happy", happy);
    updatehappyBar();
}
function incrementhappyBar(happiness){
    happy += happiness;
    if(happy > 100) happy = 100;
    localStorage.setItem("happy", happy);
    updatehappyBar();
}
setInterval(decrementhappyBar, 4000);
updatehappyBar();


//HEALTH BAR
let health = parseInt(localStorage.getItem("health"));
let isGameOver = false;
const healthBar = document.getElementById("health");
function updateHealthBar(){
    healthBar.value = health;
    if (health <= 0 && !isGameOver) { 
        isGameOver = true; // Mencegah looping
        blackScreen.style.opacity = "1"; // Fade in
        blackScreen.style.pointerEvents = "auto";
        const gameOverImage = document.createElement("img");
        gameOverImage.src = "./asset/character/gameOver.png";
        gameOverImage.classList.add("game-over-image");
        document.body.appendChild(gameOverImage);
        setTimeout(() => {
            gameOverImage.classList.add("show");
        }, 100);
        const waitForUserInput = (e) => {
            if (e.type === "keydown" && e.key === "Escape") {
                window.location.href = "./index.html";
            } else if (e.type === "keydown" && e.key === "Enter") {
                window.location.href = "./index.html";
            }
        };
        document.addEventListener("keydown", waitForUserInput);
    } 
}
function decrementHealthBar() {
    if (hunger === 0 || happy === 0) { 
        health -= 1;     
    }
    localStorage.setItem("health", health);
    updateHealthBar();
}
function incrementHealthBar(){
    if(hunger > 60 && happy > 60){ 
        health += 1;
        if(health > 100) health = 100;
        localStorage.setItem("health", health);
        updateHealthBar();
    }
}
setInterval(incrementHealthBar, 5000);
updateHealthBar();






//=============================================CONTROLLER===============================================//
// DIRECTION KEY
const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
}
const keys = {
    38: directions.up,
    37: directions.left,
    39: directions.right,
    40: directions.down,

    87: directions.up,//W
    65: directions.left,//A
    68: directions.right,//D
    83: directions.down,//S
}
document.addEventListener("keydown", (e) => {
    var dir = keys[e.which];
    if (dir && held_directions.indexOf(dir) === -1) {
        held_directions.unshift(dir)
    }
})
document.addEventListener("keyup", (e) => {
    var dir = keys[e.which];
    var index = held_directions.indexOf(dir);
    if (index > -1) {
        held_directions.splice(index, 1)
    }
});
//mouse dan touch
var isPressed = false;
const removePressedAll = () => {
    document.querySelectorAll(".dpad-button").forEach(d => {
        d.classList.remove("pressed")
    })
}
document.body.addEventListener("mousedown", () => {
    console.log('mouse is down')
    isPressed = true;
})
document.body.addEventListener("mouseup", () => {
    console.log('mouse is up')
    isPressed = false;
    held_directions = [];
    removePressedAll();
})
const handleDpadPress = (direction, click) => {
    if (click) {
        isPressed = true;
    }
    held_directions = (isPressed) ? [direction] : []

    if (isPressed) {
        removePressedAll();
        document.querySelector(".dpad-" + direction).classList.add("pressed");
    }
}
// FUNCTION BUAT DPADNYA
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));


//AUDIO
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("background-music");
    audio.play();
});