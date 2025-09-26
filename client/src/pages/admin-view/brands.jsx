//suspende not component call- directly iterate here for cell

import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { brandFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addnewbrand,
  deleteBrand,
  editBrand,
  fetchAllBrands,
} from "@/store/admin/brands-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialFormData = {
  title: "",
  description: "",
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AdminBrands() {
  const [openCreateBrandsDialog, setOpenCreateBrandsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null); //store current id for item edited

  //(adminBrands) in store.js links adminBrandsSlice in admin/brands-slice to get {brandList} object
  const { brandList } = useSelector((state) => state.adminBrands);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editBrand({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllBrands());
            setFormData(initialFormData);
            setOpenCreateBrandsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addnewbrand({
            ...formData,
          })
        ).then((data) => {
          //once product saved we need to get the updaed product
          console.log(data, "dataLOGGER");
          if (data?.payload?.success) {
            dispatch(fetchAllBrands()); //get the list of products
            setOpenCreateBrandsDialog(false); // close the dialog
            setFormData(initialFormData); //reset the form data
            toast({
              title: "Brand added successfully",
            });
          }
        });
  }

  function handleDelete(getCurrentBrandId) {
    //add sweet alert dialog
    Swal.fire({
      title: `Are you sure? delete Brand : ${getCurrentBrandId}`,
      // text: "You won't be able to revert this!",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete Now!",
    }).then((result) => {
      if (result.isConfirmed) {
        //------------------------
        dispatch(deleteBrand(getCurrentBrandId)).then((data) => {
          console.log(data);

          if (data?.payload?.success) {
            dispatch(fetchAllBrands()); //get list of the products
            toast({
              title: "Brand deleted successfully",
            });
          }
        });
        //------------------------
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Brand has been deleted.",
        //   icon: "success",
        // });
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllBrands());
  }, [dispatch]);

  console.log(formData, "formData");
  console.log(brandList, "brandList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateBrandsDialog(true)}>
          Add New Brand item
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Brands</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brandList && brandList.length > 0
                ? brandList.map((brandItem) => (
                    <TableRow>
                      <TableCell>{brandItem?.title}</TableCell>
                      <TableCell>{brandItem?.description}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            setOpenCreateBrandsDialog(true);
                            setCurrentEditedId(brandItem?._id);
                            setFormData(brandItem);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className="ml-3"
                          onClick={() => handleDelete(brandItem?._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet
        open={openCreateBrandsDialog}
        onOpenChange={() => {
          setOpenCreateBrandsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto"
        >
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Brand" : "Add New Brand"}
            </SheetTitle>
          </SheetHeader>

          <div className="py-6">
            {/* reusable component */}
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit " : "Add"}
              formControls={brandFormControls}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminBrands;
