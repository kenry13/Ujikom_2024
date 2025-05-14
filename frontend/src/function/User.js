import configaxios from "./ConfigAxios.js";

export default class UserFunction {

    constructor(user,setUser){
        this.user = user;
        this.setUser = setUser;
    }

    checkMsg(response) {
        const msg = response.data.msg;
        if (msg === "dangerToken" && this.setUser) {
            this.setUser(false);
            return false;
        };
        if (msg !== "success") {
            alert(msg);
            return false;
        }
        return true;
    }

    async get() {
        const response = await configaxios.get(`/api/user`);
        if (this.checkMsg(response)) {
            this.setUser(response.data.data);
        }
        return response.data.data;
    }

    async remove() {
        const response = await configaxios.get(`/api/logout`);
        this.setUser(false);
        return response.data.data;
    }

}