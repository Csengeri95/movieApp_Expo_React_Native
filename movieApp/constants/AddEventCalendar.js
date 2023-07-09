import * as Calendar from 'expo-calendar';


export const addEventToCalendar = async (title, startDate, endDate, alarm, calendarType) => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        if (calendars.length > 0) {
            const defaultCalendar = calendars.find((cal) => cal.allowsModifications);


            if (defaultCalendar) {

                const timezoneOffset = new Date().getTimezoneOffset() + 60;
                const adjustedStartDate = new Date(startDate);
                const adjustedEndDate = new Date(endDate);
                adjustedStartDate.setMinutes(adjustedStartDate.getMinutes() + timezoneOffset);
                adjustedEndDate.setMinutes(adjustedEndDate.getMinutes() + timezoneOffset);

                const eventDetails = {
                    title: title,
                    startDate: adjustedStartDate.toISOString(),
                    endDate: adjustedEndDate.toISOString(),
                    alarms: alarm == null ? [] : [{ relativeOffset: -alarm }],
                };

                await Calendar.createEventAsync(calendarType, eventDetails);
            } else {
                console.log("No calendar found");
            }
        } else {
            console.log("No calendars found");
        }
    }
};


