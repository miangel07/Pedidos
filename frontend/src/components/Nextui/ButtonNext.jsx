import React from 'react'
import { Button } from "@nextui-org/react";
const ButtonNext = ({ children, type, color, onClick }) => {
    const colors = color ? `bg-${color}` : "bg-black";
    return (
        <Button type={type} className={`${colors} text-white`} onClick={onClick} >
            {children}
        </Button>
    );
}

export default ButtonNext