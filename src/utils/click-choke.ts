export default class ClickChoke {
  readyState: boolean;
  timeout: number;

  constructor(timeoutDuration: number) {
    this.readyState = true;
    this.timeout = timeoutDuration;
  }

  isReady() {
    return this.readyState;
  }

  triggerChoke() {
    this.readyState = false;
    setTimeout(() => {
      this.readyState = true;
    }, this.timeout);
  }
}
