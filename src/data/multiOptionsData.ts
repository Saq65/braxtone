export interface FinanceData {
    id: number;
    value: string;
}

const finance: FinanceData[] = [
    { id: 1, value: "Financed" },
    { id: 2, value: "Leased" },
    { id: 3, value: "It's paid in full" }
];

export { finance };