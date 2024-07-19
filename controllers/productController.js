const productModel = require('../models/productModel.js');
const getColors = require('get-image-colors');
const { darkenColor } = require('../public/javascript/colorFunction.js');

module.exports.createProducts = async (req, res) => {
    try {
        let { name, price, discount } = req.body;

        // Extract colors from the uploaded image
        const colors = await getColors(req.file.buffer, req.file.mimetype);
        const hexColors = colors.map(color => color.hex());

        // Set the background color, text color, and panel color
        const bgColor = hexColors[0]; // Use the first color as the background color
        const textColor = (parseInt(bgColor.slice(1), 16) > 0xFFFFFF / 2) ? '#000000' : '#FFFFFF'; // Simple brightness check
        const panelColor = hexColors[1] || '#CCCCCC'; // Fallback to gray if not enough colors
        const hoverColor = darkenColor(panelColor, 0.2); // Darken the panel color by 20%
        
        // Create the product with extracted colors
        let product = await productModel.create({
            name,
            image: req.file.buffer,
            price,
            discount,
            bgColor,
            panelColor,
            textColor,
            hoverColor
        });

        req.flash("success", "Product created successfully!!");
        return res.redirect("/owners/admin");
    } 
    catch (error) {
        console.error(error); // Log the error for debugging
        res.send(error.message);
    }
};