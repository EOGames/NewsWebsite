import axios from 'axios';
const backendurl = `http://localhost:5000`
const Api = ()=>
{
   return axios.create({
     baseURL: backendurl+'/api'
   });
}
export default Api;
    