import axios from 'axios'
import { useGetData } from '../🔗Hook/httpRequests'

export const imageUpload = async image => {
  const formData = new FormData()
  formData.append('image', image)
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  )
  return data
}


export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}


// Total ordered food price 
export const TotalPriceOfOrderedFood = (user) => {

  const { data, isLoading, refetch } = useGetData({
    endpoint: `ordered-list?email=${user?.email}&status=pending`,
    key: ["orderlist"],
  });
  
  const totalPrice = data?.reduce((total, element) => {
    return total + element.price;
  }, 0);

  console.log(isLoading)
  console.log(totalPrice)

  return {data,totalPrice, isLoading,refetch}

}
