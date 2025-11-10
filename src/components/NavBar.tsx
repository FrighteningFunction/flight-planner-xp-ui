export function NavBar() {
  const content = (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand">
          <i className="bi bi-airplane-fill me-2"></i>
          {"Flight Planner XP"}
        </div>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link text-nowrap" href="/search">
              <i className="bi bi-search me-2"></i>
              {"Search"}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-nowrap" href="/collection">
              <i className="bi bi-folder-fill me-2"></i>
              {"Collection"}
            </a>
          </li>
          <li className="nav-item">            
            <a className="nav-link text-nowrap" href="/tags">
              <i className="bi bi-tag-fill me-2"></i>
              {"My Tags"}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );

  return content;
}
