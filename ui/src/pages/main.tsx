import {useCallback, useEffect, useMemo} from "react";
import {ColDef, ICellRendererParams} from "ag-grid-community";
import {AgGridReact} from "ag-grid-react";
import {ModuleRegistry, AllCommunityModule} from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
    Button,
} from "react-bootstrap";
import {ZuhraContainer} from "./styles";
import {ExpenseDto} from "../types/expense";
import {DeleteExpenseModal} from "./delete-expense-modal";
import {useAppDispatch, useAppSelector} from "../store/store";
import {
    getAllExpenses, getTotal, showCreateModal,
    showDeleteModal, showEditModal,
} from "../store/action/expense-actions";
import {NewExpenseModal} from "./new-expense-modal";
import {EditExpenseModal} from "./edit-expense-modal";
import {Total} from "./total";
import {formatExpenseStatus} from "../formatters/formatters";

ModuleRegistry.registerModules([AllCommunityModule]);

type DeleteButtonProps = {
    expense: ExpenseDto;
    onDeleteExpense?: (object: ExpenseDto) => void;
}

const DeleteExpenseButton = ({expense, onDeleteExpense}: DeleteButtonProps) => {
    const onDelete = useCallback(() => {
        if (onDeleteExpense) {
            onDeleteExpense(expense)
        }
    }, [expense, onDeleteExpense])
    return <Button onClick={onDelete}>X</Button>
}

export const Main = () => {
    const dispatch = useAppDispatch();
    const { expenses } = useAppSelector(store => store.expensesStore);

    const onRefresh = useCallback(() => {
        dispatch(getAllExpenses()).then(res => dispatch(getTotal()))
    }, [dispatch])

    useEffect(() => {
        onRefresh();
    }, [dispatch, onRefresh]);

    const onDelete = useCallback((expense: ExpenseDto) => {
        dispatch(showDeleteModal(expense))
    }, [dispatch])

    const colDefs = useMemo<ColDef[]>(
        () => [
            {headerName: "ID", field: "id", flex: 2},
            {headerName: "Date", field: "createdAt", flex: 1},
            {
                headerName: "Category",
                field: "category",
                filter: true,
                flex: 1,
            },
            {headerName: "Description", field: "description", flex: 1},
            {headerName: "Balance", field: "balance", flex: 1},
            {
                headerName: "Status",
                field: "status",
                valueGetter: (params) => {
                    const { data } = params;
                    return formatExpenseStatus(data?.status);
                },
                flex: 1,
            },
            {
                headerName: 'Actions',
                flex: 0.5,
                cellRendererParams: {
                    onDelete
                },
                cellRenderer: (params: ICellRendererParams) => {
                    const {data} = params;
                    const onLocalDelete = params.colDef?.cellRendererParams?.onDelete;
                    return <DeleteExpenseButton onDeleteExpense={onLocalDelete} expense={data}/>;
                }
            }
        ],
        [onDelete]
    );
    
    const onCreateModal = useCallback(() => {
        dispatch(showCreateModal())
    }, [dispatch])

    const onEditModal = useCallback((params: any) => {
        const { data } = params;
        const expense = {...data} as ExpenseDto;
        dispatch(showEditModal(expense))
    }, [dispatch])

    return (
        <>
            <DeleteExpenseModal />
            <NewExpenseModal />
            <EditExpenseModal />

            <ZuhraContainer className="container vh-100 d-flex flex-column">
                <Total />

                <div className="mt-3">
                    <Button onClick={onRefresh}>Refresh</Button>
                    <Button className='ms-2' onClick={onCreateModal}>New</Button>
                </div>

                <div className="ag-theme-quartz flex-grow-1 my-2">
                    <AgGridReact
                        rowData={expenses}
                        columnDefs={colDefs}
                        rowSelection="single"
                        onCellDoubleClicked={onEditModal}
                    />
                </div>
            </ZuhraContainer>
        </>
    );
};