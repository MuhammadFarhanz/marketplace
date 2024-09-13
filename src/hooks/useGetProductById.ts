import { api } from "~/utils/api";
import { useRouter } from "next/router";

export const useGetProductById = () => {
  const router = useRouter();
  const { id, } = router.query;
  const { index } = router.query;

  const { data, error } = api.product.getProductById.useQuery(
    {
      productId: index?.[0] ? index[0] as string : id as string,
    },
    {
      enabled: !!index?.[0] || !!id,
      
    },
  );

  return {
    data,
    error,
  };
};