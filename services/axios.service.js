import {storageService} from "./storage.service.js"
const STORAGE_KEY = 'googleBooksDB'


export function getGoogleBooks(search = ''){

        return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${search}`)
        .then(res => {
            storageService.saveToStorage(STORAGE_KEY,res.data.items)
            return res.data.items
        })
     
}