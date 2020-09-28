using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SalesTransaction.Application.DataAccess;
using SalesTransaction.Application.Model.Customer;
using SalesTransaction.Application.Service.Customer;

namespace SalesTransaction.Application.Service.Customer
{
    public class CustomerService : ICustomerService
    {
        private DataAccessHelper _dah;
        private readonly int _comdTimeout;
        private readonly string _connString;
        private IConfiguration _iconfiguration;

        public CustomerService(IConfiguration configuration)
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


        public bool AddCustomer(MvCustomer customer)
        {
            using (var connection = _dah.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(customer);
                var command = connection.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "SpCustomerInsTsk";
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

        public dynamic GetAllCustomerDetail()
        {
            using (var con = _dah.GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                //dynamic jsonNew = JsonConvert.DeserializeObject(json);
                cmd.CommandText = "SpCustomerSel";
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

        public bool UpdateCustomer(MvCustomerUpdate customerUpdate)
        {
            using (var connection = _dah.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(customerUpdate);
                var command = connection.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "SpCustomerUpd";
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
    }
}

