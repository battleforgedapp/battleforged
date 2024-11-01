import React from "react";
import FactionDatasheetStatsContext from "@/hooks/contexts/FactionDatasheetStatsContext";

const useFactionDatasheetStats = () => React.useContext(FactionDatasheetStatsContext);

export default useFactionDatasheetStats;