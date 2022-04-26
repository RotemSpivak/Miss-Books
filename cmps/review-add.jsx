import { bookService } from "../services/book.service.js";

export class ReviewAdd extends React.Component {
  state = {
    review: {   
    rating: 5,
    fullName: 'Books Reader',
    dateRead: '01/01/2022',
    textArea: 'Some thoughts about this book...'
    }
  }

  handleChange = ({ target }) => {
    const value = target.type === "number" ? +target.value : target.value;
    const field = target.name;
    this.setState(
      (prevSate) => ({ review: { ...prevSate.review, [field]: value } })
    );
  };

  onSubmit = (event) => {
    event.preventDefault()
    const review = this.state.review
    bookService.addReview(this.props.bookId, review)
      this.props.addReview(this.state.review);
  }
    
  
  render() {
    const {rating, fullName, dateRead, textArea} = this.state.review
    return <section className="review-add">
      <h2>Rate this book:</h2>
      <form >
        <label htmlFor="fullName">Full Name:</label>
              <input type="text" id="fullName" name="fullName" value={fullName} onChange={this.handleChange} />
        <label htmlFor="rating">Rating:</label>
        <select name="rating" id="rating" value={rating} onChange={this.handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br></br>
        <label htmlFor="date-read">Date Read:</label>
        <input onChange={this.handleChange} type="date" id="date-read" name="date-read"  min="1940-01-01" value={dateRead}></input>
        <textarea onChange={this.handleChange} value={textArea} name="textArea"
            rows="5" cols="30" maxLength="100"></textarea>
        <button onClick={this.onSubmit}>Submit</button>
        </form>
    </section>
  }
}
