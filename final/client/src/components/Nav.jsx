import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-logo">Terra Inter</h1>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/compendium" className="nav-link">Compendium</Link>
          </li>
          <li className="nav-item">
            <Link to="/map" className="nav-link">Map</Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">Add Entry</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
