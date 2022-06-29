const HOST_BACKEND = process.env.HOST_BACKEND || "http://localhost:3000";
const PORT = process.env.PORT || 3001;

console.log(HOST_BACKEND);
console.log(PORT);

export default {
    HOST_BACKEND,
    PORT
};
