import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header/parent*/}
      <ShoppingHeader/>
      <main className="flex flex-col w-full">
        {/* render childs */}
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;