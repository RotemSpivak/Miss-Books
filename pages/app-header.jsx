const { Link, NavLink } = ReactRouterDOM

export function AppHeader(){
    return <header className="app-header">
        <h1>Bookworm</h1>
        <nav>
            <NavLink to="/" exact> Home</NavLink>
            <NavLink to="/about" > About</NavLink>
            <NavLink to="/book" > Our Books</NavLink>
            <NavLink to="/bookAdd" > Book Enclycopedia</NavLink>
        </nav>
    </header>
}