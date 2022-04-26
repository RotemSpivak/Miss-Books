export const storageService = {
    loadFromStorage,
    saveToStorage
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    if(!val) return val
    return JSON.parse(val)
}