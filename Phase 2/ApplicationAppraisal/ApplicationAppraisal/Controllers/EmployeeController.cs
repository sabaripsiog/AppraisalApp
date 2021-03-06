﻿
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using System.Data.Objects;
using ApplicationAppraisal.Models;
using ApplicationAppraisal.Utilities;
using ApplicationAppraisal.Helpers;

namespace AppraisalApplication.Controllers
{
    public class EmployeesController : ApiController
    {
        private AppraisalDBEntities db = new AppraisalDBEntities();
        
       
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
                        Address = entity.Address,
                        BloodType = entity.BloodType,
                        Email = entity.Email,
                        Gender = entity.Gender,
                        ManagerID = entity.ManagerID,
                        IsAppraiser = entity.IsAppraiser,
                        IsHR = entity.IsHR,
                        AppraisalPolicy_ID = entity.AppraisalPolicy_ID,
                        AppraisalStatus = entity.AppraisalStatus,
                        Manager = RetreivalActions.getManager(entity.ManagerID)
                    };

                    return Ok(listOfEmployees);
                }
                else
                {
                    return NotFound();
                }

            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("api/Getallemployees")]
        public IHttpActionResult Load()
        {
            try
            {
                using (AppraisalDBEntities entities = new AppraisalDBEntities())
                {
                    var listOfEmployees = entities.Employees.Select(r => new
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
                        AppraisalPolicy_ID = r.AppraisalPolicy_ID,
                        AppraisalStatus = r.AppraisalStatus,
                        GmailID = r.GmailID,
                        FBmailID = r.FBmailID
                    });
                    return Ok(listOfEmployees.ToList());
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("api/GetDetails")]
        public IHttpActionResult GetDetails()
        {
            try
            {
                var currentDate = DateTime.Now.Date;
                using (AppraisalDBEntities entity = new AppraisalDBEntities())
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
                                                  AppraisalPolicy_ID = r.AppraisalPolicy_ID,
                                                  AppraisalStatus = r.AppraisalStatus,

                                                  Manager = (from s in entity.Employees
                                                             where s.ID == r.ManagerID
                                                             select s.Name)
                                              });
                    
                    return Ok(appraisalEmployees.ToList());
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
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
                    entity.AppraisalPolicy_ID = employee.AppraisalPolicy_ID;
                    entity.AppraisalStatus = employee.AppraisalStatus;

                    string Manager = RetreivalActions.getManager(entity.ManagerID);
                    string mailID = RetreivalActions.getManagerMail(entity.ManagerID);
                    db.SaveChanges();
                    MailSender.EmailGeneration(Manager,"True",mailID,entity.Name);
                    return Ok(db.Employees);
                }

                else
                {
                    return NotFound();
                }

            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/GetMyEmployees")]
        public IHttpActionResult GetMyEmployees(string id)
        {
            try
            {
                using (AppraisalDBEntities entities = new AppraisalDBEntities())
                {

                    var listOfEmployees = (from s in entities.Employees
                                           where (s.ManagerID == id && s.AppraisalStatus != "Yet to initiate")
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
                                               AppraisalPolicy_ID = r.AppraisalPolicy_ID,
                                               AppraisalStatus = r.AppraisalStatus
                                           });


                    return Ok(listOfEmployees.ToList());
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("api/UpdateEmployeeStatus/{id=id}")]
        public IHttpActionResult UpdateEmployeeStatus(string id, [FromBody] Employee employee)
        {
            try
            {

                var entity = db.Employees.FirstOrDefault(e => e.ID == id);

                if (entity != null)
                {

                    entity.AppraisalStatus = employee.AppraisalStatus;

                    db.SaveChanges();
                    if (employee.AppraisalStatus == "Form set by Manager")
                    {
                        MailSender.EmailGeneration(entity.ManagerID, "False", entity.Email, entity.Name);
                    }
                    return Ok(entity);
                }

                else
                {
                    return NotFound();
                }

            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("api/AddEmployee")]
        public IHttpActionResult PostEmployee([FromBody]Employee employee)
        {
            try
            {
                using (AppraisalDBEntities entities = new AppraisalDBEntities())
                {

                    entities.Employees.Add(employee);
                    entities.SaveChanges();

                    var newEmployee = new
                    {

                        ID = employee.ID,
                        Name = employee.Name,
                        DOB = employee.DOB,

                        DOJ = employee.DOJ,
                        Designation = employee.Designation,
                        Address = employee.Address,
                        BloodType = employee.BloodType,
                        Email = employee.Email,
                        Gender = employee.Gender,
                        ManagerID = employee.ManagerID,
                        IsAppraiser = employee.IsAppraiser,
                        IsHR = employee.IsHR,
                        AppraisalPolicy_ID = employee.AppraisalPolicy_ID,
                        AppraisalStatus = employee.AppraisalStatus

                    };

                    return Ok(newEmployee);

                };


            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }


        [HttpGet]
        [Route("api/checkEmployeeSocialMail")]
        public IHttpActionResult CheckEmployeeSocialMail(string mail)
        {
            try
            {
                using (AppraisalDBEntities entities = new AppraisalDBEntities())
                {
                    var entity = entities.Employees.FirstOrDefault(e => e.GmailID == mail || e.FBmailID == mail);

                    if(entity != null)
                    {
                        var selectedEmployee = new
                        {
                            ID = entity.ID,
                            Name = entity.Name,
                            DOB = entity.DOB,

                            DOJ = entity.DOJ,
                            Designation = entity.Designation,
                            Address = entity.Address,
                            BloodType = entity.BloodType,
                            Email = entity.Email,
                            Gender = entity.Gender,
                            ManagerID = entity.ManagerID,
                            IsAppraiser = entity.IsAppraiser,
                            IsHR = entity.IsHR,
                            AppraisalPolicy_ID = entity.AppraisalPolicy_ID,
                            AppraisalStatus = entity.AppraisalStatus,
                            GmailID = entity.GmailID,
                            FBmailID = entity.FBmailID
                        };
                        return Ok(selectedEmployee);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
    }
    
}
