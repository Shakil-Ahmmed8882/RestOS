import { useAxios } from "./useAxios";
import { useQuery } from "@tanstack/react-query";


// Get 
export const useGetData = ({ endpoint, key }) => {
  const axios = useAxios()

 return useQuery({
    queryKey: [key],
    queryFn: () =>
      axios.get(endpoint).then((res) => res.data),
  });
};




