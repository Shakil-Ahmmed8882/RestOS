import React from "react";
import { RadioGroup, Radio, Card, CardBody, Divider } from "@nextui-org/react";
import { Filter } from "lucide-react";

interface FoodFiltersProps {
  handleCategoryChange: (category: string) => void;
  selectedRange: string; // Current selected price range
  isShowFilter: boolean; // Current selected price range
  setSelectedRange: (range: string) => void; // Function to update selected price range
  setIsShowFilter: (showFilter: boolean) => void; // Function to update selected price range
}

const FoodFilters: React.FC<FoodFiltersProps> = ({
  handleCategoryChange,
  selectedRange,
  isShowFilter,
  setIsShowFilter,
  setSelectedRange,
}) => {
  const categories = ["All", "Indian", "Italian", "Chinese", "Mexican", "Thai"];


  return (
    <div className={`${isShowFilter ?"visible":"invisible md:visible"} col-span-1 absolute  left-0 z-50 w-96 md:sticky top-0 h-screen`}>
      <Card className="p-3 shadow-sm">
        <CardBody>
          {/* Filter Header */}
          <div className=" items-center hidden md:flex gap-2 mb-4">
            <Filter className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>

          <Divider className="my-4" />

          <div className="space-y-4">
            {/* Categories Section */}
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
              <RadioGroup>
                {categories.map((cat) => (
                  <Radio
                    key={cat}
                    value={cat}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </Radio>
                ))}
              </RadioGroup>
            </div>

            <Divider className="my-4" />

            {/* Price Range Section */}
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <RadioGroup
                value={selectedRange}
                onChange={(e) => {
                    setIsShowFilter(false)
                    setSelectedRange(e.target.value)}
                }
              >
                <Radio value="0-25">$0 - $25</Radio>
                <Radio value="25-50">$25 - $50</Radio>
                <Radio value="50-100">$50 - $100</Radio>
                <Radio value="100+">$100+</Radio>
              </RadioGroup>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default FoodFilters;
