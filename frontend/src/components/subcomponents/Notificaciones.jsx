import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Badge,
} from "@nextui-org/react";

import {BellIcon} from "@heroicons/react/24/outline";


// eslint-disable-next-line react/prop-types
export const Notificaciones = ({notifications = [], onClick}) => {
    return (
        <Dropdown placement="bottom-end">
            <Badge
                content={notifications.length}
                color="danger"
                isInvisible={notifications.length === 0}
                className="rounded-full"
            >
                <DropdownTrigger>
                    <Button isIconOnly variant="light" aria-label="Abrir notificaciones" onClick={onClick}>
                        <BellIcon className="h-6 w-6 text-gray-700 hover:text-blue-500 transition-colors duration-300" />
                    </Button>
                </DropdownTrigger>
            </Badge>

            <DropdownMenu
                aria-label="Notificaciones"
                className="w-80 bg-white shadow-lg rounded-lg overflow-hidden"
                itemClasses={{
                    base: "py-3",
                    title: "text-sm font-semibold text-gray-800",
                    description: "text-xs text-gray-500",
                }}
            >
                <DropdownItem
                    key="heading"
                    className="h-14 gap-2 bg-gray-50 border-b border-gray-200 px-4"
                    textValue="Encabezado de notificaciones"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
                    </div>
                </DropdownItem>

                {notifications.length === 0 ? (
                    <DropdownItem
                        key="empty"
                        textValue="No hay notificaciones"
                        className="text-center py-4 text-gray-600"
                    >
                        No hay notificaciones nuevas
                    </DropdownItem>
                ) : (
                    notifications.map((notification) => (
                        <DropdownItem
                            key={notification.id}
                            textValue={`${notification.title} - ${notification.description}`}
                            className="py-4 px-4 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            description={notification.description}
                            endContent={
                                <span className="text-sm text-blue-600 font-medium">
                                    {notification.accion}
                                </span>
                            }
                        >
                            <h4 className="text-sm font-semibold text-gray-800">{notification.title}</h4>
                        </DropdownItem>
                    ))
                )}
            </DropdownMenu>
        </Dropdown>
    );
};
