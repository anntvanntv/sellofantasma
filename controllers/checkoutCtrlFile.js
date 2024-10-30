const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { productList } = require('../products');
const Email = require('../utils/email');

exports.checkoutCtrlFunction = async (req, res) => {
    try {
        console.log(req.body.products);

        const productsFromFrontend = req.body.products;
         console.log(productList);

          function productsToBuy() {
            let products = [];

            productList.forEach( singleProductList => {
                productsFromFrontend.forEach(singleProductFrontend => {
                    if(singleProductList.tag === singleProductFrontend.tag) {
                        products.push({
                            /* name: singleProductList.name,
                            description: singleProductList.description,
                            images: [singleProductList.image],
                            amount: singleProductList.price * 100,
                            currency: 'eur', */
                            quantity:  singleProductFrontend.inCart, 
                            price_data: {
                                currency: 'eur',
                                unit_amount: singleProductList.price * 100,
                                product_data: {
                                    name: singleProductList.name,
                                    description: singleProductList.description,
                                    images: [singleProductList.image],
                                },
                                
                             },
                        })
                    }
                    })
                

            })
            return products;

         }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${req.protocol}://${req.get('host')}/checkout/success`,
            cancel_url: `${req.protocol}://${req.get('host')}/cart`,
            shipping_address_collection: {
                allowed_countries: ['ES', 'DE', 'FR', 'GB', 'DK', 'IT']
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 500,
                            currency: 'eur',
                        },
                        display_name: 'Gastos de envío',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 3,
                            },                      
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },    
            ],
            line_items: productsToBuy(),
            mode: 'payment',

        });
        

        res.status(200).json({
            status: "success",
            session: session
        })
    } catch (error) {
        console.log(error);
    }
}


exports.cartSuccessFunction = (req, res) => {
    res.render('thankyouPage');
} 

exports.finishOrder = async (req, res) => {
 const session = await stripe.checkout.sessions.retrieve(
    req.params.id
  )


//   console.log("my payment was: ");
//   console.log(session);

  if(session.payment_status === "paid"){
   

    await new Email({
        name: session.shipping_details.name,
        email: session.customer_details.email,

    }, session.amount_subtotal, session.amount_total).sendThankYou();


    return res.status(200).json({
        success: true
    })
  }

  res.status(200).json({
    success: false
  })
  
}



