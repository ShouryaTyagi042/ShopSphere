import Order from "../models/order";
import Product from "../models/product";
import "dotenv/config";
import User from "../models/user";


var cron = require('node-cron');
export const paymentSettled = cron.schedule('*/5 * * * *', async () => {
    try {
        var cursor = await Order.find({ paymentSettled: false })
        cursor.forEach(async (order) => {
            const products = order.products;
            products.forEach(async (product: any) => {
                const productInfo = await Product.findById(product.productId)
                const seller = await User.findOne({ email: productInfo?.seller })
                console.log(seller);
                seller!.balance += (product.price * product.quantity) * 0.8;
                console.log(seller?.balance);
                await seller!.save();
            })
            order.paymentSettled = true;
            await order.save();
        })
    } catch (error) {

    }

});


