
$(document).ready(function(){
    
    createTable();

});

const area_count = 3;
const baseTable = [
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


let sudoku = [];

function createTable(){
    let table = document.getElementById('sudoku');
    
    for (let i = 0; i < 9; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.setAttribute('type','text');
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
  if(!element.readOnly){
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


function setUp(){

    let complexity = $('input:radio[name=complexity]:checked').val();
    refresh();
    clear();
    FillCells(complexity);
    usedIndexes = [];
    checkSection(true);checkRow();checkColumn();
}


function clear(){
    $('input:text').each(function(){
        this.value = '';
        this.readOnly = false;
    });
}

function FillCells(num){
    let input = document.getElementsByTagName('input');
    let array = getSudoku();
    let numbers = [];
    for (let i = 0; i < num; i++) {
        getRandomNumber();
    }

    for (let j = 0; j < num; j++) {
        
      try{
       input[usedIndexes[j]].value = array[input[usedIndexes[j]].dataset.row][input[usedIndexes[j]].dataset.column];
       input[usedIndexes[j]].readOnly = true;
      }
      catch(e){
        console.log(e);
      }
    }


}

let usedIndexes = [];
function getRandomNumber() {
    let newNumber = Math.floor(Math.random() * 81);
    if(usedIndexes.indexOf(newNumber) === -1)usedIndexes.push(newNumber);
    else getRandomNumber();
  }



  function getSudoku() {
    sudoku = baseTable;

    let function_mix = [
        area_rows_swap(),
        area_column_swap(),
        rows_swap(),
        column_swap(),
        transpose()
    ];

    for (let i = 0; i < 30; i++) {
        function_mix[Math.floor(Math.random() * 5)];
    }

    return sudoku;
  }
  


function selectRefresh(){
    $('input').removeClass(["selected-row",'selected-column','selected-sector','same-number']);
    $('#selected-cell').attr("id","");
}
function selected(element){

        let table = document.getElementById('sudoku');
        for (let i = 0; i < 9; i++) {
            table.rows[i].cells[element.dataset.column].children[0].classList.add('selected-row');
            table.rows[element.dataset.row].cells[i].children[0].classList.add('selected-column');
        }
        $("." + element.classList[0]).addClass('selected-sector');
        element.id = 'selected-cell';
    
        findSameNumber(element.value)
      
}

function transpose(){
    let row_count = sudoku.length;
    let column_count = sudoku[0].length;
    let transpose_array = [];
    for (let i = 0; i < column_count; i++)
     { transpose_array[i] = [];
       for (let j = 0; j < row_count; j++) transpose_array[i][j] = sudoku[j][i];
     }
    sudoku = transpose_array;
}

function area_rows_swap(){
    let area = Math.floor(Math.random() * area_count);
	let line1 = Math.floor(Math.random() * area_count);
	
    let rand1 = area * area_count + line1

	let line2 = Math.floor(Math.random() * area_count);

	while (line1 === line2){
        line2 = Math.floor(Math.random() * area_count);
    }

    let rand2 = area * area_count + line2

    let row1 = sudoku[rand2];
    let row2 = sudoku[rand1];
    sudoku[rand1] = row1;
    sudoku[rand2] = row2;
}

function area_column_swap(){
    transpose();
    area_rows_swap();
    transpose();
}

function rows_swap(){
    let area1 = Math.floor(Math.random() * area_count);

    let area2 = Math.floor(Math.random() * area_count);
	

	while (area1 == area2){
        area2 = Math.floor(Math.random() * area_count);
    }

    for (let i = 0; i < 3; i++) {
        let rand1 = area1 * area_count + i;
        let rand2 = area2 * area_count + i;

        let row1 = sudoku[rand2];
        let row2 = sudoku[rand1];
        sudoku[rand1] = row1;
        sudoku[rand2] = row2;
    }

    return sudoku;
}

function column_swap(sudoku){
    transpose(sudoku);
    rows_swap(sudoku);
    transpose(sudoku);
}

function getHelp(){
    let selected_cell = document.getElementById('selected-cell');
    if(selected_cell){
        selected_cell.value = sudoku[selected_cell.dataset.row][selected_cell.dataset.column];
    }
    else alert('select cell for help')
}

function findSameNumber(value){
    $("input:text").each(function(){
        if(this.value === value &&  this.value !== '') this.classList.add('same-number');
    });
}