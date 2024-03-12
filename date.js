
module.exports.getDate = getDate;

function getDate() {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US", options);
    return day;
}

module.exports.getDay = getDay;
// exports.getDay = getDay;

function getDay() {
    let today = new Date();
    let options = {
        weekday: "long",
    }
    var day = today.toLocaleDateString("en-US", options);
    return day;
}

// console.log(module.exports);