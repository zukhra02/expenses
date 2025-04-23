import {useAppSelector} from "../store/store";
import {TotalByCategory} from "../components/total-by-category";
import {Summary} from "../components/summary";
import {TotalByDate} from "../components/total-by-date";

export const Total = () => {
    const { total } = useAppSelector(store => store.expensesStore);
    if (total) {
        return <div className='d-flex flex-column gap-3'>
            <div className='d-flex flex-row text-white justify-content-between'>
                <div className='w-33 fw-bold text-center'>Current Balance</div>
                <div className='w-33 fw-bold text-center'>By Date</div>
                <div className='w-33 fw-bold text-center'>By Category</div>
            </div>

            <div className='d-flex flex-row gap-3 justify-content-between'>
                <div className='w-33 h-100'>
                    <Summary />
                </div>
                <div className='w-33 h-100'>
                    <TotalByDate />
                </div>
                <div className='w-33 h-100'>
                    <TotalByCategory />
                </div>
            </div>
        </div>
    }

    return <></>
}