// @ts-nocheck
import { useRef } from "react";
import Chart from "./Chart"; 
import { TotalPriceOfOrderedFood } from "../../../../../../api/utils";
import { useAuth } from "../../../../../../Utils/useAuthHelper";
import React from "react";

const OrderChart = () => {
    const orderCountChartRef = useRef(null)
    const {user} = useAuth()
    const { data, totalPrice, isLoading, refetch } = TotalPriceOfOrderedFood(user)


    
    
    return (
        <div className="lg:col-span-3 bg-[white] p-3 rounded-b-lg">

            <div className="flex-1 lg:grid grid-cols-2 gap-6">

                {/* Purchase count chart */}
                <div className="bg-[white] p-3">
                    <span className="text-[#b5b5b5]">Order</span>
                    <h1 className=" text-3xl">${totalPrice || "000.00"}</h1>
                    <div className="bg-[white]" ref={orderCountChartRef}></div>
                </div>
            </div>

            <Chart reference={'order'} CountOption={'order'} />

        </div>
    );
};
export default OrderChart
