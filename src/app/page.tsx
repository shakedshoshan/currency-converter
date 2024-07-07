"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
require("dotenv").config();
// Array of currency codes
const currencyCodes = [
  null,"AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
  "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
  "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
  "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP",
  "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS",
  "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
  "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
  "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT",
  "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
  "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
  "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
  "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
  "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD",
  "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY",
  "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES",
  "VND", "VUV", "WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZAR", "ZMW",
  "ZWL"
];

export default function Home() {
    const [amount, setAmount] = useState(100);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("GBP");
    const [result, setResult] = useState(`100 USD = 78.13 GBP`);

    const handleSwapCurrencies = () => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
  }

  const getExchangeRate = async () =>{
    const API_URL = `https://v6.exchangerate-api.com/v6/29f0d35ec8320c1eb15122f8/pair/${fromCurrency}/${toCurrency}`;
    try{
      const response = await fetch(API_URL);
      if(!response.ok) throw new Error("Somthing not good!");
      const data = await response.json();
      const rate = (data.conversion_rate * amount).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
    } catch(err){
      console.log(err);
    }

  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    getExchangeRate()
  }


  return (
    <main className="">
      <form onSubmit={handleSubmit} className="">
      <div className="flex items-center justify-center flex-col space-y-3 bg-[#0e1e52] rounded-2xl p-6 px-28 opacity-90 shadow-2xl">
        <h1 className="converter-title text-5xl py-4 font-extrabold"> currency converter</h1>
        <div className="flex flex-col items-center justify-center space-y-1">
          <label className="text-2xl font-semibold">Enter amount</label>
          <input
                    type="number"
                    className="text-black"
                    value={amount}
                    onChange={(e) => setAmount(+e.target.value)}
                    required
                />
        </div>

        <div>
          <label className="text-1xl font-semibold">From</label>
          <img src={`https://flagsapi.com/${fromCurrency.substring(0,2)}/flat/64.png`} alt="from country flag"/>
          <select className="text-black" onChange={e => setFromCurrency(e.target.value)}>
            {currencyCodes.map(currency => (
              <option className="text-[#272626f5]" key={currency} value={currency?? ""}>{currency? currency: fromCurrency}</option>
            ))}
            
          </select>
        </div>

        <div className="swap-icon" onClick={handleSwapCurrencies}>
                    <svg width="16" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                            fill="#000" />
                    </svg>
                </div>

        <div>
          <label className="text-1xl font-semibold">To</label>
          <img src={`https://flagsapi.com/${toCurrency.substring(0,2)}/flat/64.png`} alt="to country flag"/>
          <select className="text-black" onChange={e => setToCurrency(e.target.value)}>
          {currencyCodes.map(currency => (
              <option className="text-[#272626f5]" key={currency} value={currency?? ""} defaultValue={toCurrency}>{currency? currency: toCurrency}</option>
            ))}
          </select>
        </div>
        <div>  
      </div>
        <button type="submit" className="bg-[#15142d] p-3 px-20">Convert</button>


        <p className="text-4xl pt-6">{result}</p>
      </div>
      </form>
    </main>
  );
}
