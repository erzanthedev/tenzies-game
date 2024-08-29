const Die = ({ value, handleHoldDice, isHeld }) => {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };
  return (
    <div style={styles} className="die-box">
      <h1 className="die-num" onClick={handleHoldDice}>
        {value}
      </h1>
    </div>
  );
};

export default Die;
