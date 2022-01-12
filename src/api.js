import axios from 'axios';
import config from './config';

// normal axios

const ax = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type' : "application/json"
    }
});

const authAxios = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type':"application/json",
        'Authorization': `Token ${config.getToken()}`
    }
});


export const signup = (data) => {
    return ax.post('/user/signup/', data);
};

export const signin = (data) => {
    return ax.post('/user/login/', data);
}

export default {
    clients(){
        return authAxios.get('/clients/');
    },

    addClient(data){
        return authAxios.post('/clients/', data);
    },

    client(id){
        return authAxios.get(`/clients/${id}/`);
    },

    updateClient(id, data){
        return authAxios.post(`/clients/${id}/`, data);
    },

    projects(){
        return authAxios.get('/projects/');
    },

    addProject(data){
        return authAxios.post('/projects/', data);
    },

    project(id){
        return authAxios.get(`/projects/${id}/`);
    },

    updateProject(id, data){
        return authAxios.post(`/projects/${id}/`, data);
    },

    checklists(projectId){
        return authAxios.get(`/projects/checklists/${projectId}/`);
    },

    addChecklist(projectId, data){
        return authAxios.post(`/projects/checklists/${projectId}/`, data);
    },

    updateChecklist(id, data) {
        return authAxios.put(`/projects/checklists/${id}/`, data);
    },

    milestones(projectId){
        return authAxios.get(`/projects/milestones/${projectId}/`);
    },

    addMilestone(projectId, data) {
        return authAxios.post(`/projects/milestones/${projectId}/`, data);
    },

    updateMilestone(id, data){
        return authAxios.put(`/projects/milestones/${id}/`, data);
    },

    milestoneFeatures(milestoneId){
        return authAxios.get(`/projects/milestones/features/${milestoneId}/`)
    },

    addMilestoneFeature(milestoneId, data) {
        return authAxios.post(`/projects/milestones/features/${milestoneId}/`, data);
    },
    updateMilestoneFeature(id, data){
        return authAxios.put(`/projects/milestones/features/${id}/`, data);
    }
};

