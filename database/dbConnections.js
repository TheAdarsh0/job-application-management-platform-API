import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose
    .connect(process.env.MONGO_URL, {
        dbName: "MERN_STACK_JOB_SEEKING",
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((err) => {
        console.error(`Some error occurred while connecting to the database: ${err}`);
    });
};
