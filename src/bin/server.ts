import { config as dotenv } from 'dotenv';
import App from '../main/app';

dotenv();

const port = process.env.PORT || 3000;
const { app } = new App();
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});