import {
  Modal as ModalNext,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from "@nextui-org/react";

export const Modal = ({
  // eslint-disable-next-line react/prop-types
  buttonModal,
  // eslint-disable-next-line react/prop-types
  tittleModal,
  // eslint-disable-next-line react/prop-types
  componente,
  // eslint-disable-next-line react/prop-types
  size,
  // eslint-disable-next-line react/prop-types
  variantButton,
  // eslint-disable-next-line react/prop-types
  colorButton = "primary",
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color={colorButton} variant={variantButton} onPress={onOpen}>
        {buttonModal}
      </Button>
      <ModalNext
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={size}
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {tittleModal}
              </ModalHeader>
              <ModalBody>{componente}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </ModalNext>{" "}
    </>
  );
};
