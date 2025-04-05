

//const { application } = require("express");




stage = 'prod';


const host = stage === 'dev' ? 'http://localhost:5000' : 'https://sellofantasma.click';

var stripe = Stripe('pk_live_51PTnDIP1Y1vW4zcv0tWZibKrJlsVX3JCql6GvXkjkASPdui3qwddp0ZRXHL1SNFZR3HK0uHxeyb7ajO0jvhtBAfM00XV1gMdS4');
//const stripe = stripe('pk_test_51PQw3sRv95aQ9SubAwO6r6I1gsn10tKa14BnSG4Ew1E5IdoSctoIZLeDt9K8olWuyRLMJT7w4jVbFpitiuhQuZlh00oDQy6OL7');

const startCheckout = document.getElementById('startCheckout');

startCheckout.addEventListener('click', () => {
    console.log(stripe);
    startCheckout.textContent = "processing...";
    buyProducts(myProducts())

});

 function myProducts() {
    const getProducts = JSON.parse(localStorage.getItem('productsInCart'));

    const products = [];

    //console.log(getProducts);
    for( const property in getProducts){
        products.push({
            tag: getProducts[property].tag,
            inCart: getProducts[property].inCart

        })
    }

    return products;
}

async function buyProducts(cartProducts) {
    try {

        const body = JSON.stringify({
            products: cartProducts 

        })
                                                    

        const response = await axios.post(`${host}/checkout`, body, {    //això (el response) és una request to the backend, per a fer això és necessari el await i, si fem await, hem de fer async
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })

        console.log(response.data);

        localStorage.setItem('sessionId', response.data.session.id)

        await stripe.redirectToCheckout({
            sessionId: response.data.session.id
        })

    } catch (error) {
        console.log(error);
    }

} 