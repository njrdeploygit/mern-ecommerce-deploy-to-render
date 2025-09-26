//suspende not component call- directly iterate here for cell
// import AdminCategoryTile from "@/components/admin-view/category-tile";

import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { categoryFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addnewcategory,
  deleteCategory,
  editCategory,
  fetchAllCategories,
} from "@/store/admin/categories-slice";
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

function AdminCategories() {
  const [openCreateCategoriesDialog, setOpenCreateCategoriesDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null); //store current id for item edited

  //(adminCategories) in store.js links adminCategoriesSlice in admin/categories-slice to get {categoryList} object
  const { categoryList } = useSelector((state) => state.adminCategories);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editCategory({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllCategories());
            setFormData(initialFormData);
            setOpenCreateCategoriesDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addnewcategory({
            ...formData,
          })
        ).then((data) => {
          //once product saved we need to get the updaed product
          console.log(data, "dataLOGGER");
          if (data?.payload?.success) {
            dispatch(fetchAllCategories()); //get the list of products
            setOpenCreateCategoriesDialog(false); // close the dialog
            setFormData(initialFormData); //reset the form data
            toast({
              title: "Category added successfully",
            });
          }
        });
  }

  function handleDelete(getCurrentCategoryId) {
    //add sweet alert dialog
    Swal.fire({
      title: `Are you sure? delete Category : ${getCurrentCategoryId}`,
      // text: "You won't be able to revert this!",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete Now!",
    }).then((result) => {
      if (result.isConfirmed) {
        //------------------------
        dispatch(deleteCategory(getCurrentCategoryId)).then((data) => {
          console.log(data);

          if (data?.payload?.success) {
            dispatch(fetchAllCategories()); //get list of the products
            toast({
              title: "Category deleted successfully",
            });
          }
        });
        //------------------------
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "category has been deleted.",
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
    dispatch(fetchAllCategories());
  }, [dispatch]);

  console.log(formData, "formData");
  console.log(categoryList, "categoryList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateCategoriesDialog(true)}>
          Add New Category item
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
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
              {categoryList && categoryList.length > 0
                ? categoryList.map((categoryItem) => (
                    <TableRow>
                      <TableCell>{categoryItem?.title}</TableCell>
                      <TableCell>{categoryItem?.description}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            setOpenCreateCategoriesDialog(true);
                            setCurrentEditedId(categoryItem?._id);
                            setFormData(categoryItem);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className="ml-3"
                          onClick={() => handleDelete(categoryItem?._id)}
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
        open={openCreateCategoriesDialog}
        onOpenChange={() => {
          setOpenCreateCategoriesDialog(false);
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
              {currentEditedId !== null ? "Edit Category" : "Add New Category"}
            </SheetTitle>
          </SheetHeader>

          <div className="py-6">
            {/* reusable component */}
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit " : "Add"}
              formControls={categoryFormControls}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminCategories;
