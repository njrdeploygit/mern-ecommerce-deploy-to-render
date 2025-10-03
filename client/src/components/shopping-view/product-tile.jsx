import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
// import { categoryOptionsMap } from "@/config"; // keep for now
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchAllBrands } from "@/store/admin/brands-slice";
import { fetchAllCategories } from "@/store/admin/categories-slice";

function normalizeKey(title) {
  return (
    title
      ?.toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/gi, "") || ""
  );
}

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.adminCategories);
  const { brandList } = useSelector((state) => state.adminBrands);

  // Fetch categories once
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // Fetch brands once
  useEffect(() => {
    dispatch(fetchAllBrands());
  }, [dispatch]);

  // Generate categoryOptionsMap dynamically
  const categoryOptionsMap = useMemo(() => {
    const map = {};
    categoryList?.forEach((category) => {
      const key = normalizeKey(category.title); // e.g. "Men" → "men"
      map[key] = category.title; // { men: "Men" }
    });
    return map;
  }, [categoryList]);

  // Generate brandOptionsMap dynamically
  const brandOptionsMap = useMemo(() => {
    const map = {};
    brandList?.forEach((brand) => {
      const key = normalizeKey(brand.title); // e.g. "Nike" → "nike"
      map[key] = brand.title; // { nike: "Nike" }
    });
    return map;
  }, [brandList]);

  const normalizedCategorydKey = normalizeKey(product?.category);
  const categoryDisplayName =    categoryOptionsMap[normalizedCategorydKey] || "Unknown";

  const normalizedBrandKey = normalizeKey(product?.brand);
  const brandDisplayName = brandOptionsMap[normalizedBrandKey] || "Unknown";

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryDisplayName}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandDisplayName}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
