/**
 * Takes a set of Datasheets, looks at the group property and attempts to extract the data and group them together
 */

import React from "react";
import {DefArmyGroup} from "@/types/def.armygroup.type";
import {FactionDatasheet} from "@/types/faction.datasheet.type";
import _ from "lodash";

export type GroupedDataSheet = {
    id: string,
    name: string,
    datasheets: FactionDatasheet[]
};

export const useFactionDatasheetGroups = (datasheets : FactionDatasheet[]) : GroupedDataSheet[] => {
    return React.useMemo(() => {
        if (!datasheets) {
            return [];
        }

        // this will look at every datasheet and extract the group information where the group data is assigned
        const allGroups = datasheets
            .filter(el => !!el.group)
            .map(el => el.group) as DefArmyGroup[];

        // now we can use lodash to find the unique groups
        const groups = _.orderBy(_.uniqBy(allGroups, 'id'), 'order');

        // with this, for each of them we can get a list of all the datasheets that sit under that group and assign them
        return groups.map(el => {
            return {
                ...el,
                datasheets: datasheets.filter(x => x.groupId === el.id)
            }
        });
    }, [datasheets]) as GroupedDataSheet[];
};

export default  useFactionDatasheetGroups;