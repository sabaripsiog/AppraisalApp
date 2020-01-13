﻿using ApplicationAppraisal.Helpers;
using ApplicationAppraisal.Models;
using System;

using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Claims;

using System.Web.Http;

using WebApi.Utilities;

namespace WebApi.Controllers
{
    public class LoginController : ApiController
    {

        [Authorize]
        [HttpGet]
        [Route("api/login/authenticate")]
        public HttpResponseMessage GetAuthentication()
        {
            var identity = (ClaimsIdentity)User.Identity;
            var sid = identity.Claims.Where(c => c.Type == ClaimTypes.Sid)
                   .Select(c => c.Value).SingleOrDefault();
            UserSession current = new UserSession
            {
                employeeId = sid,
                name = identity.Name
            };
            HttpResponseMessage response;
            response = Request.CreateResponse(HttpStatusCode.OK, current);
            return response;

        }


        [HttpPost]
        [Route("api/login/authorize")]
        public IHttpActionResult GetAuthorization()
        {
            var identity = (ClaimsIdentity)User.Identity;
            var roles = identity.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value);
            return Ok("Authorized Access:" + identity.Name + ", " + "Role:" + string.Join(",", roles.ToList()));

        }

        [HttpGet]
        [Route("api/GetEmployeeDetails")]
        public IHttpActionResult Load(string username, string password)
        {
            using (AppraisalDBEntities entities = new AppraisalDBEntities())
            {
                var entity = entities.UserDetails.FirstOrDefault(e => e.Username == username && e.Password == password);
                var employee = entities.Employees.FirstOrDefault(e => e.ID == entity.EmployeeID);
                var listOfEmployees = new
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


                return Ok(listOfEmployees);



            }
        }
    }
}