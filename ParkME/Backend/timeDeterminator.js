const panelArray = [
  {
    RestrictionType: "No Parking",
    ReservedFor: null,
    Months: "January - December",
    Days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"],
    Hours: "9 - 16",
    Arrow: true,
  },
];

function findTimeLeftForArray(panels) {
  const timeLeftArray = panelArray.map((panel) => {
    panel.Hours.replace("h", "");
    findTimeLeft(panel);
  });
  var timeInfo = {
    timeLeft: 9999,
    vignetteNumber: null,
    timeLeftVignette: null,
    arrow: false,
  };

  var vignettePanel = {};

  for (var i = 0; i < timeLeftArray.length; i++) {
    if (timeLeftArray[i].timeLeft < timeInfo.timeLeft) {
      timeInfo.timeLeft = timeLeftArray[i].timeLeft;
      if (timeLeftArray[i].vignetteNumber) {
        timeInfo.vignetteNumber = timeLeftArray[i].vignetteNumber;
        timeInfo.timeLeftVignette = timeLeftArray[i].timeLeftVignette;
        vignettePanel = timeLeftArray[i];
      }
      timeInfo.arrow = timeLeftArray[i].arrow ? true : timeInfo.arrow;
    }
  }

  for (var i = 0; i < timeLeftArray.length; i++) {
    if (vignettePanel.timeLeft != timeLeftArray[i].timeLeft) {
      if (timeLeftArray[i].timeLeft < vignettePanel.timeLeftVignette) {
        timeInfo.timeLeftVignette = timeLeftArray[i].timeLeft;
      }
    }
  }

  return timeInfo;
}

function findTimeLeft(panel) {
  var timeInfo = {
    timeLeft: 0,
    vignetteNumber: null,
    timeLeftVignette: null,
    arrow: panel.Arrow,
  };

  const date = new Date();
  //   date.setHours(date.getHours());

  if (panel.RestrictionType === "Reserved") {
    timeInfo.vignetteNumber = panel.ReservedFor;
    timeInfo.timeLeftVignette = 9999;
  }

  var minutesLeft = 0;

  for (var i = 0; i <= 24; i++) {
    if (canYouPark(panel, date)) {
      minutesLeft += 60;
    } else {
      break;
    }
    date.setTime(date.getTime() + 3600000);
  }

  if (minutesLeft != 0) {
    timeInfo.timeLeft =
      minutesLeft - date.getMinutes() > 1440
        ? 9999
        : minutesLeft - date.getMinutes();
  }

  return timeInfo;
}

