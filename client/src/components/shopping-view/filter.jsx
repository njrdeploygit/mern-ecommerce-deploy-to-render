import { filterOptions, filterOptions2 } from "@/config";

import { Fragment, useEffect } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBrands } from "@/store/admin/brands-slice";
import { fetchAllCategories } from "@/store/admin/categories-slice";

function ProductFilter({ filters, handleFilter }) {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.adminCategories);
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  console.log(categoryList, "categoryList for filteroptions");

  const { brandList } = useSelector((state) => state.adminBrands);
  useEffect(() => {
    dispatch(fetchAllBrands());
  }, [dispatch]);
  console.log(brandList, "brandList for filteroptions");
  const dynamicFilters = filterOptions2(categoryList, brandList);
  console.log(dynamicFilters, "dynamicFilters Logger");

  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {dynamicFilters.map((filterGroup, index) => (
          <Fragment key={index}>
            <div>
              <h3 className="text-base font-bold">{filterGroup.label}</h3>
              <div className="grid gap-2 mt-2">
                {filterGroup.options.map((option) => (
                  <Label
                    key={option.id}
                    className="flex font-medium items-center gap-2"
                  >
                    <Checkbox
                      checked={
                        filters &&
                        filters[filterGroup.name] &&
                        filters[filterGroup.name].includes(option.id)
                      }
                      onCheckedChange={() =>
                        handleFilter(filterGroup.name, option.id)
                      }
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
