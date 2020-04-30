import axios from'axios';

const api =axios.create({baseURL:'https://apprestmoob.herokuapp.com'});

export default api;