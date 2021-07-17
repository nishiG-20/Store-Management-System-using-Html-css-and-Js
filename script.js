let Products = [
    { "prodcode": "PEP122", "prodname": "Pepsi", "price": 12, "category": "Food", "offer": "10%" },
    { "prodcode": "COK238", "prodname": "Coke", "price": 15, "category": "Food", "offer": "15%" },
    { "prodcode": "MIR411", "prodname": "Mirinda", "price": 30, "category": "Food", "offer": "20%" },
    { "prodcode": "RB0277", "prodname": "Red Bull", "price": 80, "category": "Food", "offer": "None" },
    { "prodcode": "LUX831", "prodname": "Lux", "price": 10, "category": "Soap", "offer": "15%" },
    { "prodcode": "DOV672", "prodname": "Dove", "price": 25, "category": "Soap", "offer": "20%" },
    { "prodcode": "DET810", "prodname": "Dettol", "price": 15, "category": "Soap", "offer": "None" },
    { "prodcode": "PAN590", "prodname": "Pantene", "price": 60, "category": "Shampoo", "offer": "None" },
    { "prodcode": "SUN677", "prodname": "Sunsilk", "price": 48, "category": "Shampoo", "offer": "15%" },
    { "prodcode": "GAR004", "prodname": "Garnier", "price": 75, "category": "Shampoo", "offer": "10%" }
]

let Orders = [
    { "custname": "Jack Smith", "mobile": "425361434", "location": "Sector 14", "slot": "12PM-2PM", "value": 72.6, "items": [{ "prodcode": "PEP122", "quantity": 2 }, { "prodcode": "COK238", "quantity": 4 }] },
    { "custname": "Mary Gomes", "mobile": "723476123", "location": "Sector 22", "slot": "4PM-6PM", "value": 130.60, "items": [{ "prodcode": "SUN677", "quantity": 2 }, { "prodcode": "LUX831", "quantity": 4 }, { "prodcode": "DET810", "quantity": 1 }] },
    { "custname": "Tim May", "mobile": "835099614", "location": "Pioneer Chowk", "slot": "Before 10AM", "value": 705, "items": [{ "prodcode": "GAR004", "quantity": 6 }, { "prodcode": "RB0277", "quantity": 3 }, { "prodcode": "MIR411", "quantity": 2 }] }
]

let Locations = ['Sector 14A', 'Sector 15B', 'Sector 22', 'Pioneer Chowk']

let DeliverySlots = ['Before 10AM', '10AM-12PM', '12PM-2PM', '2PM-4PM', '4PM-6PM', 'After 6PM']

let addOrders = []

let flag = 0


//Show Products
function showProducts() {
    //Clrscr
    let enterOrder = document.getElementById('enterOrder')
    enterOrder.innerHTML = ''

    let allOrders = document.getElementById('allOdr')
    allOrders.innerHTML = ''

    //grab The id
    let showProd = document.getElementById('showProd')
    let makeTheProd = makeProduct()

    showProd.innerHTML = makeTheProd
}


//Make Product Table
function makeProduct() {

    const tableHeading = `
                        <tr class="purpAndWht">
                            <th class="gap">Code</th>
                            <th class="gap">Name</th>
                            <th class="gap">Price</th>
                            <th class="gap">Category</th>
                            <th class="gap">Discount</th>
                        </tr>
                       `

    let tableBody = Products.map((prod, index) => {
        let { prodcode, prodname, price, category, offer } = prod
        return `
                 <tr class="${changeColor(index)}" class="a">
                    <td class="gap">${prodcode}</td>
                    <td class="gap">${prodname}</td>
                    <td class="gap">${price}</td>
                    <td class="gap">${category}</td>
                    <td class="gap">${offer}</td>
                 </tr>
               `
    })

    let completeTable = `<table class="bd">${tableHeading}${tableBody.join('')}</table>`
    return completeTable
}


//Change Body Color
function changeColor(index) {
    if (index % 2 === 0) {
        return 'light-green'
    } else return 'pink'
}


