
(function ($, window, document) {

    $(document).ready(function () {

        initializeBetTypePicker();
        setupEachWayToggle();
        initializePopOvers();
        initializeBetStatusPickers();
        initializeBetPlacementPickers();
        setBetSelectionHandler();
    });

    function initializeBetTypePicker(selector) {
        $('#selectedBetType').selectpicker({
            size: 'auto',
            liveSearch: true,
            width: '100%',
            noneSelectedText: 'Please select bet type'
        });
    }

    function initializeBetStatusPickers(selector) {

        $('.bet-status-picker').selectpicker({
            width: '100%',
        }).on('changed.bs.select', function (e) {
            var status = $(this).val();
            var row = $(this).closest('tr');
            if (status != "won") {
                row.find('.win-odd-numerator').addClass('hide');
                row.find('.win-odd-denominator').addClass('hide');
                row.find('.win-odd-slash').addClass('hide');

            } else {
                row.find('.win-odd-numerator').removeClass('hide');
                row.find('.win-odd-denominator').removeClass('hide');
                row.find('.win-odd-slash').removeClass('hide');
            }

            if (true) {

            }
        });
    }

    function initializeBetPlacementPickers(selector) {
        $('.bet-placement-picker').selectpicker({
            width: '100%',
        });
    }

    function setBetSelectionHandler() {

        var betStatuses = {
            "won": "Won",
            "placed": "Placed" ,
            "lost": "Lost" ,
            "voidnr": "Void NR" 
        };
        var betTypeSelectOptions = "";

        $("#set-bet-selection").on("click", function (e) {
            var numSelections = $('#bet-selection-count').val();
            if (!numSelections || isNaN(numSelections)) {
                alert('Please set number of selections');
                return;
            }

            $("#bet-selection-table tbody").empty();

            /*Bet Status Select*/
            $.each(betStatuses, function (val, text) {
                betTypeSelectOptions += "<option value='" + val + "'>" + text + "</option>";
            });

            var $betStatusSelect = $('<select>', {
                class: 'bet-status-picker'
            });
            $betStatusSelect.append(betTypeSelectOptions);
            var betStatusSelect = $("<div/>").append($betStatusSelect).html();

            /*Bet Status Select End*/

            /*Bet Placement Select*/
            var betPlacementOptions = "";
            var placeCount = 5;
            for (var i = 0; i < placeCount; i++) {
                var placeRatioText = (i + 1) + '/' + placeCount;
                betPlacementOptions += "<option value='" + (i + 1) + "'>" + placeRatioText + "</option>";
            }

            var $betPlacementSelect = $('<select>', {
                class: 'bet-placement-picker'
            });
            $betPlacementSelect.append(betPlacementOptions);
            var betPlacementSelect = $("<div/>").append($betPlacementSelect).html();

            /*Bet Status Select End*/

            var rows = "";
            for (var i = 0; i < numSelections; i++) {
                rows += "<tr>";
                rows += "<td width='9%'><button type='button' class='btn btn-default'>" + (i + 1) + "</button></td>";
                rows += "<td width='30%'>" + betStatusSelect + "</td>";
                rows += "<td width='20%' class='bet-selection-win-odd-cell'><input type='number' class='form-control win-odd-numerator' value='1'></td>";
                rows += "<td width='1%' style='vertical-align:middle'><span class='win-odd-slash'>/</span></td>"
                rows += "<td width='20%' class='bet-selection-win-odd-cell'><input type='number' class='form-control win-odd-denominator' value='1'></td>";
                rows += "<td width='20%'>" + betPlacementSelect + "</td>";
                rows += "</tr>";
            }
            $("#bet-selection-table").append(rows);
            initializeBetStatusPickers();
            //$('.bet-status-picker').selectpicker('refresh');
            //$('.bet-placement-picker').selectpicker('refresh');
            initializeBetPlacementPickers();
        });
    }



    function setupEachWayToggle() {
        $('.each-way-toggle').click(function (e) {
            $('.each-way-toggle').not(this).removeClass('active');
            $(this).toggleClass('active');
            e.preventDefault();
        });
    }

    function initializePopOvers() {
        $('.tooltip-link').tooltip({
            placement: 'bottom'
        });
    }

})(window.jQuery, window, document);