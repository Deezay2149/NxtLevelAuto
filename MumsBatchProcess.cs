using Sanlam.SnetBackOffice.Services;
using System;
using System.Data;
using Sanlam.Xplan.MumsApp;
using XplanPhones;
using System.Collections.Generic;
using Sanlam.Xplan.Users;

namespace SanlamFundPrices
{
    public class MumsBatchProcess : BackOfficeApplicationBase
    {
        private MumsBatchBusiness MumsBatchBusiness;
        private string logMessage;

        /// <summary>
        /// SanlamFundPriceProcess constructor
        /// </summary>
        public MumsBatchProcess()
        {
            MumsBatchBusiness = new MumsBatchBusiness();
            StartSession();
        }

        /// <summary>
        /// ProcessSanlamFundPrice
        /// </summary>
        public void ProcessMums()
        {
            try
            {
                MumsUser mumsUserLog = new MumsUser();

                #region log

                logMessage = string.Format("Mums Batch v2 Process started at {0} on {1} ", DateTime.Now , Environment.MachineName);
                Console.WriteLine(logMessage);
                mumsUserLog.AddToLog(logMessage);
                Console.WriteLine();
                mumsUserLog.AddToLog("");
                mumsUserLog.AddToLog(string.Format("Target Database : {0}", Settings.TargetDatabase));
                Console.WriteLine();
                mumsUserLog.AddToLog("");

                #endregion log
                
                //set log location for mums class
                Console.WriteLine();
                mumsUserLog.AddToLog("");
                Console.WriteLine("Xplan URL : {0}", Settings.XplanUrl);
                mumsUserLog.AddToLog(string.Format("Xplan URL : {0}", Settings.XplanUrl));
                Console.WriteLine("Target Database : {0}", Settings.TargetDatabase);
                mumsUserLog.LogPath = AppSettings["IndividualLogPath"];

                MumsBatchBusiness mumsBatchBusiness = new MumsBatchBusiness();

                try
                {
                    //get data
                    DataTable dataToProccess = MumsBatchBusiness.GetStatusData();

                    DataTable processDataTable = MumsBatchBusiness.SortData(dataToProccess);
                    //processDataTable.DefaultView.Sort = "Intermediaries DESC";

                    if (processDataTable.Rows.Count == 0)
                    {
                        #region Log
                        logMessage = string.Format("0 record(s) pending.");
                        Console.WriteLine(logMessage);
                        mumsUserLog.AddToLog(logMessage);
                        Console.WriteLine();
                        mumsUserLog.AddToLog("");
                        #endregion
                    }
                    else
                    {
                        #region Log
                        logMessage = string.Format(string.Format("{0} record(s) pending.",processDataTable.Rows.Count));
                        Console.WriteLine(logMessage);
                        mumsUserLog.AddToLog(logMessage);
                        Console.WriteLine();
                        mumsUserLog.AddToLog("");
                        #endregion
                    }

                    int rowNumber = 0;

                    foreach (DataRow dataRow in processDataTable.Rows)
                    {
                        try
                        {

                            rowNumber++;

                            MumsUser mumsUser = new MumsUser();

                            //log
                            mumsUser.LogPath = AppSettings["IndividualLogPath"];

                            bool result = false;
                            string userGUIDx =  dataRow["GUID"].ToString();

                            Guid userGUID = new Guid(userGUIDx);

                            //set the request
                            if (dataRow["EndDate"] != DBNull.Value)
                            {
                               mumsUser.Active = MumsBatchBusiness.IsInactive((DateTime)dataRow["EndDate"]);
                            }
                            else
                            {
                               mumsUser.Active = true;
                            }

                            mumsUser.FirstName = (string)dataRow["FirstName"];
                            mumsUser.Surname = (string)dataRow["Surname"];
                            mumsUser.Userid = (string) dataRow["id"];
                            mumsUser.UserRole = dataRow["XplanUserType"].ToString();

                            string codeList = dataRow["Intermediaries"].ToString();
                            string[] intermediaryList = codeList.Split('|');

                            foreach (var s in intermediaryList)
                            {
                                if (s != "")
                                {
                                    mumsUser.IntemediaryLink.Add(s);
                                }
                            }

                            #region Log

                            Console.WriteLine("");
                            mumsUser.AddToLog("");
                        
                            mumsUser.AddToLog(string.Format("Number {0} of {1}", rowNumber, processDataTable.Rows.Count));
                            Console.WriteLine("Number " + rowNumber + " of " + processDataTable.Rows.Count );

                            mumsUser.AddToLog(string.Format("GUID : {0}", userGUID));
                            Console.WriteLine("GUID : " + userGUID);
                        
                            mumsUser.AddToLog(string.Format("First Name : {0}", mumsUser.FirstName));
                            Console.WriteLine("First Name : " + mumsUser.FirstName);

                            mumsUser.AddToLog(string.Format("Surname : {0}", mumsUser.Surname));
                            Console.WriteLine("Surname : " + mumsUser.Surname);

                            mumsUser.AddToLog(string.Format("Userid : {0}", mumsUser.Userid));
                            Console.WriteLine("UserId : " + mumsUser.Userid);

                            mumsUser.AddToLog(string.Format("Status : {0}", mumsUser.Active));
                            Console.WriteLine("Status : " + mumsUser.Active);

                            mumsUser.AddToLog(string.Format("User Role : {0}", mumsUser.UserRole));
                            Console.WriteLine("User Role : " + mumsUser.UserRole);

                            string list = string.Empty;

                            if (mumsUser.IntemediaryLink == null)
                            {
                                Console.WriteLine("Intemediary IS NULL");
                            }

                            if (mumsUser.IntemediaryLink != null)
                            {
                                foreach (string intemediary in mumsUser.IntemediaryLink)
                                {
                                    if (mumsUser.IntemediaryLink.Count == 1)
                                    {
                                        list += intemediary;
                                    }
                                    else
                                    {
                                        list += intemediary + "|";
                                    }
                                }
                            }
                            Console.WriteLine("Intemediary List : " + list);
                            mumsUser.AddToLog(string.Format("Intermediary List : {0}", list));
                            Console.WriteLine("");
                            mumsUser.AddToLog("");

                            #endregion
                        
                            //validate the request
                            if (mumsUser.ValidEntry())
                            {
                                //process request
                                try
                                {
                                    string message;

                                    PddFix(mumsUser.Userid);

                                    result = mumsUser.ReconcileProxyWithCapabilities(out message, true, true, false);

                                    if (result)
                                    {
                                        try
                                        {
                                            if (MumsBatchBusiness.UpdateStatusData(userGUID, MumsBatchConstants.Status.Synched))
                                            {
                                                //log
                                                mumsUser.AddToLog("MUMS db Status updated successfully.");
                                                Console.WriteLine("MUMS db Status updated successfully.");
                                            }
                                        }
                                        catch (Exception ex)
                                        {
                                            throw ex;
                                        }
                                    }
                                    else
                                    {
                                        try
                                        {
                                            if (MumsBatchBusiness.UpdateStatusData(userGUID, MumsBatchConstants.Status.SynchError))
                                            {
                                                //log
                                                mumsUser.AddToLog("MUMS db Status update failed.");
                                                Console.WriteLine("MUMS db Status update failed.");
                                            }
                                        }
                                        catch (Exception ex)
                                        {
                                            throw ex;
                                        }
                                    }
                                    if (message != "Transaction successful.")
                                    {
                                        mumsBatchBusiness.EmailMessage(message,Environment.MachineName);
                                    }

                                    //log   
                                    #region

                                    bool y = Convert.ToBoolean(AppSettings["IndividualLog"]);
                                    if (y)
                                    {
                                        mumsUser.WriteResponseLog(true, mumsUser.stringBuilderLog.ToString());
                                    }

                                    #endregion

                                }
                                catch (Exception ex)
                                {
                                    //log
                                    mumsUser.WriteResponseLog(result, ex.Message + ' ' + ex.StackTrace);
                                    Console.WriteLine(ex.Message);

                                    continue;
                                }
                            }
                            else
                            {
                                mumsUser.AddToLog("The requesting infomation is NOT valid and/or complete :" + mumsUser.MissingValidation);
                            }

                            //log
                            Console.WriteLine(mumsUser.stringBuilderLog);
                            mumsUserLog.stringBuilderLog.Append(mumsUser.stringBuilderLog);
                            mumsUser.stringBuilderLog.Clear();
                        }
                        catch (Exception ex)
                        {
                            string msgERR = string.Format("- Exception occcurred on {0}: {1} Stack Trace {2}", Environment.MachineName, ex.Message, ex.StackTrace);

                            mumsUserLog.AddToLog(msgERR);
                            Console.WriteLine(msgERR);

                            continue;
                        }
                    }
                    #region log

                    logMessage = string.Format("Mums Batch Process finished at {0} ", DateTime.Now);
                    Console.WriteLine();
                    Console.WriteLine(logMessage);
                    mumsUserLog.AddToLog(logMessage);

                    #endregion log
                }
                catch (Exception exception)
                {
                    string msgERR = string.Format("- Exception occcurred on {0}: {1} Stack Trace {2}",Environment.MachineName, exception.Message, exception.StackTrace);

                    mumsUserLog.AddToLog(msgERR);
                    Console.WriteLine(msgERR);

                    mumsBatchBusiness.EmailMessage(msgERR,Environment.MachineName);
                }
                finally
                {
                    //Log.Log(string.Format(mumsUserLog.stringBuilderLog.ToString()), string.Empty, DateTime.Now, LogLevel.INFO);
                    mumsUserLog.WriteLogToFile();

                    //log to file
                    Log.Log(string.Format(mumsUserLog.stringBuilderLog.ToString()), string.Empty, DateTime.Now, LogLevel.INFO);
                }
            }
            catch (Exception exception)
            {
                //log
                #region log

                logMessage = string.Format("Exception occured {0} with the stacktrace : {1} ", exception.Message, exception.StackTrace);
                Console.WriteLine();
                Console.WriteLine(logMessage);
                Log.Log(string.Format(logMessage), string.Empty, DateTime.Now, LogLevel.INFO);

                #endregion
            }
        }

