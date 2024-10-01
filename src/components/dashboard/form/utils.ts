import * as yup from "yup";
export interface ProductFormValues {
  id: string;
  name: string;
  description: string;
  image: any;
  price: number;
  condition: string;
  category: string;
  location: string;
}

// export type Product = {
// name: string;
// id: string;
// description: string;
// image: {
//   id: string;
//   url: string;
//   productId: string;
// }[];
// price: number;
// condition: string;
// category: string;
// location: string;
// };

export const productValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup
    .string()
    .min(50, "Description should contain at least 50 characters")
    .max(2000, "Description should not exceed 2000 characters")
    .required("Description is required"),
  price: yup
    .string()
    .min(3, "The minimum product price is IDR 100")
    .max(10000000)
    .required("Price is required"),
  image: yup.array().of(yup.string()).min(1, "At least one image is required"),
  condition: yup.string().required("Condition is required"),
  location: yup.string().required("Location is required"),
  category: yup.string().required("Category is required"),
});
