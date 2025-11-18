import { useState } from 'react';
import ListItem from './ListItem';
import "./App.css"; //for styling later


/*words marked with important are MY favorite words. meant to separate the ones the user adds vs mine*/
function App() {
  const [items, setItems] = useState ([
    { text:"cantankerous", important: true}, 
    { text:"prudent", important: true},
    { text:"ardent", important: true},
    { text:"programmatically", important: true},
    { text:"intuition", important: true},
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
