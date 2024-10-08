import React from "react";
import ProductForm from "./product-form";
import { useCreateProduct } from "~/hooks/useCreateProduct";
import { api } from "~/utils/api";
import { processFileData, ProductFormValues, uploadFiles } from "./form/utils";

const AddProduct: React.FC<any> = ({ setIsOpen, isOpen }) => {
  const { mutate } = useCreateProduct();
  const { mutateAsync: generatePresignedUrls } =
    api.product.generatePresignedUrls.useMutation();

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      const filesForPresignedUrls = {
        files: values.file.map((file: any) => ({
          fileName: file.name,
          fileType: file.type,
        })),
      };
      const presignedUrls = await generatePresignedUrls(filesForPresignedUrls);
      const uploadPromises = await uploadFiles(presignedUrls, values.file);

      const fileData = processFileData(presignedUrls, values.file);
      mutate({ ...values, file: fileData });
      setIsOpen(!isOpen);

      await Promise.all(uploadPromises);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductForm
      initialValues={{
        id: "",
        name: "",
        description: "",
        price: 0,
        image: [],
        condition: "new",
        location: "",
        category: "",
        file: [],
      }}
      onSubmitProps={handleSubmit}
      isAddProduct={true}
    />
  );
};

export default AddProduct;
