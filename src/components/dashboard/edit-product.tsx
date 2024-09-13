import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useUpdateProduct } from "~/hooks/useUpdateProduct";
import { useImageUpload } from "~/hooks/useImageUpload";
import { categoryOptions } from "~/constants/categoryOptions";
import { cityOptions } from "~/constants/cityOption";
import { productValidationSchema } from "./form/utils";
import FormField from "./form/form-field";
import TextInput from "./form/text-input";
import ErrorField from "./error-field";
import PriceInput from "./form/price-input";
import TextAreaInput from "./form/textarea-input";
import ImageForm from "./form/image-form";
import { Button } from "../ui/button";

interface Props {
  onClose?: () => void;
  product: any;
  refetch?: () => void;
}

const EditProductModal: React.FC<Props> = ({ onClose, product, refetch }) => {
  const updateProduct = useUpdateProduct();

  const formik = useFormik({
    initialValues: {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      location: product.location,
      description: product.description,
      image: product.image.map((img: any) => img.url),
      condition: "new",
    },
    validateOnChange: false,
    validationSchema: productValidationSchema,
    onSubmit: async (values) => {
      const { id, ...productData } = values;

      formik.setFieldValue("image", selectedImage);
      try {
        await updateProduct(id, {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          category: productData.category,
          location: productData.location,
          image: selectedImage,
        });
        // onClose();
        // refetch();
        // Handle success if needed
        console.log("Product updated successfully");
      } catch (error) {
        // Handle error if needed
        console.error("Failed to update product:", error);
      }
    },
  });

  const {
    selectedImage,
    handleImageChange,
    handleImageDelete,
    setSelectedImage,
  } = useImageUpload({ formik });

  useEffect(() => {
    setSelectedImage(formik.values.image);
  }, []);

  const style = {
    control: (base: any) => ({
      ...base,
      border: 0,
      boxShadow: "none",
    }),
  };

  return (
    <form onSubmit={formik.handleSubmit} className="m-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Name">
          <TextInput
            field={formik.getFieldProps("name")}
            placeholder="Enter name"
            form={formik}
          />
          <ErrorField
            touched={formik.touched.name}
            error={formik.errors.name}
          />
        </FormField>

        <FormField label="Price">
          <PriceInput formik={formik} />
        </FormField>
        <FormField label="Category">
          <Select
            styles={style}
            className="rounded-sm border border-black outline-none"
            options={categoryOptions}
            placeholder="Select a category"
            isSearchable
            maxMenuHeight={5 * 40}
            onChange={(selectedOption) => {
              formik.setFieldValue("category", selectedOption?.value);
            }}
            value={categoryOptions.find(
              (option) => option.value === formik.values.category
            )}
          />
          <ErrorField
            touched={formik.touched.category}
            error={formik.errors.category}
          />
        </FormField>

        <FormField label="Location">
          <Select
            styles={style}
            className="rounded-sm border border-black outline-none"
            options={cityOptions}
            placeholder="Select a city"
            isSearchable
            onChange={(selectedOption) => {
              formik.setFieldValue("location", selectedOption?.value);
            }}
            value={cityOptions.find(
              (option) => option.value === formik.values.location
            )}
            maxMenuHeight={5 * 40}
          />
          <ErrorField
            touched={formik.touched.location}
            error={formik.errors.location}
          />
        </FormField>
      </div>

      <FormField label="Description">
        <TextAreaInput
          field={formik.getFieldProps("description")}
          placeholder="Description"
          form={formik}
        />
        <ErrorField
          touched={formik.touched.description}
          error={formik.errors.description}
        />
      </FormField>

      <ImageForm
        selectedImage={selectedImage}
        handleImageChange={handleImageChange}
        handleImageDelete={handleImageDelete}
        formik={formik}
      />

      <div className="flex justify-end">
        <Button>Save product</Button>
      </div>
    </form>
  );
};

export default EditProductModal;
