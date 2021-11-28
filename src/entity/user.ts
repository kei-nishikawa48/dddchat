import { DisplayName } from "../valueobject/displayname";

export default class User {
  id: string;
  name: DisplayName;
  constructor(name: string, id: string) {//認証が終わっている再構築用
    this.name = new DisplayName(name);
    this.id = id;
  }
}
