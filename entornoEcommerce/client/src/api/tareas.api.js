import axios from 'axios';
export const getAllTareas = () =>
{
    return axios.get('http:://localhost:8000/tareas/api/v1/tareas/');
}