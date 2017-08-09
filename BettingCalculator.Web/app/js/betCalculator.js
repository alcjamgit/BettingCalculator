
(function () {

    $(document).ready(function () {

        initializeBetTypePicker();
        setupEachWayToggle();
        initializePopOvers();
        initializeBetStatusPickers();
        setBetSelectionHandler();
    });

    function initializeBetTypePicker(selector) {
        $('#selectedBetType').selectpicker({
            size: 'auto',
            liveSearch: true,
            width: '100%',
            noneSelectedText: 'Please select bet type'
        });

        $('#selectedBetType').on('change', function (e) {
            var selected = e.target.value;
            $betRow = $("<td>").append();


            //bet types
            var $betTypeSelect = $('<select>', {
                class: 'target'
            });

            var betTypes = {
                "won": "Won",
                "placed": "Placed",
                "lost": "Lost",
                "voidnr": "Void NR"
            };

            $.each(betTypes, function (val, text) {
                $betTypeSelect.append($('<option />', {
                    value: val,
                    text: text
                }));
            });


            //
            
            for (var i = 0; i < length; i++) {

            }
            var $betTable = $('#bet-selection-table tr:last').after('');

        });

    }

    function setBetSelectionHandler() {

        
        $("#set-bet-selection").on("click", function (e) {
            var numSelections = $('#bet-selection-count').val();
            if (!numSelections || isNaN(numSelections)) {
                alert('Please set number of selections');
                return;
            }

            
        });
    }

    function initializeBetStatusPickers(selector) {
        $('.bet-status-picker').selectpicker({
            width: '100%',
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

})();