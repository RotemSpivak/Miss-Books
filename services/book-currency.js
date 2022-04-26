export const bookCurrency = {
    getCurrency,

}
function getCurrency(books){
    let currency = books.listPrice.currencyCode
    switch(currency){
        case "ILS":
            return 'ש"ח'
        case "USD":
            return '$'
        case "EUR":
            return '€'
    }
}
