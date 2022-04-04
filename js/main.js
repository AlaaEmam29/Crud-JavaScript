"use strict";

let productName = document.getElementById("product-name"),
    productCategory = document.getElementById("product-category"),
    productPrice = document.getElementById("product-price"),
    productDescription = document.getElementById("product-description"),
    submitButton = document.getElementById('submit-btn'),
    searchText = document.getElementById('search-text'),
    tableData = document.getElementById('table-body'),
    inputsData = document.getElementsByClassName('form-control'),
    productNameAlert = document.getElementById('productNameAlert'),
    productCategoryAlert = document.getElementById('productCategoryAlert'),
    productPriceAlert = document.getElementById('productPriceAlert'),
    productDescriptionAlert = document.getElementById('productDescriptionAlert'),
    emptyForm = document.getElementById('empty-input-alert'),
    containerProducts ,
    currentIndex = 0;
containerProducts = [];
if(localStorage.getItem('productList') != null)
{
    containerProducts = getItemOfData();
    displayData();
}

submitButton.addEventListener('click', function (e)
{
    e.preventDefault();
        if(!checkEmpty())
        {
            if (submitButton.innerHTML === "Add Product")
            {
                addProduct();
            }
            else
            {
                updateProduct();

            }
            resetForm();
            displayData();
        }
        
})
searchText.addEventListener('keyup',function (e)
{
    searchProduct(e)
})
function addProduct()
{
    if (
        validateProductName() == true &&
        validateProductCategory() == true &&
        validateProductPrice() == true &&
        validateProductDescription() == true
    ) {
        let product =
            {
                productName: productName.value,
                productCategory: productCategory.value,
                productPrice: productPrice.value,
                productDescription: productDescription.value
            }
        containerProducts.push(product)
        setItemOfData();

    }
}
function resetForm()
{
    for (let data of inputsData)
    {
        data.value = '';
    }

    productName.classList.remove("is-invalid");
    productName.classList.remove("is-valid");
    productNameAlert.classList.remove("d-block");
    productNameAlert.classList.add("d-none");

    productCategory.classList.remove("is-valid");
    productCategory.classList.remove("is-invalid");
    productCategoryAlert.classList.remove("d-block");
    productCategoryAlert.classList.add("d-none");

    productPrice.classList.remove("is-valid");
    productPrice.classList.remove("is-invalid");
    productPriceAlert.classList.remove("d-block");
    productPriceAlert.classList.add("d-none");

    productDescription.classList.remove("is-invalid");
    productDescription.classList.remove("is-valid");
    productDescriptionAlert.classList.remove("d-block");
    productDescriptionAlert.classList.add("d-none");
    submitButton.disabled = true;

}
function displayData()
{
    let containerOfData = '';
    for (let i = 0, length = containerProducts.length; i < length; i++) {
        containerOfData += `
         <tr>
          <th>${i + 1}</th>
          <td>${containerProducts[i].productName}</td>
          <td>${containerProducts[i].productCategory}</td>
          <td>${containerProducts[i].productPrice}</td>
           <td>${containerProducts[i].productDescription}</td>
          <td><button onclick="getProductInfo(${i})"  class="btn btn-warning text-dark"><i class="fa-solid fa-pencil "></i></button></td>
          <td><button onclick="deleteDataFromContainer(${i})" class="btn btn-danger text-white"><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
       `
    }
    tableData.innerHTML = containerOfData;
}

