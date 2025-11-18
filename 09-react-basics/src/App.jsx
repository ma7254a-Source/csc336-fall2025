import { useState } from 'react'

function App() {
  const [items, setItems] = useState ([
    { text:"cantankerous", important: false},
    { text:"prudent", important: false},
    { text:"ardent", important: false},
    { text:"programmatically", important: false},
    { text:"intuition", important: false},
  ]);

  return (
    <div>
      <h1>Some of My Favorite Words</h1>
      <ul>
        {items.map((item, index) => (
          <ListItem
          key={index}
          text={item.text}
          important={item.important}
          />
        ))}
      </ul>
    </div>
  );
}

function ListItem({text, important}) {
  const style = {
    fontWeight: important ? "bold" : "normal", 
    fontSize: important ? "1.2rem" : "1rem",
  };

  return (
    <li style={style}>
      {important && "*"}
      {text}
    </li>
  );
}


export default App
