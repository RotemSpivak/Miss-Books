import { LongText } from '../cmps/long-txt.jsx'
import { bookService } from "../services/book.service.js"
import { ReviewAdd } from '../cmps/review-add.jsx'

const { Link } = ReactRouterDOM
export class BookDetails extends React.Component{
    state = {
        book: null,
        isLongTextShown: false
    }

    componentDidMount(){
        const bookPromise = bookService.getById(this.props.match.params.bookId)
        bookPromise.then(book => this.setState({book}))
    }
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
          }
    }

    onRouteChanged = () => {
        const bookPromise = bookService.getById(this.props.match.params.bookId)
        bookPromise.then(book => this.setState({book}))
    }
    pagesCount = () => {
        const book = this.state.book
        if(!book) return
        let pageCount = ''
        if (book.pageCount > 500) pageCount = 'Long Reading'
        else if (book.pageCount > 200) pageCount = 'Decent Reading' 
        else pageCount = 'Light Reading'
        return pageCount
    }

    publishedDate = () => {
        const book = this.state.book
        if(!book) return
        let date = book.publishedDate
        const yearsAgo = Math.abs(date - new Date().getFullYear())
        if (yearsAgo > 10) return 'Veteran Book'
        else if (yearsAgo < 1) return 'New Book'
    }

    coloredPrice = () => {
        const book = this.state.book
        if(!book) return
        let price = book.listPrice.amount
        if (price > 150) return 'red'
        else if (price < 20) return 'green'
    }

    onSale = () => {
        const book = this.state.book
        if(!book) return
        if(book.listPrice.isOnSale){
            return <div className="onSale">
                        <img src="/img/sale.jpg" />
                    </div>
        }
    }


    toggleReadMore = () => {
        this.setState({
            isLongTextShown: !this.state.isLongTextShown,
        })
    }

    addReview = () => {
        const bookPromise = bookService.getById(this.state.book.id)
        bookPromise.then(book => this.setState({book}))
    }

    onRemoveReview = (idx) => {
        bookService.removeReview(this.state.book.id, idx)
        const bookPromise = bookService.getById(this.state.book.id)
        bookPromise.then(book => this.setState({book}))
    }
    render() {
        const book = this.state.book
        console.log('book', book)
        if(!book) return <div>Loading..</div>
        const nextBookId = bookService.getNextBookId(book.id)
        const prevBookId = bookService.getPrevBookId(book.id)
        return <section className="book-details">
            <div>
            <ReviewAdd addReview={this.addReview} bookId={this.props.match.params.bookId}/>
            <div className="book-review-container">
            <h2>Book Reviews:</h2>
            {
                !book.reviews || !book.reviews.length ? <h3>No reviews to show</h3>
                : <ul>
              {book.reviews.map(((review, idx) => {
                  return <li
                  key={idx}>Name: {review.fullName} Rating: {review.rating} Date Read: {review.dateRead} Thoughts: {review.textArea}
                   <button onClick={()=>this.onRemoveReview(idx)} >X</button> 
                   </li>        
              }))} 
            </ul>
            }
            </div>
            <div className="book-description" >
                <h2>Description: </h2>
                {<LongText onToggle={this.toggleReadMore} text={book.description} isLongTextShown={this.state.isLongTextShown} />}
            </div>
            <h3>~{this.pagesCount()}~</h3>
            <h3>This is a {this.publishedDate()}!</h3>
            </div>
            <div className="book-details-container">
            <h2>{book.title}</h2>
            <div>{this.onSale()}</div>
            <h2 className={this.coloredPrice()}>{book.listPrice.amount} {book.listPrice.currencyCode}</h2>
            <h3>{book.subtitle}</h3>
            <h4>{book.authors}</h4>
            <div className="book-preview">
                <img src={book.thumbnail} />
            </div>
            {/* <button onClick={this.onPrevBook}>Previous Book</button> */}
            <Link to={`/book/${nextBookId}`}><button>Next Book</button></Link>
            <Link to={`/book/${prevBookId}`}><button>Previous Book</button></Link>
            </div>
        </section>
    }
}