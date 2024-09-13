import { useState } from "react";

export const usePriceInput = () => {
  const [price, setPrice] = useState<number | string>("");

  const handleInputPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
    const priceLimit = 100000000;
    const inputValueAsNumber = Math.min(Number(inputValue), priceLimit); // Keep within the limit

    setPrice(inputValueAsNumber); // Store the numeric value
  };

  const formattedPrice = new Intl.NumberFormat("id-ID").format(Number(price));

  return { price, formattedPrice, handleInputPriceChange };
};
