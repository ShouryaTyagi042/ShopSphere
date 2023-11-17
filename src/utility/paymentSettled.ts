import Order from "../models/order";
import Seller from "../models/seller";
import "dotenv/config";


var cron = require('node-cron');
export const paymentSettled = cron.schedule('*/5 * * * *', async () => {
    try {
        var cursor = await Order.find({ paymentSettled: false })
        cursor.forEach(async (order) => {
            const products = order.products;
            products.forEach(async (product: any) => {
                const seller = await Seller.findOne({ email: product.seller })
                seller!.income += (product.price * product.quantity) * 0.8;
                await seller!.save();
            })
            order.paymentSettled = true;
            await order.save();
        })
    } catch (error) {

    }

});


