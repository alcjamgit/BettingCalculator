using BettingCalculator.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BettingCalculator.Core.Models
{
    public class BetSelectionInput
    {
        public short Index { get; set; }
        public SelectionOutcomeEnum Outcome { get; set; }
        public short OddsNumerator { get; set; }
        public short OddsDenominator { get; set; }
        public short Place { get; set; }
        public int Rule { get; set; }

        public bool DeadHeatEnabled { get; set; }
        public short? DeadHeatTotal { get; set; }

        public bool JointFavoritEnabled { get; set; }
        public short? JointFavoriteTotal { get; set; }
        public short? JointFavoriteWinner { get; set; }
        public short? JointFavoriteNr { get; set; }

    }
}
