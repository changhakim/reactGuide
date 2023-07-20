import { useNavigate } from "react-router-dom";
import { Header, Bottom } from "@layouts";
import RootRoute from "@routes/RootRoute";
import { Suspense } from "react";
import { ModalPopupPortal, FallbackLoader, FullPopupPortal,DrawerPopupPortal } from "@components";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@routes/rootWrap.scss";

const App = () => {
  const navigate = useNavigate();
  window.navigate = navigate;

  return (
    <Suspense fallback={<FallbackLoader />}>
      <div className="root-wrap">
        <Header />
        <RootRoute />
        <Bottom />
      </div>
      <DrawerPopupPortal />
      <ModalPopupPortal />
      <FullPopupPortal />
    </Suspense>
  );
};
export default App;
