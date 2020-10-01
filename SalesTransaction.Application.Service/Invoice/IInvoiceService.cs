using SalesTransaction.Application.Model.Invoice;
using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Application.Service.Invoice
{
    public interface IInvoiceService
    {
        dynamic AddInvoice(MvInvoice invoice);
        dynamic GetAllInvoiceDetail();
        dynamic GetInvoiceDescription(String json);
    }
}
