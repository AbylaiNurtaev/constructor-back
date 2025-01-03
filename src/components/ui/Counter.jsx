import React, { useState, useEffect } from 'react';

function Counter({ price, onPriceChange, onRemove, onCountChange, initialCounter = 1, isMetr, countity }) {
    const [counter, setCounter] = useState(initialCounter);

    // Обновляем цену и вызываем onCountChange при изменении counter
    useEffect(() => {
        if (counter === 0 && onRemove) {
            onRemove();
        }
        if (onPriceChange) {
            onPriceChange(counter * price);
        }
        if (onCountChange) {
            onCountChange(counter);
        }
    }, [counter]);

    return (
        <div className="flex flex-col justify-start items-start gap-[5px] mt-[10px]">
            <div
                style={{ background: "rgba(41, 123, 255, 0.2)", borderRadius: "5px" }}
                className="flex justify-center items-center gap-[10px] font-sans text-[13px] h-[35px] px-2.5"
            >
                <p
                    className="text-primary cursor-pointer"
                    onClick={() => setCounter(isMetr ? (prev) => parseFloat((prev - 0.1).toFixed(1)) : (prev) => prev-1)}

                >
                    -
                </p>
                {/* {
                    isMetr &&
                    <input onChange={() => setCounter((prev) => parseFloat((prev + 1).toFixed(1)))} type="number" className='w-5 h-[30px] rounded-[5px] flex justify-center items-center pl-[6px]' placeholder='1'/>
                } */}
                <p className="bg-white rounded-[5px] text-black h-[30px] flex justify-center items-center px-[2.5px] w-[50px]">
                    {counter} {isMetr ? "м." : "шт."}
                </p>
                <p
                    className="text-primary cursor-pointer"
                    onClick={() => setCounter(isMetr ? (prev) => parseFloat((prev + 0.1).toFixed(1)) : (prev) => prev+1)}
                >
                    +
                </p>
            </div>

            <div>
            <p>{Math.round(counter * price).toLocaleString()}₽</p>
            <p className="font-sans text-[9px]">
  {Math.round(price)}₽ за {isMetr ? "м." : "шт."}
</p>

            </div>
        </div>
    );
}

export default Counter;
