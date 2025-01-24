const calendrierContent = document.querySelector('.calendrier-content');
const calendrierWeekday = document.querySelector('.calendrier-weekday');
const selectMonth = document.querySelector("select[name='currentMonth']");
const selectYear = document.querySelector("select[name='currentYear']");
const weekDays = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
const date = new Date();
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

    },
    displayDay: (num) => {

        //GESTION DE L'ANNEE BISSEXTILE
        if(selectMonth.value ==1){
            const year = parseInt(selectYear.value);
            if( year%4 === 0 && year%100 >0|| year%400 === 0){
                num = 29
            }else{
                num = 28
            }
        }

        let day = 1;
        calendrierContent.innerHTML = '';
        while (day <= num) {
            calendrierContent.innerHTML += `<div class="day-item">${day}</div>`;
            day++;
        }
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
        for (let i = 2025; i >= 1900; i--) {
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
    }



}