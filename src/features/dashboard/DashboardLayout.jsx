import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./hooks/useRecentStays";
import { useRecentBookings } from "./hooks/useRecentBookings";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const { stays, confirmedStays, isLoading: isLoadingStays } = useRecentStays();

  if (isLoading || isLoadingStays) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Todays activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
