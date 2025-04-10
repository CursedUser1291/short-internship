import axios from "axios";

export const handleSubmit = async (
    mainValue: string,
    goalValue: string,
    userId: string,
    title: string,
    handleCloseModal: () => void,
    setUser: (user: any) => void
) => {
    try {
        const payload = {
            mainValue: parseFloat(mainValue),
            goal: parseFloat(goalValue),
            title,
            date: new Date().toISOString().split("T")[0],
            userId: userId
        };

        console.log(payload);

        const response = await axios.patch("http://localhost:8040/api/health-metrics", payload);

        if (response.status === 200) {
            console.log("Data saved successfully:", response.data);

            const metricsResponse = await axios.get(`http://localhost:8040/api/health-metrics/${userId}`);
            const fetchedMetrics = metricsResponse.data.user;
            localStorage.setItem("user", JSON.stringify(fetchedMetrics));

            setUser(fetchedMetrics);

            handleCloseModal();
        } else {
            console.error("Failed to save data");
        }
    } catch (error) {
        console.error("An error occurred while saving data:", error);
    }
};