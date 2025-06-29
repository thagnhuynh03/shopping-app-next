import { API_URL } from "../constants/api"

export const getProductImage = (productId: number) => {
    return `${API_URL}/images/products/${productId}.jpg`;
}

export const getProductImages = (productId: number) => {
    return [
        `${API_URL}/images/products/${productId}.jpg`,
        `${API_URL}/images/products/${productId}-1.jpg`,
        `${API_URL}/images/products/${productId}-2.jpg`,
        `${API_URL}/images/products/${productId}-3.jpg`
    ];
}