//Enter Order
function enterOrder() {
    //Clear Screen
    let showProd = document.getElementById('showProd')
    showProd.innerHTML = ''

    let allOrders = document.getElementById('allOdr')
    allOrders.innerHTML = ''

    //grab id
    let enterOrder = document.getElementById('enterOrder')
    let createTheOrder = createOrder()

    enterOrder.innerHTML = createTheOrder
}


//Create The Orders
function createOrder() {
    let custname = makeTextField('Customer Name', 'custNm')
    let mbNum = makeTextField('Mobile Number', 'mbNm')
    let locat = makeDropDown(Locations, 'Choose Location', 'loc', 'Location')
    let delvSlots = makeDropDown(DeliverySlots, 'Choose delivery Slot', 'delvSlot', 'Delivery Slot')
    var prodDpDown = makeDropDownForProducts(Products, 'Select Products', 'prod')
    var quantity = makeQuantDpDown('Select quantity', 'quant')

    let tHead = `
                  <tr class="purpAndWht" id='s'>
                      <th class="pa">Code</th>
                      <th class="pa">Name</th>
                      <th class="pa">Price</th>
                      <th class="pa">Quantity</th>
                      <th class="pa">Discount</th>
                      <th class="pa">Net amount</th>
                 </tr>
              `

    let addOrder = `
                   <tr>
                      <td>                                      
                        <span>Add To Order</span>
                        ${prodDpDown}
                        ${quantity}
                        <button class="hv-red bg-blackAndWht" onclick="Addproduct()">Add a Product</button>
                      </td>
                   </tr>
                 `

    //Buttons For Order Complete And Cancel Order
    let btn = `
              <tr>
                <td>
                    <button class="hv-red bg-blackAndWht" onclick="OrderComplete()">Order complete</button>
                    <button class="hv-red bg-blackAndWht" onclick="CancelOrder()">Cancel Order</button>
                </td>
              </tr>
            `

    //We are Creating Div For Showing Add order Details
    let addOrderDet = `
                  <div id="adOrd">
                  </div>
                 `


    let cmpltTable = `<table>${custname}${mbNum}${locat}${delvSlots}${addOrder}${btn}</table><table class="bd">${tHead}</table>${addOrderDet}`

    return cmpltTable
}

//Text Field For customer name,and mbNum
function makeTextField(label, id) {
    return `
           <tr>
             <td>
               <span>${label} <input type="text" id="${id}"></span>
             </td>
           </tr>
        `
}

//DropDown for location and Delivery Slot
function makeDropDown(arr, header, id, label) {

    let DpBody = arr.map(elem => {
        return `<option value="${elem}">${elem}</option>`
    })

    let dpDownHd = `<option disabled selected>${header}</option>`

    let completeDpDown = `
                        <select id="${id}"> 
                           ${dpDownHd}
                           ${DpBody.join('')}
                        </select>
                       `
    let finalDpDOwn = `<tr><td><span>${label} ${completeDpDown}</span><td></tr>`

    return finalDpDOwn
}



//DropDown for Products
function makeDropDownForProducts(arr, header, id) {

    let DpBody = arr.map(elem => {
        return `<option value="${elem.prodcode}">${elem.prodcode}</option>`
    })

    let dpDownHd = `<option disabled selected>${header}</option>`

    let completeDpDown = `
                        <select id="${id}"> 
                        ${dpDownHd}
                        ${DpBody.join('')}
                        </select>
                       `
    let finalDpDOwn = `<span>${completeDpDown}</span>`

    return finalDpDOwn
}



//DropDown For Quantity
function makeQuantDpDown(header, id) {

    let dpBdy = ''

    for (let val = 1; val <= 6; val++) {
        dpBdy = dpBdy + `<option value="${val}">${val}</option>`
    }

    let dpDownHd = `<option disabled selected>${header}</option>`

    let completeDpDown = `
                        <select id="${id}"> 
                           ${dpDownHd}
                           ${dpBdy}
                        </select>
                       `
    let finalDpDOwn = `<span>${completeDpDown}</span>`

    return finalDpDOwn
}


