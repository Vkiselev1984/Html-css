$('#num').animate({ num: 95/* - начало */ }, {
    duration: 3000,
    step: function (num){
        this.innerHTML = (num).toFixed(0) + '%'
    }
});

$('#num2').animate({ num: 4396 - 3/* - начало */ }, {
    duration: 5000,
    step: function (num){
        this.innerHTML = (num + 3).toFixed(0) + ''
    }
});

$('#num3').animate({ num3: 298 - 3/* - начало */ }, {
    duration: 5000,
    step: function (num3){
        this.innerHTML = (num3 + 3).toFixed(0) + ''
    }
});


