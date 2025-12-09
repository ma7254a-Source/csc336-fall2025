function Home() {
  return (
    <div className="home-page">
      <header className="hero">
        <h1>Welcome to Terra Inter</h1>
        <p className="subtitle">An Interactive World Compendium</p>
        <p className="description">
          Explore the lands, factions, and lore of a vast creative universe.
          Navigate the interactive map or browse the complete compendium.
        </p>
      </header>
      
      <section className="features">
        <div className="feature-card">
          <h3>Compendium</h3>
          <p>Browse all entries, locations, and factions</p>
        </div>
        
        <div className="feature-card">
          <h3>Interactive Map</h3>
          <p>Explore regions and discover connections</p>
        </div>
        
        <div className="feature-card">
          <h3>Contribute</h3>
          <p>Add new entries to the world</p>
        </div>
      </section>
    </div>
  )
}

export default Home
