//first custom component--altered ListItem that uses props
//uses text and important props and also derives isLong from text to devide what to show
import WordBadge from "./WordBadge";

function ListItem({ text, important }) {
  const isLong = text.length > 10;

  return (
    <li
      className={
        "word-item" + (important ? " word-item--important" : "")
      }
    >
      <span className="word-item__text">{text}</span>

      <div className="word-item__badges">
        {/*Reuse the second component multiple times*/}
        {important && (
          <WordBadge variant="important" label="Important" />
        )}
        {isLong && (
          <WordBadge variant="long" label="Long word" />
        )}
      </div>
    </li>
  );
}

export default ListItem;