        /// <summary>
        /// PddFix - // Country Code : If the value was never set then do nothing but otherwise set to blank.  EDAI defaults this to No.
        /// </summary>
        /// <param name="entry"></param>
        public void PddFix(string userID)
        {
            XplanUser createXplanUser = new XplanUser();
            List<XplanUser> xplanUserList = createXplanUser.ListQuickSearchAll(userID);

            if (xplanUserList.Count != 0)
            {
                foreach(XplanUser xp in xplanUserList)
                {
                    string entityID = xp.EntityID;

                    XplanPhone xplanPhone2 = new XplanPhone(XplanEnity.EntityTypes.User, entityID);   //todo: replace with param entity 

                    xplanPhone2.ListContacts();

                    Dictionary<string, List<XplanPhone>> xplanPhoneList = xplanPhone2.ListContacts();

                    if (xplanPhoneList.Count != 0)
                    {
                        foreach (var keypair in xplanPhoneList)
                        {
                            foreach (XplanPhone xplanPhoneSelected in keypair.Value)
                            {
                                if (keypair.Key == "m1")
                                {
                                    //If the value was never set then do nothing but otherwise set to blank.  EDAI defaults this to No.
                                    if (xplanPhoneSelected.CountryCode != "")
                                    {
                                        xplanPhoneSelected.CountryCode = "";
                                    }
                                    xplanPhoneSelected.Save();
                                    {
                                        logMessage = string.Format("        - contact updated [{0}].", userID);
                                        Log.Log(string.Format(logMessage), string.Empty, DateTime.Now, LogLevel.INFO);
                                    }
                                }
                            }
                        }
                    }
                    else
                    {
                        logMessage = string.Format("        - No contact info found [{0}].", userID);
                        Log.Log(string.Format(logMessage), string.Empty, DateTime.Now, LogLevel.INFO);
                    }
                }
                
            }
        }

        /// <summary>
        /// StopSession
        /// </summary>
        /// <param name="results"></param>
        public void StopSession(Results results)
        {
            StopSession(100.0, results);
        }
     }
}
