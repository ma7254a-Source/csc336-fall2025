//src/WordListPage.jsx --> was originally our App.jsx file in pt1
import { useState } from "react";
import ListItem from "./ListItem";

function WordListPage() {
  const [items, setItems] = useState([
    { text: "cantankerous", important: true },
    { text: "prudent", important: false },
    { text: "ardent", important: false },
    { text: "programmatically", important: true },
    { text: "intuition", important: false },
  ]);

  const [inputValue, setInputValue] = useState("");

  function add() {
    if (!inputValue.trim()) return;

    setItems([...items, { text: inputValue.trim(), important: false }]);
    setInputValue("");
  }

  return (
    <section className="app-container">
      <h2>Some of My Favorite Words</h2>

      <div className="add-word">
        <input
          type="text"
          placeholder="Add a New Word"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={add}>Add</button>
      </div>

      <ul className="word-list">
        {items.map((item, index) => (
          <ListItem
            key={index}
            text={item.text}
            important={item.important}
          />
        ))}
      </ul>
    </section>
  );
}

export default WordListPage;
