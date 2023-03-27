function average(arr) {
    const sum = arr.reduce((acc, prev) => acc + prev.rate, 0)
    return Math.floor(sum / arr.length)
}
module.exports = average
