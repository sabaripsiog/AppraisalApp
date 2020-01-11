
using ApplicationAppraisal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AppraisalApplication.Controllers
{
    public class GoalCategoriesController : ApiController
    {
        private AppraisalDBEntities db = new AppraisalDBEntities();
        [HttpGet]
        [Route("api/goalcategories")]
        public IHttpActionResult GetGoalCategories()
        {
            try
            {
                var listOfEmployees = db.GoalCategories.Select(r => new
                {
                    ID = r.ID,
                    Category = r.Category

                });
                return Ok(listOfEmployees.ToList());
            }
            catch (Exception)
            {

                return BadRequest();

            }
        }

        [HttpGet]
        [Route("api/getgoalcategory/{id=id}")]
        public IHttpActionResult Get(int id)
        {
            try
            {

                var entity = db.GoalCategories.FirstOrDefault(e => e.ID == id);

                if (entity != null)
                {
                    var listOfEmployees = new
                    {
                        ID = entity.ID,
                        Category = entity.Category
                    };
                    return Ok(listOfEmployees);
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
