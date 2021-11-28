export class Message {
  readonly value: string;
  constructor(value: string) {
    if (!value.trim()) throw new Error("message must not be empty");
    this.value = value;
  }
}
