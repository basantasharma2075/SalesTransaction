using System;
using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Application.Model.Account;
using SalesTransaction.Application.Model.Product;
//using SalesTransaction.Application.Service.Account;
using SalesTransaction.Application.Service.Product;
using SalesTransaction.Application.WebApi.Areas.Base;

namespace SalesTransaction.Application.WebApi.Areas.Product
{
    public class ProductController : BaseController
    {
        private IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }




        [HttpPost]
        public IActionResult AddProduct([FromBody] MvProduct product)
        {
            try
            {
                var added = _productService.AddProduct(product);
                if (!added)
                {
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        [HttpPost]
        public IActionResult UpdateProduct([FromBody] MvProductUpdate product)
        {
            try
            {
                var updated = _productService.UpdateProduct(product);
                if (!updated)
                {
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
        }







        [HttpGet]
        public IActionResult AllProductDetail()
        {
            try
            {
                dynamic jsonString = _productService.GetAllProductDetail();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }



}
