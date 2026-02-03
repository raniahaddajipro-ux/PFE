import express from 'express';
const router = express.Router();

router.get('/Pdashboard', (req, res) => {
  res.json({
     stats: {
      energy: {
        value: 28,
        unit: "kWh",
        change: 10,
        trend: "down"
      },
      temperature: {
        value: 12.5,
        unit: "°C",
        status: "Optimal"
      },
      activeStations: {
        current: 24,
        total: 32,
        percentage: 75
      },
      alerts: {
        count: 3,
        change: 2,
        trend: "up"
      }
    },
    iotDistribution: {
      lights: 50,
      ac: 37,
      others: 13,
      total: 32,
    },
    chartData: [
      { percentage: 90 },
      { percentage: 75 },
      { percentage: 15 },
      { percentage: 85 },
      { percentage: 80 },
      { percentage: 45 },
      { percentage: 0 },
    ],
  });
});

export default router;
