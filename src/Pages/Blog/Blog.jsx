import { Accordion, AccordionItem } from "@nextui-org/react";
import light_gif from "../../assets/img/light-gift.gif";
import dark_gif from "../../assets/img/darkfift.gif";
import { useTheme } from "@material-tailwind/react";
import './blog.css'


export default function App() {
  const { theme } = useTheme();
  const ansOne = "One-way data binding is a data flow where data updates from a source to a target (view/UI), but changes in the target don't affect React Props: In React, you can pass data from a parent component to a child component using props. The parent component serves as the source of data, and the child component is the target. Changes in the parent component's data are automatically reflected in the child component. However, if the child component modifies the prop, it won't affect the parent component's original data. This is a classic example of one-way data binding in React"


  const ansTwo = 'In Node.js, "npm" stands for "Node Package Manager." It is a package manager and command-line tool that comes bundled with Node.js. npm is used for installing, managing, and sharing packages (libraries and modules) for Node.js applications '


  const ansTheree = "Data ModelMongoDB uses a flexible, document-based data model where data is stored in BSON format, and documents have variable structures.MySQL employs a structured, table-based data model with a fixed schema, where data is organized into rows and columns in a tabular format.Schema Flexibility MongoDB is schema-less, allowing changes to the structure of documents without affecting existing data. This flexibility is well-suited for applications with evolving data requirements.MySQL enforces a rigid schema, and any changes to the schema require altering tables, which can be more cumbersome and may not accommodate rapidly changing data needs."

  return (
      <div className={`h-screen flex flex-col-reverse md:flex-row justify-center ${theme == 'dark'?'text-[white]':''} items-center `}>
      <Accordion variant="splitted">
        <AccordionItem key="1" aria-label="Accordion 1"  title="What is one way data binding?

">
      <div className={`${theme == 'dark' ? 'text-white bg-primaryColor' : 'text-black bg-customColor'}`}>
      {ansOne}
    </div>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="what is npm in node js?">
          {ansTwo}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="what is the difference betweeen mongoddb data base vs MySQL?

">
          {ansTheree}
        </AccordionItem>
      </Accordion>
      <div className="w-2/3">
        {theme == "light" ? (
          <img src={light_gif} alt="" />
        ) : (
          <img src={dark_gif} alt="" />
        )}
      </div>
    </div>
  );
}
