import { API_KEYS } from "../apiUrls";
import { toast } from "react-hot-toast";

export const connectToSparkBackend = async () => {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${API_KEYS.BIN_ID}/latest`, {
            method: "GET",
            headers: {
                "X-Master-Key": API_KEYS.API_KEY,
            },
        });
        const data = await response.json();
        const record = data.record;
        const spark_url = record?.spark_url;
        return "http://" + spark_url;
    } catch (error) {
        throw new Error("Error connecting to Spark");
    }
};

export const trainModel = async (sparkUrl, user_id) => {
    try {
        const response = await fetch(`${sparkUrl}/train?user_id=${encodeURIComponent(user_id)}`, {
            method: "GET",
        });
        const data = await response.json();
        console.log(data);
        if (data.error) {
            toast.error(data.error);
            return data;
            // throw new Error(data.error);
        }
        return data;
    } catch (error) {
        return error;
        // throw new Error(`Training failed: ${error.message}`);
    }
};

export const updateDataset = async (sparkUrl, messages, labels) => {
    console.log(messages, labels);
    try {
        const response = await fetch(`${sparkUrl}/update-dataset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages, label: labels }),
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        throw new Error(`Dataset update failed: ${error.message}`);
    }
};

// Predict using the trained model
export const predictMessages = async (sparkUrl, messages) => {
    try {
        const msg = JSON.stringify({ messages });

        const response = await fetch(`${sparkUrl}/predict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: msg,
        });

        console.log("Response status:", response.status);

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }
        return data.predictions;
    } catch (error) {
        throw new Error(`Prediction failed: ${error.message}`);
    }
};

