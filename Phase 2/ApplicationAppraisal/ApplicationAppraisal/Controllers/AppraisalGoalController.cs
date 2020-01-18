using ApplicationAppraisal.Helpers;
using ApplicationAppraisal.Models;
using ApplicationAppraisal.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApplicationAppraisal.Controllers
{
    public class AppraisalGoalController : ApiController
    {
        private AppraisalDBEntities db = new AppraisalDBEntities();
        [HttpPost]
        [Route("api/postEmployeeAppraisalGoals")]
        public IHttpActionResult PostEmployeeAppraisalGoals([FromBody]AppraisalGoal appraisalGoal)
        {
            try
            {
                db.AppraisalGoals.Add(appraisalGoal);
                db.SaveChanges();

                var newAppraisal = new
                {
                    ManagerComments = appraisalGoal.ManagerComments,
                    EmployeeComments = appraisalGoal.EmployeeComments,
                    ManagerRating = appraisalGoal.ManagerRating,
                    EmployeeRating = appraisalGoal.EmployeeRating,
                    Appraisal_ID = appraisalGoal.Appraisal_ID,
                    Goal = appraisalGoal.Goal,
                    GoalCategory_ID = appraisalGoal.GoalCategory_ID,
                    Priority = appraisalGoal.Priority,

                };
                return Ok(newAppraisal);

            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("api/updateEmployeeAppraisalGoals/{id=id}")]
        public IHttpActionResult UpdateEmployeeAppraisalGoals([FromBody]AppraisalGoal appraisalGoal, int id)
        {
            try
            {
                var entity = db.AppraisalGoals.FirstOrDefault(e => e.ID == id);

                if (entity != null)
                {
                    entity.ManagerComments = appraisalGoal.ManagerComments;
                    entity.EmployeeComments = appraisalGoal.EmployeeComments;
                    entity.ManagerRating = appraisalGoal.ManagerRating;
                    entity.EmployeeRating = appraisalGoal.EmployeeRating;
                    entity.Appraisal_ID = appraisalGoal.Appraisal_ID;
                    entity.Goal = appraisalGoal.Goal;
                    entity.GoalCategory_ID = appraisalGoal.GoalCategory_ID;
                    entity.Priority = appraisalGoal.Priority;

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

        [HttpGet]
        [Route("api/getAllGoals/{id=id}")]
        public IHttpActionResult GetAllGoals(int id)
        {
            try
            {

                var entity = (from s in db.AppraisalGoals
                              where s.Appraisal_ID == id
                              select s).Select(r => new
                              {
                                  ID = r.ID,
                                  ManagerComments = r.ManagerComments,
                                  EmployeeComments = r.EmployeeComments,
                                  ManagerRating = r.ManagerRating,
                                  EmployeeRating = r.EmployeeRating,
                                  Appraisal_ID = r.Appraisal_ID,
                                  Goal = r.Goal,
                                  GoalCategory_ID = r.GoalCategory_ID,
                                  Priority = r.Priority,
                              });

                return Ok(entity.ToList());

            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }




        [HttpGet]
        [Route("api/viewPDF/{id=id}")]
        public IHttpActionResult GetPDF(int id, string role, string name, string designation, DateTime doj)
        {
            try
            {

                var entity = (from s in db.AppraisalGoals
                              where s.Appraisal_ID == id
                              select s).Select(r => new ProductGoals
                              {
                                  ID = r.ID,
                                  ManagerComments = r.ManagerComments,
                                  EmployeeComments = r.EmployeeComments,
                                  ManagerRating = r.ManagerRating,
                                  EmployeeRating = r.EmployeeRating,
                                  Appraisal_ID = r.Appraisal_ID,
                                  Goal = r.Goal,
                                  GoalCategory_ID = r.GoalCategory_ID,
                                  Priority = r.Priority,
                              }).ToList();

                PDFView.getPDFView(entity, role, name, designation,doj);

                if (entity != null)
                {


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
