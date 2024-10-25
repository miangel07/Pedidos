import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const Modals = ({ visible, closeModal, title, children }) => {

  return (
    <Modal
      size="2xl"
      isOpen={visible}
      onClose={closeModal}
      scrollBehavior="normal"

      backdrop="opaque"
    >
      <ModalContent>
        <>
          <ModalHeader >

            <h1 className="text-lg font-semibold">{title}</h1>

          </ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>

            <Button color="danger" variant="light" onPress={closeModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default Modals;
