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
    
    public partial class Employee
    {
        public Employee()
        {
            this.Appraisals = new HashSet<Appraisal>();
            this.UserDetails = new HashSet<UserDetail>();
        }
    
        public string ID { get; set; }
        public string Name { get; set; }
        public System.DateTime DOB { get; set; }
        public System.DateTime DOJ { get; set; }
        public string Designation { get; set; }
        public string Address { get; set; }
        public string BloodType { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string ManagerID { get; set; }
        public string IsAppraiser { get; set; }
        public string IsHR { get; set; }
        public int AppraisalPolicy_ID { get; set; }
        public string AppraisalStatus { get; set; }
        public string GmailID { get; set; }
        public string FBmailID { get; set; }
    
        public virtual ICollection<Appraisal> Appraisals { get; set; }
        public virtual AppraisalPolicy AppraisalPolicy { get; set; }
        public virtual ICollection<UserDetail> UserDetails { get; set; }
    }
}
