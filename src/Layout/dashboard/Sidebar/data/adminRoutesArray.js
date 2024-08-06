import { BuildingIcon, PencilIcon, ScaleIcon, TagIcon } from "../assets/Icons";
import {
  designsItems,
  legalItems,
  officeItems,
  salesItems,
} from "./dropdownContents";

export const adminRoutesArray = [
  {
    label: "Design",
    icon: PencilIcon,
    items: designsItems,
    key: "designs",
  },
  {
    label: "Office",
    icon: BuildingIcon,
    items: officeItems,
    key: "office",
  },
  {
    label: "Legal",
    icon: ScaleIcon,
    items: legalItems,
    key: "legal",
  },
  {
    label: "Sales",
    icon: TagIcon,
    items: salesItems,
    key: "sales",
  },
  {
    label: "Sales",
    icon: TagIcon,
    items: salesItems,
    key: "sales",
  },
];
