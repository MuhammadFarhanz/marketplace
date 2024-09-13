import { api } from "~/utils/api";

export const useGetCart = () => {
  const { data, error, isLoading, refetch } = api.product.getCart.useQuery();

  return {
    cart: data,
    error,
    isLoading,
    refetch,
  };
};
