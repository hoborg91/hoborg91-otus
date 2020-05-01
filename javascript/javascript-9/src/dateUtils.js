export const formatDate = (date) => {
    if (!(date instanceof Date))
        throw new Error('Argument error: date expected.');

    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
};

export const parseDate = (dateStr) => {
    if (typeof dateStr !== typeof '')
        throw new Error('Argument error: string expected.');
    
    const dateParts = dateStr.split('-');
    const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    return date;
};