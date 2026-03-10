using System;
using System.Threading;
using System.Configuration;

namespace SanlamFundPrices
{
    class Program
    {
        static void Main(string[] args)
        {
            string applicationName = ConfigurationSettings.AppSettings["ApplicationName"];

            Mutex mutex = new Mutex(false, applicationName);

            try
            {
                if (mutex.WaitOne(0, false))
                {
                    Console.Title = applicationName;
                    MumsBatchProcess process = new MumsBatchProcess();
                    process.ProcessMums();
                }
                else
                {
                    Console.WriteLine("An instance of the application is already running.");
                }
            }
            finally
            {
                if (mutex != null)
                {
                    mutex.Close();
                    mutex = null;
                }
            }
        }
    }
}
