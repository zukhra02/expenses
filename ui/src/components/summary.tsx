import { useAppSelector } from "../store/store";

export const Summary = () => {
    const { total } = useAppSelector(store => store.expensesStore);

    return (
        <div className="w-100">
            <div
                className="rounded p-4 d-flex justify-content-between align-items-start w-100"
                style={{
                    background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
                    minHeight: "180px",
                }}
            >
                <div>
                    <p className="fw-semibold mb-1">Total</p>
                    <h2 className="fw-bold">{total?.balance?.toFixed(2)}$</h2>
                    <p className="fw-bold">Current Balance</p>
                </div>

                <div className="text-end">
                    <p className="mb-1 fw-semibold">↖ Income</p>
                    <p className="mb-3">{total?.income?.toFixed(2)}$</p>
                    <p className="mb-1 fw-semibold">↙ Outcome</p>
                    <p className="mb-0 text-danger">-{total?.outcome.toFixed(2)}$</p>
                </div>
            </div>
        </div>
    );
};