const { validationResult } = require("express-validator");
const { 
    getAddresses,
    getAddressById,
    getAddressByUserId,
    insertAddress,
    updateAddress,
    deleteAddress,
} = require("../services/addressService");

const getAllAddressesController = async (req, res) => {
    try {
        const addresses = await getAddresses();
        res.status(200).json({ addresses });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getAdressByIdController = async (req, res) => {
    const { address_ID } = req.body;
    if (!address_ID){
        return res.status(400).json({ message: "Missing address ID"});
    }
    try {
        const result = await getAddressById(address_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getAddressByUserId = async (req, res) => {
    const { user_ID } = req.body;
    if (!user_ID){
        return res.status(400).json({ message: "Missing user ID"});
    }
    try {
        const result = await getAddressByUserId(user_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const insertAddressController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { customer_ID, region, street, building, floor, moredetails } = req.body;

    try {
        const response = await insertAddress(user_ID, region, street, building, floor, moredetails);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const updateAddressController = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address_ID, region, street, building, floor, moredetails } = req.body;

    try {
        const response = await updateAddress({ address_ID, region, street, building, floor, moredetails });
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteAddressController = async (req, res) => {
    const { address_ID } = req.body;

    if (!address_ID) {
        return res.status(400).json({ message: "Missing address ID" });
    }

    try {
        const result = await deleteAddress(address_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

module.exports = {
    getAllAddressesController,
    getAdressByIdController,
    getAddressByUserId,
    insertAddressController,
    updateAddressController,
    deleteAddressController,
};