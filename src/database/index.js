import mongoose from "mongoose";

export const connectToDatabase = async () => {
	
	const url = process.env.MONGODB_URI;

    mongoose
		.connect(url)
		.then(() => console.log("Connected to Db"))
		.catch((err) => console.log("DB Error", err));
};
