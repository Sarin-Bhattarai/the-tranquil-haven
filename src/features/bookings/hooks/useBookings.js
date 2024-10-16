import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";
import { getBookings } from "../../../services/apiBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  //Filter logic
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //Sort logic
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //Query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["booking", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //Pre-fetching the data
  const pageCount = Math.ceil(count / PAGE_SIZE);
  //pre-fetch next
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["booking", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  //pre-fetch previous
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["booking", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}
