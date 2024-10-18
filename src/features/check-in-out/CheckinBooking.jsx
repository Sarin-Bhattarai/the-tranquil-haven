import Row from "../../ui/Row";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import ButtonText from "../../ui/ButtonText";
import ButtonGroup from "../../ui/ButtonGroup";
import { useCheckin } from "./hooks/useCheckin";
import { formatCurrency } from "../../utils/helpers";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/hooks/useBooking";
import BookingDataBox from "../../features/bookings/BookingDataBox";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const { checking, isCheckingIn } = useCheckin();
  const [confirmPaid, setConfirmPaid] = useState(false);
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if (!confirmPaid) return;
    checking(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(totalPrice)}.
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
