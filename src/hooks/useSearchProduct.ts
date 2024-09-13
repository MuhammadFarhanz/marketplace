import { api } from "~/utils/api";

export const useSearchProduct = (search: string) => {
  const {
    data: products,
    refetch,
    status,
    isLoading,
  } = api.product.search.useQuery({ search }, { enabled: !!search });

  return { products, isLoading, status };
};
