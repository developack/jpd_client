export const JP_PRODUCTION = false
export let BASE_API_URL = "http://localhost:8000/api"
export let SERVER_BASE_URL = "http://localhost:8000"

if (JP_PRODUCTION){
    BASE_API_URL = "http://localhost:8080/api"
    SERVER_BASE_URL = "http://localhost:8080"
}