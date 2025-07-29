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
export { finance, yesNoData ,HowYoungData};