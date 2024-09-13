// hooks/useImageUpload.ts
import { FormikProps } from "formik";
import { useState } from "react";
import { ProductFormValues } from "~/components/dashboard/form/utils";

interface UseImageUploadProps {
  formik: FormikProps<ProductFormValues>;
}

export const useImageUpload = ({ formik }: UseImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string[]>([]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const file = event.currentTarget.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageString = reader.result as string;
        setSelectedImage((previousImages) => {
          const updatedImages = [...previousImages];
          updatedImages[index] = imageString;

          formik.setFieldValue("image", updatedImages);

          return updatedImages;
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (index: number) => {
    setSelectedImage((previousImages) => {
      const updatedImages = [...previousImages];
      updatedImages.splice(index, 1);
      formik.setFieldValue("image", updatedImages);
      return updatedImages;
    });
  };

  return {
    selectedImage,
    setSelectedImage,
    handleImageChange,
    handleImageDelete,
  };
};
