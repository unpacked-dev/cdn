//WEBSERVER
import { Application, Router, helpers } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from "https://deno.land/x/cors/mod.ts";

//Config
const port = 8000;
const app = new Application();
const router = new Router();

router.get('/cdn/:filename', async (ctx) => {
    const filename = ctx.params.filename.toLowerCase();
    const type = filename.split('.')[1];

    try {
        const file = await Deno.readFile(`./public/${filename}`);
        ctx.response.type = `text/${type}`;
        ctx.response.body = file;
        return;
    } catch(err) {
        ctx.response.status = 404;
        return;
    }
    
});

//Server
app.use(oakCors({ origin: "*" }));
app.use(router.routes());
app.use(router.allowedMethods());
 
app.addEventListener('listen', () => {
  console.log(`Listening on localhost:${port}`);
});

//Start Server
await app.listen({ port });