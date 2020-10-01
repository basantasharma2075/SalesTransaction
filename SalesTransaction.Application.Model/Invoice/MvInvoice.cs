using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SalesTransaction.Application.Model.Invoice
{

    public class MvInvoice
    {
        [Required]
        public int salesTransactionId { get; set; }
    }


}
