export interface FinanceData {
    id: number;
    value: string;
}

const finance: FinanceData[] = [
    { id: 1, value: "Financed" },
    { id: 2, value: "Leased" },
    { id: 3, value: "It's paid in full" }
];

const yesNoData: FinanceData[] = [
    { id: 1, value: "Yes" },
    { id: 2, value: "No" }
]

const HowYoungData: FinanceData[] = [
    { id: 1, value: "18 to 24" },
    { id: 2, value: "25 to 34" },
    { id: 3, value: "35 to 44" },
    { id: 4, value: "45+" },

]
const TraffficyesNoData: FinanceData[] = [
    { id: 1, value: "Yes" },
    { id: 2, value: "No" }
]

const MartialStatus: FinanceData[] = [
    { id: 1, value: "Single" },
    { id: 2, value: "Married / Civil union" },
    { id: 3, value: "It's complicated" }
]


const RegisteredData: FinanceData[] = [
    { id: 1, value: "Yes, under my or my spouse's name" },
    { id: 2, value: "Yes, under someone else's name" },
    { id: 3, value: "No, it's not registered in bahrain" }
]


const InsuranceYesNoData: FinanceData[] = [
    { id: 1, value: "Yes" },
    { id: 2, value: "No" }
]

const ClaimYesNoData: FinanceData[] = [
    { id: 1, value: "Yes" },
    { id: 2, value: "No" }
]

export { finance, yesNoData, HowYoungData, TraffficyesNoData, MartialStatus, RegisteredData,InsuranceYesNoData,ClaimYesNoData };