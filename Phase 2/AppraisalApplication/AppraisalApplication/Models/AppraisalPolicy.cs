//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AppraisalApplication.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class AppraisalPolicy
    {
        public AppraisalPolicy()
        {
            this.Employees = new HashSet<Employee>();
        }
    
        public int ID { get; set; }
        public int TimePeriod { get; set; }
    
        public virtual ICollection<Employee> Employees { get; set; }
    }
}
