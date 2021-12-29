import { useContext } from "react";
import { Offcanvas } from "react-bootstrap";

import { StateContextArea, DispatchContextArea } from "../../providers/area";
import { SET_SHOW_AREA } from "../../actions/area";
import ReadArea from "./ReadArea";
import CreateUpdateArea from "./CreateUpdateArea";

function SideBar() {
  const { showArea, areaCRUD } = useContext(StateContextArea);
  const areaDispatch = useContext(DispatchContextArea);

  const closeAreaHandler = () => {
    areaDispatch({
      type: SET_SHOW_AREA,
      payload: { showArea: false, areaDisplayIndex: null, areaCRUD: "read" },
    });
  };

  let sideBarBody;
  switch (areaCRUD) {
    case "read":
      sideBarBody = <ReadArea />;
      break;

    case "create":
      sideBarBody = <CreateUpdateArea />;
      break;

    default:
      console.error(
        `An error occurred. Likely because areaCRUD was given the value of ${areaCRUD}`
      );
      break;
  }

  return (
    <Offcanvas show={showArea} onHide={closeAreaHandler}>
      {sideBarBody}
    </Offcanvas>
  );
}

export default SideBar;
