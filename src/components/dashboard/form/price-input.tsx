import React from "react";
import ErrorField from "../error-field";
interface Props {
  formik: any;
}

const PriceInput: React.FC<Props> = ({ formik }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
    const priceLimit = 100000000;
    const inputValueAsNumber = Math.min(Number(inputValue), priceLimit);

    formik.setFieldValue("price", inputValueAsNumber);
  };

  return (
    <>
      <input
        id="price"
        type="text"
        name="price"
        className="w-full rounded-sm border border-black px-2 py-[6px] focus:outline-none"
        onChange={handleInputChange}
        value={new Intl.NumberFormat("id-ID").format(formik.values.price)}
        onBlur={formik.handleBlur}
      />
      <ErrorField touched={formik.touched.price} error={formik.errors.price} />
    </>
  );
};

export default PriceInput;
