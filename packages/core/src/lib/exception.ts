export default class Exception extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Kserver Exception";
  }


}
