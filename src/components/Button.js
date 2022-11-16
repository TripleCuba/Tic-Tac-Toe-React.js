import React from "react";

const Button = ({ item, changeScore, currentWinner }) => {
  return (
    <button
      className={`border w-titleW h-titleH ${
        item.value === 0 && !currentWinner
          ? "hover:bg-slate-300"
          : "bg-slate-500"
      }`}
      onClick={() => changeScore(item.id)}
      value={item.value}
      disabled={item.value > 0 ? true : currentWinner ? true : false}
    >
      {item.value === 0 ? (
        ""
      ) : item.value === 1 ? (
        <img className=" w-full h-full" src="./imgs/cross.png" alt="cross" />
      ) : (
        <img className=" w-full h-full" src="./imgs/zero.png" alt="zero" />
      )}
    </button>
  );
};

export default Button;
