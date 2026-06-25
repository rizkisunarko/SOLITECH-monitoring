import express from 'express';
import cors from 'cors';
import si from 'systeminformation';

const app = express();
const PORT = 5000;

// Enable CORS for all origins so that both localhost frontend and Vercel production can fetch it
app.use(cors({
  origin: '*'
}));

// Route to get real-time hardware status
app.get('/api/hardware', async (req, res) => {
  try {
    // 1. Query system information in parallel for optimal performance
    const [cpu, cpuTemp, mem, graphics, fs, battery, os] = await Promise.all([
      si.cpu(),
      si.cpuTemperature(),
      si.mem(),
      si.graphics(),
      si.fsSize(),
      si.battery(),
      si.osInfo()
    ]);

    // 2. Process CPU data (fallback if temperature sensor is unavailable)
    const cpuBrand = cpu.brand || 'Processor';
    const cpuTempCurrent = (cpuTemp.main && cpuTemp.main > 0) ? Math.round(cpuTemp.main) : 45;

    // 3. Process CPU load (real-time load calculation)
    const currentLoad = await si.currentLoad();
    const cpuLoadPercent = Math.round(currentLoad.currentLoad || 15);

    // 4. Process GPU data (get primary GPU, handle fallback)
    const primaryGpu = graphics.controllers && graphics.controllers[0]
      ? graphics.controllers[0]
      : { model: 'Graphics Card', temperatureGpu: null, utilizationGpu: null };
    
    const gpuName = primaryGpu.model || 'Graphics Card';
    const gpuTempCurrent = (primaryGpu.temperatureGpu && primaryGpu.temperatureGpu > 0) 
      ? Math.round(primaryGpu.temperatureGpu) 
      : 55;
    const gpuLoadPercent = (primaryGpu.utilizationGpu !== null && primaryGpu.utilizationGpu !== undefined) 
      ? Math.round(primaryGpu.utilizationGpu) 
      : Math.round(cpuLoadPercent * 0.8); // fallback load based on CPU if not readable

    // 5. Process RAM data (convert bytes to GB)
    const ramTotalGB = Math.round(mem.total / (1024 * 1024 * 1024));
    const ramUsedGB = Number((mem.active / (1024 * 1024 * 1024)).toFixed(1));
    const ramUsedPercent = Math.round((mem.active / mem.total) * 100);

    // 6. Process SSD/HDD data (main storage drive)
    const mainFs = fs && fs[0] ? fs[0] : { size: 512 * 1024 * 1024 * 1024, used: 256 * 1024 * 1024 * 1024, use: 50 };
    const ssdTotalGB = Math.round(mainFs.size / (1024 * 1024 * 1024));
    const ssdUsedGB = Math.round(mainFs.used / (1024 * 1024 * 1024));
    const ssdUsedPercent = Math.round(mainFs.use || 50);

    // 7. Process Battery data (handle desktop PCs with no battery)
    const hasBattery = battery.hasBattery || false;
    const batteryPercent = hasBattery ? Math.round(battery.percent) : 100;
    const isCharging = hasBattery ? battery.isCharging : true;

    // 8. System hostname
    const hostname = os.hostname || 'Local PC';

    console.log(`[${new Date().toLocaleTimeString()}] Fetch request processed for: ${hostname}`);

    // Send JSON response
    res.json({
      online: true,
      hostname,
      cpu: {
        name: cpuBrand,
        temp: cpuTempCurrent,
        load: cpuLoadPercent
      },
      gpu: {
        name: gpuName,
        temp: gpuTempCurrent,
        load: gpuLoadPercent
      },
      ram: {
        used: ramUsedGB,
        total: ramTotalGB,
        percent: ramUsedPercent
      },
      ssd: {
        used: ssdUsedGB,
        total: ssdTotalGB,
        percent: ssdUsedPercent
      },
      battery: {
        hasBattery,
        percent: batteryPercent,
        isCharging
      }
    });
  } catch (error) {
    console.error('Error fetching hardware statistics:', error);
    res.status(500).json({ error: 'Failed to retrieve hardware metrics' });
  }
});

app.listen(PORT, () => {
  console.log('===================================================');
  console.log(`SOLITECH Hardware Monitoring Agent is running!`);
  console.log(`Endpoint: http://localhost:${PORT}/api/hardware`);
  console.log('===================================================');
});
