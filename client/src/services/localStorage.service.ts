





function saveState(key: string, state: any) {
    localStorage.setItem(key, JSON.stringify(state))
}


function getElemByKey(key: string) {
    return localStorage.getItem(key)
}
function removeElement(key: string) {
    return localStorage.removeItem(key)
}
export const localStorageService = {
    saveState,
    getElemByKey,
    removeElement
}
