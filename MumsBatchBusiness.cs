using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Reflection;
using System.Text;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Schema;
using Sanlam.SnetBackOffice.Services;
using Sanlam.SnetBackOffice.Lid;
using System.Configuration;
using System.Data;
using System.Linq;

namespace SanlamFundPrices
{
    public class MumsBatchBusiness : BackOfficeBase
    {
        private StandingDataStoredProcedures dataStoredProcedures = new StandingDataStoredProcedures();

        /// <summary>
        /// GetStatusData
        /// </summary>
        public DataTable GetStatusData()
        {
            DataTable statTable = dataStoredProcedures.GetStatusData(MumsBatchConstants.Status.Pending);
            return statTable;
        }

        /// <summary>
        /// GetUserData
        /// </summary>
        public bool UpdateStatusData(Guid userID, MumsBatchConstants.Status status)
        {
            return dataStoredProcedures.UpdateUserData(userID, status);
        }



        /// <summary>
        /// IsInactive
        /// </summary>
        /// <returns></returns>
        public bool IsInactive(DateTime inputDate)
        {
            if (inputDate <= DateTime.Now)
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// Validate File
        /// </summary>
        /// <returns></returns>
        public bool ValidateFile(string filePath)
        {
            try
            {
                //First we create the xmltextreader
                XmlTextReader xmlr = new XmlTextReader(filePath);

                //We pass the xmltextreader into the xmlvalidatingreader
                //This will validate the xml doc with the schema file
                //NOTE the xml file it self points to the schema file

                XmlValidatingReader xmlvread = new XmlValidatingReader(xmlr);

                // Set the validation event handler
                xmlvread.ValidationEventHandler += new ValidationEventHandler(ValidationCallBack);

                // Read XML data
                while (xmlvread.Read())
                {
                }

                //Close the reader.
                xmlvread.Close();

                //The validationeventhandler is the only thing that would set 
                //m_Success to false
                return true;
            }
            catch (Exception exception)
            {
                return false;
            }
        }

        /// <summary>
        /// validateSchema
        /// </summary>
        /// <param name="infilename"></param>
        public void validateSchema(String infilename)
        {
            XmlSchemaSet schemas = new XmlSchemaSet();
            schemas.Add("", "SanlamFundPriceXMLSchema.xsd");

            XDocument doc = XDocument.Load(infilename);
            string msg = "";
            doc.Validate(schemas, (o, e) =>
                {
                    msg = e.Message;
                });
            Console.WriteLine(msg == "" ? "Document is valid" : "Document invalid: " + msg);

            Validate(infilename, schemas);

        }

        /// <summary>
        /// Validate
        /// </summary>
        /// <param name="filename"></param>
        /// <param name="schemaSet"></param>
        private static void Validate(String filename, XmlSchemaSet schemaSet)
        {
            Console.WriteLine();
            Console.WriteLine("\r\nValidating XML file {0}...", filename.ToString());

            XmlSchema compiledSchema = null;

            foreach (XmlSchema schema in schemaSet.Schemas())
            {
                compiledSchema = schema;
            }

            XmlReaderSettings settings = new XmlReaderSettings();
            settings.Schemas.Add(compiledSchema);
            settings.ValidationEventHandler += new ValidationEventHandler(ValidationCallBack);
            settings.ValidationType = ValidationType.Schema;

            //Create the schema validating reader.
            XmlReader vreader = XmlReader.Create(filename, settings);

            while (vreader.Read())
            {
            }

            //Close the reader.
            vreader.Close();
        }

        /// <summary>
        /// //Display any warnings or errors.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        private static void ValidationCallBack(object sender, ValidationEventArgs args)
        {
            if (args.Severity == XmlSeverityType.Warning)
                Console.WriteLine("\tWarning: Matching schema not found.  No validation occurred." + args.Message);
            else
                Console.WriteLine("\tValidation error: " + args.Message);
        }

        /// <summary>
        /// FileExists
        /// </summary>
        public bool FileExists()
        {
            return true;
        }

        /// <summary>
        /// ValidateConnection
        /// </summary>
        /// <returns></returns>
        public bool ValidateConnection()
        {
            return true;
        }

        /// <summary>
        /// Email Message
        /// </summary>
        public void EmailMessage(string message, string server)
        {
            string emailSubject = string.Empty;

            emailSubject = string.Format("URGENT : Mums Error on {0}", server);
            StringBuilder emailBody = new StringBuilder();

            emailBody.AppendLine("The following Error has occured on");
            emailBody.AppendLine(message);
            emailBody.AppendLine();
            emailBody.AppendLine("Kind Regards");
            emailBody.AppendLine("The SanFin Back Office Team");

            LidEmail mail = new LidEmail();
            mail.SmtpHost = ConfigurationManager.AppSettings["EmailSmtp"];
            mail.Subject = emailSubject;
            mail.IsBodyHtml = false;
            mail.MessageBodyBuilder.AppendLine(emailBody.ToString());
            mail.AddMailAddressDetail(ConfigurationManager.AppSettings["PrimaryEmail"], string.Empty, true, false, false,
                                      false);
            mail.AddMailAddressDetail(ConfigurationManager.AppSettings["SecondaryEmail"], string.Empty, false, true,
                                      false, false);
            mail.SendMessage();
        }

        [Serializable]
        public class XplanReconItem
        {
            public string FirstName { get; set; }
            public string Surname { get; set; }
            public string Id { get; set; }
            public string Role { get; set; }
            public bool Status { get; set; }
            public List<string> Intermediaries { get; set; }
            public string TransactionRef { get; set; }
            public MumsBatchConstants.Status XplanUpdateStatus { get; set; }
            public int XplanUserType { get; set; }
            public DateTime? EndDate { get; set; }
            public string Guid { get; set; }
            public string counter { get; set; }
        }

        /// <summary>
        /// SortData
        /// </summary>
        /// <param name="reader"></param>
        /// <returns></returns>
        public DataTable SortData(DataTable reader)
        {
            //bool workFound = false;
            List<XplanReconItem> workList = new List<XplanReconItem>();
            try
            {
                foreach (DataRow dr in reader.Rows)
                {

                    XplanReconItem newWorkItem = new XplanReconItem();
                    newWorkItem.Intermediaries = new List<string>();

                    newWorkItem.FirstName = dr["FirstName"].ToString();
                    newWorkItem.Surname = dr["Surname"].ToString();
                    newWorkItem.Id = dr["Username"].ToString();
                    newWorkItem.Role = dr["XplanUserType"].ToString();
                    newWorkItem.XplanUserType = int.Parse(dr["EnumValue"].ToString());
                    newWorkItem.Guid = dr["id"].ToString();
                    //newWorkItem.counter = dr["counter"].ToString();

                    string intermediary = dr["IntermediaryCode"].ToString();

                    string endDate = dr["EndDate"].ToString();
                    DateTime endDateParsed;
                    DateTime.TryParse(endDate, out endDateParsed);

                    XplanReconItem result = workList.Find(wi => wi.Id == newWorkItem.Id);

                    //do I have this proxy already?
                    if (result != null)
                    {
                        if (string.IsNullOrEmpty(endDate) || (endDateParsed > DateTime.Now)) //exclude deletes
                        {
                            result.Intermediaries.Add(intermediary); //add to existing list
                        }
                    }
                    else
                    {
                        if (string.IsNullOrEmpty(endDate) || (endDateParsed > DateTime.Now)) //exclude deletes
                        {
                            newWorkItem.Intermediaries.Add(intermediary); //new list
                        }
                        workList.Add(newWorkItem); //add item
                    }
                }
            }
            catch
            {

            }

            //set the state of each workitem.
            foreach (XplanReconItem wil in workList)
            {
                wil.Status = wil.Intermediaries != null && wil.Intermediaries.Count > 0;
            }

            List<XplanReconItem> SortedList;

            if (AppSettings["IntemediaryListSize"] != "")
            {
                int intemediaryListSize = Convert.ToInt32(AppSettings["IntemediaryListSize"]);

                if (AppSettings["BigFirst"] == "Yes")
                {
                    SortedList = workList.OrderByDescending(o => o.Intermediaries.Count).Take(intemediaryListSize).ToList();
                }
                else
                {
                    SortedList = workList.OrderBy(o => o.Intermediaries.Count).Take(intemediaryListSize).ToList();
                }
            }
            else
            {
                if (AppSettings["BigFirst"] == "Yes")
                {
                    SortedList = workList.OrderByDescending(o => o.Intermediaries.Count).ToList();
                }
                else
                {
                    SortedList = workList.OrderBy(o => o.Intermediaries.Count).ToList();
                }
            }

            return ToDataTable(SortedList);
        }



        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="items"></param>
        /// <returns></returns>
        public static DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof (T).Name);

            //Get all the properties
            PropertyInfo[] Props = typeof (T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    if (i == 6)
                    {
                        string yx = "";
                        List<string> xList = (List<string>) values[5];
                        foreach (string x in xList)
                        {
                            if (x != null)
                            {
                                yx = yx + x + "|";
                            }
                            else
                            {
                                yx = yx + x;
                            }
                        }
                        values.SetValue(yx,5);
                    }
                    else
                    {
                                            //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                    }


                }
                
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            return dataTable;
        }

      
    }

           
}

