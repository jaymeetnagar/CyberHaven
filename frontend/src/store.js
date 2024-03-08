const userData = {
    isAuthenticated: false,
    isAdmin: false,
    name: '',
    email: '',
}

const updateUserData = (data) => {
    const {isAuthenticated, isAdmin, name, email} = data;
    if(isAuthenticated !== undefined) userData.isAuthenticated = isAuthenticated;
    if(isAdmin !== undefined) userData.isAdmin = isAdmin;
    if(name !== undefined) userData.name = name;
    if(email !== undefined) userData.email = email;
}

export {userData, updateUserData};