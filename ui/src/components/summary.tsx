import {useAppSelector} from "../store/store";

export const Summary = () => {
    const { total } = useAppSelector(store => store.expensesStore);
    return (
        <div className="d-flex h-100">
            <div className="rounded flex-grow-1 h-100" style={{ background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", minWidth: "300px" }}>
                <h2 className="fw-bold ms-2 mt-2">{total?.balance?.toFixed(2)}$</h2>
                <div className="mt-3 ms-2">
                    <p className="mb-1 fw-semibold">↖ Income</p>
                    <p className="mb-3">{total?.income?.toFixed(2)}$</p>
                    <p className="mb-1 fw-semibold">↙ Outcome</p>
                    <p className="mb-0 text-danger">-{total?.outcome.toFixed(2)}$</p>
                </div>
            </div>
        </div>
    );
}