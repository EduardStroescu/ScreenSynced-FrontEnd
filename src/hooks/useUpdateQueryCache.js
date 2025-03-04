import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useUpdateQueryCache = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (queryKey, updateFunction) => {
      queryClient.setQueryData(queryKey, (prevData) => {
        return updateFunction(prevData);
      });
    },
    [queryClient],
  );
};
