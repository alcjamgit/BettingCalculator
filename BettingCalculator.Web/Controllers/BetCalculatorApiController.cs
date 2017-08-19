using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace BettingCalculator.Web.Controllers
{
    public class BetCalculatorApiController: ApiController
    {
        public class MyClass
        {
            public string Id { get; set; }
            public string Desc { get; set; }
        }

        public IHttpActionResult Post([FromBody]MyClass myClass)
        {
            return Ok<MyClass>(myClass);
        }
    }
}