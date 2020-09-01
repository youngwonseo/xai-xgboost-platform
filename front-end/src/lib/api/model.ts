import axios from 'axios';


export const loadModel = () => axios.get(`/api/model`);