using AppraisalApplication.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace AppraisalApplication
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }
 
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            AppraisalEntities entities = new AppraisalEntities();


            var user = entities.UserDetails.FirstOrDefault(u =>
            u.Username.Equals(context.UserName, StringComparison.OrdinalIgnoreCase)
            && u.Password == context.Password);
            if (user != null) {
               
                identity.AddClaim(new Claim("Username", user.Username));
                identity.AddClaim(new Claim("EmployeeID", user.EmployeeID));
               
                context.Validated(identity);
            }
            else
                return;
        }
    }
}