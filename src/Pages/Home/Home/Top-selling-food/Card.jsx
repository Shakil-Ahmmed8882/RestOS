import {
      Card,
      CardHeader,
      CardBody,
      Typography,
      Button,
    } from "@material-tailwind/react";
import { Link } from "react-router-dom";


     
    export function HorizontalCard({food}) {
      
      const  {_id,foodName,foodImage,foodCategory,price,orders,quantity,made_by,food_origin,description,reviews,orderedDate,email} = food
      

      return (
        <Card className="w-full gap-3 items-center max-w-[48rem] flex-row">
          <CardHeader 
            shadow={false}
            floated={false}
                  className="m-0 w-1/3 pl-2 shrink-0 grid gap-3 rounded-r-none"
          >
            <img
              src={foodImage}
              alt="card-image "
              className="h-full w-full object-cover"
            />
            <img
              src={foodImage}
              alt="card-image "
              className="h-full w-full object-cover"
            />
            <img
              src={foodImage}
              alt="card-image "
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody className="flex-1">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {foodName}
            </Typography>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {foodCategory}
            </Typography>
            <Typography color="gray" className="mb-8 font-normal">
         ${price}
            </Typography>
            <Link to={`food-details/${_id}`} className="inline-block">
              <Button variant="text" className="flex items-center gap-2">
                Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </Link>
          </CardBody>
        </Card>
      );
    }