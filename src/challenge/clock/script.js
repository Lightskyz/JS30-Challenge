const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

const time = document.querySelector('.time');
const ampm = document.querySelector('.ampm');

function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;

    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + 90;

    const hours = now.getHours();
    const hoursDegrees = ((hours / 12) * 360) + 90;

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

function digitalClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const h = twelveClock(addZero(hours));
    const m = addZero(minutes);
    const s = addZero(seconds);

    addAmPm(hours);

    time.innerHTML = h + ':' + m + ':' + s;
}

function addZero(time) {
    if (time < 10) {
        return time = '0' + time;
    } else {
        return time;
    }
}

function twelveClock(time) {
    if (time > 12) {
        return time = time - 12;
    } else if (time == 0) {
        return time = 12;
    } else {
        return time;
    }
}

function addAmPm(time) {
    if (time > 12) {
        return ampm.innerHTML = 'pm';
    } else if (time == 0) {
        return ampm.innerHTML = 'am';
    } else {
        return ampm.innerHTML = 'am';
    }
}

setInterval(setDate, 1000);
setInterval(digitalClock, 1000);