function canYouPark(panel, date) {
  if (panel.Months) {
    const monthInterval = panel.Months.split(" - ");
    const monthIntervalInt = monthInterval.map((month) => monthToInt(month));
    const month = date.getMonth();
    const invalidMonthsArray = [];
    if (monthIntervalInt[0] < monthIntervalInt[1]) {
      for (let i = monthIntervalInt[0]; i <= monthIntervalInt[1]; i++) {
        invalidMonthsArray.push(i);
      }
    } else {
      for (let i = monthIntervalInt[0]; i <= 11; i++) {
        invalidMonthsArray.push(i);
      }
      for (let i = 0; i <= monthIntervalInt[1]; i++) {
        invalidMonthsArray.push(i);
      }
    }
    if (!invalidMonthsArray.includes(month)) {
      return true;
    }
    if (panel.Days) {
      const daysNotAllowedInt = panel.Days.map((day) => dayToInt(day));
      const day = date.getDay();
      if (!daysNotAllowedInt.includes(day)) {
        return true;
      }
      if (panel.Hours) {
        const hourInterval = panel.Hours.split(" - ");
        const invalidHoursArray = [];
        if (parseInt(hourInterval[0]) < parseInt(hourInterval[1])) {
          for (
            let i = parseInt(hourInterval[0]);
            i < parseInt(hourInterval[1]);
            i++
          ) {
            invalidHoursArray.push(parseInt(i));
          }
        } else {
          for (let i = parseInt(hourInterval[0]); i <= 23; i++) {
            invalidHoursArray.push(parseInt(i));
          }
          for (let i = 0; i < parseInt(hourInterval[1]); i++) {
            invalidHoursArray.push(parseInt(i));
          }
        }
        const hour = date.getHours();
        if (!invalidHoursArray.includes(hour)) {
          return true;
        }
        return false;
      }
      return false;
    }
    if (panel.Hours) {
      const hourInterval = panel.Hours.split(" - ");
      const invalidHoursArray = [];
      if (parseInt(hourInterval[0]) < parseInt(hourInterval[1])) {
        for (
          let i = parseInt(hourInterval[0]);
          i < parseInt(hourInterval[1]);
          i++
        ) {
          invalidHoursArray.push(parseInt(i));
        }
      } else {
        for (let i = parseInt(hourInterval[0]); i <= 23; i++) {
          invalidHoursArray.push(parseInt(i));
        }
        for (let i = 0; i < parseInt(hourInterval[1]); i++) {
          invalidHoursArray.push(parseInt(i));
        }
      }
      const hour = date.getHours();
      if (!invalidHoursArray.includes(hour)) {
        return true;
      }
      return false;
    }
  }
  if (panel.Days) {
    const daysNotAllowedInt = panel.Days.map((day) => dayToInt(day));
    const day = date.getDay();
    if (!daysNotAllowedInt.includes(day)) {
      return true;
    }
    if (panel.Hours) {
      const hourInterval = panel.Hours.split(" - ");
      const invalidHoursArray = [];
      if (parseInt(hourInterval[0]) < parseInt(hourInterval[1])) {
        for (
          let i = parseInt(hourInterval[0]);
          i < parseInt(hourInterval[1]);
          i++
        ) {
          invalidHoursArray.push(parseInt(i));
        }
      } else {
        for (let i = parseInt(hourInterval[0]); i <= 23; i++) {
          invalidHoursArray.push(parseInt(i));
        }
        for (let i = 0; i < parseInt(hourInterval[1]); i++) {
          invalidHoursArray.push(parseInt(i));
        }
      }
      const hour = date.getHours();
      if (!invalidHoursArray.includes(hour)) {
        return true;
      }
      return false;
    }
    return false;
  }
  if (panel.Hours) {
    const hourInterval = panel.Hours.split(" - ");
    const invalidHoursArray = [];
    if (parseInt(hourInterval[0]) < parseInt(hourInterval[1])) {
      for (
        let i = parseInt(hourInterval[0]);
        i < parseInt(hourInterval[1]);
        i++
      ) {
        invalidHoursArray.push(parseInt(i));
      }
    } else {
      for (let i = parseInt(hourInterval[0]); i <= 23; i++) {
        invalidHoursArray.push(parseInt(i));
      }
      for (let i = 0; i < parseInt(hourInterval[1]); i++) {
        invalidHoursArray.push(parseInt(i));
      }
    }
    const hour = date.getHours();
    if (!invalidHoursArray.includes(hour)) {
      return true;
    }
    return false;
  }
}

function canWePark(data) {
  const now = new Date();

  // Helper function to parse the hours string into a comparable date object
  function parseHours(hoursStr) {
    const [startHour, endHour] = hoursStr
      .split(" - ")
      .map((h) => h.replace("h", ":"));
    const startDate = new Date(now);
    const endDate = new Date(now);
    startDate.setHours(...startHour.split(":"), 0, 0);
    endDate.setHours(...endHour.split(":"), 0, 0);
    return { startDate, endDate };
  }

  let parkStatus = { canPark: true, timeLeft: "N/A" };

  for (let restriction of data) {
    // Months check
    if (restriction.Months) {
      const [startMonthStr, endMonthStr] = restriction.Months.split(" - ");
      const startMonth = new Date(
        `${startMonthStr} 1, ${now.getFullYear()}`
      ).getMonth();
      const endMonth = new Date(
        `${endMonthStr} 1, ${now.getFullYear()}`
      ).getMonth();
      const currentMonth = now.getMonth();
      if (currentMonth < startMonth || currentMonth > endMonth) {
        continue; // No restriction for this month
      }
    }

    // Days check
    if (restriction.Days) {
      const currentDayOfWeek = now.toLocaleString("en-US", { weekday: "long" });
      if (!restriction.Days.includes(currentDayOfWeek)) {
        continue; // No restriction for this day
      }
    }

    // Hours check
    if (restriction.Hours) {
      const { startDate, endDate } = parseHours(restriction.Hours);
      if (now >= startDate && now <= endDate) {
        // Currently within no parking hours
        return { canPark: false, timeLeft: 0 };
      } else if (
        now < startDate &&
        (parkStatus.canPark || startDate - now < parkStatus.timeLeft)
      ) {
        // Parking is currently allowed, but will be restricted soon
        const timeLeftMs = startDate - now;
        const timeLeftMinutes = Math.floor(timeLeftMs / 60000);
        parkStatus = { canPark: true, timeLeft: timeLeftMinutes };
      }
    }
  }

  return parkStatus;
}

function monthToInt(month) {
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthArray.indexOf(month);
}

function dayToInt(day) {
  const dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return dayArray.indexOf(day);
}

export { findTimeLeftForArray, canYouPark, canWePark };
