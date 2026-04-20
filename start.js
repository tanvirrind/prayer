import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const buildDir = join(process.cwd(), '.next', 'standalone', 'server.js');

// Check if build exists
if (!existsSync(buildDir)) {
  console.log('Build not found. Running build...');
  const build = spawn('npm', ['run', 'build'], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });

  build.on('close', (code) => {
    if (code !== 0) {
      console.error('Build failed');
      process.exit(1);
    }
    startServer();
  });
} else {
  startServer();
}

function startServer() {
  console.log('Starting server...');
  const server = spawn('node', ['.next/standalone/server.js'], {
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NODE_ENV: 'production',
      PORT: process.env.PORT || 3000,
      HOSTNAME: '0.0.0.0'
    },
    shell: process.platform === 'win32'
  });
  server.on('close', (code) => {
    process.exit(code);
  });
}
