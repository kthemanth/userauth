import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    imageURL: String,
    password: String,
})

const User = models.User || model('user', userSchema);

export default User;