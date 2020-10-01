using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SalesTransaction.Application.DataAccess;
using SalesTransaction.Application.Model.Account;


namespace SalesTransaction.Application.Service.Account
{
    public class AccountService : IAccountService
    {
        private DataAccessHelper _dah;
        private readonly int _comdTimeout;
        private readonly string _connString;
        private IConfiguration _iconfiguration;

        public AccountService(IConfiguration configuration)
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

        public dynamic GetLogin(MvLogin login)
        {
            using (var con = _dah.GetConnection())
            {
                var cmd = con.CreateCommand();

                //              cmd.CommandType = CommandType.Text;
                //                cmd.CommandText = "SELECT (SELECT u.UserName,u.LoginPassword " +
                //                "FROM [dbo].[Login] AS u WHERE u.UserName = '" + login.UserName + "' AND u.LoginPassword='" + login.Password
                //              + "' FOR JSON PATH, WITHOUT_ARRAY_WRAPPER ) AS Json";
                //        cmd.CommandTimeout = _commandTimeout;


                cmd.CommandType = CommandType.Text;
                cmd.CommandText = "SELECT (SELECT u.UserName,u.LoginPassword FROM [dbo].[Login] AS u WHERE u.UserName = '" + login.UserName + "' AND u.LoginPassword='" + login.LoginPassword
                    + "' FOR JSON PATH, WITHOUT_ARRAY_WRAPPER ) AS Json";
                cmd.CommandTimeout = _comdTimeout;

               

                using (SqlDataReader rdr = cmd.ExecuteReader())
                {
                    try
                    {
                        if (rdr.HasRows)
                        {
                            return _dah.GetJson(rdr);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                }
            }
        }

        public dynamic GetUserDetail(string json)
        {
            using (var con = _dah.GetConnection())
            {
                /*var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.Text;
                dynamic jsonNew = JsonConvert.DeserializeObject(json);
                


                cmd.CommandText = "SELECT (SELECT p.PersonId,u.UserName,u.LoginPassword,p.FirstName,p.LastName FROM dbo.Person AS p" +
                    " INNER JOIN dbo.[Login] AS u ON u.PersonId = p.PersonId" +
                    " WHERE p.PersonId = " + Convert.ToString(jsonNew.PersonId)
                    + " FOR JSON PATH, WITHOUT_ARRAY_WRAPPER ) AS Json";
                cmd.CommandTimeout = _comdTimeout;
*/


                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                dynamic jsonNew = JsonConvert.DeserializeObject(json);
                cmd.CommandText = "SpUserDetailSel";
                cmd.Parameters.AddWithValue("@LoginId", Convert.ToString(jsonNew.LoginId));
                cmd.CommandTimeout = _comdTimeout;


                using (SqlDataReader rdr = cmd.ExecuteReader())
                {
                    try
                    {
                        if (rdr.HasRows)
                        {
                            return _dah.GetJson(rdr);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                }
            }
        }


        public dynamic GetAllUserDetail()
        {
            using (var con = _dah.GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                //dynamic jsonNew = JsonConvert.DeserializeObject(json);
                cmd.CommandText = "SpAllUserSel";
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
