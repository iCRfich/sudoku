
$(document).ready(function(){
    
    createTable();

});

function createTable(){
    let table = document.getElementById('sudoku');
    
    for (let i = 0; i < 9; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.dataset.column = j;
            input.dataset.row = i;
            fillSectors(i, j, input);
            input.onkeypress = function(evt){checkNumber(evt,this)};
            input.addEventListener("keyup", function(){
                refresh(this);
                checkColumn();
                checkRow();
                checkSection();
                checkWictory();
            });
            input.addEventListener("focus", function(){
                selectRefresh();
                selected(this)

            });
            td.appendChild(input);
            tr.appendChild(td);

            
        }
        table.appendChild(tr);
    }

}

function fillSectors(i, j ,td){
    if(i < 3 && j< 3)td.classList.add('sector1');
    if(i > 2 && i < 6 && j< 3)td.classList.add('sector2');
    if(i > 5 && j< 3)td.classList.add('sector3');

    if(i < 3 && j > 2 && j < 6 )td.classList.add('sector4');
    if(i > 2 && i < 6 && j > 2 && j < 6 )td.classList.add('sector5');
    if(i > 5 && j > 2 && j < 6 )td.classList.add('sector6');

    if(i < 3 && j > 5)td.classList.add('sector7');
    if(i > 2 && i < 6 &&  j < 9 && j > 5)td.classList.add('sector8');
    if(i > 5 && i < 9 &&  j < 9 && j > 5)td.classList.add('sector9');
}

function checkNumber(evt , element){
    if(evt.keyCode < 49 || evt.keyCode > 57) {
        evt.preventDefault();
        return false;
    }
    else if(element.value){
        element.value = String.fromCharCode(evt.keyCode);
        evt.preventDefault();
        return false;
    }
}

function refresh(element){
  for (let i = 0; i <= 9; i++) {
    $('input[data-column = "'+ i +'"]').removeClass("fail");
    $('input[data-row = "'+ i +'"]').removeClass("fail");
    $(".sector"+ i +"").removeClass("fail");
  }
}
function checkColumn(){
    check = true;
    let table = document.getElementById('sudoku');
    for (let column = 0; column < 9; column++) {
        for (let i = 0; i < 9; i++) {
            let cell = table.rows[i].cells[column].children[0];
            for (let j = 1; j < 9; j++){
                let cell_two = table.rows[j].cells[column].children[0];
                if(cell.value == cell_two.value && cell.value !== '' && cell_two !== cell){
                    cell.classList.add('fail');
                    cell_two.classList.add('fail');
                    check = false;
                }
            }
        }
    }
    return check;
}

function checkRow(gen = false){
    check = true;
    let table = document.getElementById('sudoku');
    for (let row = 0; row < 9; row++) {
            for (let i = 0; i < 9; i++) {
                let cell = table.rows[row].cells[i].children[0];
                for (let j = 1; j < 9; j++){
                    let cell_two = table.rows[row].cells[j].children[0];
                    if(cell.value == cell_two.value && cell.value !== '' && cell_two !== cell){
                        cell.classList.add('fail');
                        cell_two.classList.add('fail');
                        check = false;
                    }
                }
            }
    }
    return check;
 }

 function checkSection(gen = false){
    check = true;
    for (let i = 0; i <= 9; i++) {
        $(".sector" + i + "").each(function(){
            let value = $(this).val()
            let input = this;
            $(".sector" + i + "").each(function(){  
                if($(this).val() !== '')
                if ($(this).val() === value && this !== input){
                    if(gen){
                        input.value = '';
                        console.log(this.value = '');
                    }
                   else{
                        $(this).addClass('fail');
                        check = false;
                   }
                }
            });
        });
    }
    return check;
 }

 function checkWictory(){
     let win = true;
     $("input").each(function(){
         if(this.value === ''){
            win = false;
            return;
        }
     });

    if($(".fail").length) win = false;
    if(win) alert('victory!')
   
 }


function easyComplexity(){
    //40 block easy
    //30 block med
    //23 hard
    refresh();
    clear();
    FillCells(32);
    usedIndexes = [];
    checkSection(true);checkRow();checkColumn();
}


function clear(){
    $('input').each(function(){
        this.value = '';
    });
}

function FillCells(num){
    let input = document.getElementsByTagName('input');
    let array = getSudoku();
    let numbers = [];
    for (let i = 0; i <  40; i++) {
        getRandomNumber();
    }

    for (let j = 0; j < usedIndexes.length-1; j++) {
        
      try{
        input[usedIndexes[j]].value = array[input[usedIndexes[j]].dataset.row][input[usedIndexes[j]].dataset.column];
      }
      catch(e){
        console.log(e);
      }
    }

    //console.log(usedIndexes);
    console.log(baseTable);
}

let usedIndexes = [];
function getRandomNumber() {
    let newNumber = Math.floor(Math.random() * 81 + 1);
    if(usedIndexes.indexOf(newNumber) === -1)usedIndexes.push(newNumber);
    else getRandomNumber();
  }

//not mine
Array.prototype.shuffle = function() {
    var arr = this.valueOf();
    var ret = [];
    while (ret.length < arr.length) {
      var x = arr[Math.floor(Number(Math.random() * arr.length))];
      if (!(ret.indexOf(x) >= 0)) ret.push(x);
    }
    return ret;
  }
  
  function getSudoku() {
    var sudoku = baseTable = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [2, 3, 4, 5, 6, 7, 8, 9, 1],
            [5, 6, 7, 8, 9, 1, 2, 3, 4],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
            [9, 1, 2, 3, 4, 5, 6, 7, 8]
        ];
    // var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // sudoku.push(arr);
    // for (var i = 1; i < 9; i++) {
  
    //   while (sudoku.length <= i) {
    //     var newarr = arr.shuffle();
    //     var b = false;
    //     for (var j = 0; j < arr.length; j++) {
    //       for (var k = 0; k < i; k++) {
    //         if (sudoku[k].indexOf(newarr[j]) == j) b = true;
    //       }
  
    //     }
    //     if (!b) {
    //       sudoku.push(newarr);
    //     }
    //   }
    // }
    return sudoku;
  }
  


function selectRefresh(){
    $('input').removeClass(["selected-row",'selected-column','selected-sector','selected-cell']);
}
function selected(element){

    let table = document.getElementById('sudoku');
    for (let i = 0; i < 9; i++) {
        table.rows[i].cells[element.dataset.column].children[0].classList.add('selected-row');
        table.rows[element.dataset.row].cells[i].children[0].classList.add('selected-column');
    }
    $("." + element.classList[0]).addClass('selected-sector');
    element.classList.add('selected-cell');
   // console.log( $('.sector3').last(),element.classList[0]) ;
}

