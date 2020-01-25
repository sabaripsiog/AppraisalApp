using ApplicationAppraisal.Helpers;
using ApplicationAppraisal.Models;
using ApplicationAppraisal.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AppraisalApplication.Utilities;

namespace ApplicationAppraisal.Controllers
{
    public class UserDetailController : ApiController
    {
        private AppraisalDBEntities db = new AppraisalDBEntities();
        [HttpGet]
        [Route("api/getUsernames")]
        public IHttpActionResult GetUsernames()
        {
            try
            {
                using (AppraisalDBEntities entities = new AppraisalDBEntities())
                {
                    var usernameList = entities.UserDetails.Select(r => new
                    {
                        UserName = r.EmployeeID
                    });
                    return Ok(usernameList.ToList());
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("api/forgot")]
        public IHttpActionResult PostForgotPassword([FromBody]UserDetail userDetail)
        {
            try
            {
                string MailId = db.Employees.FirstOrDefault(e => e.ID == userDetail.EmployeeID).Email;
                MailSender.ForgotPassMail(MailId,userDetail.EmployeeID);
                var user = new
                {
                    EmployeeID = userDetail.EmployeeID
                };
                return Ok(user);

            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("api/UpdatePassword/{id=id}")]
        public IHttpActionResult UpdatePassword(string id, string password)
        {
            try
            {
                string Hashedpassword = Hasher.HashString(password);
                var entity = db.UserDetails.FirstOrDefault(e => e.EmployeeID == id);

                if (entity != null)
                {

                    entity.Password = Hashedpassword;
                   
                    db.SaveChanges();
               
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
    }
}
