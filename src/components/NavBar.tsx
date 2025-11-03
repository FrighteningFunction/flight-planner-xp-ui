export function NavBar() {

    const content = (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Flight Planner XP</a>

            </div>
            <div className="collapse navbar-collapse" >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" href="/search">Search</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/collection">Collection</a>
                    </li>
                </ul>
            </div>
        </nav>

    )

    return content;
}