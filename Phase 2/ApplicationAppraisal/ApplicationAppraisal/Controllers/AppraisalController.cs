﻿using ApplicationAppraisal.Models;
using ApplicationAppraisal.Utilities;
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
        public IHttpActionResult PostAppraisalList([FromBody]Appraisal appraisal)
        {
            try
            {
                using (AppraisalDBEntities entities = new AppraisalDBEntities())
                {

                    entities.Appraisals.Add(appraisal);
                    entities.SaveChanges();

                    var newAppraisal = new
                    {
                        ID = appraisal.ID,
                        Status = appraisal.Status,
                        StartDate = appraisal.StartDate,
                        EndDate = appraisal.EndDate,
                        Employee_ID = appraisal.Employee_ID

                    };
                    
                    return Ok(newAppraisal);
                  
                };


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("api/GetAppraisalList")]
        public IHttpActionResult GetAppraisalList()
        {
            try
            {
                using (AppraisalDBEntities entities = new AppraisalDBEntities())
                {
                    var AppraisalList = entities.Appraisals.Select(r => new
                    {
                        ID = r.ID,
                        Status = r.Status,
                        StartDate = r.StartDate,
                        EndDate = r.EndDate,
                        Employee_ID = r.Employee_ID
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
                using (AppraisalDBEntities entities = new AppraisalDBEntities())
                {

                    entities.Appraisals.Add(appraisal);
                    entities.SaveChanges();

                    var newAppraisal = new
                    {
                        ID = appraisal.ID,
                        Status = appraisal.Status,
                        StartDate = appraisal.StartDate,
                        EndDate = appraisal.EndDate,
                        Employee_ID = appraisal.Employee_ID

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
        [Route("api/GetParticularAppraisal")]
        public IHttpActionResult GetParticularAppraisal(string id)
        {
            try
            {

                using (AppraisalDBEntities entities = new AppraisalDBEntities())
                {
                    var entity = entities.Appraisals.FirstOrDefault(e => e.Employee_ID == id && e.Status != "Finished");
                    var AppraisalList = entities.Appraisals.Select(r => new
                    {
                        ID = r.ID,
                        Status = r.Status,
                        StartDate = r.StartDate,
                        EndDate = r.EndDate,
                        Employee_ID = r.Employee_ID
                    });
                    return Ok(AppraisalList.ToList());
                }


            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
    }
}