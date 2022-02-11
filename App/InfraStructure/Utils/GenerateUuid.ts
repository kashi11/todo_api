import { uuid } from "uuidv4"

export const generateId = (): string => {
    return uuid();
}