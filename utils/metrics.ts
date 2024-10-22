export class Metrics {
  static requestCount = 0;
  static errorCount = 0;
  static totalProcessingTime = 0;

  static incrementRequest = () => {
    this.requestCount += 1;
  };

  static incrementError = () => {
    this.errorCount += 1;
  };

  static addProcessingTime = (time: number) => {
    this.totalProcessingTime += time;
  };

  static getMetrics = () => ({
    requestCount: this.requestCount,
    errorCount: this.errorCount,
    averageProcessingTime: this.requestCount
      ? this.totalProcessingTime / this.requestCount
      : 0,
  });
}
