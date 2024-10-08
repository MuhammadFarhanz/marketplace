import { useFormik } from "formik";
import Select from "react-select";
import { useImageUpload } from "~/hooks/useImageUpload";
import { cityOptions } from "~/constants/cityOption";
import { categoryOptions } from "~/constants/categoryOptions";
import { Button } from "~/components/ui/button";
import { ProductFormValues, productValidationSchema } from "./form/utils";
import FormField from "./form/form-field";
import TextInput from "./form/text-input";
import ErrorField from "./error-field";
import PriceInput from "./form/price-input";
import TextAreaInput from "./form/textarea-input";
import ImageForm from "./form/image-form";
import { DialogContent } from "../ui/dialog";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface Props {
  initialValues: ProductFormValues;
  onSubmitProps: (values: ProductFormValues) => void;
  isAddProduct?: boolean;
}

const ProductForm: React.FC<Props> = ({
  initialValues,
  onSubmitProps,
  isAddProduct,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: productValidationSchema,
    onSubmit: async (values: ProductFormValues, { resetForm }) => {
      await onSubmitProps(values);
      if (isAddProduct) {
        resetForm();
        setSelectedImage([]);
      }
    },
  });

  const {
    selectedImage,
    handleImageChange,
    handleImageDelete,
    setSelectedImage,
  } = useImageUpload({ formik });

  const style = {
    control: (base: any) => ({
      ...base,
      border: 0,
      boxShadow: "none",
    }),
  };

  useEffect(() => {
    setSelectedImage(initialValues.image);
  }, []);

  return (
    <DialogContent className="h-auto">
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
          <Button disabled={formik.isSubmitting}>
            {formik.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}

            {formik.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default ProductForm;
