using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Application.WebApi.Areas.Base;
using SalesTransaction.Application.Service.Sales;
using SalesTransaction.Application.Model.Sales;

namespace SalesTransaction.Application.WebApi.Areas.Sales
{
    public class SalesController : BaseController
    {

        private ISalesService _salesService;
        public SalesController(ISalesService salesService)
        {
            _salesService = salesService;
        }

        [HttpPost]
        public IActionResult AddSales([FromBody] MvSales sales)
        {
            try
            {
                var added = _salesService.AddSales(sales);
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
        public IActionResult UpdateSales([FromBody] MvSalesUpdate sales)
        {
            try
            {
                var updated = _salesService.UpdateSales(sales);
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
        public IActionResult AllSalesDetail()
        {
            try
            {
                dynamic jsonString = _salesService.GetAllSalesDetail();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }



}
