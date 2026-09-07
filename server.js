const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Deepak Khad Bhandar ke Products ki List
let products = [
    { id: 1, name: 'यूरिया (Urea)', category: 'खाद (Fertilizer)', price: '₹266 / कट्टा' },
    { id: 2, name: 'DAP (Diammonium Phosphate)', category: 'खाद (Fertilizer)', price: '₹1350 / कट्टा' },
    { id: 3, name: 'NPK 12:32:16', category: 'खाद (Fertilizer)', price: '₹1470 / कट्टा' },
    { id: 4, name: 'गेहूं का उन्नत बीज (Wheat Seeds)', category: 'बीज (Seeds)', price: '₹45 / किग्रा' },
    { id: 5, name: 'धान का बीज (Paddy Seeds)', category: 'बीज (Seeds)', price: '₹60 / किग्रा' },
    { id: 6, name: 'कीटनाशक दवा (Pesticide Spray)', category: 'कीटनाशक', price: '₹550 / बोतल' }
];

// Graahakon ke orders ya inquiries save karne ke liye array
let inquiries = [];

// API: Sabhi products fetch karne ke liye
app.get('/api/products', (req, res) => {
    res.json(products);
});

// API: Naya order ya inquiry submit karne ke liye
app.post('/api/inquiries', (req, res) => {
    const { name, phone, item, quantity } = req.body;
    
    if (!name || !phone || !item) {
        return res.status(400).json({ error: 'Kripya naam, mobile number aur item zaroor bharein.' });
    }

    const newInquiry = {
        id: Date.now(),
        name,
        phone,
        item,
        quantity: quantity || '1',
        date: new Date().toLocaleDateString('hi-IN')
    };

    inquiries.push(newInquiry);
    res.status(201).json({ message: 'Aapka order/inquiry safalpurvak darj ho gaya hai!', newInquiry });
});

// Server Start Karna
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});