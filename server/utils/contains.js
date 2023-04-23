module.exports = function contains(where, what) {
    for (var i = 0; i < what.length; i++) {
        if (where.indexOf(what[i]) == -1) return false;
    }
    return true;
}
