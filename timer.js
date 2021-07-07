const btn = document.querySelector("#btn"),
    title = document.querySelector("#state"),
    displayMinutes = document.querySelector("#display-minutes"),
    displaySeconds = document.querySelector("#display-seconds"),
    inpAutoRestart = document.querySelector("#autorestart"),
    opsets = document.querySelector("#open-settings"),
    settingsMenu = document.querySelector(".settings-menu"),
    settingsWT = document.querySelector("#set-work-time"),
    settingsBT = document.querySelector("#set-break-time")
let cTime = 0,
    states = [{ name: "Relax !", time: 5 * 60 * 1000 }, { name: "Work !", time: 25 * 60 * 1000 }],
    state = 0,
    start = 0,
    timerInterval,
    autoRestart = false,
    sopened = false,
    endSound = new Audio("./ding.mp3");
window.onload = () => {
    updateSeconds((states[1].time / 1000) % 60)
    updateMinutes(Math.floor((states[1].time / 1000 / 60)))
    settingsWT.value = Math.floor((states[1].time / 1000 / 60))
    settingsBT.value = Math.floor((states[0].time / 1000 / 60))
}
settingsWT.addEventListener("input", (e) => {
    states[1].time = parseInt(settingsWT.value) * 60 * 1000
})

settingsBT.addEventListener("input", (e) => {
    states[0].time = parseInt(settingsBT.value) * 60 * 1000
})
btn.onclick = () => {
    start == 0 ? startTimer() : stopTimer()
}
opsets.onclick = () => {
    sopened ? closeSettings() : openSettings()
}
inpAutoRestart.onchange = () => {
    autoRestart = inpAutoRestart.checked
}
function openSettings() {
    settingsMenu.style.display = "flex"
    sopened = true
}
function closeSettings() {
    settingsMenu.style.display = "none"
    sopened = false
}
function startTimer() {
    if (state != 1 && state != 0) return
    if (cTime == 0) {
        state == 0 ? state = 1 : state = 0
        cTime += states[state].time
    }
    updateSeconds((cTime / 1000) % 60)
    updateMinutes(Math.floor((cTime / 1000 / 60)))
    timerInterval = setInterval(() => {
        timer(state)
    }, 1000)
    btn.innerHTML = start == 0 ? "STOP" : "START"
    title.innerHTML = states[state].name
    start == 0 ? start = 1 : start = 0
}

function timer(s) {
    cTime - 1000 >= 0 ? cTime -= 1000 : endTimer()
    updateSeconds((cTime / 1000) % 60)
    updateMinutes(Math.floor((cTime / 1000 / 60)))
}

function endTimer() {
    stopTimer(1)
    endSound.play()
    autoRestart ? startTimer() : null
}

function stopTimer(x) {
    clearInterval(timerInterval)
    start == 0 ? start = 1 : start = 0
    x == 1 ? btn.innerHTML = `START ${states[state == 0 ? 1 : 0].name.toUpperCase()}` : btn.innerHTML = start == 0 ? "START" : "STOP"
}

function updateMinutes(t) {
    displayMinutes.innerHTML = ("0" + t).slice(-2)
}

function updateSeconds(t) {
    displaySeconds.innerHTML = ("0" + t).slice(-2)
}