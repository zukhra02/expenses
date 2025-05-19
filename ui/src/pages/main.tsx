import { useCallback, useEffect, useMemo, useState } from "react";
import { ColDef, ICellRendererParams, ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "react-bootstrap";
import { ZuhraContainer } from "./styles";
import { ExpenseDto } from "../types/expense";
import { DeleteExpenseModal } from "./delete-expense-modal";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
    getAllExpenses, getTotal, showCreateModal, showDeleteModal, showEditModal
} from "../store/action/expense-actions";
import { NewExpenseModal } from "./new-expense-modal";
import { EditExpenseModal } from "./edit-expense-modal";
import { formatExpenseStatus } from "../formatters/formatters";
import { TotalByCategory } from "../components/total-by-category";
import { TotalByDate } from "../components/total-by-date";
import { Appointments } from "./Appointments"; // IMPORT CORRECTO

ModuleRegistry.registerModules([ClientSideRowModelModule]);

type DeleteButtonProps = {
    expense: ExpenseDto;
    onDeleteExpense?: (object: ExpenseDto) => void;
};

const DeleteExpenseButton = ({ expense, onDeleteExpense }: DeleteButtonProps) => {
    const onDelete = useCallback(() => {
        if (onDeleteExpense) onDeleteExpense(expense);
    }, [expense, onDeleteExpense]);

    return <Button onClick={onDelete}>X</Button>;
};

export const Main = () => {
    const dispatch = useAppDispatch();
    const { expenses, total } = useAppSelector(store => store.expensesStore);

    const [view, setView] = useState<"main" | "byCategory" | "byDate" | "appointments">("main");

    const onRefresh = useCallback(() => {
        dispatch(getAllExpenses()).then(() => dispatch(getTotal()));
    }, [dispatch]);

    useEffect(() => {
        onRefresh();
    }, [onRefresh]);

    const onDelete = useCallback((expense: ExpenseDto) => {
        dispatch(showDeleteModal(expense));
    }, [dispatch]);

    const colDefs = useMemo<ColDef[]>(() => [
        { headerName: "ID", field: "id", flex: 2 },
        { headerName: "Date", field: "createdAt", flex: 1 },
        { headerName: "Category", field: "category", flex: 1, filter: true },
        { headerName: "Description", field: "description", flex: 1 },
        { headerName: "Balance", field: "balance", flex: 1 },
        {
            headerName: "Status",
            field: "status",
            valueGetter: (params) => formatExpenseStatus(params.data?.status),
            flex: 1,
        },
        {
            headerName: "Actions",
            flex: 0.5,
            cellRendererParams: { onDelete },
            cellRenderer: (params: ICellRendererParams) => {
                const { data } = params;
                const onLocalDelete = params.colDef?.cellRendererParams?.onDelete;
                return <DeleteExpenseButton onDeleteExpense={onLocalDelete} expense={data} />;
            },
        }
    ], [onDelete]);

    const onCreateModal = useCallback(() => {
        dispatch(showCreateModal());
    }, [dispatch]);

    const onEditModal = useCallback((params: any) => {
        const { data } = params;
        dispatch(showEditModal({ ...data } as ExpenseDto));
    }, [dispatch]);

    return (
        <>
            <DeleteExpenseModal />
            <NewExpenseModal />
            <EditExpenseModal />

            <ZuhraContainer className="container vh-100 d-flex flex-column">
                {view === "main" && (
                    <>
                        <h1 className="text-white fw-bold text-center mt-4">Expenses</h1>

                        <div className="container-fluid px-4 mt-3">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="p-4 rounded text-white w-100 h-100"
                                         style={{ background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)" }}>
                                        <h5 className="fw-semibold">Total</h5>
                                        <h2 className="fw-bold">{total?.balance?.toFixed(2)}$</h2>
                                        <div className="fw-semibold">Current Balance</div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="p-4 rounded text-white w-100 h-100"
                                         style={{ background: "linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)" }}>
                                        <h5 className="fw-semibold">↙Income</h5>
                                        <h2 className="fw-bold">{total?.income?.toFixed(2)}$</h2>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="p-4 rounded text-white w-100 h-100"
                                         style={{ background: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)" }}>
                                        <h5 className="fw-semibold">↗Outcome</h5>
                                        <h2 className="fw-bold text-danger">-{total?.outcome?.toFixed(2)}$</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <Button onClick={onRefresh}>Refresh</Button>
                            <Button className="ms-2" onClick={onCreateModal}>New</Button>
                            <Button className="ms-2" onClick={() => setView("byDate")}>byDate</Button>
                            <Button className="ms-2" onClick={() => setView("byCategory")}>byCategory</Button>
                            <Button className="ms-2" onClick={() => setView("appointments")}>Appointments</Button>
                        </div>

                        <div className="ag-theme-quartz flex-grow-1 my-2">
                            <AgGridReact
                                rowData={expenses}
                                columnDefs={colDefs}
                                rowSelection="single"
                                onCellDoubleClicked={onEditModal}
                            />
                        </div>
                    </>
                )}

                {view === "byDate" && <>
                    <TotalByDate />
                    <Button onClick={() => setView("main")} className="mt-3">Volver</Button>
                </>}

                {view === "byCategory" && <>
                    <TotalByCategory />
                    <Button onClick={() => setView("main")} className="mt-3">Volver</Button>
                </>}

                {view === "appointments" && <>
                    <Appointments />
                    <Button onClick={() => setView("main")} className="mt-3">Volver</Button>
                </>}
            </ZuhraContainer>
        </>
    );
};