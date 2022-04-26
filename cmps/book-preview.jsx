
const { Link } = ReactRouterDOM
export function BookPreview({book, onSelectBook}){


    const currency = (book) =>{
        let currency = book.listPrice.currencyCode
        switch(currency){
            case "ILS":
                return '₪'
            case "USD":
                return '$'
            case "EUR":
                return '€'
        }
    }

        return <Link to={`/book/${book.id}`}>
            <div className="book-preview">
                <h2 key={book.id}>{book.title}</h2>
                <div className="img-container">
                    <img src={`${book.thumbnail}`} />
                </div>
                <h3>Price: {currency(book)}{book.listPrice.amount}</h3>
            </div>
        </Link>



}