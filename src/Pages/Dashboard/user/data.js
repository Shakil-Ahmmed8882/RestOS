     // Chart data and options for order count
     export const orderCountOptions = {
        chart: {
          type: 'bar',
          height: 220,
          width: '100%',
        },
        series: [{
          name: 'Orders',
          data: [30,40,35,50,49,60,70,91,125],
        }],
        xaxis: {
          categories: [1991,1992,1993,1994,1995,1996,1997,1998,1999],
        },
        colors: ['#00D019'], 
      };
  
     // Chart data and options for order count
     export const purchaseCountOptions = {
        chart: {
          type: 'area',
          height: 220,
          width: '100%',
        },
        series: [{
          name: 'Orders',
          data: [30,40,35,50,49,60,70,91,125],
        }],
        xaxis: {
          categories: [1991,1992,1993,1994,1995,1996,1997,1998,1999],
        },
        colors: ['#00D019'], 
      };
  