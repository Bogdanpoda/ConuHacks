const panelArray = [
    {
    RestrictionType: "No Parking",
    ReservedFor: null,
    Months: "April to December",
    Days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    Hours: "7 - 8",
    Arrow: true,
}];

function findTimeLeftForArray(panels){
    const timeLeftArray = panelArray.map(panel => findTimeLeft(panel));
    console.log(timeLeftArray[0]);
};

function findTimeLeft(panel){
    var timeInfo = {
        timeLeft: 0,
        vignetteNumber: null,
        timeLeftVignette: null,
        arrow: panel.Arrow
    }

    const date = new Date();
    date.setHours(date.getHours() - 5);

    if (panel.RestrictionType === "Reserved"){
        timeInfo.vignetteNumber = panel.ReservedFor;
        timeInfo.timeLeftVignette = 9999;
    }

    var minutesLeft = 0;

    for (var i = 0; i <= 24; i++){
        if (canYouPark(panel, date)){
            minutesLeft += 60;
        }
        else {
            break;
        }
        date.setTime(date.getTime() + 3600000);
    }


    if(minutesLeft != 0){
        timeInfo.timeLeft = ((minutesLeft - date.getMinutes()) > 1440) ? 9999 : minutesLeft - date.getMinutes();
    }

    return timeInfo;
}






function canYouPark(panel, date){
    if (panel.Months){
        const monthInterval = panel.Months.split(" to ");
        const monthIntervalInt = monthInterval.map(month => monthToInt(month));
        const month = date.getMonth();
        const invalidMonthsArray = [];
        if (monthIntervalInt[0] < monthIntervalInt[1]){
            for (let i = monthIntervalInt[0]; i <= monthIntervalInt[1]; i++){
                invalidMonthsArray.push(i);
            }
        } else {
            for (let i = monthIntervalInt[0]; i <= 11; i++){
                invalidMonthsArray.push(i);
            }
            for (let i = 0; i <= monthIntervalInt[1]; i++){
                invalidMonthsArray.push(i);
            }
        }
        if (!invalidMonthsArray.includes(month)){
            return true;
        }
        if (panel.Days){
            const daysNotAllowedInt = panel.Days.map(day => dayToInt(day));
            const day = date.getDay();
            if (!daysNotAllowedInt.includes(day)){
                return true;
            }
            if (panel.Hours){
                const hourInterval = panel.Hours.split(" - ");
                const invalidHoursArray = [];
                if (parseInt(hourInterval[0]) < parseInt(hourInterval[1])){
                    for (let i = hourInterval[0]; i < hourInterval[1]; i++){
                        invalidHoursArray.push(parseInt(i));
                    }
                } else {
                    for (let i = hourInterval[0]; i <= 23; i++){
                        invalidHoursArray.push(parseInt(i));
                    }
                    for (let i = 0; i < hourInterval[1]; i++){
                        invalidHoursArray.push(parseInt(i));
                    }
                }
                const hour = date.getHours();
                if (!invalidHoursArray.includes(hour)){
                    return true;
                }
                return false;
            }
            return false;
        }
        if (panel.Hours){
            const hourInterval = panel.Hours.split(" - ");
            const invalidHoursArray = [];
            if (parseInt(hourInterval[0]) < parseInt(hourInterval[1])){
                for (let i = hourInterval[0]; i < hourInterval[1]; i++){
                    invalidHoursArray.push(parseInt(i));
                }
            } else {
                for (let i = hourInterval[0]; i <= 23; i++){
                    invalidHoursArray.push(parseInt(i));
                }
                for (let i = 0; i < hourInterval[1]; i++){
                    invalidHoursArray.push(parseInt(i));
                }
            }
            const hour = date.getHours();
            if (!invalidHoursArray.includes(hour)){
                return true;
            }
            return false;
        }
    }
    if (panel.Days){
        const daysNotAllowedInt = panel.Days.map(day => dayToInt(day));
        const day = date.getDay();
        if (!daysNotAllowedInt.includes(day)){
            return true;
        }
        if (panel.Hours){
            const hourInterval = panel.Hours.split(" - ");
            const invalidHoursArray = [];
            if (parseInt(hourInterval[0]) < parseInt(hourInterval[1])){
                for (let i = hourInterval[0]; i < hourInterval[1]; i++){
                    invalidHoursArray.push(parseInt(i));
                }
            } else {
                for (let i = hourInterval[0]; i <= 23; i++){
                    invalidHoursArray.push(parseInt(i));
                }
                for (let i = 0; i < hourInterval[1]; i++){
                    invalidHoursArray.push(parseInt(i));
                }
            }
            const hour = date.getHours();
            if (!invalidHoursArray.includes(hour)){
                return true;
            }
            return false;
        }
        return false;
    }
    if (panel.Hours){
        const hourInterval = panel.Hours.split(" - ");
        const invalidHoursArray = [];
        if (parseInt(hourInterval[0]) < parseInt(hourInterval[1])){
            for (let i = hourInterval[0]; i < hourInterval[1]; i++){
                invalidHoursArray.push(parseInt(i));
            }
        } else {
            for (let i = hourInterval[0]; i <= 23; i++){
                invalidHoursArray.push(parseInt(i));
            }
            for (let i = 0; i < hourInterval[1]; i++){
                invalidHoursArray.push(parseInt(i));
            }
        }
        const hour = date.getHours();
        if (!invalidHoursArray.includes(hour)){
            return true;
        }
        return false;
    }
};

function monthToInt(month){
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthArray.indexOf(month);
}

function dayToInt(day){
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayArray.indexOf(day);
}