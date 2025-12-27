export interface HTTPServer {
  start: () => void;
  stop: () => Promise<void>;
  setHealthCheckRoutes: () => void;
}
