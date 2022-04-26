export class BookFilter extends React.Component {
  state = {
    filterBy: {
      title: '',
      minPrice: '',
      maxPrice: ''
    },
  };

  handleChange = ({ target }) => {
    const value = target.type === "number" ? +target.value : target.value;
    const field = target.name;
    this.setState(
      (prevSate) => ({ filterBy: { ...prevSate.filterBy, [field]: value } }),
      () => {
        this.props.onSetFilter(this.state.filterBy);
      }
    );
  };

  onFilter = (ev) => {
    ev.preventDefault();
    this.props.onSetFilter(this.state.filterBy);
  };

  render() {
    const { title, minPrice, maxPrice } = this.state.filterBy

    return <section className="book-filter">
        <form className="filter-form" onSubmit={this.onFilter}>
            <label htmlFor="by-title">Title</label>
            <input type="text" id="by-title" placeholder="By Title" name="title"
                value={title} onChange={this.handleChange} />

            <label htmlFor="by-minPrice">Min Price</label>
            <input type="number" id="by-minPrice" placeholder="By Min Price" name="minPrice"
                value={minPrice} onChange={this.handleChange} />

            <label htmlFor="by-maxPrice">Max Price</label>
            <input type="number" id="by-maxPrice" placeholder="By Max Price" name="maxPrice"
                value={maxPrice} onChange={this.handleChange} />

            <button>Filter</button>
        </form>
    </section>
  }
}
