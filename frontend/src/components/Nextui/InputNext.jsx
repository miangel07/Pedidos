import React from 'react'
import {Input} from "@nextui-org/react";
/* const InputAtomo = ({ type, placeholder, id, name, erros, register, icon, isReadOnly,defaultValue })  */

function InputNext({variants,placeholder,id,name,register,type,errors,icon,isReadOnly,defaultValue}) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full h-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 font-sans">
        <Input  variant={variants ? variants:"bordered"} isReadOnly={isReadOnly ? isReadOnly : false} size={"sm"} 
        type={type} id={id} label={placeholder} name={name} defaultValue={defaultValue ? defaultValue : ''} endContent={icon}
          {...register(name, {
            required: {
              value: true,
              message: `${name} es obligatorio`,
            },
          })} />
      </div>
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  )
}

export default InputNext
