"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import Link from "next/link";

export default function ProductsPagination({ totalPages, currentPage }: { totalPages: number, currentPage: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      {totalPages > 1 && (
        <Stack direction="row" justifyContent="center" mt={4}
          className="dark:!text-white"
          >
          <Pagination
            page={currentPage}
            count={totalPages}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                href={createPageURL(item.page as number)}
                {...item}
              />
            )}
          />
        </Stack>
      )}
    </>
  );
}