//Add product

function Addproduct() {

    let tHead = `
                 <tr class="purpAndWht">
                     <th class="pa">Code</th>
                     <th class="pa">Name</th>
                     <th class="pa">Price</th>
                     <th class="pa">Quantity</th>
                     <th class="pa">Discount</th>
                     <th class="pa">Net amount</th>
                     <th class="pa"></th>
                </tr>
                `

    //We are using this flag .bcoz we want to enter in this block only.If we don't want to remove element
    if (flag === 0) {

        let enProdCode = document.getElementById('prod').value  //Entered Product Code
        let enQuant = document.getElementById('quant').value  //Entered Quantity

        if (enProdCode === 'Select Products') {
            alert('Enter Product code')
        } else if (enQuant === 'Select quantity') {
            alert('Enter Quantity')
        }

        //Check Product Code is Valid or not
        let findIdx = Products.findIndex(elem => elem.prodcode === enProdCode)

        if (findIdx !== -1 && enQuant >= 1 && enQuant <= 6) {

            //Check Element is Repeating or not
            let repIdx = addOrders.findIndex(em => em.prodcode === enProdCode) //Find repeating Index

            if (repIdx === -1) {
                let item = {}

                item.prodcode = Products[findIdx].prodcode
                item.prodname = Products[findIdx].prodname
                item.price = Products[findIdx].price
                item.quantity = enQuant
                item.offer = Products[findIdx].offer

                //Calculate Net Amount After Discount
                let totalAmount = item.quantity * item.price

                //Calculate Net Amount After Discount
                item.netAmount = netAmtAfterDiscount(totalAmount, item.offer)

                addOrders.push(item)
            } else {
                addOrders[repIdx].quantity = Number(addOrders[repIdx].quantity) + Number(enQuant)
                let totalAmount = addOrders[repIdx].quantity * addOrders[repIdx].price
                addOrders[repIdx].netAmount = netAmtAfterDiscount(totalAmount, addOrders[repIdx].offer)
            }

        }
    }

    let body = addOrders.map((elem, index) => {

        let { prodcode, prodname, price, quantity, offer, netAmount } = elem

        return `
                 <tr class="${changeColor(index)}">
                    <td class="pa">${prodcode}</td>
                    <td class="pa">${prodname}</td>
                    <td class="pa">${price}</td>
                    <td class="pa">${quantity}</td>
                    <td class="pa">${offer}</td>
                    <td class="pa">${netAmount}</td>
                    <td class="pa"><button class="hv-red bg-blackAndWht" id="${'rmv' + index}" onclick="Remove(${index})">Remove</button></td>
                 </tr>
              `
    })

    document.getElementById('s').innerHTML = ''

    let cmpltTable = `
                     <table class="bd">
                       ${tHead}
                       ${body.join('')}
                     </table>
                    `

    let adOrd = document.getElementById('adOrd')
    adOrd.innerHTML = cmpltTable
    flag = 0
}


function netAmtAfterDiscount(totalAmount, discount) {
    let disc

    if (discount === "10%") {
        disc = 10
    } else if (discount === "15%") {
        disc = 10
    } else if (discount === "20%") {
        disc = 10
    } else if (discount === "None") {
        disc = 1
    }

    if (disc === 1) {
        return totalAmount
    } else {
        return totalAmount - (totalAmount * (disc / 100))
    }
}


function Remove(index) {
    flag = 1
    addOrders.splice(index, 1)
    Addproduct()
}

//Order Complete
function OrderComplete() {
    let customerName = document.getElementById('custNm').value
    let mbNum = document.getElementById('mbNm').value
    let location = document.getElementById('loc').value
    let delvSlots = document.getElementById('delvSlot').value
    let product = document.getElementById('prod').value
    let quantity = document.getElementById('quant').value

    let order = {}

    order.custname = customerName
    order.mobile = mbNum
    order.location = location
    order.slot = delvSlots
    order.product = product
    order.quantity = quantity

    if (validate(order)) {

        //Calculate Total Value
        let value = addOrders.reduce((acc, curr) => {
            return acc + curr.netAmount
        }, 0)

        let bigjson = { custname: customerName, mobile: mbNum, location: location, slot: delvSlots, value: value, items: addOrders }
        Orders.push(bigjson)
        CompleteDetails()
    }

}

