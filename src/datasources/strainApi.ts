import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { SearchKey, GetKey } from "./types";

class StrainAPI extends RESTDataSource {
  baseURL = "https://strainapi.evanbusse.com/";

  async resolveURL(request: RequestOptions) {
    const token = await this.context.token;
    if (!this.baseURL?.includes(token)) {
      this.baseURL += `${token}/`;
    }
    return super.resolveURL(request);
  }

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
