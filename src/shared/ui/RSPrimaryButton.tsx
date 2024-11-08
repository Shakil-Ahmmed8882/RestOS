// @ts-nocheck
import {Button} from "antd"

const RSPrimaryButton= ({label,handleClick, className = ""}) => {
  return (
    <Button onClick={handleClick} className={`${className} bg-[red] text-[white]`}>
        {label}
    </Button>
  );
};

export default RSPrimaryButton; 