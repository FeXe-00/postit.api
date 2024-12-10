class ExceptionHandler {
    static instance;

    response = null;
    request = null;

    constructor() {
        if (ExceptionHandler.instance) {
            return ExceptionHandler.instance;
        }

        ExceptionHandler.instance = this;

        // Catch unhandled exceptions
        process.on('uncaughtException', (err) => {
            this.handleException('Uncaught Exception', err);
        });

        // Catch unhandled promise rejections
        process.on('unhandledRejection', (reason, promise) => {
            this.handleException('Unhandled Rejection', reason);
        });
    }

    appResponseControllers({ req, res }) {
        this.response = res;
        this.request = req;
    }

    handleException = (exception, error) => {
        console.log('exception', error);
        process.exit(1); // Exit the process
        // return { exception, error };
    };

    setResponse = (log) => {
        this.response.status(404).send({ status: 404, message: log });
        // console.table([
        //     this.response.statusCode,
        //     this.response.statusMessage,
        //     this.response.method,
        //     this.response.url,
        //     log,
        // ]);

        // const logs = {
        //     method: JSON.stringify(this.response.method),
        //     path: JSON.stringify(this.response.url),
        //     statusCode: JSON.stringify(this.response.statusCode) ?? 404,
        //     statusMessage: JSON.stringify(this.response.statusCode) ?? 404,
        //     log: log ?? 'No context info provided',
        // };
    };
}

module.exports = { ExceptionHandler };
