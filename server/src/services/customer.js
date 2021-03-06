const getConnection = require("../db");

module.exports = repository => ({
    findCustomerById: async id => {
        return repository.findById(id);
    },

    findAllCustomers: async (condition, order) => {
        return repository.findAll(condition, order);
    },

    createNewCustomer: async values => {
        return repository.insert(values);
    },

    updateCustomer: async (id, change) => {
        const conn = await getConnection();
        await conn.query("START TRANSACTION");
        try {
            const office = await repository.findById(id);
            const payload = { ...office, ...change };
            await repository.update(id, payload);
            await conn.query("COMMIT");
        } catch (e) {
            await conn.query("ROLLBACK");
            throw e;
        }
    },

    findTopMostActiveCustomers: async limit => {
        return repository.findTopMostActive(limit);
    },

    deleteCustomer: async id => {
        return repository.deleteById(id);
    },
});
