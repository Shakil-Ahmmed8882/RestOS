import { useAxios } from "./useAxios";
import { useQuery } from "@tanstack/react-query";

// Get
export const useGetData = ({ endpoint, key }) => {
  const axios = useAxios();

  return useQuery({
    queryKey: [key[0], key[1]],
    queryFn: () => axios.get(endpoint).then((res) => res.data),
  });
};
