using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace ApplicationAppraisal.Helpers
{
    public class UserLog
    {
        public static void WriteLog(string username, string type)
        {
            string user;
            user = username;
            string filePath;
            filePath = System.IO.Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "UserLogFile");
            if (!File.Exists(filePath))
            {
                File.Create(filePath).Dispose();
            }
            using (StreamWriter writer = new StreamWriter(filePath, true))
            {


                if (type == "Login")
                {
                    writer.WriteLine("------------------------------------------------------------USER LOG------------------------------------------------------------");
                    writer.WriteLine();
                    writer.WriteLine("Date of Login : " + DateTime.Now.ToShortDateString());
                    writer.WriteLine("Time of Login : " + DateTime.Now.ToShortTimeString());
                    writer.WriteLine("Login Made by : " + user);




                }
                else
                {

                    writer.WriteLine("Time of Logout : " + DateTime.Now.ToShortTimeString());


                }
            }
        }
    }
}