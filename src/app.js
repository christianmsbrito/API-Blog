const cors = require('@koa/cors');
const bodyParser = require('koa-body');
const Koa = require('koa');
const morgan = require('koa-morgan');
const routes = require('./routes/index.route');

class AppController {
    constructor(env) {
        this.env = env;
        this.koa = new Koa();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        if (this.envx !== 'PRODUCTION') {
            this.koa.use(morgan('dev'));
        }

        this.koa.use(cors());
        this.koa.use(bodyParser({ extended: false }));
    }

    routes () {
        routes.load(this.koa);
    }
}

module.exports = env => new AppController(env).koa;