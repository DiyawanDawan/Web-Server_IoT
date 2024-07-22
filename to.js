const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/v1/api/postData', (req, res) => {
    res.json({
        message: "Data post",
        data: { id: 1, name: "Post Data Example" }
    });
});

app.get('/v1/api/allDataSensors', (req, res) => {
    res.json({
        message: "All Data Sensors",
        data: [
            { id: 1, sensor: "Temperature", value: "25°C" },
            { id: 2, sensor: "Humidity", value: "60%" }
        ]
    });
});

app.get('/v1/api/allsPh', (req, res) => {
    res.json({
        message: "All pH Data",
        data: [
            { id: 1, value: 7.0 },
            { id: 2, value: 6.5 }
        ]
    });
});

app.get('/v1/api/allsNH3', (req, res) => {
    res.json({
        message: "All NH3 Data",
        data: [
            { id: 1, value: 0.5 },
            { id: 2, value: 0.3 }
        ]
    });
});

app.get('/v1/api/everage', (req, res) => {
    res.json({
        message: "Everage Data",
        data: { average: 5.6 }
    });
});

app.get('/v1/api/withday', (req, res) => {
    res.json({
        message: "Data with day",
        data: [
            { date: "2024-07-20", value: 4.5 },
            { date: "2024-07-21", value: 4.7 }
        ]
    });
});

app.get('/v1/api/rataratappmnhDays', (req, res) => {
    res.json({
        message: "Average PPM NH3 Days",
        data: { average: 0.4 }
    });
});

app.get('/v1/api/count', (req, res) => {
    res.json({
        message: "Count Data",
        data: { count: 10 }
    });
});

app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});
