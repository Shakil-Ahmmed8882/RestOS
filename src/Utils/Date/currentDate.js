const getCurrentDate = (data) => {
      
  const orderDate = new Date();
  const formattedOrderDate = orderDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  data.orderedDate = formattedOrderDate
  const orderedData = data
  return {orderedData}
}

export default getCurrentDate