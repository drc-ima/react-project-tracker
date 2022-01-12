export default {
    setToken(token){
        localStorage.setItem('token', token);
    },

    getToken()
    {
        return localStorage.getItem('token');
    },

    setAuth(auth) {
        return localStorage.setItem('auth', auth);
    },

    getAuth(){
        return localStorage.getItem('auth');
    },

    setUser(user){
        return localStorage.setItem('user', user);
    },

    getUser(){
        return localStorage.getItem('user');
    },

    logout(){
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
}