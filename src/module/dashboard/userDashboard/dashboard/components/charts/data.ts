export const url1 = "/"
export const url2 = "/" 


export const purchaseCountOptions = {
    chart: {
      type: 'line',
      height: 350,
    },
    series: [
      {
        name: 'Purchase',
        data: [30, 40, 35, 50, 49, 60, 70, 91],
        color: "#00D019"
      },
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
    title: {
      text: 'Purchase count',
      align: 'center',
    },
    stroke: {
      curve: 'smooth',
    },
  };
  

export const orderCountOptions = {
    chart: {
      type: 'line',
      height: 350,
    },
    series: [
      {
        name: 'Orders',
        data: [30, 40, 35, 50, 49, 60, 70, 91],
        color:"#00D019"
      },
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
    title: {
      text: 'Order Count',
      align: 'center',
    },
    stroke: {
      curve: 'smooth',
    },
  };
  