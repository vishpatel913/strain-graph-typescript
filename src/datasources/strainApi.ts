import { RESTDataSource } from "apollo-datasource-rest";
import { SearchKey, GetKey } from "./types";

class StrainAPI extends RESTDataSource {
  get baseURL() {
    if (this.context.token) return `https://strainapi.evanbusse.com/${this.context.token}/`;
    else return "https://strainapi.evanbusse.com/DhMA9db/";
  }

  // willSendRequest(request: RequestOptions) {
  //   request.headers.set("Authorization", this.context.token);
  // }

  async getAllStrains() {
    return this.get("strains/search/all");
  }

  async searchStrainsByKeyValue(key: SearchKey, value: string) {
    return this.get(`strains/search/${key}/${value}`);
  }

  async getStrainDetailsById(key: GetKey, id: number) {
    return this.get(`strains/data/${key}/${id}`);
  }

  async getValuesByKey(key: GetKey) {
    return this.get(`searchdata/${key}`);
  }
}

export default StrainAPI;
