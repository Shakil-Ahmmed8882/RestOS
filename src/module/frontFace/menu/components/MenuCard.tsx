import React from "react"
import { Card, CardBody, CardHeader } from "@nextui-org/react"

interface MenuCardProps {
  title: string
  image: string
  items: number
}

export function MenuCard({ title, image, items }: MenuCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex ">
        <img src={image} alt={title} className="w-24 h-24 rounded-lg" />
      </CardHeader>
      <CardBody className="space-y-1">
        <h3 className="text-lg font-semibold ">{title}</h3>
        <p className="text-sm text-[gray]">New! Seasonal menu in our cafe.</p>
        <p className="text-sm text-primaryColor">Items: {items}</p>
      </CardBody>
    </Card>
  )
}

