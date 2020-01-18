using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApplicationAppraisal.Utilities
{
    public class ProductGoals
    {
        public int ID { get; set; }
        public string ManagerComments { get; set; }
        public string EmployeeComments { get; set; }
        public string ManagerRating { get; set; }
        public string EmployeeRating { get; set; }
        public int Appraisal_ID { get; set; }
        public string Goal { get; set; }
        public int GoalCategory_ID { get; set; }
        public int Priority { get; set; }
    }
}