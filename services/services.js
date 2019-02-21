const formatDate = function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

const replaceAll = function(text, search, replacement) {
    return text.split(search).join(replacement).trim();
};

module.exports = {
  formatDate,
  replaceAll
}
