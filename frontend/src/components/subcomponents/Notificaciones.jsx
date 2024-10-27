import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Badge,
} from "@nextui-org/react";

import { BellIcon } from "@heroicons/react/24/outline";

export const Notificaciones = ({ notifications = [] }) => {
  return (
    <Dropdown placement="bottom-end">
      <Badge
        content={notifications.length}
        color="danger"
        isInvisible={notifications.length === 0}
      >
        <DropdownTrigger>
          <Button isIconOnly variant="light" aria-label="Abrir notificaciones">
            <BellIcon className="h-6 w-6 text-gray-500" />
          </Button>
        </DropdownTrigger>
      </Badge>

      <DropdownMenu
        aria-label="Notificaciones"
        className="w-80"
        itemClasses={{
          base: "py-3",
          title: "text-sm font-semibold",
          description: "text-xs text-default-500",
        }}
      >
        <DropdownItem
          key="heading"
          className="h-14 gap-2"
          textValue="Encabezado de notificaciones"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notificaciones</h3>
          </div>
        </DropdownItem>

        {notifications.length === 0 ? (
          <DropdownItem
            key="empty"
            textValue="No hay notificaciones"
            className="text-center py-4"
          >
            No hay notificaciones nuevas
          </DropdownItem>
        ) : (
          notifications.map((notification) => (
            <DropdownItem
              key={notification.id}
              textValue={`${notification.title} - ${notification.description}`}
              className="py-4"
              description={notification.description}
            />
          ))
        )}

        {/*   {notifications.length > 0 && (
          <DropdownItem
            key="view-all"
            color="primary"
            className="justify-center"
            textValue="Ver todas las notificaciones"
            onPress={handleViewAll}
          >
            Ver todas las notificaciones
          </DropdownItem>
        )} */}
      </DropdownMenu>
    </Dropdown>
  );
};
