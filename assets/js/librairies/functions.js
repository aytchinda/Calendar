const calendrierContent = document.querySelector('.calendrier-content');
const calendrierWeekday = document.querySelector('.calendrier-weekday');
const selectMonth = document.querySelector("select[name='currentMonth']");
const selectYear = document.querySelector("select[name='currentYear']");
const weekDays = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
const date = new Date();
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');
const currentMonthIndex = date.getMonth();
const currentYear = date.getFullYear();
const months = [
    { name: "January", days: 31 },
    { name: "February", days: 28 }, // 29 jours en année bissextile
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 },
];

export const Calendrier = {
    initCalendrier: () => {
        // console.log('init calendrier');
        weekDays.forEach((day) => {
            calendrierWeekday.innerHTML += `<div class="weekday-item">${day}</div>`
        });
        Calendrier.initMonth();
        Calendrier.initYear();
        const days = months[currentMonthIndex].days;
        Calendrier.displayDay(days);


        prevMonth.onclick = () => {
            if (selectMonth.value > 0) {
                selectMonth.value = selectMonth.value - 1;

            } else {
                selectMonth.value = 11;
                selectYear.value = selectYear.value - 1;
            }
            Calendrier.updateCalendrier()
        }


        nextMonth.onclick = () => {
            if (selectMonth.value < 11) {
                selectMonth.value++
            }else{
                selectMonth.value = 0;
                selectYear.value++
            }
            Calendrier.updateCalendrier()

        }
       


    },
    displayDay: (num) => {

        //GESTION DE L'ANNEE BISSEXTILE
        if (selectMonth.value == 1) {
            const year = parseInt(selectYear.value);
            if (year % 4 === 0 && year % 100 > 0 || year % 400 === 0) {
                num = 29
            } else {
                num = 28
            }
        }

        let day = 1;
        calendrierContent.innerHTML = '';
        while (day <= num) {
            calendrierContent.innerHTML += `<div class="day-item">${day}</div>`;
            day++;
        }

        let firstDayOfMonth = Calendrier.getWeekDay();

        const firstItem = document.querySelector('.calendrier .calendrier-content .day-item:nth-child(1)');
        firstItem.style.gridColumn = (firstDayOfMonth + 1) + ' / ' + (firstDayOfMonth + 2);

    },

    initMonth: () => {
        months.forEach((month, index) => {
            if (index === currentMonthIndex) {
                selectMonth.innerHTML += `<option value="${index}" selected>${month.name}</option>`
            } else {
                selectMonth.innerHTML += `<option value="${index}">${month.name}</option>`
            }
        })
        selectMonth.onchange = () => {
            const days = months[selectMonth.value].days;
            Calendrier.displayDay(days);
        }
    },
    initYear: () => {
        for (let i = 2600; i >= 1900; i--) {
            if (i === currentYear) {
                selectYear.innerHTML += `<option selected>${i}</option>`
            } else {
                selectYear.innerHTML += `<option>${i}</option>`
            }
        }
        selectYear.onchange = () => {
            Calendrier.updateCalendrier();
        }
    },
    updateCalendrier: () => {
        const days = months[selectMonth.value].days;
        Calendrier.displayDay(days);
    },

    getWeekDay: () => {
        let weekday
        const d = 1;
        const m = parseInt(selectMonth.value) + 1;
        const y = parseInt(selectYear.value);

        if (m < 3) {
            weekday = (Math.trunc(((23 * m) / 9) + d + 4 + y + Math.trunc((y - 1) / 4) - Math.trunc((y - 1) / 100) + Math.trunc((y - 1) / 400)) % 7)
        } else {
            weekday = (Math.trunc(((23 * m) / 9) + d + 2 + y + Math.trunc((y) / 4) - Math.trunc((y) / 100) + Math.trunc((y) / 400)) % 7)
        }
        return weekday
    }



}