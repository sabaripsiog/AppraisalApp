using AppraisalApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using System.Data.Objects;

namespace AppraisalApplication.Controllers
{
    public class EmployeesController : ApiController
    {
        private AppraisalEntities db = new AppraisalEntities();
        //[HttpGet]
        //[Route("api/getemployee")]
        //public IHttpActionResult GetEmployees()
        //{
        //    try
        //    {
        //        var listOfEmployees = db.Employees.Select(r => new
        //        {
        //            ID = r.ID,
        //            Name = r.Name,
        //            DOB = r.DOB,

        //            DOJ = r.DOJ,

        //            Email_ID = r.Email,
        //            BloodType = r.BloodType,


        //            Gender = r.Gender,

        //        });
        //        return Ok(listOfEmployees.ToList());
        //    }
        //    catch (Exception)

        //    {


        //        return BadRequest();

        //    }
        //}
        [HttpGet]
        [Route("api/getEmployee/{id=id}")]
        public IHttpActionResult Get(string id)
        {
            try
            {
               
                    var entity = db.Employees.FirstOrDefault(e => e.ID == id);

                    if (entity != null)
                    {
                    var listOfEmployees = new
                    {
                        ID = entity.ID,
                        Name = entity.Name,
                        DOB = entity.DOB,

                        DOJ = entity.DOJ,
                        Designation = entity.Designation,

                        BloodType = entity.BloodType,

                        Gender = entity.Gender,
                        Manager = RetreivalActions.getManager(entity.ManagerID)
                    };
                    return Ok(listOfEmployees);
                    }
                    else
                    {
                        return NotFound();
                    }
                
            }
            catch(Exception)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("api/Getallemployees")]
        public IHttpActionResult Load()
        {
            using (AppraisalEntities entities = new AppraisalEntities())
            {
                var listOfEmployees = entities.Employees.Select(r => new
                {
                    ID = r.ID,
                    Name = r.Name,
                    DOB = r.DOB,

                    DOJ = r.DOJ,
                    Designation =r.Designation,
                    Address = r.Address,
                    BloodType = r.BloodType,
                    Email = r.Email,
                    Gender = r.Gender,
                    ManagerID = r.ManagerID,
                    IsAppraiser = r.IsAppraiser,
                    IsHR = r.IsHR,
                    AppraisalPolicyID =r.AppraisalPolicyID,
                    AppraisalStatus = r.AppraisalStatus
                });
                return Ok(listOfEmployees.ToList());
            }
        }
        [HttpGet]
        [Route("api/GetDetails")]
        public IHttpActionResult GetDetails()
        {
            try
            {
                var currentDate = DateTime.Now.Date;
                using (AppraisalEntities entity = new AppraisalEntities())
                {
                    var appraisalEmployees = (from s in entity.Employees
                                              where ((EntityFunctions.DiffDays(s.DOJ, currentDate) % 365) > 333 && s.ManagerID != null)
                                              select s).Select(r => new
                                              {
                                                  ID = r.ID,
                                                  Name = r.Name,
                                                  DOB = r.DOB,

                                                  DOJ = r.DOJ,
                                                  Designation = r.Designation,
                                                  Address = r.Address,
                                                  BloodType = r.BloodType,
                                                  Email = r.Email,
                                                  Gender = r.Gender,
                                                  ManagerID = r.ManagerID,
                                                  IsAppraiser = r.IsAppraiser,
                                                  IsHR = r.IsHR,
                                                  AppraisalPolicyID = r.AppraisalPolicyID,
                                                  AppraisalStatus = r.AppraisalStatus,
                                                 
                                                  Manager = (from s in entity.Employees
                                                             where s.ID == r.ManagerID 
                                                             select s.Name)
                });
                    return Ok(appraisalEmployees.ToList());
                }
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpPut]
        [Route("api/UpdateEmployee/{id=id}")]
        public IHttpActionResult UpdateEmployee(string id, [FromBody] Employee employee)
        {
            try
            {

                var entity = db.Employees.FirstOrDefault(e => e.ID == id);

                if (entity != null)
                {

                    entity.ID = employee.ID;
                    entity.Name = employee.Name;
                    entity.DOB = employee.DOB;
                    entity.DOJ = employee.DOJ;
                    entity.Designation = employee.Designation;
                    entity.Address = employee.Address;
                    entity.BloodType = employee.BloodType;
                    entity.Email = employee.Email;
                    entity.Gender = employee.Gender;
                    entity.ManagerID = employee.ManagerID;
                    entity.IsAppraiser = employee.IsAppraiser;
                    entity.IsHR = employee.IsHR;
                    entity.AppraisalPolicyID = employee.AppraisalPolicyID;
                    entity.AppraisalStatus = employee.AppraisalStatus;

                    db.SaveChanges();
                    return Ok(db.Employees);
                }
                
                else
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


    }
}
