
import mongoose from "mongoose";

const logSchema = new mongoose.Schema({

    message: {
        type: String,
        required: true,
    },

    origin: {
        type: String,
    },

    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
    },

    createdAt: {
        type: Date,
        default: new Date()
    },
});

// Log: Model name
// mongoose pondra el nombre en plural por defecto
// en este caso sera: 'logs'
export const LogModel = mongoose.model('Log',logSchema);