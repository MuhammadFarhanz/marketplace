import { useToast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";

export const useAddToCart = () => {
  const { toast } = useToast();

  return api.product.addToCart.useMutation({
    onSuccess(data) {
      if (data?.status == "exists") {
        toast({
          variant: "destructive",
          title: data.message,
        });
      } else {
        toast({
          title: "Product added to cart succesfully",
        });
      }
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    },
  });
};
