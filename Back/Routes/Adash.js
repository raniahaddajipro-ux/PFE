import express from 'express';
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json({
     stats: {
      energy: {
        value: 2847,
        unit: "kWh",
        change: 12,
        trend: "down"
      },
      temperature: {
        value: 22.5,
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
      { percentage: 60 },
      { percentage: 75 },
      { percentage: 55 },
      { percentage: 85 },
      { percentage: 70 },
      { percentage: 45 },
      { percentage: 30 },
    ],
  });
});

export default router;
