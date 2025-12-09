// pages/Home.jsx - Landing page
function Home() {
  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Home Page</h2>
      </header>
      
      <div className="home-content">
        <h1 className="home-title">Welcome to Terra Inter</h1>
        
        <p className="home-description">
          Terra Inter is an interactive compendium and world atlas for an expansive 
          creative writing project. Explore the diverse regions, factions, and lore 
          of a vast highland realm filled with ancient mysteries and fractured kingdoms.
        </p>
        
        <nav className="home-links">
          <div className="home-link-card">
            <h3>Compendium</h3>
            <p>Browse a collection of entries including locations, factions, characters, and historical events from across Terra Inter.</p>
            <a href="/compendium" className="link-button">Explore Compendium</a>
          </div>
          
          <div className="home-link-card">
            <h3>World Map</h3>
            <p>Navigate an interactive map of the known world. Click on regions to be taken to their respective pages.</p>
            <a href="/map" className="link-button">View Map</a>
          </div>
          
          <div className="home-link-card">
            <h3>Add Entry</h3>
            <p>Contribute to the world by creating new entries. Add locations, factions, characters, or events to expand the lore.</p>
            <a href="/create" className="link-button">Create Entry</a>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Home
