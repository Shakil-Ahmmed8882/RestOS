import { useRef } from "react";
import Chart from "./Chart";

const PurchaseChart = () => {
    const purchaseCountChartRef = useRef(null)


    return (
        <div className="lg:col-span-3 bg-[white] p-3 rounded-b-lg">

            <div className="flex-1 lg:grid grid-cols-2 gap-6">

                {/* Purchase count chart */}
                <div className="bg-[white] p-3">
                    <span className="text-[#b5b5b5]">Purchases</span>
                    <h1 className=" text-3xl">$2389.00</h1>
                    <div className="bg-[white]" ref={purchaseCountChartRef}></div>
                </div>
            </div>

            <Chart reference={'purchase'} CountOption={'purchaseOptions'} />

        </div>
    );
};
export default PurchaseChart
