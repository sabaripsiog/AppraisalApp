using System;
using ApplicationAppraisal.Models;
using ApplicationAppraisal.Utilities;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void ValidateLogin_LoginSuccesfull()
        {
            var testString = "Login Successful!";
            var result = DBOperations.ValidateLogin("savitha", "1234", out UserDetail user);
            Assert.AreEqual(testString, result);
        }

        [TestMethod]
        public void ValidateLogin_IncorrectPassword()
        {
            var testString = "Incorrect Password";
            var result = DBOperations.ValidateLogin("savitha", "12324", out UserDetail user);
            Assert.AreEqual(testString, result);
        }

        [TestMethod]
        public void ValidateLogin_InvalidCredentials()
        {
            var testString = "Invalid Credentials";
            var result = DBOperations.ValidateLogin("savit", "12324", out UserDetail user);
            Assert.AreEqual(testString, result);
        }
    }
}
