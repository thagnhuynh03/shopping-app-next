import { API_URL } from "../constants/api"

export const getProductImage = (productId: number) => {
    return `${API_URL}/images/products/${productId}.jpeg`;
}