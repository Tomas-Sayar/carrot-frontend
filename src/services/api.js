const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/api/productos`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        return result.data; // The API returns { data, total }
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api/productos/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        return null;
    }
};

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/api/usuarios`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        const usersArray = Object.keys(result)
            .filter((key) => key !== 'total')
            .map((key) => result[key]);
        return usersArray;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/api/categorias`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        const categoriesArray = Object.keys(result)
            .filter((key) => key !== 'total')
            .map((key) => result[key]);
        return categoriesArray;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/api/usuarios/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) throw new Error('Login failed');
        return await response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/api/usuarios/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!response.ok) throw new Error('Registration failed');
        return await response.json();
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x500';
    return `${API_URL}/img/products/${imagePath}`;
};
