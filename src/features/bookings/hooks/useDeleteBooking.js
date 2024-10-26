import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../../services/apiBookings";

export function useDeleteBooking() {
  const navigate = useNavigate();
  //for using queryClient where needed, we use useQueryClient provided by react-query itself.
  const queryClient = useQueryClient();

  //simply used for mutating function such as deleteFn & so on.
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      //invalidateQueries refetch data as soon as mutation finished so that updated data is shown to user.
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
      navigate("/bookings");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
