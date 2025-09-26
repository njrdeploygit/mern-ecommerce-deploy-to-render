//move fetch functionalituy from testarejsx into here


import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";

import { fetchAllCategories } from "@/store/admin/categories-slice";
import { useDispatch, useSelector } from "react-redux";
import { ComboboxDemo } from "@/components/combobox";

function testarea() {
  const { categoryList } = useSelector((state) => state.adminCategories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  console.log(categoryList, "categoryList");


  return (
    <div>
      <div>
        <Label className="px-4 mb-2">category</Label>
        <ComboboxDemo frameworks={categoryList}/>
    
      </div>
    </div>
  );
}

export default testarea;
