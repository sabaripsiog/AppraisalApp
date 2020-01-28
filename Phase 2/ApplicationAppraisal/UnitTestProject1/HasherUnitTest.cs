using System;
using AppraisalApplication.Utilities;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestProject1
{
    [TestClass]
    public class HasherUnitTest
    {
        [TestMethod]
        public void HashString_ReturnsHashedValue()
        {
            var testString = "A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=";
            var result = Hasher.HashString("1234");
            Assert.AreEqual(testString, result);
        }

        [TestMethod]
        public void EncodeId_ReturnsEncodedValue()
        {
            var testString = "UDA1";
            var result = Hasher.EncodeId("P05");
            Assert.AreEqual(testString, result);
        }

        [TestMethod]
        public void DecodeId_ReturnsDecodedValue()
        {
            var testString = "P05";
            var result = Hasher.DecodeId("UDA1");
            Assert.AreEqual(testString, result);
        }
    }
}
