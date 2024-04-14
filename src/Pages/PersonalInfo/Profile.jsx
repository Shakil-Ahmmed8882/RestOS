import React, { useEffect, useRef } from "react";
import ApexCharts from 'apexcharts';
import { Avatar } from "../../Components/Shared/Avatar/Avatar";
import { OrderedFoodCard } from "./orderedFoodCard";

const Profile = () => {
  // Refs for each chart
  const orderCountChartRef = useRef(null);
  const purchaseCountChartRef = useRef(null);
  const ratingsChartRef = useRef(null);

  useEffect(() => {
    // Function to create and render chart
    const createChart = (ref, options) => {
      if (ref.current) {
        const chart = new ApexCharts(ref.current, options);
        chart.render();
        // Return the chart instance
        return chart;
      }
      // If ref is not set, return null
      return null;
    };

    // Chart data and options for order count
    const orderCountOptions = {
      chart: {
        type: 'bar',
        height: 400,
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

    // Chart data and options for purchase count
    const purchaseCountOptions = {
      chart: {
        type: 'area',
        height: 400,
        width: '100%',
      },
      series: [{
        name: 'Purchases',
        data: [20,35,45,55,60,65,70,75,80],
      }],
      xaxis: {
        categories: [1991,1992,1993,1994,1995,1996,1997,1998,1999],
      },
      colors: ['#00D019'], 
    };


    // Chart data and options for ratings
    const ratingsOptions = {
      chart: {
        type: 'scatter',
        height: 400,
        width: '100%',
      },
      series: [{
        name: 'Ratings',
        data: [4,4.5,4.8,4.2,4.7,4.6,4.9,4.3,4.5],
      }],
      xaxis: {
        categories: [1991,1992,1993,1994,1995,1996,1997,1998,1999],
      },
      colors: ['#00D019'], // Green color for ratings
    };

    // Render each chart
    const orderCountChart = createChart(orderCountChartRef, orderCountOptions);
    const purchaseCountChart = createChart(purchaseCountChartRef, purchaseCountOptions);
    const ratingsChart = createChart(ratingsChartRef, ratingsOptions);

    // Clean up functions to destroy the chart instances when component unmounts
    return () => {
      if (orderCountChart) orderCountChart.destroy();
      if (purchaseCountChart) purchaseCountChart.destroy();
      if (ratingsChart) ratingsChart.destroy();
    };
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <div className="lg:flex w-full gap-6">
        <div className="flex-1 lg:grid grid-cols-2 gap-6">
          {/* Order count chart */}
          <div className="bg-[white] p-3">
            <span className="text-[#bdbdbd]">Orders</span>
          <h1 className=" text-3xl">$2389.00</h1>
          <div ref={orderCountChartRef}></div>
          </div>

          {/* Purchase count chart */}
          <div className="bg-[white] p-3">
            <span className="text-[#bdbdbd]">Purchases</span>
          <h1 className=" text-3xl">$2389.00</h1>
          <div className="bg-[white]" ref={purchaseCountChartRef}></div>
          </div>
          {/* Ratings chart */}
          <div className="bg-[white] p-3 col-span-2">
            <span className="text-[#bdbdbd]">Ratings</span>
          <h1 className=" text-3xl">$2389.00</h1>
          <div className="bg-[white]" ref={ratingsChartRef}></div>
          </div>
          
        </div>
        <div className="w-56 text-center bg-[#ffffff] p-4 rounded-lg">
          {/* <Avatar /> */}
          <h1 className="text-2xl">My Order 🍲🍲</h1>

        <OrderedFoodCard/>
        <OrderedFoodCard/>
        <OrderedFoodCard/>
        <OrderedFoodCard/>
        <OrderedFoodCard/>
        </div>
      </div>
    </div>
  );
};

export default Profile;