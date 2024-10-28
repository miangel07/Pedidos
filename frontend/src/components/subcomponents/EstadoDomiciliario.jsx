import { Switch } from "@nextui-org/react";
import { useState } from "react";
import { useCambiarEstado } from "../../hooks/CambiarEstadoDomiciliario";

export const CambiarEstadoDomiciliario = () => {
  const [seleccionarEstado, setSeleccionarEstado] = useState(true);

  const { cambiarEstado } = useCambiarEstado();

  const presionar = async () => {
    setSeleccionarEstado(!seleccionarEstado);

    const newData = {
      licencia: "bbbbb",
      user_id: "2",
      disponibilidad: seleccionarEstado ? "no disponible" : "disponible",
    };

    await cambiarEstado(1, newData);
  };

  return (
    <>
      <div className="flex flex-row gap-2">
        <Switch
          isSelected={seleccionarEstado}
          onValueChange={presionar}
        ></Switch>
        <p className="text-small text-default-500">
          Selected: {seleccionarEstado ? "Disponible" : "No Disponible"}
        </p>
      </div>
    </>
  );
};
