//our second component
function WordBadge({ variant, label }) {
  return (
    <span className={`badge badge--${variant}`}>
      {label}
    </span>
  );
}

export default WordBadge;
