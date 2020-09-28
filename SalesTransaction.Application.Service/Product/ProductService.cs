using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SalesTransaction.Application.DataAccess;
using SalesTransaction.Application.Model.Product;
using SalesTransaction.Application.Service.Product;
//using SalesTransaction.Application.Model.Product;


namespace SalesTransaction.Application.Service.Account
{
    public class ProductService : IProductService
    {
        private DataAccessHelper _dah;
        private readonly int _comdTimeout;
        private readonly string _connString;
        private IConfiguration _iconfiguration;

        public ProductService(IConfiguration configuration)
        {
            _iconfiguration = configuration;

            dynamic connectionString = _iconfiguration.GetSection("ConnectionString");
            _connString = connectionString["DefaultConnection"];

            if (_connString != null)
            {
                _dah = new DataAccessHelper(_connString);
            }

            _comdTimeout = Convert.ToInt32(connectionString["CommandTimeout"]);
        }



        public bool AddProduct(MvProduct product)
        {
            using (var connection = _dah.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(product);
                var command = connection.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "SpProductInsTsk";
                command.Parameters.Add("@json", SqlDbType.NChar).Value = jsonNew;
                command.CommandTimeout = _comdTimeout;

                int rows = command.ExecuteNonQuery();

                if (rows > 0)
                {
                    return true;
                }
                return false;


            }
        }

        public bool UpdateProduct(MvProductUpdate productUpdate)
        {
            using (var connection = _dah.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(productUpdate);
                var command = connection.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "SpProductUpdTsk";
                command.Parameters.Add("@json", SqlDbType.NChar).Value = jsonNew;
                command.CommandTimeout = _comdTimeout;

                int rows = command.ExecuteNonQuery();

                if (rows > 0)
                {
                    return true;
                }
                return false;


            }
        }




        public dynamic GetAllProductDetail()
        {
            using (var con = _dah.GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                //dynamic jsonNew = JsonConvert.DeserializeObject(json);
                cmd.CommandText = "SpProductSel";
                cmd.CommandTimeout = _comdTimeout;

                using (SqlDataReader sqldr = cmd.ExecuteReader())
                {
                    try
                    {
                        if (sqldr.HasRows)
                        {
                            return _dah.GetJson(sqldr);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }


            }
        }


    }


}
