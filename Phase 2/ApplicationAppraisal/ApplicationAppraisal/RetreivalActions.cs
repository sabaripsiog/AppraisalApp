using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Objects;
using System.Web.Http;
using ApplicationAppraisal.Models;

namespace AppraisalApplication
{
    public static class RetreivalActions
    {
        public static string getManager(string id)
        {
            using (AppraisalDBEntities entity = new AppraisalDBEntities())
            {
                var manager = (from s in entity.Employees
                               where s.ID == id
                               select s).ToList();

                var managerName = (manager.Count == 0) ? "No match" : manager[0].Name;
                return managerName;
            }

        }

        public static string getManagerMail(string id)
        {
            using (AppraisalDBEntities entity = new AppraisalDBEntities())
            {
                var manager = (from s in entity.Employees
                               where s.ID == id
                               select s).ToList();

                var managerMail = (manager.Count == 0) ? "No match" : manager[0].Email;
                return managerMail;
            }

        }

    }
}