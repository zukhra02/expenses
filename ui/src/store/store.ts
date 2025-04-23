import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {expenseReducer} from "./reducer/expense-reducer";

export const rootReducer = combineReducers({
    expensesStore: expenseReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type IRootState = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();