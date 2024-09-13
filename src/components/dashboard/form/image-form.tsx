import React from "react";
import ImageIcon from "../../svgcomponent/imageIcon";

interface Props {
  selectedImage: string[];
  handleImageChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleImageDelete: (index: number) => void;
  formik: any;
}

const ImageForm: React.FC<Props> = ({
  selectedImage,
  handleImageChange,
  handleImageDelete,
  formik,
}) => {
  const labels = [0, 1, 2, 3, 4];

  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-bold text-gray-700">
        Image
      </label>
      <div className="flex flex-wrap">
        {labels.map((index) => (
          <div key={`image-wrapper-${index}`} className="relative mx-2 my-2">
            <label
              htmlFor={`dropzone-file-${index}`}
              className={`flex h-32 w-32 items-center justify-center border ${
                selectedImage[index] ? "border-solid" : "border-dashed"
              } cursor-pointer rounded-sm ${
                formik.touched.image && formik.errors.image
                  ? "border-dashed border-red-500"
                  : "border-black"
              }`}
            >
              {selectedImage[index] ? (
                <img
                  src={selectedImage[index]}
                  alt="upload"
                  className="h-full w-full rounded-sm object-cover"
                />
              ) : (
                <ImageIcon />
              )}
            </label>
            <input
              id={`dropzone-file-${index}`}
              type="file"
              className="hidden"
              accept="image/*"
              onBlur={formik.handleBlur}
              onChange={(event) => handleImageChange(event, index)}
            />
            {selectedImage[index] && (
              <button
                type="button"
                className="absolute -right-3 -top-3 w-7 rounded-full bg-black p-1 text-sm text-white"
                onClick={(event) => {
                  event.stopPropagation();
                  handleImageDelete(index);
                }}
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>
      {formik.touched.image && formik.errors.image && (
        <div className="text-red-500">{formik.errors.image}</div>
      )}
    </div>
  );
};

export default ImageForm;
