const express = require('express');
const cors = require('cors');
const therapistRoutes = require('./routes/therapistRoutes');
const clientRoutes = require('./routes/clientRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use('/therapists', therapistRoutes);
app.use('/clients', clientRoutes);
app.use('/sessions', sessionRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));

// Test the Vercel
app.get("/", (req, res) => {
	res.send("You succeeded to deploy backend to Vercel!");
});