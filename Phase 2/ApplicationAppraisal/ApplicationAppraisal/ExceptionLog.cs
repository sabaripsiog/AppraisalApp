﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace ApplicationAppraisal
{
    public class ExceptionLog
    {
        public static void Logger(Exception Ex)
        {
            string path = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
            string logfile = path + "\\MyLogFile.txt";
            if (!File.Exists(logfile))
            {
                using (StreamWriter sw = File.CreateText(logfile))
                {
                    sw.WriteLine("___________________________________________________________________");
                    sw.WriteLine("\n\n" + DateTime.Now.ToString() + "\n\n" + Ex.GetType().FullName + "\n\n" + Ex.Message + "\n" + Ex.StackTrace + "\n" + DateTime.Now.ToLongDateString());
                }
            }
            using (StreamWriter sw = File.AppendText(logfile))
            {
                sw.WriteLine("___________________________________________________________________");
                sw.WriteLine("\n\n" + DateTime.Now.ToString() + "\n\n" + Ex.GetType().FullName + "\n\n" + Ex.Message + "\n" + Ex.StackTrace + "\n" + DateTime.Now.ToLongDateString());
            }
        }
    }
}