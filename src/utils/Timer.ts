/**
 *
 * Can't remember source 🙏🏽
 *
 */

class Timer {
  timerId: ReturnType<typeof setTimeout> | null = null;
  start?: number;
  remaining: number;
  cb: () => void;

  constructor(cb: () => void, delay: number) {
    this.remaining = delay;
    this.cb = cb;
    this.resume();
  }
  resume = () => {
    this.start = Date.now();
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(this.cb, this.remaining);
  };
  clear = () => {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
    }
  };
  pause = () => {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
    }
    if (this.start !== undefined) {
      this.remaining -= Date.now() - this.start;
    }
  };
}
export default Timer;
