import { useFormik } from "formik";
import Select from "react-select";
import { useCreateProduct } from "~/hooks/useCreateProduct";
import { useImageUpload } from "~/hooks/useImageUpload";
import { cityOptions } from "~/constants/cityOption";
import { categoryOptions } from "~/constants/categoryOptions";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { ProductFormValues, productValidationSchema } from "./form/utils";
import FormField from "./form/form-field";
import TextInput from "./form/text-input";
import ErrorField from "./error-field";
import PriceInput from "./form/price-input";
import TextAreaInput from "./form/textarea-input";
import ImageForm from "./form/image-form";

/**
 * Represents the components for adding a new product.
 *
 * This component provides a form for users to input details of a new product,
 * including name, description, price, images, condition, location, and category.
 * Upon submission, the product is created and a success message is displayed.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the AddProduct page.
 */

const AddProduct: React.FC = () => {
  const createProduct = useCreateProduct();
  const { toast } = useToast();

  const formik = useFormik<ProductFormValues>({
    initialValues: {
      id: undefined,
      name: "",
      description: "",
      price: 0,
      image: [],
      condition: "new",
      location: "",
      category: "",
    },
    validationSchema: productValidationSchema,
    onSubmit: (values: ProductFormValues, { resetForm }) => {
      createProduct({ ...values });

      // setShowSuccessToast(true);
      resetForm();

      toast({
        title: "Sucess adding product",
      });

      // Hide success message toast after 3 seconds
      setTimeout(() => {
        //  setShowSuccessToast(false);
        setSelectedImage([]);
      }, 3000);
    },
  });

  const {
    selectedImage,
    handleImageChange,
    handleImageDelete,
    setSelectedImage,
  } = useImageUpload({ formik });

  console.log(formik.values.price, "ajio");

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
        <Button type="submit">Add product</Button>
      </div>
    </form>
  );
};

export default AddProduct;
