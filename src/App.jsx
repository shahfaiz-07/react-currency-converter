import { useState } from "react";
import {InputBox} from "./components/";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
    const BackgroundImage =
        "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState("0");
    const [fromVal, setFromVal] = useState("usd");
    const [toVal, setToVal] = useState("inr");

    const currencyInfo = useCurrencyInfo(fromVal);
    const options = Object.keys(currencyInfo);
    const swap = () => {
        setFromVal(toVal);
        setToVal(fromVal);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    }
    
    const converter = () => {
        const rate = Number(currencyInfo[toVal])
        setConvertedAmount(amount * rate)
    }

    return (
        <>
            <div
                className="w-full h-screen flex flex-wrap justify-center items-center bg-cover"
                style={{
                    backgroundImage: `url('${BackgroundImage}')`,
                }}
            >
                <div className="w-full">
                    <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                converter();
                            }}
                        >
                            <div className="w-full mb-1">
                                <InputBox
                                    label="From"
                                    amount={amount}
                                    onAmountChange={(amount) =>
                                        setAmount(amount)
                                    }
                                    onCurrencyChange={(currency) =>
                                        setFromVal(currency)
                                    }
                                    allCurrencies={options}
                                    selectCurrency={fromVal}
                                />
                            </div>
                            <div className="relative w-full h-0.5">
                                <button
                                    type="button"
                                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                    onClick={swap}
                                >
                                    swap
                                </button>
                            </div>
                            <div className="w-full mt-1 mb-4">
                                <InputBox
                                    label="To"
                                    amount={convertedAmount}
                                    allCurrencies={options}
                                    onCurrencyChange={(currency) =>
                                        setToVal(currency)
                                    }
                                    selectCurrency={toVal}
                                    amountDisable
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
                            >
                                Convert {fromVal.toUpperCase()} to{" "}
                                {toVal.toUpperCase()}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
