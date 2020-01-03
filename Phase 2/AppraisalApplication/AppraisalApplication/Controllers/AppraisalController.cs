using AppraisalApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AppraisalApplication.Controllers
{
    public class AppraisalController : ApiController
    {
        [HttpPost]
        [Route("api/PostAppraisalList")]
        public IHttpActionResult PostAppraisalList([FromBody] Appraisal appraisal)
        {
            try
            {
                using (AppraisalEntities entities = new AppraisalEntities())
                {

                    entities.Appraisals.Add(appraisal);
                    entities.SaveChanges();

                    var newAppraisal = new
                    {
                        ID = appraisal.ID,
                        Status = appraisal.Status,
                        StartDate = appraisal.StartDate,
                        EndDate = appraisal.EndDate,
                        EmployeeID = appraisal.EmployeeID

                    };
                    return Ok(newAppraisal);
                };


            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Route("api/GetAppraisalList")]
        public IHttpActionResult GetAppraisalList()
        {
            try
            {
                using (AppraisalEntities entities = new AppraisalEntities())
                {
                    var AppraisalList = entities.Appraisals.Select(r => new
                    {
                        ID = r.ID,
                        Status = r.Status,
                        StartDate = r.StartDate,
                        EndDate = r.EndDate,
                        EmployeeID = r.EmployeeID
                    });
                    return Ok(AppraisalList.ToList());
                }


            }
            catch (Exception)
            {
                return BadRequest();
            }

        }


        [HttpPut]
        [Route("api/UpdateList")]
        public IHttpActionResult UpdateList([FromBody] Appraisal appraisal)
        {
            try
            {
                using (AppraisalEntities entities = new AppraisalEntities())
                {

                    entities.Appraisals.Add(appraisal);
                    entities.SaveChanges();

                    var newAppraisal = new
                    {
                        ID = appraisal.ID,
                        Status = appraisal.Status,
                        StartDate = appraisal.StartDate,
                        EndDate = appraisal.EndDate,
                        EmployeeID = appraisal.EmployeeID

                    };
                    return Ok(newAppraisal);
                };


            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


    }
}
