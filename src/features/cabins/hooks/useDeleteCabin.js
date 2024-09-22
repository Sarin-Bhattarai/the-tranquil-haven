import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../../services/apiCabins";

export function useDeleteCabin() {
  //for using queryClient where needed, we use useQueryClient provided by react-query itself.
  const queryClient = useQueryClient();

  //simply used for mutating function such as deleteFn & so on.
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      //invalidateQueries refetch data as soon as mutation finished so that updated data is shown to user.
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
