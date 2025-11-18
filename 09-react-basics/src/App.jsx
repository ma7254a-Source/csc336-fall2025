import { useState } from 'react';
import ListItem from './ListItem';
import "./App.css"; //for styling later

function App() {
  const [items, setItems] = useState ([
    { text:"cantankerous", important: false},
    { text:"prudent", important: false},
    { text:"ardent", important: false},
    { text:"programmatically", important: false},
    { text:"intuition", important: false},
  ]);

  const [inputValue, setInputValue] = useState("");

  function add() {
    if (!inputValue.trim()) return;

    setItems([...items, {text: inputValue.trim(), important: false }]);
    setInputValue("");
  }

  return (
    <div className="app-container">
      <h1>Some of My Favorite Words</h1>

      <div className="add-word">
        <input
          type="text"
          placeholder="Add a New Word"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={add}>Add</button>
      </div>

      {/*new render--copied from old*/}
      <ul className="word-list">
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

      {/*old input + button div
      <div>
        <input
          type="text"
          placeholder="Add a New Word"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={add}>Add</button>
      </div>


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
*/}
{/* new ListItem has been moved to ListItem.jsx
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
*/}

export default App
