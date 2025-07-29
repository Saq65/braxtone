export interface FinanceData {
    id: number;
    value: string;
}

const finance: FinanceData[] = [
    { id: 1, value: "Financed" },
    { id: 2, value: "Leased" },
    { id: 3, value: "It's paid in full" }
];

const yesNoData:FinanceData[]=[
    {id:1,value:"Yes"},
    {id:2,value:"No"}
]

export { finance ,yesNoData};