function setItemOfData()
{
    return localStorage.setItem('productList',JSON.stringify(containerProducts));

}
function getItemOfData()
{
    return JSON.parse(localStorage.getItem('productList'));

}
function deleteDataFromContainer(index) {
    containerProducts.splice(index,1);
    setItemOfData();
    displayData();
}
function getProductInfo(index)
{
    productName.value = containerProducts[index].productName;
    productPrice.value = containerProducts[index].productPrice;
    productCategory.value = containerProducts[index].productCategory;
    productDescription.value = containerProducts[index].productDescription;
    submitButton.innerHTML = "Update Product";
    currentIndex = index;


}
function searchProduct(e)
{
    let containerOfData = '';

    for (let i = 0; i <containerProducts.length ; i++) {
        let name  = containerProducts[i].productName.toLowerCase().includes(e.target.value.toLowerCase()),
            category = containerProducts[i].productCategory.toLowerCase().includes(e.target.value.toLowerCase()),
            price =  containerProducts[i].productPrice.includes(e.target.value);
        if(name === true  || category === true || price === true)
        {
            containerOfData += `
         <tr>
          <th>${i + 1}</th>
          <td>${containerProducts[i].productName}</td>
          <td>${containerProducts[i].productCategory}</td>
          <td>${containerProducts[i].productPrice}</td>
           <td>${containerProducts[i].productDescription}</td>
          <td><button onclick="getProductInfo(${i})"  class="btn btn-warning text-dark"><i class="fa-solid fa-pencil "></i></button></td>
          <td><button onclick="deleteDataFromContainer(${i})" class="btn btn-danger text-white"><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
       `
            }

    }
    tableData.innerHTML = containerOfData;
}
function updateProduct()
{
    if(
        validateProductName() == true &&
        validateProductCategory() == true &&
        validateProductPrice() == true &&
        validateProductDescription() == true
    ) {
        let product =
            {
                productName: productName.value,
                productCategory: productCategory.value,
                productPrice: productPrice.value,
                productDescription: productDescription.value
            }
        containerProducts[currentIndex] = product;
        setItemOfData()
        submitButton.innerHTML = "Add Product";
    }
}
function checkEmpty()
{
    if (
        productName.value == "" ||
        productCategory.value == "" ||
        productPrice.value == "" ||
        productDescription.value == ""
    ) {

        emptyForm.innerHTML = "Please Fill In Required Info and Try Again!";
        submitButton.disabled = true;

        return true;

    }
    else
    {
        emptyForm.innerHTML = "";
        submitButton.disabled = false;
        return false;

    }
}
function validateProductName()
{
    let regex = /^[A-Z][a-z A-z 0-9]{2,}$/;
    if(regex.test(productName.value) == true)
    {
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        productNameAlert.classList.remove("d-block");
        productNameAlert.classList.add("d-none");
        submitButton.disabled = false;

        return true;
    }
    else
    {
        productName.classList.remove("is-valid");
        productName.classList.add("is-invalid");
        productNameAlert.classList.add("d-block");
        productNameAlert.classList.remove("d-none");
        submitButton.disabled = true;

        return  false;
    }
}

function validateProductCategory()
{
    let regex = /^[a-z A-Z 0-9]{5,}$/;
    if(regex.test(productCategory.value) == true)
    {
        productCategory.classList.add("is-valid");
        productCategory.classList.remove("is-invalid");
        productCategoryAlert.classList.remove("d-block");
        productCategoryAlert.classList.add("d-none");
        submitButton.disabled = false;

        return true;
    }
    else
    {
        productCategory.classList.remove("is-valid");
        productCategory.classList.add("is-invalid");
        productCategoryAlert.classList.add("d-block");
        productCategoryAlert.classList.remove("d-none");
        submitButton.disabled = true;

        return  false;
    }
}

function validateProductPrice()
{
    let regex = /^([1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|10000)$/;
    if(regex.test(productPrice.value) == true)
    {
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        productPriceAlert.classList.remove("d-block");
        productPriceAlert.classList.add("d-none");
        return true;
        submitButton.disabled = false;

    }
    else
    {
        productPrice.classList.remove("is-valid");
        productPrice.classList.add("is-invalid");
        productPriceAlert.classList.add("d-block");
        productPriceAlert.classList.remove("d-none");
        submitButton.disabled = true;

        return  false;
    }
}

function validateProductDescription()
{
    let regex  = /^[a-z A-Z 0-9]{3,}$/;
    if(regex.test(productDescription.value) == true)
    {

        productDescription.classList.add("is-valid");
        productDescription.classList.remove("is-invalid");

        productDescriptionAlert.classList.add("d-none");
        productDescriptionAlert.classList.remove("d-block");;
        submitButton.disabled = false;
        return true;
    }
    else
    {
        productDescription.classList.add("is-invalid");
        productDescription.classList.remove("is-valid");

        productDescriptionAlert.classList.add("d-block");
        productDescriptionAlert.classList.remove("d-none");
        submitButton.disabled = true;
        return  false;
    }
}
function checkDuplicatedNames() {
    for (let i = 0; i <containerProducts.length ; i++) {
        if(productName.value == containerProducts[i].productName)
        {
            productName.classList.add("is-invalid");
            productName.classList.remove("is-valid");

            productNameAlert.classList.add("d-block");
            productNameAlert.classList.remove("d-none");

            productNameAlert.innerHTML = "Product Name Already Exists";

            submitButton.disabled = true;


        }
    }
}
productName.addEventListener('keyup',validateProductName)
productPrice.addEventListener('keyup',validateProductPrice)
productCategory.addEventListener('keyup',validateProductCategory)
productDescription.addEventListener('keyup',validateProductDescription)
productName.addEventListener('blur',checkDuplicatedNames)

