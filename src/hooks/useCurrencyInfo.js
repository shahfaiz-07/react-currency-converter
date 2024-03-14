import React from "react";

function useCurrencyInfo(currency = "usd") {
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
                );
                const result = await response.json();
                setData(result[currency]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [currency]);
    // console.log(data)
    return data;
}

export default useCurrencyInfo;
