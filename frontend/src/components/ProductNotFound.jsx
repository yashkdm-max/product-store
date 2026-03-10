import React from "react";
import { PackageOpen } from "lucide-react";
import { Link } from "react-router-dom";

const ProductNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">

      <div className="bg-primary/10 rounded-full p-8">
        <PackageOpen className="size-10 text-primary" />
      </div>

      <h3 className="text-2xl font-bold">No Products Yet</h3>

      <p className="text-base-content/70">
        Ready to add sports wear? Add your first product to the store.
      </p>

      <Link to="/create" className="btn btn-primary">
        Add First Product
      </Link>

    </div>
  );
};

export default ProductNotFound;