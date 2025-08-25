export default class Throttle {
  readyState: boolean;
  timeout: number;
  // Добавить silencer для элементов, что бы курсор отображался как неактивный/нельзя было выбрать элемент. Принимать должен массив или объект, накидывать сайленс стилями, все должно быть опционально

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
