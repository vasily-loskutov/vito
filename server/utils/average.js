function average(arr) {
    console.log(arr)
    const sum = arr.reduce((acc, prev) => acc + prev.rate, 0)
    console.log(sum)
    return Math.floor(sum / arr.length)
}
module.exports = average
