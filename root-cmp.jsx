import {BookApp} from './pages/book-app.jsx'
import {BookAdd} from './pages/book-add.jsx'
import {BookDetails} from './pages/book-details.jsx'
import {AppHeader} from './pages/app-header.jsx'
import {Home} from './pages/home.jsx'
import {About} from './pages/about.jsx'
import { UserMsg } from './cmps/user-msg.jsx'

const Router = ReactRouterDOM.HashRouter
const {Route, Switch} = ReactRouterDOM


// google books API key AIzaSyAcwwxhdqLhm7GgULd74_EXGXOUvjLzn9g
export function App() {
    return <Router>
            <AppHeader/>
            <section className="app">
                <Switch>
                    <Route path="/book/:bookId" component={BookDetails}/>
                    <Route path="/book" component={BookApp}/>
                    <Route path="/bookAdd" component={BookAdd}/>
                    <Route path="/about" component={About}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </section>
            <UserMsg/>
        </Router>   
}





