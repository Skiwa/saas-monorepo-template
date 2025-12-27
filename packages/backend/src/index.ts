import { DIContainer } from './config/dependency-injections/container.js';
import { initRealDiContainer } from './config/dependency-injections/init-real-di-container.js';

let container: DIContainer | undefined;
try {
  container = initRealDiContainer();
  container.start();
} catch (error) {
  console.error('🐞 Application failed to start: ', error);
  if (container) {
    void container.stop();
  }
}
