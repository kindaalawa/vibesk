const {validationResult} = require("express-validator");

const {
    getCustomers,
    getCustomerById,
    insertCustomer,
    updateCustomer,
    deleteCustomer
} = require("../services/customerService");

const getCustomersController = async (req, res) => {
    try {
        const customer = await getCustomers();
        res.status(200).json({ customer })
    } catch(error) {
        res.status(500).json({ message: error?.message });
    }
}

const getCustomerByIdController = async (req, res) => {
    const { customer_ID } = req.body;

    if(!customer_ID){
        return res.status(400).json({message: "No customer ID"});
    }
    try {
        const result = await getCustomerById(customer_ID);
        res.status(200).json({ result });
    } catch(error) {
        res.status(500).json({ message: error?.message });
    }
}

const insertCustomerController = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {customer_FullName, customer_Email, customer_Password, customer_PhoneNumber} = req.body;

    try {
        const response = await insertCustomer(customer_FullName, customer_Email, customer_Password, customer_PhoneNumber);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const updateCustomerController = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { customer_ID, customer_FullName, customer_Email, customer_Password, customer_PhoneNumber } = req.body;

    try {
        const response = await updateCustomer({ customer_ID, customer_FullName, customer_Email, customer_Password, customer_PhoneNumber });
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteCustomerController = async (req, res) => {
    const { customer_ID } = req.body;

    if (!customer_ID) {
        return res.status(400).json({ message: "No customer id " });
    }

    try {
        const result = await deleteCustomer(customer_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

module.exports = {
    getCustomersController,
    getCustomerByIdController,
    insertCustomerController,
    updateCustomerController,
    deleteCustomerController
}