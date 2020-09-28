using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SalesTransaction.Application.Model.Product
{
    public class MvProduct
    {
        [Required]
        public string ProductName { get; set; }
        [Required]
        public int ProductQuantity { get; set; }
        [Required]
        public int RemainingQuantity { get; set; }
        [Required]
        public DateTime ProductExpiryDate { get; set; }
        [Required]
        public string ProductBarCode { get; set; }
        [Required]
        public int ProductRate { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public int ProductOffer { get; set; }
    }

    public class MvProductUpdate
    {
        [Required]
        public string ProductId { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        public int ProductQuantity { get; set; }
        [Required]
        public int RemainingQuantity { get; set; }
        [Required]
        public DateTime ProductExpiryDate { get; set; }
        [Required]
        public string ProductBarCode { get; set; }
        [Required]
        public int ProductRate { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public int ProductOffer { get; set; }
    }
}
//ProductName, ProductQuantity, RemainingQuantity, ProductExpiryDate, ProductBarCode, ProductRate, StartDate, EndDate, ProductOffer
