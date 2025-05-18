import {useAppSelector} from "../store/store";
import {Summary} from "../components/summary";

export const Total = () => {
    const { total } = useAppSelector(store => store.expensesStore);
    if (total) {
        return (
            <div className='d-flex flex-column gap-3'>
                <div className='d-flex flex-row text-white justify-content-between'>
                    <div className='w-100 fw-bold text-center'>Current Balance</div>
                </div>

                <div className='d-flex flex-row gap-3 justify-content-center'>
                    <div className='w-33 h-100'>
                        <Summary />
                    </div>
                </div>
            </div>
        );
    }

    return <></>;
}