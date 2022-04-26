import { getGoogleBooks } from "../services/axios.service.js"
import { eventBusService } from "../services/event-bus-service.js";
import { bookService } from "../services/book.service.js";
import { storageService } from "../services/storage.service.js";
const STORAGE_KEY = 'googleBooksDB'
const STORAGE_KEY1 = 'booksDB'


export class BookAdd extends React.Component{
    state = {
        googleBooks: [],
        search: "",

    }


    onHandleChange = (event) => {
        this.setState({search: event.target.value})
    }

    onSubmitForm = (event) => {
        event.preventDefault()
        getGoogleBooks(this.state.search).then((googleBooks)=> {
            this.setState({googleBooks})
        })
    }
    onAddGoogleBook = (book) => {
        const books = storageService.loadFromStorage(STORAGE_KEY1)
        let bookIdx = books.findIndex((savedBook) => {
            return (savedBook.id === book.id)
        })
        if(bookIdx === -1) return
        else{
        bookService.addGoogleBook(book)
        .then(() => {
            eventBusService.emit('user-msg', {
                type: 'success', txt: `${book.volumeInfo.title} added successfully.`, bookId: book.id,
            })
        })
        .catch(()=> {
            eventBusService.emit('user-msg', {
                type: 'danger', txt: `Failed to add ${book.volumeInfo.title}.`
            })
        })
        }
    }

    render() {
        const books = this.state.googleBooks
        const search = this.state.search
        return <div>
            <form onSubmit={this.onSubmitForm}>
            <input type="text" placeholder="Search.." name="search" onChange={this.onHandleChange} value={search}/>
            </form>
            {books.map((book, idx) => {
               return <div key={idx}>
                <button onClick={()=> this.onAddGoogleBook(book)}>+</button>
                 <div >Title: {book.volumeInfo.title} Authors: {book.volumeInfo.authors}</div>    
                </div>
            })}
            </div>
        }


    
}