using SalesTransaction.Application.Model.Sales;
using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Application.Service.Sales
{
    public interface ISalesService
    {
        bool AddSales(MvSales sales);
        bool UpdateSales(MvSalesUpdate sales);
        dynamic GetAllSalesDetail();
    }
}
