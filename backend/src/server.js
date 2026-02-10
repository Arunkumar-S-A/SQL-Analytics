import app from "./app.js";

const PORT = process.env.PORT || 5000;
console.log("DB_USER =", process.env.DB_USER);

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
