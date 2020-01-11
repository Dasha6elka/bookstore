import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import slice from "./slice";
import api from "services/api";

const {
    fetchEmployeesFail,
    fetchEmployeesStart,
    fetchEmployeesSuccess,
    deleteEmployeeError,
    deleteEmployeeStart,
    deleteEmployeeSuccess,
} = slice.actions;

export const fetchEmployees = () => async (dispatch, getState) => {
    try {
        dispatch(fetchEmployeesStart());
        const headers = { authorization: getState().auth.token };
        const employees = await api.get("employee", { headers }).json();
        const transformed = employees.map(row => ({
            ...row,
            date_of_birth: format(parseISO(row.date_of_birth), "dd MMMM yyyy", { locale: ru }),
        }));
        dispatch(fetchEmployeesSuccess({ employees: transformed }));
    } catch (error) {
        console.error(error);
        dispatch(fetchEmployeesFail({ error }));
    }
};

export const deleteEmployee = id => async (dispatch, getState) => {
    try {
        dispatch(deleteEmployeeStart());
        const headers = { authorization: getState().auth.token };
        await api.delete(`employee/${id}`, { headers });
        dispatch(deleteEmployeeSuccess());
        dispatch(fetchEmployees());
    } catch (error) {
        console.error(error);
        dispatch(deleteEmployeeError({ error }));
    }
};