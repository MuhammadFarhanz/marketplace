import { FormikProps } from "formik";
import { useState } from "react";
import { ProductFormValues } from "~/components/dashboard/form/utils";

interface UseImageUploadProps {
  formik: FormikProps<ProductFormValues>;
}

export const useImageUpload = ({ formik }: UseImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const newFiles = Array.from(event.currentTarget.files);
      const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));

      setSelectedImage((previousImages) => [
        ...previousImages,
        ...newImageUrls,
      ]);

      setFiles((previousFiles) => [...previousFiles, ...newFiles]);

      formik.setFieldValue("image", [
        ...(formik?.values?.image || []),
        ...newImageUrls,
      ]);
      formik.setFieldValue("file", [
        ...(formik?.values?.file || []),
        ...newFiles,
      ]);
    }
  };

  const handleImageDelete = (index: number) => {
    setSelectedImage((previousImages) => {
      const updatedImages = [...previousImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });

    setFiles((previousFiles) => {
      const updatedFiles = [...previousFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });

    formik.setFieldValue(
      "image",
      formik?.values?.image?.filter((_: any, i: any) => i !== index)
    );
    formik.setFieldValue(
      "file",
      formik?.values?.file?.filter((_: any, i: any) => i !== index)
    );
  };

  return {
    selectedImage,
    setSelectedImage,
    handleImageChange,
    handleImageDelete,
    files,
  };
};
