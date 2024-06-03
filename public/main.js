let carts = document.querySelectorAll('.add-cart'); //1

let products = [];

async function getProducts() {
    const response = await axios.get('http://localhost:5000/products');
    console.log(response.data);
    products = response.data.products

    populateProducts()
} 
getProducts();


function populateProducts() {
    const container = document.querySelector('.container');

    const productsHtml = products.map((product, i) => {
        return(
            `
            <div class="image">
                <img src="${product.image}" alt="${product.description}">
                <h3>${product.name}</h3>
                <h3>€${product.price}</h3>
                <a class="add-cart cart${i+1}" href="#">Add Cart</a>
                <input type="hidden" value="15">
            </div>
            
            `
        )
    })

    if(container) {
       container.innerHTML += productsHtml.toString().replaceAll(',', ' '); 
        addCartActions();
    }
}

/* 
let products = [      //7. Afegeix el nom dels productes com a objecte{} dins un array[]
    {
        name: 'camiseta Amarilla',    
        tag: 'camisetaAmarilla',
        price: 15,
        inCart: 0,
        image: '/images/camisetaAmarilla.jpg'
    },
    {
        name: 'mechero Cocina',
        tag: 'mecheroCocina',
        price: 5,
        inCart: 0
    },
    {
        name: 'poster ElsaEspanto',
        tag: 'posterElsaEspanto',
        price: 10,
        inCart: 0
    },
    {
        name: 'camiseta Blanca',
        tag: 'camisetaBlanca',
        price: 15,
        inCart: 0
    }

] */

function addCartActions() {
    const hoverProducts = document.getElementsByClassName('image');
    let carts = document.querySelectorAll('.add-cart');

    for(let i=0; i < hoverProducts.length; i++) {
        hoverProducts[i].addEventListener('mouseover', () => {
            carts[i].classList.add('showAddCart');
        })
        hoverProducts[i].addEventListener('mouseout', () => {
            carts[i].classList.remove('showAddCart');
        })    
    }

    for(let i=0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
            cartNumbers(products[i]);
            totalCost(products[i]);
        })
    }
}

for (let i=0; i < carts.length; i++) { //2
   carts[i].addEventListener('click', () => {
    cartNumbers(products[i]); //16.Afegim a dins el products[i] (per que abans no hi era) per a que distingeixi QUIN producte hem ficat a dins. El "products" ve de l'objecte 'let products'
     totalCost(products[i]); //a.2
    })   
}

function onLoadNumbers() {  //12.Quan refresquem la pàgina, el '.cart span' queda a 0 però en realitat el localStorage encara és ple, per això creem aquesta funció
    let productNumbers = localStorage.getItem('cartNumbers'); //13.Comprova el localStorage, 

    if(productNumbers) {   //14.Si existeix productNumbers, o sigui, si no és 0, iguala'l al carrito, que es reflexi
        document.querySelector('.cart span').textContent = productNumbers
    }


}


function cartNumbers(product) { //3
    //console.log("the product clicked is", product) 17.Fem el console.log i veiem l'objecte del producte que hem clicat
    let productNumbers = localStorage.getItem('cartNumbers'); //5 (guarda el localStorage a productNumbers)
    

    productNumbers = parseInt(productNumbers); //7b.el converteix en nḿero, abans era String
    if( productNumbers ) {  //8. si hi ha algun clicat, suma-li un al local Storage
        localStorage.setItem('cartNumbers', productNumbers + 1); //6.és la primera ordre de la funció, al principi l'escriu així: localStorage.setItem('cartNumbers', 1); que vol dir que guarda el localStorage, de moment un cop
        document.querySelector('.cart span').textContent = productNumbers + 1; //11. es veu reflexat en el carret
    } else {
        localStorage.setItem('cartNumbers', 1) //9.Si no n'hi ha cap clicat, afegeix l'1
        document.querySelector('.cart span').textContent = 1; //10.l'1 afegit es veu reflexat en el carret ".cart span"
    }

    setItems(product);



    
}

