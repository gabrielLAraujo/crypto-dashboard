import { getAssets } from "../lib/coinApi";
import useSWR from "swr";

export const useCryptoAssets = () => {
    const { data, isLoading, error } = useSWR(
        "cryptoAssets",
        getAssets,
        {
            refreshInterval: 60000, 
            revalidateOnFocus: false,
        }
    );

    return {
        data,
        isLoading,
        error,
    };
};
