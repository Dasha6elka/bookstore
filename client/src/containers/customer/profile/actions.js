import slice from "./slice";
import api from "services/api";
import { fetchCustomers } from "containers/customer/list/actions";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

const {
    fetchCustomerStart,
    fetchCustomerSuccess,
    fetchCustomerFail,
    saveCustomerStart,
    saveCustomerSuccess,
    saveCustomerFail,
    createCustomerStart,
    createCustomerSuccess,
    createCustomerFail,
} = slice.actions;

export const fetchCustomer = id => async (dispatch, getState) => {
    try {
        dispatch(fetchCustomerStart());
        const headers = { authorization: getState().auth.token };
        const customer = await api.get(`customer/${id}`, { headers }).json();
        dispatch(
            fetchCustomerSuccess({
                customer: {
                    ...customer,
                    date_of_birth: format(parseISO(customer.date_of_birth), "dd MMMM yyyy", {
                        locale: ru,
                    }),
                },
            }),
        );
    } catch (error) {
        console.error(error);
        dispatch(fetchCustomerFail({ error }));
    }
};

export const saveCustomer = (id, change) => async (dispatch, getState) => {
    try {
        dispatch(saveCustomerStart());
        const headers = { authorization: getState().auth.token };
        await api.put(`customer/${id}`, { json: change, headers });
        dispatch(saveCustomerSuccess());
        dispatch(fetchCustomers());
    } catch (error) {
        console.error(error);
        dispatch(saveCustomerFail({ error }));
    }
};

export const createCustomer = customer => async (dispatch, getState) => {
    try {
        dispatch(createCustomerStart());
        const headers = { authorization: getState().auth.token };
        await api.post("customer", { json: customer, headers });
        dispatch(createCustomerSuccess());
        dispatch(fetchCustomers());
    } catch (error) {
        console.error(error);
        dispatch(createCustomerFail({ error }));
    }
};
