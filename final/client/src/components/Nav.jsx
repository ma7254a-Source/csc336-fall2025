import { Link } from 'react-router-dom'
import { FaBookOpen, FaGlobeAmericas, FaFeatherAlt, FaHome } from 'react-icons/fa'

function Nav() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-logo">Terra Inter</h1>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <FaHome style={{ marginRight: '0.4rem' }} />
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/compendium" className="nav-link">
              <FaBookOpen style={{ marginRight: '0.4rem' }} />
              Compendium
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/map" className="nav-link">
              <FaGlobeAmericas style={{ marginRight: '0.4rem' }} />
              Map
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">
              <FaFeatherAlt style={{ marginRight: '0.4rem' }} />
              Add Entry
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
