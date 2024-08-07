import React from "react";

import Dish from "./Dish";
import { url1 } from "./charts/data";
import Title from "../../../../../shared/ui/Title";





const Pizza = () => {
    return (
        <div className="mt-8">
        
        <Title title={'Chose Pizza'}/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4]?.map(dish => <Dish url={url1} />)}
            </div>

         </div>
    );
};
export default Pizza


