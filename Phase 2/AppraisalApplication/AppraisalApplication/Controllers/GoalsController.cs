using AppraisalApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AppraisalApplication.Controllers
{
    public class GoalsController : ApiController
    {
        private AppraisalEntities db = new AppraisalEntities();

        [HttpPost]
        [Route("api/PostGoals")]
        public IHttpActionResult CreateNewGoal([FromBody] Goal goal)
        {
            using (AppraisalEntities entities = new AppraisalEntities())
            {
                entities.Goals.Add(goal);
                entities.SaveChanges();

                var listOfEmployees = new
                {
                    ID = goal.ID,
                    GoalDescription = goal.GoalDescription,
                    GoalCategoryID = goal.GoalCategoryID
                 
                };
                return Ok(listOfEmployees);
            }
        }

        [HttpPut]
        public IHttpActionResult UpdateGoal(int id,[FromBody] Goal goal)
        {
            try
            {
                using (AppraisalEntities entities = new AppraisalEntities())
                {
                    var entity = entities.Goals.FirstOrDefault(e => e.ID == id);

                    if (entity == null)
                    {
                        return NotFound();
                    }
                    else
                    {
                        entity.ID = goal.ID;
                        entity.GoalDescription = goal.GoalDescription;
                        entity.GoalCategoryID = goal.GoalCategoryID;

                        entities.SaveChanges();

                        var listOfEmployees = new
                        {
                            ID = goal.ID,
                            GoalDescription = goal.GoalDescription,
                            GoalCategoryID = goal.GoalCategoryID

                        };
                        return Ok(listOfEmployees);

                    }
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
