using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace ApplicationAppraisal.Utilities
{
    public class MailSender
    {
        public static void EmailGeneration(string name, string role, string emailID,string employee)
        {



            var fromEmail = new MailAddress("sampletest649@gmail.com", "Appraisal");
            var toEmail = new MailAddress(emailID);
            var fromEmailPassword = "Psiog@123"; 



            string subject = "";
            string body = "";


            if (role == "True")
            {

                subject = "Psiog Digital (P) Ltd";
                body = "<br/><br/>" +
                    "<b> Dear  " + name + ";</b>" + "<br/><br/>" +

                    employee+"'s"+"appraisal has been initiated. Login through the link below to set his/her appraisal form." +
                    "<br/><br/>" +
                    "<a href='" + "http://localhost:4200/login" + "'>" + "http://localhost:4200/login" + "</a> " + "<br/><br/>" +
                    "<img src=https://media.glassdoor.com/sqll/945068/psiog-digital-squarelogo-1468915701259.png />" + "<br/>" +
                    "<b>Warm Regards</b>" + "<br/>" + "<b>HR Desk </b>";
            }
            else
            {
                subject = "Psiog Digital (P) Ltd";
                body = "<br/><br/>" +
                    "<b> Dear  " + employee + ";</b>" + "<br/><br/>" +

                    "Your appraisal process has been initiated. Login through the link below to fill the appraisal form." +
                    "<br/><br/>" +
                    "<a href='" + "http://localhost:4200/login" + "'>" + "http://localhost:4200/login" + "</a> " + "<br/><br/>" +
                    "<img src=https://media.glassdoor.com/sqll/945068/psiog-digital-squarelogo-1468915701259.png />" + "<br/>" +
                    "<b>Warm Regards</b>" + "<br/>" + "<b>HR Desk </b>";
            }

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword)
            };



            using (var message = new MailMessage(fromEmail, toEmail)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            })
                smtp.Send(message);
        }
    }
}