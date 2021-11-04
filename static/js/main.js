$(document).ready(function() {
    var mainOutput = $('#output');
    var subOutput = $('#output2');
    var op = $('#operator');
    var num2 = $('#num2');
    var num1 = $('#num1');
    var temp = $('#temp');
    var storedVal = null;
    var clearData = function() {
        num1.val('');
        op.val('');
        num2.val('');
        temp.val('');
    };

    var clearOutput = function() {
        mainOutput.html('');
        subOutput.html('');
    };

    var digitError = function() {
        mainOutput.html('0');
        subOutput.html('Reach Digit Limit');
        temp.val(0);
    }

    $('.nums').click(function() {
        if (('+-*/').indexOf(mainOutput.html()) != -1) {
            mainOutput.html('');
        }

        if ($(this).val() == '.' && (mainOutput.html()).indexOf('.') != -1) return ;
        if ($(this).val() !== '.') {
            if (mainOutput.html() == '0' || subOutput.html() == 'Reach Digit Limit' || subOutput.html() == 'Value has been stored!' || 'Value Output!') {
                clearOutput()
            }    
        }

        if (temp.val() !== '') {
            clearOutput()
            clearData();
        }

        mainOutput.append($(this).val());
        subOutput.append($(this).val());
        if (mainOutput.html().length > 12) {
            digitError();
        }
    });

    $('#clearButton').click(function() {
        mainOutput.html('0');
        subOutput.html('');
        clearData();
    });

    $('#storeButton').click(function() {
        if (storedVal == null) {
            storedVal = mainOutput.html();
            subOutput.html('Value has been stored!');
            mainOutput.html('');
            clearData();
        }
        else {
            clearData();
            mainOutput.html(storedVal);
            subOutput.html('Value Output!');
            storedVal = null;
        }
    });

    $('.btn-operate').click(function() {
        var newOperator = $(this).val();
        if (num1.val() !== '' &&  ('+-*/').indexOf(num1.val()) == -1 && op.val() !== '') {
            num2.val(mainOutput.html());
            if (('+-*/').indexOf(num2.val()) != -1) return ;
            $.getJSON($SCRIPT_ROOT + '/_calculate', {
                number1: num1.val(),
                operator: op.val(),
                number2: num2.val()
            }, function(data) {
            if (data.result.toString().length > 13) {
                digitError();
            } else {
                mainOutput.html(newOperator);
                subOutput.html(data.result + newOperator);
                num1.val(data.result);
                op.val(newOperator);
            }
            });
        } else {
            num1.val(mainOutput.html());
            op.val(newOperator);
            mainOutput.html(newOperator);
            subOutput.append(newOperator);
        }
    });

    $('#resultButton').click(function() {
        if (mainOutput.html() === '' || ('+-*/').indexOf(mainOutput.html()) != -1) return ;
        num2.val(mainOutput.html());
        $.getJSON($SCRIPT_ROOT + '/_calculate', {
            number1: num1.val(),
            operator: op.val(),
            number2: num2.val()
        }, function(data) {
        if (data.result.toString().length > 13) {
            digitError();
        } else {
            mainOutput.html(data.result);
            subOutput.html(data.result);
            clearData();
        }
        });
    });
})

function MM_openBrWindow(theURL,winName,features) { //v2.0
    window.open('https://tehf.me/','tehf','scrollbars=yes,width=650,height=500');
  }