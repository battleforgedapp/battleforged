import React from "react";

export type FactDatasheetContextType = {
    modalId: string,
    factionId: string,
    datasheetId: string | null,
    selectDatasheet: (datasheetId: string) => void
};

const FactionDatasheetStatsContext = React.createContext<FactDatasheetContextType>({
    modalId: "",
    factionId: "",
    datasheetId: null,
    selectDatasheet: () => { }
});

export const FactionDatasheetStatsProvider = ({ children, factionId, modalId } : Readonly<{ factionId: string, modalId: string, children: React.ReactNode }>) => {
    const [datasheetId, setDatasheetId] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!datasheetId) {
            return;
        }

        console.log('you have selected datasheet: ' + datasheetId);
    }, [datasheetId]);

    return (
        <FactionDatasheetStatsContext.Provider value={{
            modalId,
            factionId,
            datasheetId,
            selectDatasheet: (datasheetId) => setDatasheetId(_ => datasheetId)
        }}>
            {children}
        </FactionDatasheetStatsContext.Provider>
    );
};

export default FactionDatasheetStatsContext;