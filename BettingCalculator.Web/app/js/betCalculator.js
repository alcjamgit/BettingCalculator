
(function ($, window, document) {

    $(document).ready(function () {

        initializeBetTypePicker();
        setupEachWayToggle();
        setupBonusToggle();
        initializePopOvers();
        setBetSelectionHandler();
        eachWayToggleHandler();
        calculateHandler();

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

        $('.bonus-toggle').removeClass('active');
        $('.bonus-toggle[data-bonus-value="yes"]').addClass('active');

        $('#unitStake').val(1);
        $('#betSelectionCount').val(1);
        $('#set-bet-selection').click();

    }

    function calculateHandler() {
        $('#calculateBet').on('click', function (e) {

            var data = { id: "1", desc: "great" };

            calculateBet(data).done(function (resp) {
                toastr.success('Calculation done')
            }).fail(function (resp) {
                toastr.error('Failed');
            });
        });

    }

    function calculateBet(data) {
        return $.ajax({
            url: "api/BetCalculatorApi",
            type: "POST",
            data: data
        });
    }


    function initializeBetTypePicker(selector) {
        $('#selectedBetType').selectpicker({
            size: 'auto',
            liveSearch: true,
            width: '100%',
            noneSelectedText: 'Please select bet type'
        }).on('changed.bs.select', function (e) {
            var elem = e.target;
            var newVal = elem.value;
            var selectedOption = $('option:selected', this);
            var minSelection = selectedOption.data('min-selection');
            var maxSelection = selectedOption.data('max-selection');
            var hasBonus = selectedOption.data('has-bonus');
            var betSelectionElem = $('#betSelectionCount');

            if (isNaN(minSelection) || isNaN(maxSelection))
                return; //todo put toastr message

            if (minSelection != maxSelection) {
                $('#rangedSelectionContainer').removeClass('hidden');
                $('#fixedSelectionContainer').addClass('hidden');
                $('#selectionCountMin').text(minSelection);
                $('#selectionCountMax').text(maxSelection);
                betSelectionElem.val(minSelection);
                betSelectionElem.prop('disabled', false);
            } else {
                $('#rangedSelectionContainer').addClass('hidden');
                $('#fixedSelectionContainer').removeClass('hidden');
                $('#fixedSelectionCount').text(minSelection);
                betSelectionElem.val(minSelection);
                betSelectionElem.prop('disabled', true);
            }

            if (hasBonus) {
                $('#bonusOptionContainer').removeClass('hidden');
            } else {
                $('#bonusOptionContainer').addClass('hidden');
            }


        }).on('shown.bs.select', function () {
            ////hide live search on mobile, since keyboard gets in the way of the options
            //if ($(window).width() < 768) {
            //    $('.bs-searchbox').addClass('hidden'); // we need better selector
            //} else {
            //    $('.bs-searchbox').removeClass('hidden'); // we need better selector
            //}
        });

    }

    function betOptionBtnHandler() {
        $('#betSelectionModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget); // Button that triggered the modal
            var optionIndex = button.data('option-index'); // Extract info from data-* attributes

            var options = {
                rule : button.data('rule'),
                deadHeatEnable : button.data('dead-heat-enable'),
                deadHeatTotal : button.data('dead-heat-total'),
                jointFavEnable : button.data('joint-fav-enable'),
                jointFavTotal : button.data('joint-fav-total'),
                jointFavWinner : button.data('joint-fav-winner'),
                jointFavNr : button.data('joint-fav-nr')
            };

            hideDeadHeatContainer(!(options.deadHeatEnable === 'true'));
            hideJointFavoriteContainer(!(options.jointFavEnable === 'true'));

            var modal = $(this);
            modal.find('.modal-title').text('Bet Option ' + optionIndex);
            
            $('#optionIndexVal').val(optionIndex);
            $('#rule4-picker').val(options.rule);
            $('#rule4-picker').selectpicker('refresh'); //refresh to update plugin value
            $('#deadHeatEnabled').val(options.deadHeatEnable);
            $('#deadHeatTotal').val(options.deadHeatTotal);
            
            $('#jointFavoriteEnabled').val(options.jointFavEnable);
            $('#jointFavoriteTotal').val(options.jointFavTotal);
            $('#joinFavoriteWinner').val(options.jointFavWinner);
            $('#jointFavoriteNr').val(options.jointFavNr);

        }).on('hidden.bs.modal', function (e) {

            var optionId = $('#optionIndexVal').val();

            var curBetOptionBtn = $('.bet-option-btn[data-option-index="' + optionId + '"]');

            curBetOptionBtn.data('rule', $('#rule4-picker').val());

            curBetOptionBtn.data('dead-heat-enable', $('#deadHeatEnabled').val());
            curBetOptionBtn.data('dead-heat-total', $('#deadHeatTotal').val());

            curBetOptionBtn.data('joint-fav-enable', $('#jointFavoriteEnabled').val());
            curBetOptionBtn.data('joint-fav-total', $('#jointFavoriteTotal').val());
            curBetOptionBtn.data('joint-fav-winner', $('#joinFavoriteWinner').val());
            curBetOptionBtn.data('joint-fav-nr', $('#jointFavoriteNr').val());

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
                betOptionBtn.prop('disabled', false);
                
            } else if (status === "won" && eachWayVal === 'no') {
                winOdd.removeClass('hide');
                betPlacementPicker.addClass('hide');
                betOptionBtn.removeAttr("disabled");
                betOptionBtn.prop('disabled', false);
            } else {
                winOdd.addClass('hide');
                betPlacementPicker.addClass('hide');
                betOptionBtn.attr("disabled", "disabled");
                betOptionBtn.prop('disabled', true);
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
                winOddsPlaced.addClass('hide');
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
            var numSelections = $('#betSelectionCount').val();
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
                var buttonHtml = buildBetOptionBtn(i + 1);

                rows += "<tr>";
                rows += "<td width='9%'>" + buttonHtml + "</td>";
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

    function buildBetOptionBtn(index) {

        var buttonHtml = '<span>' + index + '</span>'
        buttonHtml += '<strong class="other-action-ellipsis">…</strong>'

        var $betPlacementSelect = $('<btn/>', {
            class: 'btn btn-default bet-option-btn relative',
            html: buttonHtml,
            'data-option-index' : index,
            'data-toggle' : 'modal',
            'data-target' : '#betSelectionModal',
            'data-rule': 0,
            'data-dead-heat-enable' : false,
            'data-dead-heat-total': 2,
            'data-joint-fav-enble': false,
            'data-joint-fav-total' : 2,
            'data-joint-fav-winner' : 1,
            'data-joint-fav-nr': 0,
        });

        return $betPlacementSelect.clone().wrap('<div/>').parent().html()
    }

    function setupEachWayToggle() {
        $('.each-way-toggle').click(function (e) {
            $('.each-way-toggle').not(this).removeClass('active');
            $(this).toggleClass('active');
            e.preventDefault();
        });
    }

    function setupBonusToggle() {
        $('.bonus-toggle').click(function (e) {
            $('.bonus-toggle').not(this).removeClass('active');
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

            var isHidden = $("#dead-heat-container").is(':hidden');
            hideDeadHeatContainer(!isHidden);
            
        });
    }

    function hideDeadHeatContainer(hide) {
        
        $("#dead-heat-container").removeClass('hidden');

        if (hide) {
            $("#dead-heat-container").addClass('hidden'); //don't use toggleClass this is a generic method
            $("#toggleDeadHeat").text('+');
            $('#deadHeatEnabled').val(false);
        } else {
            $("#dead-heat-container").removeClass('hidden');
            $('#toggleDeadHeat').text('-');
            $('#deadHeatEnabled').val(true);
        }
    }

    function jointFavoriteHandler() {
        $("#toggleJointFavorite").on('click', function (e) {

            var isHidden = $("#joint-favorite-container").is(':hidden');
            hideJointFavoriteContainer(!isHidden);

        });
    }

    function hideJointFavoriteContainer(hide) {

        $("#joint-favorite-container").removeClass('hidden');

        if (hide) {
            $("#joint-favorite-container").addClass('hidden'); //don't use toggleClass this is a generic method
            $("#toggleJointFavorite").text('+');
            $('#jointFavoriteEnabled').val(false);
        } else {
            $("#joint-favorite-container").removeClass('hidden');
            $('#toggleJointFavorite').text('-');
            $('#jointFavoriteEnabled').val(true);
        }
    }

    

    function rule4Handler() {
        $("#rule4-picker").selectpicker({
            width: '100%'
        });
    }

})(window.jQuery, window, document);