import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import styled from "styled-components";
import * as icon from "react-icons/hi2";
import CreateCabinForm from "./CreateCabinForm";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { useCreateCabin } from "./hooks/useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const {
    id: cabinId,
    name,
    image,
    description,
    maxCapacity,
    regularPrice,
    discount,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      description,
      maxCapacity,
      regularPrice,
      discount,
      image,
    });
  }

  return (
    <Table.Row role="row">
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<icon.HiSquare2Stack />}
                onClick={handleDuplicate}
              >
                Duplicate
              </Menus.Button>

              {/* For edit */}
              <Modal.Open opens="edit-cabin">
                <Menus.Button icon={<icon.HiPencil />}>Update</Menus.Button>
              </Modal.Open>

              {/* For delete */}
              <Modal.Open opens="delete-cabin">
                <Menus.Button icon={<icon.HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-cabin">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
