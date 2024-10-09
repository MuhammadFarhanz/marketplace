import { ReactNode } from "react";
import { FilterSidebar } from "../home/filter-sidebar";
import clsx from "clsx";

const ProductLayout = ({
  children,
  isFilterSidebarOn,
  className,
}: {
  children: ReactNode;
  isFilterSidebarOn?: any;
  className?: string;
}) => {
  return (
    <main
      className={clsx(
        "relative mx-auto flex-col items-center bg-[#F4F4F0] p-0",
        className
      )}
    >
      <div className="min-h-auto flex w-full flex-row justify-center space-x-10 px-6 sm:container sm:px-0">
        {isFilterSidebarOn && <FilterSidebar />}
        <div className="w-full py-4">
          <div
            className={clsx(
              "grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
              isFilterSidebarOn ? "xl:grid-cols-5" : "xl:grid-cols-6"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductLayout;
