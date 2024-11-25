import React from "react";
import FactionRuleDataContext from "@/hooks/contexts/FactionRuleDataContext";

const useFactionRuleData = () => React.useContext(FactionRuleDataContext);

export default useFactionRuleData;