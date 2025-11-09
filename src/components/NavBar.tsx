export function NavBar() {
  const content = (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand">Flight Planner XP</div>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="/search">
              Search
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/collection">
              Collection
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-nowrap" href="/tags">
              My Tags
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );

  return content;
}
