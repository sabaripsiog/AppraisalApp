using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AppraisalApplication.Models;
using System.Data.Objects;
using System.Web.Http;

namespace AppraisalApplication
{
    public static class RetreivalActions
    {
        public static string getManager(string id)
        {
            using (AppraisalEntities entity = new AppraisalEntities())
            {
                var manager = (from s in entity.Employees
                                  where s.ID == id
                                  select s).ToList();

                var managerName = (manager.Count == 0) ? "No match" : manager[0].Name;
                return managerName;
            }

        }
        
       
    }
}