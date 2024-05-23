// Data ppm yang diberikan dari berbagai pengukuran pada hari yang berbeda
const ppmMeasurements = [
    { "date": "2024-05-14", "value": 1.0 },
    { "date": "2024-05-15", "value": 1.3 },
    { "date": "2024-05-15", "value": 1.3 },
    { "date": "2024-06-14", "value": 1.1 }
];

// Fungsi untuk menghitung total ppm
const calculateTotalPPM = (measurements) => {
    let totalPPM = 0;
    measurements.forEach((measurement) => {
        totalPPM += measurement.value;
    });
    return totalPPM;
};

// Menghitung total ppm dari pengukuran yang diberikan
const totalPPM = calculateTotalPPM(ppmMeasurements);

console.log('Total PPM:', totalPPM);
const data = [
    {"sesotType": "NH3", "count": 34},
    {"sesotType": "PH", "count": 34},
]