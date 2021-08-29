export const emailTest = (value) => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    return emailRegex.test(value);
}

export const sortEmailCards = (emailA, emailB) => {
    const dateA = new Date(emailA.timeStamp).getTime();
    const dateB = new Date(emailB.timeStamp).getTime();

    return dateB - dateA;
}

export const calculateDate = (date) => {
    const convertedDate = new Date(date)
    const currentDate = new Date()
    const dayDifference = Math.round((currentDate.getTime() - convertedDate.getTime()) / (1000 * 60 * 60 * 24))
    if (dayDifference === 0) {
        if (currentDate.getDate() === convertedDate.getDate())
            return 'Today';
        else if (currentDate.getDate() !== convertedDate.getDate())
            return 'Yesterday';
    }
    else if (dayDifference === 1)
        return 'Yesterday';
    else if (dayDifference > 1) {
        const day = convertedDate.getDate()
        const month = convertedDate.getMonth() + 1
        const year = convertedDate.getFullYear()
        return `${day}/${month}/${year}`
    }
}

const hoursMap = {
    0: 12, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11,
    12: 12, 13: 1, 14: 2, 15: 3, 16: 4, 17: 5, 18: 6, 19: 7, 20: 8, 21: 9, 22: 10, 23: 11, 24: 12
}
export const calculateTime = (timestampString) => {
    const timestamp = new Date(timestampString)
    const hours = timestamp.getHours()
    const minutes = timestamp.getMinutes()
    const period = hours >= 12 ? 'pm' : 'am'

    const displayHours = hoursMap[hours]
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${displayHours}:${displayMinutes} ${period}`
}

export const calculateDateDifference = (date1, date2) => {
    const convertedDate1 = new Date(date1)
    const convertedDate2 = new Date(date2)
    const difference = date2 && Math.round((convertedDate1.getTime() - convertedDate2.getTime()) / (1000 * 60 * 60 * 24))
    if (difference >= 1 || (!difference && difference !== 0) || (difference === 0 && convertedDate1.getDate() !== convertedDate2.getDate()))
        return calculateDate(date2)
    else if (difference === 0 && convertedDate1.getDate() === convertedDate2.getDate())
        return false;
}