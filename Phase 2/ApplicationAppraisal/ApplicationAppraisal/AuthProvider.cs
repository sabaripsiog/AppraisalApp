using ApplicationAppraisal.Models;
using ApplicationAppraisal.Utilities;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace ApplicationAppraisal
{
    public class AuthProvider : OAuthAuthorizationServerProvider
    {

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            string message = DBOperations.ValidateLogin(context.UserName, context.Password, out UserDetail user);
            using (AppraisalDBEntities obj = new AppraisalDBEntities())
            {
                if (user != null)
                {
                    identity.AddClaim(new Claim(ClaimTypes.Role, user.Username));

                    var result = from logger in obj.UserDetails
                                 join employee in obj.Employees on logger.EmployeeID equals employee.ID
                                 select new
                                 {
                                     username = employee.Name,
                                     employeeid = employee.ID
                                 };

                    foreach (var l in result)
                    {
                        if (l.employeeid == user.EmployeeID)
                        {
                            identity.AddClaim(new Claim("username", l.username));
                            identity.AddClaim(new Claim(ClaimTypes.Name, l.username));
                            identity.AddClaim(new Claim(ClaimTypes.Sid, l.employeeid));
                            context.Validated(identity);
                            break;

                        }
                        else
                        {
                            context.SetError(message);
                        }

                    }

                }
                else
                {
                    context.SetError(message);
                }
            }
            
        }
    }
}