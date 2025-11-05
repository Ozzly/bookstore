import React, { useEffect, useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

interface NumberInputWithButtonsProps {
  count: number;
  setCount: (newCount: number) => void;
  maxCount?: number;
}

function NumberInputWithButtons({
  count,
  setCount,
  maxCount,
}: NumberInputWithButtonsProps) {
  const [localCount, setLocalCount] = useState<string>(count.toString());

  useEffect(() => {
    setLocalCount(count.toString());
  }, [count]);

  function handleEpisodeSave() {
    if (localCount === "" || (maxCount && Number(localCount) > maxCount)) {
      setLocalCount(count?.toString() || "");
    } else if (localCount === count?.toString()) {
      return;
    } else {
      setCount(Number(localCount));
    }
  }

  return (
    <div className="flex gap-1">
      <button
        className="hover:brightness-125 transition-all duration-300 "
        onClick={() => {
          setCount(Math.max(0, count - 1));
        }}
      >
        <FaCircleMinus />
      </button>
      <input
        className={`w-12 text-right focus:outline-none border-3 rounded-lg px-1 border-ctp-surface2 focus:border-ctp-mauve`}
        value={localCount}
        onChange={(event) => {
          if (event.target.value === "") {
            setLocalCount("");
          } else if (!isNaN(Number(event.target.value))) {
            setLocalCount(event.target.value);
          }
        }}
        onBlur={handleEpisodeSave}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleEpisodeSave();
            (event.target as HTMLInputElement).blur();
          }
        }}
        onFocus={(event) => {
          const input = event.target as HTMLInputElement;
          input.setSelectionRange(input.value.length, input.value.length);
        }}
      />
      <button
        className="hover:brightness-125 transition-all duration-300"
        onClick={() => {
          const localButtonCount = maxCount
            ? Math.min(maxCount, count + 1)
            : count + 1;
          setCount(localButtonCount);
        }}
      >
        <FaCirclePlus />
      </button>
    </div>
  );
}

export default NumberInputWithButtons;
