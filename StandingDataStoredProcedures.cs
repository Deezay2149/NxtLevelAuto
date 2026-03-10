using System;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data.Common;
using System.Data;
using Sanlam.SnetBackOffice.Services;

namespace SanlamFundPrices
{
    /// <summary>
    /// Stored Procedure executing methods
    /// </summary>
    public class StandingDataStoredProcedures : BackOfficeBase
    {
        private string databaseConnection;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="connection"></param>
        public StandingDataStoredProcedures(string connection)
        {
            databaseConnection = connection;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="connection"></param>
        public StandingDataStoredProcedures()
        {
            databaseConnection = string.Empty;
        }

        /// <summary>
        /// DatabaseConnection
        /// </summary>
        public string DatabaseConnection
        {
            get { return databaseConnection; }
            set { databaseConnection = value; }
        }

        /// <summary>
        /// Get FundNumber
        /// </summary>
        public DataTable GetStatusData(MumsBatchConstants.Status status)
        {
            //database connection
            Database database = DatabaseFactory.CreateDatabase(Settings.TargetDatabase);
            DbCommand cmd = database.GetStoredProcCommand(AppSettings["GetDataStoreProcedureName"]);
            cmd.CommandTimeout = 600;

            //parameters
            database.AddInParameter(cmd, "@status", DbType.String, status);

            DataSet dataSetFundNumber = database.ExecuteDataSet(cmd);
            return dataSetFundNumber.Tables[0];
        }

        /// <summary>
        /// UpdateUserData
        /// </summary>
        public bool UpdateUserData(Guid userID, MumsBatchConstants.Status status)
        {
            //database connection
            Database database = DatabaseFactory.CreateDatabase(Settings.TargetDatabase);
            DbCommand cmd = database.GetStoredProcCommand(AppSettings["UpdateDataStoredProcedureName"]);
            cmd.CommandTimeout = 600;

            //parameters
            database.AddInParameter(cmd, "@id", DbType.Guid, userID);
            database.AddInParameter(cmd, "@status", DbType.String, status);
            database.AddInParameter(cmd, "@results", DbType.String, status);
            
            DataSet dataSetFundNumber = database.ExecuteDataSet(cmd);

            foreach (DataRow dr in dataSetFundNumber.Tables[0].Rows)
            {
                return Convert.ToBoolean(dr[0].ToString());
            }
            return false;
        }
    }
}



