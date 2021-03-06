import { eventBusService } from "../services/event-bus-service.js"

export class UserMsg extends React.Component {

  state = {
    msg: null,
    bookId: null
  }

  removeEvent
  timeoutId

  componentDidMount() {
    this.removeEvent = eventBusService.on('user-msg', (msg) => {
      this.setState({ msg, bookId: msg.bookId })
      if (this.timeoutId) clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(this.onCloseMsg, 3000)
    })
  }
  componentWillUnmount() {
    this.removeEvent()
}

onCloseMsg = () => {
    this.setState({ msg: null , bookId: null})
    clearTimeout(this.timeoutId)
}

render() {
    const { msg, bookId } = this.state
    if (!msg) return <React.Fragment></React.Fragment>
    return <div className={`user-msg ${msg.type}`}>
        <button onClick={this.onCloseMsg}>X</button>
        {msg.txt}
        <a href={`/#/book/${bookId}`}>Check it Out!</a>
    </div>

}
}
  