const calendrierContent = document.querySelector('.calendrier-content');
const calendrierWeekday = document.querySelector('.calendrier-weekday');
const selectMonth = document.querySelector("select[name='currentMonth']");
const selectYear = document.querySelector("select[name='currentYear']");
const weekDays = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
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
        Calendrier.displayDay(31);
        Calendrier.initMonth();
        Calendrier.initYear();

    },
    displayDay: (num) => {
        let day = 1;
        while (day <= num) {
            calendrierContent.innerHTML += `<div class="day-item">${day}</div>`;
            day++;
        }
    },

    initMonth: () => {
        months.forEach((month) => {
            selectMonth.innerHTML += `<option>${month.name}</option>`
        })
    },
    initYear: () => {
        for (let i = 2025; i >= 1900; i--) {
            selectYear.innerHTML += `<option>${i}</option>`

        }
    }



}