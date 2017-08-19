
(function ($, window, document) {

    $(document).ready(function () {

        initializeBetTypePicker();
        setupEachWayToggle();
        initializePopOvers();
        setBetSelectionHandler();
        eachWayToggleHandler()
        
        /*Bet options*/
        betOptionBtnHandler();
        initializeBetStatusPickers();
        initializeBetPlacementPickers();

        /*Bet option modal*/
        deadHeatHandler();
        jointFavoriteHandler();
        rule4Handler();

        initializeValues();
    });

    function initializeValues() {
        $('.each-way-toggle').removeClass('active');
        $('.each-way-toggle[data-each-way-value="yes"]').addClass('active');
        $('#unitStake').val(1);
        $('#bet-selection-count').val(1);
        $('#set-bet-selection').click();

    }

    function initializeBetTypePicker(selector) {
        $('#selectedBetType').selectpicker({
            size: 'auto',
            liveSearch: true,
            width: '100%',
            noneSelectedText: 'Please select bet type'
        });
    }

    function betOptionBtnHandler() {
        $('#betSelectionModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget) // Button that triggered the modal
            var recipient = button.data('option-index') // Extract info from data-* attributes
            
            var modal = $(this)
            modal.find('.modal-title').text('Bet Option ' + recipient)
            modal.find('.modal-body input').val(recipient)
        })
    }
    function initializeBetStatusPickers(selector) {

        $('.bet-status-picker').selectpicker({
            width: '100%',
        }).on('changed.bs.select', function (e) {
            var status = $(this).val();
            var row = $(this).closest('tr');
            var eachWayVal = $('.each-way-toggle.active').data('each-way-value');

            var betPlacementPicker = row.find('.bet-placement-picker');
            var winOdd = row.find('.win-odd-numerator,.win-odd-denominator,.win-odd-slash');
            var betOptionBtn = row.find('.bet-option-btn');

            //show or hide win odds
            if ((status === "won" || status === "placed") && eachWayVal === 'yes') {
                winOdd.removeClass('hide');
                betPlacementPicker.removeClass('hide');
                betOptionBtn.removeAttr("disabled");
            } else if (status === "won" && eachWayVal === 'no') {
                winOdd.removeClass('hide');
                betPlacementPicker.addClass('hide');
                betOptionBtn.removeAttr("disabled");
            } else {
                winOdd.addClass('hide');
                betPlacementPicker.addClass('hide');
                betOptionBtn.attr("disabled", "disabled");
            }

            //set attributes to be used by each way toggle
            var betStatuses = getBetStatusObject();
            

            $.each(betStatuses, function (val, text) {
                betPlacementPicker.removeClass(val);
                winOdd.removeClass(val);
                //betOptionBtn.removeClass(val);
            });
            betPlacementPicker.addClass(status);
            winOdd.addClass(status);
            //betOptionBtn.addClass(status);
            
        });
    }

    function eachWayToggleHandler() {

        $('.each-way-toggle').on('click', function (e) {
            var eachWayVal = $(this).data('each-way-value');
            var winOddsWon = $('.win-odd-numerator.won,.win-odd-denominator.won,.win-odd-slash.won');
            var winOddsPlaced = $('.win-odd-numerator.placed,.win-odd-denominator.placed,.win-odd-slash.placed');

            if (eachWayVal === 'yes') {
                $(".bet-placement-picker.won,.bet-placement-picker.placed").removeClass('hide')
                winOddsWon.removeClass('hide');
                winOddsPlaced.removeClass('hide');
            } else {
                $(".bet-placement-picker").addClass('hide')
            }

        });
    }

    function initializeBetPlacementPickers(selector) {
        $('.bet-placement-picker').selectpicker({
            width: '100%'
        });
    }



    function getBetStatusObject() {
        return {
            "won": "Won",
            "placed": "Placed" ,
            "lost": "Lost" ,
            "voidnr": "Void NR" 
        };
    }

    function setBetSelectionHandler() {

        var betStatuses = getBetStatusObject();
        

        $("#set-bet-selection").on("click", function (e) {
            var numSelections = $('#bet-selection-count').val();
            if (!numSelections || isNaN(numSelections)) {
                alert('Please set number of selections');
                return;
            }

            $("#bet-selection-table tbody").empty();

            var betTypeSelectOptions = "";
            /*Bet Status Select*/
            $.each(betStatuses, function (val, text) {
                betTypeSelectOptions += "<option value='" + val + "'>" + text + "</option>";
            });

            var $betStatusSelect = $('<select>', {
                class: 'bet-status-picker'
            });
            $betStatusSelect.append(betTypeSelectOptions);
            var betStatusSelect = $("<div/>").append($betStatusSelect).html();

            

            /*Bet Placement Select*/
            var betPlacementOptions = "";
            var placeCount = 6;
            for (var i = 0; i < placeCount; i++) {
                var placeRatioText = '1/' + (i + 1);
                betPlacementOptions += "<option value='" + (i + 1) + "'>" + placeRatioText + "</option>";
            }

            var $betPlacementSelect = $('<select>', {
                class: 'bet-placement-picker won',
            });
            $betPlacementSelect.append(betPlacementOptions);
            var betPlacementSelect = $("<div/>").append($betPlacementSelect).html();

            /*Bet Status Select End*/

            var rows = "";
            for (var i = 0; i < numSelections; i++) {
                rows += "<tr>";
                rows += "<td width='9%'><button type='button' class='btn btn-default bet-option-btn' data-toggle='modal' data-target='#betSelectionModal' "
                    + "data-option-index = '" + (i+1) + "'"
                    + ">"
                    + (i + 1) + "</button></td>";
                rows += "<td width='30%'>" + betStatusSelect + "</td>";
                rows += "<td width='20%' class='bet-selection-win-odd-cell'><input type='number' class='form-control win-odd-numerator won' value='1'></td>";
                rows += "<td width='1%' style='vertical-align:middle'><span class='win-odd-slash'>/</span></td>"
                rows += "<td width='20%' class='bet-selection-win-odd-cell'><input type='number' class='form-control win-odd-denominator won' value='1'></td>";
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

    function deadHeatHandler() {
        $("#toggleDeadHeat").on('click', function (e) {
            $("#dead-heat-container").toggleClass('hidden');

            if ($("#dead-heat-container").is(':hidden')) {
                $(this).text('+');
            } else {
                $(this).text('-');
            }
            
        });
    }

    function jointFavoriteHandler() {
        $("#toggleJointFavorite").on('click', function (e) {
            $("#joint-favorite-container").toggleClass('hidden');

            if ($("#joint-favorite-container").is(':hidden')) {
                $(this).text('+');
            } else {
                $(this).text('-');
            }

        });
    }

    function rule4Handler() {
        $("#rule4-picker").selectpicker({
            width: '100%'
        });
    }
})(window.jQuery, window, document);