import React from "react";
import { useUpdateProduct } from "~/hooks/useUpdateProduct";
import { processFileData, ProductFormValues, uploadFiles } from "./form/utils";
import ProductForm from "./product-form";
import { api } from "~/utils/api";

interface Props {
  product: ProductFormValues;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const EditProduct: React.FC<Props> = ({ product, setIsOpen, isOpen }) => {
  const { mutate } = useUpdateProduct();
  const { mutateAsync: generatePresignedUrls } =
    api.product.generatePresignedUrls.useMutation();

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      const { id, ...productData } = values;

      if (productData.file && productData.file.length > 0) {
        const filesForPresignedUrls = {
          files: values?.file
            ?.filter((file: any) => file?.name && file?.type)
            .map((file: any) => ({
              fileName: file?.name,
              fileType: file?.type,
            })),
        };

        const presignedUrls = await generatePresignedUrls(
          filesForPresignedUrls
        );
        const uploadPromises = await uploadFiles(presignedUrls, values.file);

        const fileData = processFileData(presignedUrls, values.file);
        productData.file = fileData;

        mutate(
          {
            id,
            newProductData: {
              ...productData,
              file: fileData,
            },
          },
          {
            onSuccess: () => {
              setIsOpen(!isOpen);
            },
          }
        );

        await Promise.all(uploadPromises);
      } else {
        mutate(
          {
            id,
            newProductData: productData,
          },
          {
            onSuccess: () => {
              setIsOpen(!isOpen);
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductForm
      initialValues={{
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        location: product.location,
        description: product.description,
        image: product.image.map((img: any) => img.url),
        condition: "new",
        file: product.file,
      }}
      onSubmitProps={handleSubmit}
    />
  );
};

export default EditProduct;
