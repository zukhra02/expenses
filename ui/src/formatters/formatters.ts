import {ExpenseStatus} from "../enums/ExpenseStatus";

export const formatExpenseStatus = (value?: string) => {
    if (!value) {
        return '-'
    }

    if (value === 'INCOME') {
        return ExpenseStatus.INCOME
    } else if (value === 'OUTCOME') {
        return ExpenseStatus.OUTCOME
    }
}