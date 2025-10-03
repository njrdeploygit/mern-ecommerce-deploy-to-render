// components/admin-view/image-upload.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useRef } from "react";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
  isEditMode,
}) {
  const inputRef = useRef();

  useEffect(() => {
    // Auto-preview if imageFile exists
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageUrl(reader.result); // preview
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile, setUploadedImageUrl]);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImageLoadingState(true);
    setImageFile(file);

    // Simulate async upload
const formData = new FormData();
formData.append("file", file);
formData.append("upload_preset", "your_unsigned_upload_preset"); // <-- Replace this
formData.append("cloud_name", "your_cloud_name"); // <-- Optional

fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
  method: "POST",
  body: formData,
})
  .then((res) => res.json())
  .then((data) => {
    if (data.secure_url) {
      setUploadedImageUrl(data.secure_url);
    } else {
      console.error("Cloudinary upload failed", data);
    }
    setImageLoadingState(false);
  })
  .catch((err) => {
    console.error("Cloudinary upload error", err);
    setImageLoadingState(false);
  });

  }

  // function handleReplaceImage() {
  //   if (inputRef.current) inputRef.current.click();
  // }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
  }

  return (
    <div className="space-y-3">
      <Label className="block text-sm font-medium text-muted-foreground">
        Product Image
      </Label>

      {imageLoadingState ? (
        <Skeleton className="w-full h-64 rounded-md" />
      ) : uploadedImageUrl ? (
        <div className="relative w-full">
          <img
            src={uploadedImageUrl}
            alt="Preview"
            className="w-full h-64 object-cover rounded-md border"
          />
          <div className="flex gap-2 mt-2">
            {/* <Button
              type="button"
              onClick={handleReplaceImnpm run dev
              
              variant="secondary"
              size="sm"
            >
              Replace
            </Button> */}
            <Button
              type="button"
              onClick={handleRemoveImage}
              variant="destructive"
              size="sm"
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
}

export default ProductImageUpload;
