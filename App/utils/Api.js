const URL = "http://<your-server-url>";

// Funções para Usuários
export const createUser = async (userData) => {
    const response = await fetch(`${URL}/usuarios/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const loginUser = async (email, password) => {
    const response = await fetch(`${URL}/usuarios/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
};

export const updateUser = async (userId, userData) => {
    const response = await fetch(`${URL}/usuarios/update/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const deleteUser = async (userId) => {
    const response = await fetch(`${URL}/usuarios/delete/${userId}`, {
        method: 'DELETE',
    });
    return response.json();
};

// Funções para Reports
export const createReport = async (reportData) => {
    const response = await fetch(`${URL}/reports/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
    });
    return response.json();
};

export const listReports = async () => {
    const response = await fetch(`${URL}/reports/list`);
    return response.json();
};

export const getReportById = async (id) => {
    const response = await fetch(`${URL}/reports/get/${id}`);
    return response.json();
};

export const getReportsByUser = async (userId) => {
    const response = await fetch(`${URL}/reports/get_by_user/${userId}`);
    return response.json();
};

export const updateReport = async (id, reportData) => {
    const response = await fetch(`${URL}/reports/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
    });
    return response.json();
};

export const deleteReport = async (id) => {
    const response = await fetch(`${URL}/reports/delete/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};

// Funções para Petições
export const createPetition = async (petitionData) => {
    const response = await fetch(`${URL}/peticoes/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(petitionData),
    });
    return response.json();
};

export const listPetitions = async () => {
    const response = await fetch(`${URL}/peticoes/list`);
    return response.json();
};

export const getPetitionById = async (id) => {
    const response = await fetch(`${URL}/peticoes/get/${id}`);
    return response.json();
};

export const getPetitionsByUser = async (userId) => {
    const response = await fetch(`${URL}/peticoes/get_by_user/${userId}`);
    return response.json();
};

export const updatePetition = async (id, petitionData) => {
    const response = await fetch(`${URL}/peticoes/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(petitionData),
    });
    return response.json();
};

export const deletePetition = async (id) => {
    const response = await fetch(`${URL}/peticoes/delete/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};
