import fs from 'fs';


const VALID_DATE_FORMATS = {
    DATE_FORMAT_1: 'MM/DD/YYYY'
}

export const VALID_DURATION_FORMATS = {
    IMPROVED: 'improved',
    DECIMAL: 'decimal',
    CLASSIC: 'classic'
}

const WEEK_DAYS = {
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday',
    SUNDAY: 'Sunday',
};


class Settings {
    /*
        Simple class to represent the settings for tgl
    */

    constructor() {
        let raw_settings = fs.readFileSync('./bin/config/settings.json');
        let settings = JSON.parse(raw_settings);

        this.init(settings);
    }

    init({
        workspace = 'this',
        name = 'You',
        email = '',
        dateFormat = 'MM/DD/YYYY',
        use24HourClock = false,
        durationFormat = 'improved',
        firstDayOfTheWeek = 'Monday',
        groupSimilarTimeEntries = true
    } = {}) {
        this.workspace = workspace || "this";
        this.name = name || "You";
        this.email = email;
        this.dateFormat = dateFormat;
        this.use24HourClock = use24HourClock;
        this.durationFormat = durationFormat;
        this.firstDayOfTheWeek = firstDayOfTheWeek;
        this.groupSimilarTimeEntries = groupSimilarTimeEntries;

        this.validate();
    }

    validate() {
        if (!Object.values(VALID_DATE_FORMATS).includes(this.dateFormat)) {
            throw new Error('Invalid dateFormat', this.dateFormat);
        }

        if (!Object.values(VALID_DURATION_FORMATS).includes(this.durationFormat)) {
        throw new Error('Invalid durationFormat', this.durationFormat);
        }

        if (!Object.values(WEEK_DAYS).includes(this.firstDayOfTheWeek)) {
        throw new Error('Invalid firstDayOfTheWeek', this.firstDayOfTheWeek);
        }
    }
}


export default Settings;