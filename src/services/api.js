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

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/api/usuarios`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        // The API returns { 0: user, 1: user, ..., total: X }
        // We convert it to an array
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

export const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x500';
    return `${API_URL}/img/products/${imagePath}`;
};
