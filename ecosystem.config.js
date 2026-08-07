const path = require("node:path");

const rootDirectory = __dirname;

/**
 * PM2 configuration for a single Linux/VPS host.
 *
 * Secrets stay in the ignored frontend/.env.production.local and cms/.env
 * files (or the service user's environment); do not add them here. One
 * frontend instance is intentional: the current Next.js tag cache is local to
 * a process.
 */
const common = {
  args: "run start",
  autorestart: true,
  exec_mode: "fork",
  instances: 1,
  interpreter: "none",
  kill_timeout: 10_000,
  max_restarts: 10,
  merge_logs: true,
  min_uptime: "10s",
  restart_delay: 5_000,
  script: "npm",
  time: true,
  watch: false,
};

module.exports = {
  apps: [
    {
      ...common,
      name: "jr-compliance-frontend",
      cwd: path.join(rootDirectory, "frontend"),
      // Next defaults to 0.0.0.0. Nginx is the only public entry point.
      args: "run start -- --hostname 127.0.0.1",
      env: {
        NODE_ENV: "production",
        PORT: "8123",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: "8123",
      },
    },
    {
      ...common,
      name: "jr-compliance-cms",
      cwd: path.join(rootDirectory, "cms"),
      env: {
        HOST: "127.0.0.1",
        NODE_ENV: "production",
        PORT: "1337",
      },
      env_production: {
        HOST: "127.0.0.1",
        NODE_ENV: "production",
        PORT: "1337",
      },
    },
  ],
};
