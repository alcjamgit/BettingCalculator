using BettingCalculator.Web.Models;
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

        [HttpGet]
        [Route("api/betCalculatorApi/betTypes")]
        public IHttpActionResult BetType()
        {
            var result = new List<BetTypeModel>
            {
                new BetTypeModel { Id = 1, Text = "Single", BetSelectionMin = 0, BetSelectionMax = 1 },
            };

            return Ok<IEnumerable<BetTypeModel>>(result);
        }
    }
}