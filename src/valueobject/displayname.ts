export class DisplayName {
  readonly value: string;
  constructor(value: string) {
    if (!value.trim()) throw new Error("DisplayName is empty");
    this.value = value;
  }
}
