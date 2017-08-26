using BettingCalculator.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BettingCalculator.Core.Models
{
    public class BetInput
    {
        public BetTypeEnum BetType { get; set; }
        public double Stake { get; set; }
        public bool EachWay { get; set; }
        public IEnumerable<BetSelectionInput> BetSelections { get; set; }
        public bool? IncludeBonus { get; set; }
        public short? AccumulatorFoldSize { get; set; }
    }
}
