//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ApplicationAppraisal.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class AppraisalGoal
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
    
        public virtual Appraisal Appraisal { get; set; }
        public virtual GoalCategory GoalCategory { get; set; }
    }
}