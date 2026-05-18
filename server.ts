import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API routes
  app.get("/api/system/status", (req, res) => {
    res.json({
      status: "STABLE",
      reactor: "OPTIMAL",
      temp: 42,
      ai_core: "ACTIVE",
      networking: "CONNECTED",
      satellite: "ESTABLISHED",
      last_sync: new Date().toISOString(),
    });
  });

  app.get("/api/robotics/diagnostics", (req, res) => {
    res.json({
      servos: [
        { id: "A1", status: "OK", load: 0.12 },
        { id: "A2", status: "OK", load: 0.45 },
        { id: "B1", status: "WARN", load: 0.88 },
        { id: "C1", status: "OK", load: 0.05 },
      ],
      mecha_sync: 0.98,
      neural_link: "STABLE",
    });
  });

  app.get("/api/aerospace/telemetry", (req, res) => {
    res.json({
      orbit: "GEOSTATIONARY",
      altitude: 35786,
      velocity: 3.07,
      fuel: 0.74,
      trajectory: "LOCK",
    });
  });

  // Knowledge Database Mock
  app.get("/api/knowledge", (req, res) => {
    res.json({
      categories: ["Robotics", "Aerospace", "Quantum Physics", "AI", "Cybernetics"],
      recent_discoveries: [
        { title: "Neuro-Sync Link v2", author: "Dr. Aris" },
        { title: "Dark Matter Propulsion", author: "Com. Thorne" },
      ]
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ENGINEER OS Server booting at http://localhost:${PORT}`);
  });
}

startServer();
