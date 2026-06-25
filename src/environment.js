let IS_PROD = false;

const server = IS_PROD ? import.meta.env.VITE_BACKEND_SERVICE : "http://localhost:9000"

export default server;