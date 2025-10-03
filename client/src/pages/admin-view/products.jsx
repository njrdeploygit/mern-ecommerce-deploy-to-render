import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
// import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { fetchAllCategories } from "@/store/admin/categories-slice"; //alias as adminCategoriesSlice to be used in store.js
import { fetchAllBrands } from "@/store/admin/brands-slice";
// import { useToast } from "@/components/ui/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice"; //alias as AdminProductsSlice to be used in store.js
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null); //store current id for item edited

  const { productList } = useSelector((state) => state.adminProducts); // adminProducts value from store.js
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    if (currentEditedId !== null) {
      dispatch(
        editProduct({
          id: currentEditedId,
          formData: {
            ...formData,
            image: uploadedImageUrl || formData.image, // <-- use new image if uploaded, else keep old
          },
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setUploadedImageUrl(""); // reset image
          setImageFile(null);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          toast({
            title: "Product updated successfully",
          });
        }
      });
    } else {
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setImageFile(null);
          setFormData(initialFormData);
          setUploadedImageUrl("");
          toast({
            title: "Product added successfully",
          });
        }
      });
    }
  }

  function handleDelete(productId, productImageUrl, productTitle) {
    Swal.fire({
      title: "Are you sure?",
      html: `
     <p class="text-md text-gray-600">You are about to delete the product:</p>
        <strong class="block mt-2 text-lg font-semibold text-red-600">${productTitle}</strong>
      <img src="${productImageUrl}" alt="Product Image" style="max-width: 100%; height: auto; margin-top: 10px; border-radius: 8px;" />
    `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete Now!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(productId)).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            toast({
              title: "Product deleted successfully",
            });
          }
        });
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
    dispatch(fetchAllProducts());
  }, [dispatch]);
  console.log(formData, "formData");
  //console.log(productList, uploadedImageUrl, "productList");

  const { categoryList } = useSelector((state) => state.adminCategories);
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  console.log(categoryList, "categoryList for select");

  const { brandList } = useSelector((state) => state.adminBrands);
  useEffect(() => {
    dispatch(fetchAllBrands());
  }, [dispatch]);
  console.log(brandList, "brandList for select");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product item
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={() =>
                  handleDelete(
                    productItem._id,
                    productItem.image,
                    productItem.title
                  )
                }
                setUploadedImageUrl={setUploadedImageUrl} // <-- add this line
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
          setImageFile(null);
          setUploadedImageUrl("");
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto"
        >
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            {/* reusable component */}
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements(categoryList, brandList)}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
