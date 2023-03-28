function search(message, arr) {
    return arr.filter(item => item.name.toLowerCase().indexOf(message.toLowerCase()) !== -1)
}
module.exports = search
