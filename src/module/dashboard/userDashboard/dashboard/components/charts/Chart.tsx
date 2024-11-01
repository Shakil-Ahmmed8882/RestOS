import ApexCharts from 'apexcharts';
import React, { useEffect, useRef } from "react";

import { orderCountOptions, purchaseCountOptions } from './data';

const Chart = ({reference, CountOption}) => {
    const PurchaOptionsRef = useRef(null)
    const OrderOptionsRef = useRef(null)


    useEffect(() => {
        // Function to create and render chart
        const createChart = (ref , options) => {
          if (ref.current) {
            const chart = new ApexCharts(ref.current, options);
            chart.render();
            // Return the chart instance
            return chart;
          }
          // If ref is not set, return null
          return null;
        };
    
        
        // Render each chart
        const countChart = createChart(reference === 'purchase'? PurchaOptionsRef:OrderOptionsRef, reference === 'purchase'?  purchaseCountOptions: orderCountOptions );
    
    
        // Clean up functions to destroy the chart instances when component unmounts
        return () => {
          if (countChart) countChart.destroy();
        };
      }, []);
    


    return (
        <>

            {/* Order count chart */}
            <div ref={reference === 'purchase'?PurchaOptionsRef:OrderOptionsRef} className=" col-span-3">
                <div ref={CountOption === 'purchaseOptions'?PurchaOptionsRef:OrderOptionsRef}></div>
            </div>

        </>
    );
};
export default Chart
