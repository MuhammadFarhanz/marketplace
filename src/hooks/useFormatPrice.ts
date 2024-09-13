  export const useFormatPrice = () => {
    const formatPrice = (value: string): string => {
        const formattedValue = value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return formattedValue;
    };

    return { formatPrice };
};
