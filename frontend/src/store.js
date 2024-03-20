const userData = {
    isAuthenticated: false,
    isAdmin: false,
    name: "",
    email: "",
    userId: ""
}

const updateUserData = (data) => {
    const { isAuthenticated, user } = data;
    if (isAuthenticated !== undefined) {
        userData.isAuthenticated = isAuthenticated;
        if (!isAuthenticated) {
            userData.isAdmin = false;
            userData.name = "";
            userData.email = "";
            userData.userId = "";
            return;
        }
    }
    const { isAdmin, name, email, userId } = user;
    if (isAdmin !== undefined) userData.isAdmin = isAdmin;
    if (name !== undefined) userData.name = name;
    if (email !== undefined) userData.email = email;
    if (userId !== undefined) userData.userId = userId;
}

const getUserData = () => {
    return userData;
}

export { getUserData, updateUserData };