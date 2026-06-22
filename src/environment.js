let IS_PROD = true;

const server = IS_PROD ? import.meta.env.VITE_BACKEND_SERVICE : "http://localhost:9000"

export default server;