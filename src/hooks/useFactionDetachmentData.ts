import React from "react";
import FactionDetachmentDataContext from "@/hooks/contexts/FactionDetachmentDataContext";

const useFactionDetachmentData = () => React.useContext(FactionDetachmentDataContext);

export default useFactionDetachmentData;