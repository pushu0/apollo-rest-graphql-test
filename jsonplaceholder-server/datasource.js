import { RESTDataSource } from 'apollo-datasource-rest';

export class JsonPlaceholderAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://jsonplaceholder.typicode.com';
  }
  async getAllUsers() {    
    return this.get('users');
  }
  async getUser(id) {    
    return this.get(`users/${id}`)        
  }
  async editUser(id, name, email, company) {  
    return this.patch(`users/${id}`, {id, name, email, company:{name : company}})
  }
};