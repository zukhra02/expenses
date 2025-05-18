import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {expenseReducer} from "./reducer/expense-reducer";
import {appointmentsReducer} from "./reducer/appointmentsReducer";

const rootReducer = combineReducers({
    expensesStore: expenseReducer,
    appointmentsStore: appointmentsReducer, // 👈 Añadido
});

export default rootReducer;


export const store = configureStore({
    reducer: rootReducer
})



export type IRootState = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();





