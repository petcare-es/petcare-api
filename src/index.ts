import 'express-async-errors';
import express from 'express';
import env from "env";
import routes from 'routes';
import handleError from 'middleware/errorHandle';

const app = express();

app.use(express.json());
app.use(routes);
app.use(handleError);

app.get("/hi", (resquest, response) => {
    response.status(200).json({
        hello: "world"
    });
});

app.listen(env.SERVER_PORT, () => {
    console.log(`Server is running on port ${env.SERVER_PORT} 🚀`);
});
  