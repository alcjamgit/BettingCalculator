using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BettingCalculator.Core.Enums
{
    public enum BetTypeEnum
    {
        Single = 1,
        Double = 2,
        Treble = 3,
        Accumulator = 4,
        Trixie = 5,
        Yankee = 6,
        Canadian = 7,
        Heinz = 8,
        SuperHeinz = 9,
        Goliath = 10,
        Block = 11


    }

    public enum BetTypeCategoryEnum
    {
        Basic = 1,
        FullCover = 2,
        FullCoverWithSingles = 3,
        AnyToCome = 4,
        Speciality = 5
    }

    public enum SelectionOutcomeEnum
    {
        Won = 1,
        Placed = 2,
        Lost = 3,
        VoidNr= 4
    }

}
