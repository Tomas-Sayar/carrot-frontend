const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/api/productos`);
        if (!response.ok)
            throw new Error(`Network response was not ok (${response.status})`);
        const result = await response.json();
        return result.data || result; // Handle both {data: []} and [] formats
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/api/usuarios`);
        if (!response.ok)
            throw new Error(`Network response was not ok (${response.status})`);
        const result = await response.json();
        // Handle array response directly or object with numeric keys
        if (Array.isArray(result)) return result;
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
        if (!response.ok)
            throw new Error(`Network response was not ok (${response.status})`);
        const result = await response.json();
        if (Array.isArray(result)) return result;
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
    // Si ya es una URL completa, devolverla directamente
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    return `${API_URL}/img/products/${imagePath}`;
};

// ==================== PRODUCTS CRUD ====================

export const createProduct = async (productData) => {
    try {
        const formData = new FormData();
        Object.keys(productData).forEach((key) => {
            if (
                productData[key] !== null &&
                productData[key] !== undefined &&
                productData[key] !== ''
            ) {
                formData.append(key, productData[key]);
            }
        });

        console.log('Sending product data to:', `${API_URL}/api/productos`);
        for (let [key, value] of formData.entries()) {
            console.log(
                `  ${key}:`,
                value instanceof File ? `File: ${value.name}` : value,
            );
        }

        const response = await fetch(`${API_URL}/api/productos`, {
            method: 'POST',
            body: formData,
        });

        const contentType = response.headers.get('content-type');
        let responseData;

        if (contentType && contentType.indexOf('application/json') !== -1) {
            responseData = await response.json();
        } else {
            const text = await response.text();
            console.error('Non-JSON response from backend:', text);
            throw new Error(
                `Server returned non-JSON response (${response.status}): ${text.substring(0, 50)}...`,
            );
        }

        if (!response.ok) {
            console.error('Backend error response:', responseData);
            throw new Error(
                responseData.message ||
                    responseData.error ||
                    responseData.msg ||
                    `Server error (${response.status})`,
            );
        }

        return responseData;
    } catch (error) {
        console.error('Error in createProduct:', error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const formData = new FormData();
        Object.keys(productData).forEach((key) => {
            if (
                productData[key] !== null &&
                productData[key] !== undefined &&
                productData[key] !== ''
            ) {
                formData.append(key, productData[key]);
            }
        });

        console.log('Updating product at:', `${API_URL}/api/productos/${id}`);

        const response = await fetch(`${API_URL}/api/productos/${id}`, {
            method: 'PUT',
            body: formData,
        });

        const contentType = response.headers.get('content-type');
        let responseData;

        if (contentType && contentType.indexOf('application/json') !== -1) {
            responseData = await response.json();
        } else {
            const text = await response.text();
            console.error('Non-JSON response from backend:', text);
            throw new Error(`Server error (${response.status})`);
        }

        if (!response.ok) {
            console.error('Backend error response:', responseData);
            throw new Error(
                responseData.message ||
                    responseData.error ||
                    responseData.msg ||
                    `Server error (${response.status})`,
            );
        }
        return responseData;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api/productos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete product');
        return await response.json();
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// ==================== USERS CRUD ====================

export const createUser = async (userData) => {
    try {
        const formData = new FormData();
        Object.keys(userData).forEach((key) => {
            if (
                userData[key] !== null &&
                userData[key] !== undefined &&
                userData[key] !== ''
            ) {
                formData.append(key, userData[key]);
            }
        });

        const response = await fetch(`${API_URL}/api/usuarios`, {
            method: 'POST',
            body: formData,
        });

        const contentType = response.headers.get('content-type');
        let responseData;

        if (contentType && contentType.indexOf('application/json') !== -1) {
            responseData = await response.json();
        } else {
            const text = await response.text();
            console.error('Non-JSON response from backend:', text);
            throw new Error(`Server error (${response.status})`);
        }

        if (!response.ok) {
            console.error('Backend error response:', responseData);
            throw new Error(
                responseData.message ||
                    responseData.error ||
                    responseData.msg ||
                    `Server error (${response.status})`,
            );
        }
        return responseData;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (id, userData) => {
    try {
        const formData = new FormData();
        Object.keys(userData).forEach((key) => {
            if (
                userData[key] !== null &&
                userData[key] !== undefined &&
                userData[key] !== ''
            ) {
                formData.append(key, userData[key]);
            }
        });

        const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
            method: 'PUT',
            body: formData,
        });

        const contentType = response.headers.get('content-type');
        let responseData;

        if (contentType && contentType.indexOf('application/json') !== -1) {
            responseData = await response.json();
        } else {
            const text = await response.text();
            console.error('Non-JSON response from backend:', text);
            throw new Error(`Server error (${response.status})`);
        }

        if (!response.ok) {
            console.error('Backend error response:', responseData);
            throw new Error(
                responseData.message ||
                    responseData.error ||
                    responseData.msg ||
                    `Server error (${response.status})`,
            );
        }
        return responseData;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete user');
        return await response.json();
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

// ==================== AUXILIARY DATA ====================

export const fetchBrands = async () => {
    try {
        const response = await fetch(`${API_URL}/api/brands`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        const brandsArray = Object.keys(result)
            .filter((key) => key !== 'total')
            .map((key) => result[key]);
        return brandsArray;
    } catch (error) {
        console.error('Error fetching brands:', error);
        return [];
    }
};

export const fetchTypes = async () => {
    try {
        const response = await fetch(`${API_URL}/api/types`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        const typesArray = Object.keys(result)
            .filter((key) => key !== 'total')
            .map((key) => result[key]);
        return typesArray;
    } catch (error) {
        console.error('Error fetching types:', error);
        return [];
    }
};
