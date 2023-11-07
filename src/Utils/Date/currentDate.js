const getCurrentDate = (data,user) => {
      
  const orderDate = new Date();
  const formattedOrderDate = orderDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  data.orderedDate = formattedOrderDate
  data.email = user?.email
  const orderedData = data
  return {orderedData}
}

export default getCurrentDate