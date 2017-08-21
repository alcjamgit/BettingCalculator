using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BettingCalculator.Web.Models
{
    public class BetTypeModel
    {
        public short Id { get; set; }
        public string Text { get; set; }
        public short BetSelectionMin { get; set; }
        public short BetSelectionMax { get; set; }
        public bool HasBonunOption { get; set; }
    }
}