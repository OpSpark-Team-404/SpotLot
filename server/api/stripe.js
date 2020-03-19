const stripe = require('stripe')('sk_test_RBETXzuPgut6Ka5O91t2SF30002G14KCKS');

module.exports = async function (fastify) {

    // All APIs are under route here

    //create new stripe user
    fastify.post("/create/:email", (req, res) => {
        stripe.customers.create({
            email: req.params.email,
        })
            .then(customer => res.send(customer.id))
            .catch(error => console.error(error));
    });

    //get stripe customer object
    fastify.get("/:id", (req, res) => {
        stripe.customers.retrieve(
            req.params.id)
            .then(customer => res.send(customer))
            .catch(error => console.error(error));
    });

    //add bank account to customer
    //production version would get params from req.body sent from client side
    fastify.post("/sources/:id", (req, res) => {

        const params = {
            // mandatory
            object: "bank_account",
            country: "US",
            currency: "usd",
            account_number: '000123456789',
            // optional
            routing_number: '110000000', // 9 digits
            account_holder_name: 'Test holder name',
            account_holder_type: 'individual', // "company" or "individual"
        }



        stripe.customers.createSource(
            req.params.id,
            { source: params })
            .then( bank_account => res.send(bank_account))
            .catch(error => console.error(error));
    });

    //add debit card to customer
    // fastify.post("/payment_methods/:id", (req, res) => {
    //     stripe.paymentMethods.create(
    //         {
    //           type: 'card',
    //           card: {
    //             number: '4242424242424242',
    //             exp_month: 3,
    //             exp_year: 2021,
    //             cvc: '314',
    //           },
    //         })
    //         .then(reply => {
    //             stripe.paymentMethods.attach(
    //                 reply.id,
    //                 {customer: req.params.id})
    //         })
    //         .then(reply => res.send(reply))
    //         .catch(error => console.error(error));
    //     });
};