function setItems(product) { //18.Creem aquesta funció
    //console.log('my product is'), product 19.Per a comprovar que funciona quan clico a sobre del producte, mirar al console
    let cartItems = localStorage.getItem('productsInCart'); //25.Aquí es guarda lo clicat
    cartItems = JSON.parse(cartItems); //27.L'he de passar de JSON a JavaScript Object
    //console.log("My CartItems are", cartItems);//26.comprovem que existeix, que s'ha guardat

    if(cartItems != null) { //28.Fem el if statement [(cartItems != null) vol dir cartItems és una cosa que already exists]

        if(cartItems[product.tag] == undefined) { //31
            cartItems = {  //32
                ...cartItems,  //... = tot el que està al cartItems fins ara guarda-ho al [product.tag]:product
                [product.tag]: product
            }
        }
        
        cartItems[product.tag].inCart += 1; //29.Incrementa  (aquest i el pas 30, de moment només funciona quan cliques sempre a sobre del mateix producte, quan després de clicar a un producte, cliques a un altre producte que encara no has clicat, el Storage no reacciona. Ens fixem que diu el console, diu que l'objecte està undifined. Anem al pas 31.)
            //30.Afegeix l'else, que vol dir que product.inCart serà igualat a 1 quan el producte doesn't exist already
    } else {                //22.el products.inCart -que encara no està a dins de l'else- el puja a les primeres linees de la funció
        product.inCart = 1; //20.Igualem el products.inCart (que és el inCart que està a l'objecte) = 1, si clica a sobre del producte (primer ho fa a fora de l'else i el if, directament a sota de la funció principal function setItems(product))
        cartItems = {     //fa això per afegint un let o sigui, fa: let carrItems = { [product.tag]: product }
            [product.tag]: product
        }                  //23.ara, si mirem al localStorage, veiem que al clicar a sobre de un producte, a sote de "key" posa "productsInCart" i a sota de value "[object:object]", per a que no passi això, per a que pugui "traduir" l'objecte, fem //24.
    }


    
                                            //21.localStorage.setItem("prductsInCart") i llavors va al 22
                                            //24.hem de fer JSON.stringify(cartItems).Ara si cliquem al producte, al Storage veurem que posa inCart: 1, està bé, però si tornem a clicar, el nou se sobreescriu i segueix posant inCart:1
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}   





function totalCost(product) { //a.1//calcular total costs
   // console.log("the product is", product.price); //a.3
   let cartCost = localStorage.getItem("totalCost"); //a.5 Aquí queda guardat el total Cost inicial, o sigui, sense sumar encara
    // console.log("My cartCost is", cartCost); //a.6 Mirem el consol
   // console.log(typeof cartCost); //a.7 ens dona string
   
   if(cartCost != null) { //A.9 posem a dins d'aquest funció el A.8
    cartCost = parseInt(cartCost); //A.8 Converteix el String en número
    localStorage.setItem("totalCost", cartCost + product.price) //A10 Queda a dins del total Cost la suma dels preus
   } else {  //A11 Posem a dins de l'else el punt a.4
    localStorage.setItem("totalCost", product.price); //a.4 primer creem el concepte totalCost per al LocalStorage
   }
   
   
   

    




}


function displayCart() { //B1 Creem la funció i la posem abaix de tot, perquè així funcionarà sempre que carreguem la pàgina
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems); // ho converteix de JSON A JAVASCRIPT
    let productContainer = document.querySelector(".products-container") //B3
    let cartCost = localStorage.getItem("totalCost"); //B11
    //console.log(cartItems); B2
    if(cartItems && productContainer) { //B4 Si existeixen aquests dos elements en la pàgina, amb altres paraules: si estic a la pàgina de la cart i si s'han seleccionat productes
        console.log("running"); //b5 comprovar
        productContainer.innerHTML = ''; //B6 per a que quan es carregui la pàgina, si ja hi ha alguna cosa, que quedi buida
        Object.values(cartItems).map(item => { //B7 To loop thrue to all of these (all the values of objects seleccionats, )
        
            productContainer.innerHTML += `        
              <div class="productincart"> 
                    <ion-icon name="close-outline"></ion-icon>
                    <img src="./images/${item.tag}.jpg">
                    <span>${item.name}</span>
              </div>
              <div class="price">$${item.price},00</div>
              <div class="quantity"></div>
                    <ion-icon class="decrease" name="chevron-back-circle-outline"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon class="increase" name="chevron-forward-circle-outline"></ion-icon>
              </div>
              <div class="total">
                €${item.inCart * item.price},00
              </div>
            `             //B8 Aquest afegeix productes, i es posen les comes aquestes rares
                        //B9 Afegim el dic i copiem el ion-icon que hem buscat a la pàgina ion icon amb el nom de close i és una creu de tancar, el nom de la classe del icon el posem nosaltres
        });              ////el nom de la classe l'he canviat per a poder estilitzar-lo millor
                    //B10: ara fem el productContainer.innerHTML
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                €${cartCost},00
                </h4>
        `; 
    }     //Abans d'acabar el B10, abans de posar cartCost entre claus, s'ha de fer el B11, que és un copiar/pegar

}

onLoadNumbers(); //15.We call the function, criquem la funció per a que funcioni
displayCart(); 

