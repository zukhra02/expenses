export type ExpenseDto = {
    id?: string;
    createdAt: string;
    category: string;
    description: string;
    balance?: number;
    status: string;
};

export type TotalDto = {
    income: number;
    outcome: number;
    balance: number;
    totalByCategory: {[key: string]: number};
    totalByMonth: {[key: string]: number};
}