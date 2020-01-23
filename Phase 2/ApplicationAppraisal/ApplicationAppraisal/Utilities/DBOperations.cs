using ApplicationAppraisal.Helpers;
using ApplicationAppraisal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApi.Utilities;

namespace ApplicationAppraisal.Utilities
{
    public class DBOperations
    {
        public static string ValidateLogin(string username, string password, out UserDetail user)
        {
            try
            {
                using (AppraisalDBEntities entities = new AppraisalDBEntities())
                {
                    user = entities.UserDetails.Where(u => u.Username == username).FirstOrDefault();
                    if (user != null)
                    {
                        if (string.Compare(password, user.Password) == 0)
                        {
                            UserLog.WriteLog(user.Username, "Login");
                            return "Login Successful!";
                        }
                        else
                        {
                            user = null;
                            return "Incorrect Password";
                        }
                    }
                    else
                    {
                        user = null;
                        return "Invalid Credentials";
                    }
                }
            }
            catch (Exception E)
            {
                ExceptionLog.Logger(E);
                user = null;
                return "Unable to connect to server!";
            }



        }

    }
}