function validate(order) {

    if (!order.custname) {                                               //Validate Customer Name
        alert('Plz Enter Name')
    } else if (order.custname.length < 5) {
        alert('Name should be min 6 chars')
    } else if (!order.mobile || order.mobile.length < 10) {               //Validate MObile Number
        alert('Mobile Number should have 10 chars')
    } else if (!Number(order.mobile)) {
        alert('Mobile Number should have digits only')
    } else if (order.location === 'Choose Location') {
        alert('Select Location')
    } else if (order.slot === 'Choose delivery Slot') {
        alert('Select Delivery Time')
    } else return 1
}

function CompleteDetails() {
    //Clear Screen
    let showProd = document.getElementById('showProd')
    showProd.innerHTML = ''

    let enterOrder = document.getElementById('enterOrder')
    enterOrder.innerHTML = ''

    let createTheAllOrders = createAllOrders()

    //Grab Id
    let allOrders = document.getElementById('allOdr')
    allOrders.innerHTML = createTheAllOrders

}

function createAllOrders() {
    let od = Orders.map(elem => {
        //Destructure Elements
        let { custname, mobile, location, slot, value } = elem
        let odDtl1 = `<p>Customer Name: ${custname} ,Mobile: ${mobile} ,Location: ${location} ,Delivery Slot: ${slot}</p>`

        let tHead = `
                     <tr class="purpAndWht">
                         <th class="pa">Code</th>
                         <th class="pa">Name</th>
                         <th class="pa">Price</th>
                         <th class="pa">Quantity</th>
                         <th class="pa">Discount</th>
                         <th class="pa">Net amount</th>
                         <th class="pa"></th>
                    </tr>
                   `
        let totalQuant = 0
        let tb = elem.items.map(val => {
            let { prodcode, quantity } = val

            totalQuant = totalQuant + Number(quantity)

            let findDetails = Products.find(dt => dt.prodcode === prodcode)

            //Destructure Elements
            let { prodname, price, offer } = findDetails

            //Calculate Net Amount

            let totalAmount = quantity * price

            netAmount = netAmtAfterDiscount(totalAmount, offer)


            let tBody = `
                          <tr class="yellow">
                             <td class="pa">${prodcode}</td>
                             <td class="pa">${prodname}</td>
                             <td class="pa">${price}</td>
                             <td class="pa">${quantity}</td>
                             <td class="pa">${offer}</td>
                             <td class="pa">${netAmount}</td>
                          </tr>
                   `
            return tBody
        })
        let cmpltTable = `
                          <table class="bd">
                            ${tHead}
                            ${tb.join('')}
                          </table>
                        `

        let odDtl2 = `<p>Order Value:${value}, No. of Items:${totalQuant}</p>`

        return odDtl1 + odDtl2 + cmpltTable

    })
    return od.join('')
}


function CancelOrder() {
    document.getElementById('custNm').value = ''
    document.getElementById('mbNm').value = ''
    document.getElementById('loc').value = 'Choose Location'
    document.getElementById('delvSlot').value = 'Choose delivery Slot'
    document.getElementById('prod').value = 'Select Products'
    document.getElementById('quant').value = 'Select quantity'

    addOrders = []

    let tHead = `
                <tr class="purpAndWht">
                    <th class="pa">Code</th>
                    <th class="pa">Name</th>
                    <th class="pa">Price</th>
                    <th class="pa">Quantity</th>
                    <th class="pa">Discount</th>
                    <th class="pa">Net amount</th>
                    <th class="pa"></th>
               </tr>
             `

    document.getElementById('s').innerHTML = ''

    let cmpltTable = `
                     <table class="bd">
                       ${tHead}
                     </table>
                    `
    let adOrd = document.getElementById('adOrd')
    adOrd.innerHTML = cmpltTable
}
