
using System;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;

namespace SalesTransaction.Application.DataAccess
{
    public class DataAccessHelper
    {
        private SqlConnection _conn;
        private string _connString;

        public DataAccessHelper(string connectionString)
        {
            _connString = connectionString;
        }

        public SqlConnection GetConnection()
        {
            try
            {
                SetConnection();
                return _conn;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void SetConnection()
        {
            _conn = new SqlConnection(_connString);
            if (_conn.State == ConnectionState.Closed)
            {
                _conn.Open();
            }
            else
            {
                _conn.Close();
                _conn.Open();
            }
        }

        public dynamic GetJson(SqlDataReader reader)
        {
            var dataTable = new DataTable();
            dataTable.Load(reader);

            if (dataTable.Rows[0] != null && dataTable.Rows[0]["Json"].ToString() != "") 
            {
                return JsonConvert.DeserializeObject(dataTable.Rows[0]["Json"].ToString());
            }
            else
            {
                return null;
            }
        }
    }


}
