const stripe = require('stripe')('sk_test_RBETXzuPgut6Ka5O91t2SF30002G14KCKS');
const { addStripeToken } = require('./db/index.js');

module.exports = async function (fastify) {


    // Takes in user id and auth code as params, saves user's Stripe account token to DB 
    // https://stripe.com/docs/connect/collect-then-transfer-guide
    fastify.get("/createConnect/:id/:code", (req, res) => {
        const code =  req.params.code

        stripe.oauth.token({
            grant_type: 'authorization_code',
            code
          }).then(
            (response) => {
              var connected_account_id = response.stripe_user_id;
              addStripeToken(req.params.id, connected_account_id)
            console.log(connected_account_id)
        })
        .catch(error => console.log(error))
    });
    
    // creates a payment intent from card form on front end, return client_secret key 
    // https://stripe.com/docs/payments/accept-a-payment
    //https://stripe.com/docs/connect/destination-charges
    fastify.post("/paymentIntent/:token", (req, res) => {
    stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        transfer_data: {
            destination: req.params.token,
        }
      })
      .then(reply => res.send(reply.client_secret))
      .catch(error => console.log(error));
    });



    // //create new stripe user
    // fastify.post("/create/:email", (req, res) => {
    //     let token 

    //     stripe.tokens.create(
    //         {
    //           account: {
    //             individual: {
    //               first_name: 'Jane',
    //               last_name: 'Doe',
    //             },
    //             tos_shown_and_accepted: true,
    //           }
    //         })
    //         .then(reply => token = reply,


    //     stripe.accounts.create(
    //         {
    //             type: 'custom',
    //             country: 'US',
    //             account_token: token,
    //             requested_capabilities: [
    //                 'card_payments',
    //                 'transfers',
    //             ],
    //         }))
    //         .then(customer => res.send(customer.id, console.log(token)))
    //         .catch(error => console.error(error));
         
            
    // });

    // //get stripe customer object
    // fastify.get("/:id", (req, res) => {
    //     stripe.customers.retrieve(
    //         req.params.id)
    //         .then(customer => res.send(customer))
    //         .catch(error => console.error(error));
    // });

    // //add bank account to customer
    // //production version would get params from req.body sent from client side
    // fastify.post("/sources/:id", (req, res) => {

    //     const params = {
    //         // mandatory
    //         object: "bank_account",
    //         country: "US",
    //         currency: "usd",
    //         account_number: '000123456789',
    //         // optional
    //         routing_number: '110000000', // 9 digits
    //         account_holder_name: 'Test holder name',
    //         account_holder_type: 'individual', // "company" or "individual"
    //     }



    //     stripe.customers.createSource(
    //         req.params.id,
    //         { source: params })
    //         .then(bank_account => res.send(bank_account))
    //         .catch(error => console.error(error));
    // });

    // // add debit card to customer
    // fastify.post("/payment_methods/:id", (req, res) => {
    //     stripe.paymentMethods.create(
    //         {
    //             type: 'card',
    //             card: {
    //                 number: '4242424242424242',
    //                 exp_month: 3,
    //                 exp_year: 2021,
    //                 cvc: '314',
    //             },
    //         })
    //         .then(reply => {
    //             stripe.paymentMethods.attach(
    //                 reply.id,
    //                 { customer: req.params.id })
    //         })
    //         .then(reply => res.send(reply))
    //         .catch(error => console.error(error));
    // });



    // //charge a user

    // fastify.post("/charges/:id", (req, res) => {
    //     stripe.paymentIntents.create({
    //         amount: 1500,
    //         currency: "usd",
    //         payment_method: 'pm_1GObajLgXzPaa7GgY1G7dbaL',
    //         customer: req.params.id
    //     })
    //         .then(reply => {
    //             stripe.paymentIntents.confirm(
    //                 reply.id,
    //                 { payment_method: 'pm_1GObajLgXzPaa7GgY1G7dbaL' })
    //         })
    //         .catch(error => console.error(error));
    // })


    // //create a payout (user to lot owner)
    // // ba_1GOEIMLgXzPaa7GgZc0cPNYE

    // fastify.post('/payouts/:bank_token', (req, res) => {
    //     stripe.payouts.create(
    //         {
    //             amount: 1500, currency: 'usd',
    //             destination: 'acct_1GQOG6JK5VmgCRcs'
    //         })
    // })


    // fastify.post('/transfers/', (req, res) => {
    //     stripe.transfers.create(
    //         {
    //             amount: 1000, currency: 'usd',
    //             destination: 'cus_Gx7grbjy3Pubzs'
    //         })
    // })
 
};