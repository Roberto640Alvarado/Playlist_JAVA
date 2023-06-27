import AuthServices from "../services/AuthServices";

const context = {
    login: (identifier, password) => {
        if (identifier.length === 0 && password === 0) return false;
    
        const asyncFetchUser = async (identifier, password) => {
        let response = await AuthServices.login(identifier, password);
        //console.log(response);
        let responseCode = await AuthServices.verifyToken(response.content);
        //console.log(responseCode);
        if (response.hasError) return false; //{ status: 400, code: null };
    
        if (localStorage.getItem("content")) {
            localStorage.removeItem("content");
            localStorage.removeItem("code");
            localStorage.removeItem("hasLoggedIn", false);
        }
    
        localStorage.setItem("content", response.content);
        localStorage.setItem("code", responseCode.content.code);
        localStorage.setItem("hasLoggedIn", "true");
    
            return responseCode.content.code; //{ status: response.status, code: responseCode.content.code };
        }
        
        return asyncFetchUser(identifier, password);
    },
    logout: function() {
        localStorage.removeItem("content");
        localStorage.removeItem("code");
        localStorage.removeItem("hasLoggedIn");
    },
    getToken: function() {
        //const content = localStorage.getItem("content");
        return localStorage.getItem("content");
    },
    getCode: () => {
        return localStorage.getItem("code");
    },
    isUserLogged: () => {
        return localStorage.getItem("hasLoggedIn")
    }
}
export default context;