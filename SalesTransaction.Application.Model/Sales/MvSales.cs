using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SalesTransaction.Application.Model.Sales
{
    public class MvSales
    {
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class MvSalesUpdate
    {
        [Required]
        public int SalesTransactionId { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
