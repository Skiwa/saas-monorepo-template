import { DIContainer } from './src/config/dependency-injections/container.js';
import { initRealDiContainer } from './src/config/dependency-injections/init-real-di-container.js';

let container: DIContainer | undefined;
try {
  container = initRealDiContainer();
  container.start();
} catch (error) {
  console.error('🐞 Application failed to start: ', error);
  if (container) {
    container.stop();
  }
}
