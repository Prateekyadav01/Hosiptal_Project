import mongoose from 'mongoose';



const paymentSchema = new mongoose.Schema(
    {
        payment_id: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: [true, 'amount is required']
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }, {
    timestamps: true
})


export const Payment = mongoose.model("Payment", paymentSchema);